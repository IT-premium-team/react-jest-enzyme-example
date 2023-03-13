import React, { useMemo, useState } from "react";
import { ActionButton, Title } from "@atoms";
import { useSelectBenefits } from "@hooks";
import { useAppSelector } from "@store";
import Link from "next/link";
import { ErrorBlock } from "@molecules";

type ContainerProps = {
    error?: any;
};

export const Container = (props: ContainerProps) => {
    const { error } = props;

    const [selectItems, setSelectItems] = useState([]);

    const { selectOne, selectedBenefits } = useSelectBenefits();

    const items = useAppSelector(
        (state) => state?.benefits.benefitsData
    );


    const toggleAll = (allItems: GetItemsDto[]) => {
        if (selectedBenefits.length < allItems.length) {
            setSelectItems(allItems);
        } else {
            setSelectItems([]);
        }
    };

    const notActiveItems = useMemo(
        () =>
            items.filter((item) => {
                return !item.user_activation;
            }),
        [items]
    );

    return (
        <div role="list">
            <div>
                <Title text="Page Title"></Title>
                <ActionButton
                    onClick={() => toggleAll(notActiveItems)}
                    text="Select"
                    width={"large"}
                ></ActionButton>
                <BenefitsCardList
                    benefitsItems={notActiveItems}
                    toggleBenefits={selectedBenefits}
                    onClick={selectOne}
                />
            </div>
            <div>
                {!error && (
                    <Link to="/next-page">
                        <ActionButton
                            disabled={selectedBenefits.length === 0}
                            text="Next"
                            width={"large"}
                        />
                    </Link>
                )}
            </div>
            <ErrorBlock error={error?.data} />
        </div>
    );
};

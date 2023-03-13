import { store } from "@store";
import {
    render,
    screen,
    within,
    RenderResult,
    fireEvent,
} from "@testing-library/react";
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { Container } from "./BenefitsContainer";

const renderContainer = (): RenderResult =>
    render(
        <Provider store={store}>
            <Container />
        </Provider>,
    );

test("renders the Benefits Container", () => {
    const { asFragment } = renderContainer();
    expect(asFragment()).toMatchSnapshot();

    expect(screen.getByLabelText(/page title/i)).toBeInTheDocument();

    const benefitList = screen.getByRole("list");
    expect(benefitList).toBeInTheDocument();

    const benefitListItems = within(benefitList).getAllByRole("listitem");
    expect(benefitListItems).toHaveLength(10);
});

test("test select button", () => {
    const setSelectItems = jest.fn();
    const appComponent = mount(<App onClick={setSelectItems} />);

	const divs = appComponent.find('div');
    expect(divs.length).toBeGreaterThan(0);

    const handleClick = jest.spyOn(React, "useState");

    handleClick.mockImplementation((selectItems: any) => [selectItems, setSelectItems]);
    
	expect(setSelectItems).toBeCalled();
});

test("test link", () => {
    const history = createMemoryHistory();
    history.push = jest.fn();

    const { getByText } = renderContainer();
    fireEvent.click(getByText("Next"));

    expect(history.push).toHaveBeenCalledWith("/next-page");
});

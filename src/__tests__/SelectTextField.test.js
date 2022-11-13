import {
    fireEvent,
    getByRole,
    getByText,
    render,
    screen, 
    cleanup,
    within,
    waitFor,
    getByTestId
} from '@testing-library/react';
import React from "react";
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import EmployeeSearch from '../sections/@dashboard/task/new/EmployeeSearch';
import SelectTextField from '../components/SelectTextField';

let categories = [
    {
        '_id': '112434353421414',
        'name':'Selection 1',
    },
    {
        '_id': '534523423231',
        'name':'Selection 2',
    },
    {
        '_id': '845645234123243',
        'name':'Selection 3',
    }
]

afterEach(()=>{
    cleanup();
});

describe("<SelectTextField />", () => {
    it("should change value to <SelectText /> by selecting on controlled mode", async () => {
        const Test = () => {
        const [value, setValue] = React.useState("");
        const handleSelect = (option) => {
            console.log('CLICKED')
            setValue(option.target.value);
        };
        
        return (
            <SelectTextField 
                label='Test Categories'
                options={categories}
                value={value}
                onSelect={handleSelect}
                onChange={handleSelect}
                onClick={handleSelect}
            />
        );
    };

    const  { container } = render(<Test />);

    // fireEvent.click(screen.getByTestId('selectionField').lastChild);

    // userEvent.click(screen.getByTestId('selectionField').lastChild);
    fireEvent.mouseDown(screen.getByTestId('selectionField').lastChild);
    screen.debug();
    // screen.getByTestId('selectionField').lastChild.firstChild.setAttribute('aria-expanded','true')
    expect(screen.getByTestId('selectionField').lastChild.firstChild.getAttribute('aria-expanded')).toEqual('false');
    // await waitFor(()=> screen.getByText("Selection 1"));

    // fireEvent.click(screen.getByRole('button'));
    // userEvent.click(screen.getByRole('button'));
    // screen.getByRole('combobox');
    // console.log(container.querySelector('input'));
    // fireEvent.click(getByRole('combobox'), { target:  "value: Selection 2" });
    // fireEvent.click(container.querySelector('input'));
    // screen.debug();
    // userEvent.type(screen.getByTestId("selectionField"), "k");
    // await waitFor(()=> screen.getByText("Kabilan"));
    // fireEvent.click(screen.getByText("Kabilan"));
    // expect(screen.getByRole("combobox")).toHaveValue("Kabilan");
});
});
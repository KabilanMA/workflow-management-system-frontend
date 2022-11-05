import {
    fireEvent,
    getByRole,
    getByText,
    render,
    screen, 
    cleanup,
    within,
    waitFor
} from '@testing-library/react';
import React from "react";
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import EmployeeSearch from '../sections/@dashboard/task/new/EmployeeSearch';


let employees = [
    {
        '_id': '112434353421414',
        'firstname':'Kabilan',
    },
    {
        '_id': '534523423231',
        'firstname':'Pasan',
    },
    {
        '_id': '845645234123243',
        'firstname':'Dinuka',
    },
    {
        '_id': '23524624362432',
        'firstname':'Senthoo',
    },
]

afterEach(()=>{
    cleanup();
});

describe("<EmployeeSearch />", () => {
    it("should change value to <EmployeeSearch /> by selecting on controlled mode", async () => {
        const Test = () => {
        const [value, setValue] = React.useState("");
        const handleSelect = (option) => {
            setValue(option);
        };
        return (
            <EmployeeSearch 
                employees={employees}
                option = {true}
                value={value}
                onSelect={handleSelect}
                onChange={handleSelect}
            />
        );
    };
    render(<Test />);
    userEvent.type(screen.getByTestId("selection-text"), "k");
    await waitFor(()=> screen.getByText("Kabilan"));
    fireEvent.click(screen.getByText("Kabilan"));
    expect(screen.getByRole("combobox")).toHaveValue("Kabilan");
});
});
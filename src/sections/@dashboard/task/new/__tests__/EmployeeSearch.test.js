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

import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import EmployeeSearch from '../EmployeeSearch';


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

test('should render EmployeeSearch component', ()=>{

    render(<EmployeeSearch employees={employees}/>);

    const autocomplete = screen.getByTestId('empSearch');

    const tree = renderer.create(<EmployeeSearch employees={employees}/>).toJSON();
    
    expect(autocomplete).toBeVisible();

    const autoCompleteDropdown = screen.getByRole('button', {name:'Open'});
    expect(autoCompleteDropdown).toBeVisible();
    userEvent.click(autoCompleteDropdown);

    const t = screen.findAllByDisplayValue('Kabilan');
});
import {
    render,
    cleanup,
    screen
} from '@testing-library/react';
import React from "react";
import { act } from 'react-dom/test-utils';
import SubTask from '../sections/@dashboard/task/new/SubTask';
import { MemoryRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';


jest.mock('axios');

afterEach(()=>{
    cleanup();
});

describe("<SubTask /> Component", ()=>{
    describe('when rendered', () => {
        it('should fetch the list of employees', async () => { await act(async () => {
            const getSpy = jest.spyOn(axios, 'get');
            axios.get.mockResolvedValue({
                data: [
                    {
                        "roles": {
                          "Admin": 2000
                        },
                        "_id": "62e890c2704e940158387ad2",
                        "email": "a@a.com",
                        "password": "$2a$10$ovFhJ5jKUB1gpGHig5eIpOBvT.qGcbS40JK7hoEZYBd7Dd8OpN5nC",
                        "userStatus": 1,
                        "firstname": "Vihan"
                    }
                ]
            });

            const Test = (props) => {
                const { control } = useForm({});

                return(
                    <MemoryRouter>
                        <SubTask control={control} id={'3'} {...props} />
                    </MemoryRouter>
                );

            }
            
            render(<Test test />)
        });
    })});
});
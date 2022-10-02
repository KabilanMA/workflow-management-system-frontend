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
import SubTask from '../sections/@dashboard/task/new/SubTask';
import { MemoryRouter } from 'react-router-dom';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';
import useAxiosPrivate from '../hooks/useAxiosPrivate'
// import { axiosPrivate } from '../api/axios'

// jest.mock('useAxiosPrivate');
// jest.mock('axiosPrivate');

afterEach(()=>{
    cleanup();
});

describe("<SubTask /> Component", ()=>{
    describe('when rendered', () => {
        it('should fetch the list of employees', async () => {
            // const getSpy = jest.spyOn(users, 'get');
            // const axiosPrivate = axios.create()
            // axios.get.mockResolvedValue({
            //     data: [
            //         {
            //             "roles": {
            //               "Admin": 2000
            //             },
            //             "_id": "62e890c2704e940158387ad2",
            //             "email": "a@a.com",
            //             "password": "$2a$10$ovFhJ5jKUB1gpGHig5eIpOBvT.qGcbS40JK7hoEZYBd7Dd8OpN5nC",
            //             "userStatus": 1,
            //             "firstname": "Vihan"
            //         }
            //     ]
            // });

            // axios.get('https://www.google.com').then((res)=>{console.log(res)});
            const Test = () => {
                const { control } = useForm({});

                return(
                    <MemoryRouter>
                        <SubTask control={control} id={'3'}/>
                    </MemoryRouter>
                );

            }
            render(<Test />);
            // expect(getSpy).toBeCalled();
        });
    });
});
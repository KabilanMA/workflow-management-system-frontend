import { Controller } from 'react-hook-form';
import { TextField, Divider } from '@material-ui/core';

import { Box, Fab, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/PersonAdd';

import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import EmployeeSearch from './EmployeeSearch';


import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
// import axios from "../../../../api/axios"

const axio = require('axios')

const ALL_EMPLOYEES_URL = '/users'

export default function SubTask(props) {
  const control = props.control;
  const id = props.id;

  const test = props?.test ?? false;
  // const [employees, setEmployee] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [arr, setArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const privateAxios = test ? null : useAxiosPrivate();
  const navigate = useNavigate()
  const location = useLocation()

  const createEmployeeField = () => {
    setArr(data => {
      return [...data, { id: Object.keys(data).length }]
    });
  }

  useEffect(() => {
    // create the API request to get the employee names and title.
    let isMounted = true
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        const response = await privateAxios.get(ALL_EMPLOYEES_URL, {
          signal: controller.signal,
          withCredentials: true
        });
        if(isMounted) setEmployees(response?.data)
        if(isMounted) setIsLoading(false)
      } catch (err) {
        console.error("ERROR IN USEEFFECT : ")
        console.log(err)
        navigate('/login', { state: { from: location }, replace: true })
      }
    }

    const dummyFetch = async () =>{
      try{
        const response = await axio.get('test')
        if(isMounted) setEmployees(response?.data)
        if(isMounted) setIsLoading(false)
      }catch (err) {
        console.error("Test Error")
        console.log(err)
      }
    }
    if(!test){
      fetchData()
    }else {
      dummyFetch()
    }

    return () => {
      isMounted = false 
      controller.abort()
    }

  }, []);


  return (
    <>
      <Controller
        name={`taskName ${id}`}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error }
        }) => (
          <TextField
            required
            fullWidth
            variant="outlined"
            onChange={onChange}
            value={value ?? ""}
            label="Task Name"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      <Controller
        name={`taskNote ${id}`}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error }
        }) => (
          <TextField
            fullWidth
            margin="dense"
            multiline
            minRows="4"
            onChange={onChange}
            value={value}
            variant="outlined"
            label="Note about the task"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      <Controller
        name={`deadline ${id}`}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error }
        }) => (
          <TextField
            type='date'
            variant="outlined"
            onChange={onChange}
            value={value ?? ""}
            label="Deadline date"
            error={!!error}
            helperText={error?.message}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
      <Stack direction="column">
        {arr.map((option) =>
          <Controller
            key={option.id}
            mb={{ m: 5 }}
            sx={{ mb: 2 }}
            name={`employee ${id} ${option.id}`}
            control={control}
            render={({
              field: { onChange, value },
              fieldState: { error }
            }) => (!isLoading &&
              <EmployeeSearch
                onChange={onChange}
                value={value}
                error={!!error}
                helperText={error?.message}
                employees={employees}
              />
            )}
          />
        )}
        {/* <TextField variant="outlined"/> */}
        {/* <SubTaskSearch tasks={subTasks}/> */}
      </Stack>

      <Box
        sx={{ '& > :not(style)': { m: 1 } }}
        style={{
          position: 'relative',
          right: '0',
          bottom: '0'
        }}
      >
        <Fab size='small' color="success" aria-label="add" onClick={() => createEmployeeField()}>
          <AddIcon />
        </Fab>
      </Box>
      <Divider />
    </>
  );
}
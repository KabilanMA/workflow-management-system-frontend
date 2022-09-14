import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Paper, Typography, TextField, MenuItem, Divider } from '@material-ui/core';

import { Box, Fab, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/PersonAdd';

import { useEffect, useState } from 'react';

import EmployeeSearch from './EmployeeSearch';
import DatePicker from '../../../../components/DatePicker';

import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
// import axios from "../../../../api/axios"

const ALL_EMPLOYEES_URL = '/users'

export default function SubTask(props) {
    const control = props.control;
    const id = props.id;
    // console.log("d")
    const [employees, setEmployee] = useState([]);
    // const [employees2, setEmployee] = useState([]);
    const [subTasks, setSubTasks] = useState([]);
    const [arr, setArr] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

  const axios = useAxiosPrivate();

  const createEmployeeField = () => {
    setArr(data => {
      return [...data, { id: Object.keys(data).length }]
    });
  }

  useEffect(() => {
    // create the API request to get the employee names and title.
    // async function fetchData() {
    //   const response = await axios.get(ALL_EMPLOYEES_URL, {
        // withCredentials: true
    //   });
    //   console.log(JSON.stringify(response?.data));
    //   setEmployees2(response?.data)
    //   setIsLoading(false)
    // }
    // fetchData()

    const Empdata = [
      {
        empId: 2324235343453463,
        Name: "Kabilan Mahathevan",
        role: "Divisional Irrigation Engineer",
        acronym: "DIE",
        office: "DIE Office",
        officeLocation: "Matara"
      },
      {
        empId: 2423534634534534,
        Name: "Senthooran",
        role: "Draftsman",
        acronym: "D'man",
        office: "DIE Office",
        officeLocation: "Matara"
      },
      {
        empId: 231232131231223,
        Name: "Tharsigan",
        role: "Engineering Assistance",
        acronym: "EA",
        office: "DIE Office",
        officeLocation: "Matara"
      },
      {
        empId: 232342387961223,
        Name: "Thuva",
        role: "Chief Engineer",
        acronym: "CE",
        office: "DIE Office",
        officeLocation: "Matara"
      },
      {
        empId: 435353252345234,
        Name: "Dinesh",
        role: "Mechanical Engineer",
        acronym: "ME",
        office: "ME Office",
        officeLocation: "Halpathota"
      },
    ];
    setEmployee(Empdata);
    setIsLoading(false);

    // API request to get the different Sub task category.
    const subTaskData = [
      {
        id: "1",
        title: "Estimate Calculation",
      },
      {
        id: "2",
        title: "Design",
      },
    ];

    setSubTasks(subTaskData);

    }, []);


  return (
    <>
      <Controller
        name={`taskName${id}`}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error }
        }) => (
          <TextField
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
        name={`taskNote${id}`}
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
        name={`date${id}`}
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
        {arr.map((option)=>
          <Controller
            key={option.id}
            mb={{m:5}}
            sx={{mb:2}}
            name={`employee${option.id}${id}`}
            control={control}
            render={({
              field: { onChange, value },
              fieldState: { error }
          }) => ( !isLoading && 
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
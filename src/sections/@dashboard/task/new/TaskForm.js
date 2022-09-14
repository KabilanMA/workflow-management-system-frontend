// mui
import { TextField } from '@material-ui/core';
import { Container, Fab, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon  from '@mui/icons-material/RemoveCircleOutlineRounded';
import Divider from "@material-ui/core/Divider";

import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
// import axios from '../../../../api/axios';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';

import CurrencyInputField from '../../../../components/CurrencyInputField';
import SelectTextField from '../../../../components/SelectTextField';
import SubTask from './SubTask';

const ALL_CATEGORIES_URL = "/categories"

const tasks = [
  {
    label: "Maintenance & Improvements to Buildings"
  },
  {
    label: "Maintenance of Departmental Roads in Irrigation Schemes"
  },
  {
    label: "RMMIS - Infrastructure Development"
  }
];


const defaultValues = {
  taskCategory: '',
  description: '',
  totalBudget:''
}

export default function TaskForm() {
//   const axios = useAxiosPrivate()
//   const [tasks2, setTasks2] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const methods = useForm({defaultValues});
  const { handleSubmit, reset, control, setValue, watch } = methods;
  const onSubmit = (data)=>{
    console.log(data);

    // If data successfully uploaded to database then refresh the page.
    // window.location.reload(false);
  }

//   useEffect(() => {
    // async function fetchData() {
    //   const response = await axios.get(ALL_CATEGORIES_URL, {
        // withCredentials: true
    //   });
      // console.log(JSON.stringify(response?.data));
    //   setTasks2(response?.data)
    //   setIsLoading(false)
    // }
    // fetchData()
//   }, [])

const [arr, setArr] = useState([]);

const createNewTaskField = () => {
  setArr(data => {
    return [...data, { id: Object.keys(data).length }]
  });
}

const deleteLastTaskField = () => {
  setArr(data => {
    console.log(...[...data.slice(0, -1)]);
    return [...data.slice(0, -1)];
  });
}

return (
  <Container
    style={{
      display: 'grid',
      gridRowGap: '20px',
      padding: '50px 25px 50px 25px',
      borderRadius: '15px',
      backgroundColor: 'rgba(242,242,240)',
      boxShadow: '0px 0px 30px 5px #e8e6e1',
      marginTop: '20px'
    }}
  >
    <Controller
      name='taskCategory'
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error }
      }) => (
        !isLoading && <SelectTextField options={tasks} label="Category of Project" onChange={onChange} value={value} />
      )}
    />

    <Controller
      name='description'
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error }
      }) => (
        <TextField
          fullWidth
          margin="dense"
          multiline
          minRows="6"
          onChange={onChange}
          value={value}
          variant="outlined"
          label="Description about the project"
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
    <>
      <Controller 
        name='totalBudget'
        control={control}
        render={({
          field: { onChange, value }
        })=>{
          // console.log('totalBudget')
          return (
          <CurrencyInputField
            onChange={onChange}
            value={value}
            label="Total Budget Amount"
          />
        )}}
      />
    </>

    <Divider />

    {arr.map((option, i) => (
      <SubTask key={i} control={control} id={i} />
    ))}

      <Box 
        sx={{ '& > :not(style)': { m: 1 } }}
        style={{
          right:'5px',
          bottom: '5px',
          position: 'fixed'
        }}
      >
        <Fab size='small' color="primary" aria-label="add" onClick={()=>createNewTaskField()}>
          <AddIcon />
        </Fab>
        <Fab size='small' color="primary" aria-label="remove" onClick={()=>deleteLastTaskField()}>
          <RemoveIcon />
        </Fab>
      </Box>

      <button
        type="submit" 
        onClick={handleSubmit(onSubmit)}
        variant={"outlined"}
        style={{
          display: "inline-block",
          padding:"8px",
        }}
      >
        Submit
      </button>
    </Container>
  );
}
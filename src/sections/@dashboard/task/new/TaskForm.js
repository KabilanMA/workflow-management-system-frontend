// mui
import { Paper, Typography, TextField, MenuItem } from '@material-ui/core';
import { Container } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Divider from "@material-ui/core/Divider";

import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import axios from '../../../../api/axios';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';

import CurrencyInputField from '../../../../components/CurrencyInputField';
import SelectTextField from '../../../../components/SelectTextField';
import SubTask from './SubTask';

const ALL_CATEGORIES_URL = "/categories"

// const tasks = [
//   {
//     label: "Maintenance & Improvements to Buildings"
//   },
//   {
//     label: "Maintenance of Departmental Roads in Irrigation Schemes"
//   },
//   {
//     label: "RMMIS - Infrastructure Development"
//   }
// ];


const defaultValues = {
  taskCategory: '',
  description: '',
  totalBudget: ''


}

export default function TaskForm() {
  const axios = useAxiosPrivate()
  const [tasks2, setTasks2] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function fetchData() {
      try {
        const response = await axios.get(ALL_CATEGORIES_URL, {
          signal: controller.signal,
          withCredentials: true
        });
        // console.log(JSON.stringify(response?.data));
        setTasks2(response?.data)
        setIsLoading(false)
      } catch (err) {
        console.error("ERROR IN USEEFFECT : ")
        console.log(err)
        navigate('/login', { state: { from: location }, replace: true })
      }
    }
    fetchData()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const methods = useForm({ defaultValues });
  const { handleSubmit, reset, control, setValue, watch } = methods;
  const onSubmit = (data) => console.log(data);

  const [arr, setArr] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
          !isLoading && <SelectTextField options={tasks2} label="Category of Project" onChange={onChange} value={value} />
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
          }) => (
            <CurrencyInputField
              onChange={onChange}
              value={value}
              label="Total Budget Amount"
            />
          )}
        />
      </>

      <Divider />

      {arr.map((option, i) => (
        <SubTask key={i} control={control} id={i} />
      ))}

      {/* <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab 
          size='small' 
          color="primary" 
          aria-label="add"
          aria-owns={open ? 'mouse-over-popover': undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          <AddIcon onClick={()=>createNewTaskField()}/>
        </Fab>
        <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        label='test'
      >
        <p>Add new subtask</p>
      </Popover>

        <Fab size='small' color="primary" aria-label="add">
          <RemoveIcon onClick={()=>createNewTaskField()}/>
        </Fab>
      </Box> */}

      <Box
        sx={{ '& > :not(style)': { m: 1 } }}
        style={{
          right: '5px',
          bottom: '5px',
          position: 'fixed'
        }}
      >
        <Fab size='small' color="primary" aria-label="add" onClick={() => createNewTaskField()}>
          <AddIcon />
        </Fab>
        <Fab size='small' color="primary" aria-label="remove" onClick={() => deleteLastTaskField()}>
          <RemoveIcon />
        </Fab>
      </Box>

      <button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        variant={"outlined"}
        style={{
          display: "inline-block",
          padding: "8px",
        }}
      >
        Submit
      </button>
      <button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        variant={"outlined"}
        style={{
          display: "inline-block",
          padding: "8px",
        }}
      >
        Submit
      </button>
    </Container>
  );
}
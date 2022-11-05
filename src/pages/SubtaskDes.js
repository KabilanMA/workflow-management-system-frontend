import * as React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useNavigate, useLocation,useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Page from '../components/Page';
import Iconify from '../components/Iconify';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

import { TaskCard } from '../sections/@dashboard/task';


export default function SubtaskDes() {
  const{id}=useParams();
  console.log(id);
  
  const SUBTASK_URL=`/subtasks/${id}`;
  const ACCEPTANCETEST_URL=`/subtasks/acceptance/${id}`;

  const [subtask, setsubtask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const[empState,setEmpState]=useState(null);
  const[acceptancetatus,setAcceptancetatus]=useState(null);
  const [userNames,setUserNames]=useState(null);
  const[loggedUserkey,setloggedUserkey]=useState(null);
  const [complete,setComplete]=useState("complete task");

  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const subtaskData = await axios.get(SUBTASK_URL, {
          signal: controller.signal,
          withCredentials: true,
        });
        console.log(subtaskData.data);
        if (isMounted) setsubtask(subtaskData.data);
        if (isMounted) setEmpState(subtaskData.data.assigned_employees);
        // if (empState){

        // }
        // if (isMounted) setIsLoading(false);

      } catch (err) {
        console.error('ERROR IN USEEFFECT : ');
        console.log(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [loggedUserkey]);
  useEffect(()=>{
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const acceptStatus = await axios.get(ACCEPTANCETEST_URL, {
          signal: controller.signal,
          withCredentials: true,
        });
        if (isMounted) setAcceptancetatus(acceptStatus.data);
        if (isMounted) setIsLoading(false);
        if(!isLoading){
          console.log(acceptStatus.data);
        }


      } catch (err) {
        console.error('ERROR IN USEEFFECT : ');
        console.log(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };

  },[loggedUserkey])



   const getUserNames=async(userIdArray) =>{
   const controller = new AbortController();
  try {
        const user = await axios.get(`/users/${userIdArray}`, {
          signal: controller.signal,
          withCredentials: true,
        });
        console.log(user.data.firstname);
        return (user.data.firstname)

      } catch (err) {
        console.log(err);
        navigate('/login', { state: { from: location }, replace: true });
      }

 }
 const subtaskDone=async(subtaskId)=>{
  const controller = new AbortController();
  try {
    if(window.confirm("Are you sure to do this?")){
          const userKey=await axios.put(`/subtasks/${subtaskId}`, {
          signal: controller.signal,
          withCredentials: true,
        });
        setloggedUserkey(userKey);
        // toast.success("task Completed");
    }


      } catch (err) {
        console.log(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
 }
  const [checked, setChecked] = React.useState([]); 
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

// if (empState){
//   // const users = Object.keys(empState);
//   console.log(emp);

// }
if(!subtask && !empState ){
  return null;
}

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ my: 3, mx: 2 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4" component="div">
              {subtask.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6" component="div">
             Deadline : {subtask.deadline}
            </Typography>
          </Grid>
        </Grid>
        <Typography color="text.secondary" variant="body2">{subtask.note}
        </Typography>
      </Box>
      <Divider variant="middle" />
      {/* <Box sx={{ m: 2 }}>
        <Typography gutterBottom variant="body1">
          Assigned Employees
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="Extra Soft" />
          <Chip color="primary" label="Soft" />
          <Chip label="Medium" />
          <Chip label="Hard" />
        </Stack>
      </Box> */}
          <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      subheader={<ListSubheader>Assigned IDs</ListSubheader>}
    >

       {Object.keys(empState).map((key, index)=> (
        <ListItem>
        <ListItemIcon>
          {empState[1]}
        <AccountCircleIcon/>
        </ListItemIcon>
        {/* <ListItemText id="switch-list-label-bluetooth" primary="Bluet" />
        <ListItemText id="switch-list-label-bluetooth" primary="Bluet" /> */}
        <ListItemText>{key}</ListItemText>
        <Switch
          edge="end"
          onChange={handleToggle('bluetooth')}
          checked={empState[key]}
          inputProps={{
            'aria-labelledby': 'switch-list-label-bluetooth',
          }}
        />
      </ListItem>
      ))}
      {/* <ListItem>
        <ListItemIcon>
          <WifiIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" />
        <Switch
          edge="end"
          onChange={handleToggle('wifi')}
          checked={checked.indexOf('wifi') !== -1}
          inputProps={{
            'aria-labelledby': 'switch-list-label-wifi',
          }}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          {empState[1]}
          <BluetoothIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-bluetooth" primary="Bluetooth" />
        <Switch
          edge="end"
          onChange={handleToggle('bluetooth')}
          checked={checked.indexOf('bluetooth') !== -1}
          inputProps={{
            'aria-labelledby': 'switch-list-label-bluetooth',
          }}
        />
      </ListItem> */}
    </List>
      <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
        <Button>Go to Work Area</Button>
      </Box>
      <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
        <Button onClick={() =>{subtaskDone(id)}}>{(acceptancetatus && !(isLoading))? "Accepted":"Accept" }</Button>

        <Button onClick={() =>{subtaskDone(id)}}>Decline</Button>
      </Box>
    </Box>
  );
}

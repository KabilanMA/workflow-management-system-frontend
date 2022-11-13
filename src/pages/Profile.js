import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// components

import Page from '../components/Page';
import Iconify from '../components/Iconify';
import useAxiosPrivate from '../hooks/useAxiosPrivate'

import { TaskCard } from '../sections/@dashboard/task';
// mock
// import POSTS from '../_mock/blog';

// ----------------------------------------------------------------------

const ALL_MAINTASKS_URL = "/mainTasks";
const USER_DETAIL_URL = `/users/${JSON.parse(localStorage.getItem('user'))?.id}`;
const UPDATE_URL = `/personal`;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 700,
  margin: 'auto',
  minHeight: '10vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(0),
}));

export default function Profile() {
  const storageData = JSON.parse(localStorage.getItem('user'))
  const [mainTasks, setMainTasks] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [firstname, setFirstname] = useState(storageData?.firstname)
  const [email, setEmail] = useState(storageData?.email)
  const [lastname, setLastname ] = useState('')
  const axios = useAxiosPrivate();
  const navigate = useNavigate()
  const location = useLocation()
  console.log(USER_DETAIL_URL);
  useEffect(() => {
    
    // let isMounted = true
    // const controller = new AbortController()

    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(ALL_MAINTASKS_URL, {
    //       signal: controller.signal,
    //       withCredentials: true
    //     });
    //     if (isMounted) setMainTasks(response?.data)
    //     if (isMounted) setIsLoading(false)
    //   } catch (err) {
    //     console.error("ERROR IN USEEFFECT : ")
    //     console.log(err)
    //     navigate('/login', { state: { from: location }, replace: true })
    //   }
    // }

    // fetchData()

    // return () => {
    //   isMounted = false 
    //   controller.abort()
    // }
    const controller = new AbortController()
    const fetchData = async () => {
      try {
        const response = await axios.get(USER_DETAIL_URL, {
          signal: controller.signal,
          withCredentials: true
        });
        console.log(response);
      }catch(err) {
        console.error("ERROR IN USEEFFECT");
        window.location.reload()
      }
    }

    fetchData();
  }, [])

  const [newTaskVisible, setNewTask] = useState(false);
  return (
    <Page title="Profile">
      <RootStyle>
      <Container>
        <ContentStyle>
          <Stack direction="column">
            <Container
              style={{
                display: 'grid',
                gridRowGap: '20px',
                padding: '50px 25px 50px 25px',
                borderRadius: '15px',
                backgroundColor: 'rgba(242,242,240)',
                marginTop: '20px',
                marginLeft:'10px'
              }}
            >
              <Stack direction="row">
                <Typography sx={{ color: 'text.secondary', ml:10, textAlign: 'center' }}>Name</Typography>
                <Typography sx={{ color: 'text.primary', ml:20, textAlign: 'center' }}>{firstname+lastname}</Typography>
              </Stack>
              
              {}
            </Container>
          </Stack>

        {/* <Stack mb={5} direction='row' alignItems="center" justifyContent="space-between"
          >
            <TaskForm 
              sx={{
                mt:20
              }}
              open={newTaskVisible}
              onClose={setNewTask}
            />
        </Stack> */}

        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tasks
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            onClick={() => {
              setNewTask(true);
              console.log(newTaskVisible)
            }}
            to="new"
            startIcon={<Iconify icon="eva:plus-fill" />}>
            New Task
          </Button>
        </Stack> */}

        {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
            <TaskSearch tasks={POSTS} />
          </Stack> */}

        {/* <Grid container spacing={3}>
          {!isLoading && mainTasks.map((maintask, index) => (
            <TaskCard key={maintask._id} task={maintask} index={index} />
          ))}
        </Grid> */}
        </ContentStyle>
      </Container>
      </RootStyle>
    </Page>
  );
}
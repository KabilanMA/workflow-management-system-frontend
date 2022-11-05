import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components

import Page from '../components/Page';
import Iconify from '../components/Iconify';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

import { TaskCard } from '../sections/@dashboard/task';
// mock
// import POSTS from '../_mock/blog';

// ----------------------------------------------------------------------

const ALL_MAINTASKS_URL = '/mainTasks';

export default function TaskPage() {
  const [mainTasks, setMainTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.get(ALL_MAINTASKS_URL, {
          signal: controller.signal,
          withCredentials: true,
        });
        if (isMounted) setMainTasks(response?.data);
        if (isMounted) setIsLoading(false);
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
  }, []);

  const [newTaskVisible, setNewTask] = useState(false);
  return (
    <Page title="Tasks">
      <Container>
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

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tasks
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            onClick={() => {
              setNewTask(true);
              console.log(newTaskVisible);
            }}
            to="new"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Task
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {!isLoading &&
            mainTasks.map((maintask, index) => <TaskCard key={maintask._id} task={maintask} index={index} />)}
        </Grid>
      </Container>
    </Page>
  );
}

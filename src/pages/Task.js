import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { filter } from 'lodash';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

import { TaskCard } from '../sections/@dashboard/task';
import TaskListToolbar from '../components/TaskListToolbar';

const ALL_MAINTASKS_URL = '/mainTasks';

export default function TaskPage() {

  const [mainTasks, setMainTasks] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [filterName, setFilterName] = useState('');
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

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
      isMounted = false
      controller.abort()
    }
  }, [])

  const [newTaskVisible, setNewTask] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(array, (_maintask) => _maintask.description.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  let filteredTasks = []
  if (!isLoading) {
    filteredTasks = applySortFilter(mainTasks, getComparator(order, orderBy), filterName);
  }

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
          <TaskListToolbar filterName={filterName} onFilterName={handleFilterByName} />
          {!isLoading && filteredTasks.map((maintask, index) => (
            <TaskCard key={maintask._id} task={maintask} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}

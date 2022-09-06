import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components

import Page from '../components/Page';
import Iconify from '../components/Iconify';

import { TaskCard, TaskForm } from '../sections/@dashboard/task';
// mock
import POSTS from '../_mock/blog';

// ----------------------------------------------------------------------

export default function TaskPage() {
  const [newTaskVisible, setNewTask] = useState(false);
    return(
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
              onClick={()=>{
                setNewTask(true);
                console.log(newTaskVisible)
              }} 
              to ="new" 
              startIcon={<Iconify icon="eva:plus-fill" />}>
              New Task
            </Button>
          </Stack>
  
          {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
            <TaskSearch tasks={POSTS} />
          </Stack> */}
  
          <Grid container spacing={3}>
            {POSTS.map((post, index) => (
              <TaskCard key={post.id} task={post} index={index} />
            ))}
          </Grid>
        </Container>
      </Page>
    );
}
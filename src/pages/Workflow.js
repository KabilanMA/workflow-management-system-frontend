import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';

import axios from 'axios'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { errorToast } from '../components/Toasts';

// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import SubtaskOrderTimeline from "../components/SubtaskOrderTimeline"

// get the id from a prop later
const id = "6329c1043d6d5f6842952539"
const MAINTASK_URL = "/mainTasks/6329c1043d6d5f6842952539"

// ----------------------------------------------------------------------

export default function Workflow() {
  const axios = useAxiosPrivate()
  const theme = useTheme();
  const navigate = useNavigate()
  const location = useLocation()

  const [maintask, setMaintask] = useState(null)
  const [subtasks, setSubtasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [category, setCategory] = useState(null)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const fetchData = async () => {
      try {

        const maintask = await axios.get(MAINTASK_URL, {
          signal: controller.signal,
          withCredentials: true
        });

        const subtasksData = await axios.get("/subtasks/of-maintask/6329c1043d6d5f6842952539", {
          signal: controller.signal,
          withCredentials: true
        })

        const category = await axios.get(`/categories/${maintask.data.category_id}`, {
          signal: controller.signal,
          withCredentials: true
        })
        
        const newSubtasks = []

        subtasksData.data.forEach((subtaskData, index) => {
          
          let newSubtask = {...subtaskData}
          const newAssignedEmployeeData = []

          Object.keys(subtaskData.assigned_employees).forEach(async empID => {
            const isEmployeeCompleted = subtaskData.assigned_employees[empID]
            const employeeData = await axios.get(`/users/${empID}`, {
              signal: controller.signal,
              withCredentials: true
            })

            newAssignedEmployeeData.push({
              "emp_data": employeeData.data,
              "isEmployeeCompleted": isEmployeeCompleted
            })
          })
          newSubtask = {...newSubtask, ...{"newAssignedEmployeeData": newAssignedEmployeeData}}
          newSubtasks.push(newSubtask)
        })
        setSubtasks(newSubtasks)

        if (isMounted) {
          setMaintask(maintask?.data)
          setCategory(category?.data)
          setIsLoading(false)
        }
        
      } catch (err) {
        console.error("ERROR IN USEEFFECT : ")
        console.log(err)
        if (err.maintask?.status === 204) { // No content
          errorToast("No categories yet")
        } else {
          console.log("BBBBBBBBBBB")
          // navigate('/login', { state: { from: location }, replace: true })
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])
  

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {!isLoading && maintask.description} 
        </Typography>

        <Grid container spacing={3}>
          {!isLoading && <Grid item xs={12} md={6} lg={4}>
            <SubtaskOrderTimeline
              title="Subtasks of the workflow"
              subheader={`Category: ${category.name}`}
              list={subtasks.map((subtask, index) => ({
                id: subtask._id,
                title: subtask.name,
                status: subtask.status,
                deadline: new Date(subtask.deadline),
                assignedEmployees: subtask.newAssignedEmployeeData
              }))}
            />
          </Grid>}
        </Grid>
      </Container>
    </Page>
  );
}

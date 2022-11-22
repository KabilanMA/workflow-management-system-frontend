import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie'
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

// ----------------------------------------------------------------------

const TOTAL_USERS_URL = "/users/total"
const TOTAL_MAINTASKS_URL = "/mainTasks/total"
const TOTAL_COMPLETED_SUBTASKS_URL = "/subtasks/completedTotal"
const TOTAL_PENDING_SUBTASKS_URL = "/subtasks/pendingTotal"

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [cookies, setCookie] = useCookies(['dashboard_data'])
  const axios = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme();
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalMaintasks, setTotalMaintasks] = useState(0)
  const [totalCompletedSubtasks, setTotalCompletedSubtasks] = useState(0)
  const [totalPendingSubtasks, setTotalPendingSubtasks] = useState(0)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const fetchData = async () => {
      try {

        if(cookies.dashboard_data) {
          const data = cookies.dashboard_data
          setTotalUsers(data[0])
          setTotalMaintasks(data[1])
          setTotalCompletedSubtasks(data[2])
          setTotalPendingSubtasks(data[3])
          return
        }

        const totalUsersData = await axios.get(TOTAL_USERS_URL, {
          signal: controller.signal,
          withCredentials: true
        });

        const totalMaintasksData = await axios.get(TOTAL_MAINTASKS_URL, {
          signal: controller.signal,
          withCredentials: true
        })

        const totalCompletedSubtasksData = await axios.get(TOTAL_COMPLETED_SUBTASKS_URL, {
          signal: controller.signal,
          withCredentials: true
        });

        const totalPendingData = await axios.get(TOTAL_PENDING_SUBTASKS_URL, {
          signal: controller.signal,
          withCredentials: true
        })
        
        const expires = new Date()
        expires.setTime(expires.getTime() + (35 * 60 * 1000))
        const cookieData = [totalUsersData?.data.total,
        totalMaintasksData?.data.total,
        totalCompletedSubtasksData?.data.total,
        totalCompletedSubtasksData?.data.total]
        setCookie('dashboard_data', cookieData, { path: '/', expires })

        if (isMounted) {
          setTotalUsers(totalUsersData?.data.total)
          setTotalMaintasks(totalMaintasksData?.data.total)
          setTotalCompletedSubtasks(totalCompletedSubtasksData?.data.total)
          setTotalPendingSubtasks(totalCompletedSubtasksData?.data.total)
        }

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


  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Users" total={totalUsers} icon={'mdi:user'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Workflows" total={totalMaintasks} color="info" icon={'octicon:workflow-16'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Completed Subtasks" total={totalCompletedSubtasks} color="warning" icon={'ic:outline-task-alt'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Pending Subtasks" total={totalPendingSubtasks} color="error" icon={'ic:round-pending-actions'} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

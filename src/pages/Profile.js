import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
// material
import { Grid, Button, Container, Stack, Typography, Card, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
// components

import Page from '../components/Page';
import Iconify from '../components/Iconify';
import useAxiosPrivate from '../hooks/useAxiosPrivate'

import PasswordOverlay from '../sections/@dashboard/profile/PasswordOverlay';

// mock
// import POSTS from '../_mock/blog';

// ----------------------------------------------------------------------

const USER_DETAIL_URL = `/users`;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
  },
  [theme.breakpoints.up('sm')]: {
    margin:'10px'
  },
  textAlign: 'center',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  minHeight: '10vh',
  padding: theme.spacing(0),
}));

export default function Profile() {
  let userId = JSON.parse(localStorage.getItem('user'))?.id
  const storageData = JSON.parse(localStorage.getItem('user'))

  const [isLoading, setIsLoading] = useState(true)

  const [firstname, setFirstname] = useState(storageData?.firstname)
  const [email, setEmail] = useState(storageData?.email)
  const [lastname, setLastname ] = useState('')
  const axios = useAxiosPrivate();
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      try {
        userId = JSON.parse(localStorage.getItem('user'))?.id;
        
        const response = await axios.get(`${USER_DETAIL_URL}/${userId}`, {
          signal: controller.signal,
          withCredentials: true
        });
        setLastname(response.data.lastname);

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
      <Card sx={{ position: 'relative', maxWidth:'800px', margin:'auto' }}>
        <ContentStyle>
          <Stack direction="column">
            <Container
              style={{
                padding: '30px 25px 5px 25px',
                margin:'auto'
              }}
            >
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={3}>
                  <Typography sx={{ color: 'text.secondary', ml:10, textAlign: 'left' }}>Name</Typography>
                </Grid>

                <Grid item xs={9}>
                  <Typography sx={{ color: 'text.primary', ml:20, textAlign: 'left' }}>{`${firstname} ${lastname}`}</Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography sx={{ color: 'text.secondary', ml:10, textAlign: 'left' }}>Email</Typography>
                </Grid>

                <Grid item xs={9}>
                  <Typography sx={{ color: 'text.primary', ml:20, textAlign: 'left' }}>{`${email}`}</Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography sx={{ color: 'text.secondary', ml:10, textAlign: 'left' }}>Password</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography sx={{ color: 'text.primary', ml:20, textAlign: 'left' }}>**********</Typography>
                </Grid>

                <Grid item xs={12} sx={{position:'right', textAlign:'right'}}>
                  <PasswordOverlay />
                </Grid>

              </Grid>
            </Container>
          </Stack>
        </ContentStyle>
      </Card>
      </RootStyle>
    </Page>
  );
}
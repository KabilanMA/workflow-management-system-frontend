import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography, Stack, TextField, MenuItem } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
// sections
import { RegisterForm } from '../sections/auth/register';
import TaskForm from '../sections/@dashboard/task/new/TaskForm';

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

export default function NewTask() {
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Register">
      <RootStyle>
        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Project Details
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Enter the details of the project workflow</Typography>

            <Stack mb={5} direction="column">
              <TaskForm />
            </Stack>
            

            <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
              By registering, I agree to irrigation department&nbsp;
              <Link underline="always" color="text.primary" href="#">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link underline="always" color="text.primary" href="#">
                Privacy Policy
              </Link>
              .
            </Typography>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

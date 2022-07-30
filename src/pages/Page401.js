import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Page401() {
  return (
    <Page title="401 Unauthorized">
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            401 Unauthorized
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Access for this page is restricted for only certain type of users. 
          </Typography>

          <Box
            component="img"
            src="/static/illustrations/401.png"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
}

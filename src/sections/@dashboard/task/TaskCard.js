import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, Stack } from '@mui/material';
// utils
import { fDate, fDateTime } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgIconStyle from '../../../components/SvgIconStyle';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 1 / 40)',
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});


const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));


// ----------------------------------------------------------------------

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function TaskCard({ task, index }) {
  // const { cover, title, view, comment, share, author, createdAt } = task;
  const { description, createdAt, updatedAt } = task

  return (
    <Grid item xs={12} sm={12} md={12}>
      <Card sx={{ position: 'relative' }}>

        <CardContent>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
              created at: {fDateTime(createdAt)}
            </Typography>
            <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
              last updated at: {fDateTime(updatedAt)}
            </Typography>
          </Stack>

          <TitleStyle
            to="#"
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
          >
            {description}
          </TitleStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}

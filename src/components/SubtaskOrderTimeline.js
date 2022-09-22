// @mui
import PropTypes from 'prop-types';
import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';

import { useState, cloneElement } from 'react';

// utils
import { fDateTime } from '../utils/formatTime';

// ----------------------------------------------------------------------

AppOrderTimeline.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppOrderTimeline({ title, subheader, list, ...other }) {
  
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent
        sx={{
          '& .MuiTimelineItem-missingOppositeContent:before': {
            display: 'none',
          },
        }}
      >
        <Timeline>
          {list.map((item, index) => (
            <OrderItem key={item.id} item={item} isLast={index === list.length - 1} />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  isLast: PropTypes.bool,
  item: PropTypes.shape({
    time: PropTypes.instanceOf(Date),
    title: PropTypes.string,
    status: PropTypes.number,
  }),
};

function OrderItem({ item, isLast }) {

  const { status, title, deadline, assignedEmployees } = item;

  const hasDeadlinePassed = (deadline) => {
    if(deadline.getTime() > (new Date()).getTime()) {
        return false
    } return true
  }

  const getColor = (deadline) => {
    if (status === 3) { // status=3 means subtask was completed after the dealine has passed
      return 'warning'
    } if (status === 2) { // status=2 means subtask was completed before the deadline
      return 'success'
    } if (status === 1) { // status=1 means subtask is partially finished
      return 'grey'
    } if (hasDeadlinePassed(deadline)) { // status=0 means subtask is not yet finished
      return 'error'
    } 
    return 'info' // return 'info' 
  }

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={
            getColor(deadline)
          }
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>

        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Deadline: {fDateTime(deadline)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

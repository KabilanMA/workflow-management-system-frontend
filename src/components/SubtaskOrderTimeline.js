// @mui
import PropTypes from 'prop-types';
import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';

// utils
import { fDateTime } from '../utils/formatTime';

// ----------------------------------------------------------------------

SubtaskOrderTimeline.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function SubtaskOrderTimeline({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} data-testid="subtaskOrderTimeline-cardHeader" />

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

  // const { status, title, deadline, assignedEmployees } = item;
  const { status, title, deadline } = item;

  const hasDeadlinePassed = (deadline) => {
    if (deadline.getTime() > (new Date()).getTime()) {
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
    return 'info' // return 'info' (task not yet finished and the dealine has not yet passed)
  }

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          data-testid="subtaskOrderTimeline-timelineDot"
          color={
            getColor(deadline)
          }
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography
          data-testid="subtaskOrderTimeline-title"
          variant="subtitle2">{title}</Typography>

        <Typography
          data-testid="subtaskOrderTimeline-deadline"
          variant="caption" sx={{ color: 'text.secondary' }}>
          Deadline: {fDateTime(deadline)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

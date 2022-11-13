import PropTypes from 'prop-types';
import { set, sub } from 'date-fns';
import { noCase } from 'change-case';
import { faker } from '@faker-js/faker';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
// utils
import { fToNow } from '../../utils/formatTime';
// components
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const ALL_NOTIFICATION_URL = "notifications";
const COUNT = 6;

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const axios = useAxiosPrivate()
  const anchorRef = useRef(null);
  const location = useLocation();

  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);

  const [unReadNotification, setUnReadNotification] = useState(notifications.filter((notification) => notification.isUnRead === true));
  const [readNotification, setReadNotification] = useState(notifications.filter((notification) => notification.isUnRead === false));

  const totalUnRead = unReadNotification.length;

  const [open, setOpen] = useState(null);

  let count = 0;

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    // API request to mark all as read

    // This function comes under the success of the API request
    setNotifications(
      unReadNotification.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

  const createNotificationList = (notifications) => {
    const val =  notifications.map((notification, index) => {
      const createdDate = new Date(notification.createdAt);
      const currentDate = new Date()
      const difference = currentDate.getTime() - createdDate.getTime()
      const differenceInDays = Math.floor(difference/(1000*3600*24));
      const differenceInHours = Math.floor(difference/(1000*3600));
      const differenceInMinutes = Math.floor(difference/(1000*60));

      let created=new Date();
      if(differenceInDays >=1) {
        const differenceInSeconds = Math.floor(difference/(1000));

        created = set(new Date(), {hours: differenceInHours, minutes: differenceInMinutes, seconds: differenceInSeconds});
        
      }else {
        created = sub(new Date(), {days: differenceInDays, hours: differenceInHours, minutes: differenceInMinutes});
      }

      const result = {
        _id: notification._id,
        project: notification.project,
        description: notification.description,
        link: notification.link,
        type: notification.type,
        createdAt: created,
        isUnRead: !notification.receiver[notification.user_id]
      };
      return result;
    });
    // console.log(val)
    return val;
  }

  const loadTimeline = (link) => {
    navigate(`/${link}`, {replace: true });
    handleClose();
  }

  useEffect(() =>{
    const controller = new AbortController();

    const fetchNotifications = async () => {
      try {
        const url = `${ALL_NOTIFICATION_URL}/${COUNT}`;
        const response = await axios.get(url, {
          signal: controller.signal,
          withCredentials: true
        });
        const notificationResult = createNotificationList(response?.data?.notifications);
        setNotifications(notificationResult);
        setUnReadNotification(notificationResult.filter((notification) => notification.isUnRead === true));
        setReadNotification(notificationResult.filter((notification) =>false))
      } catch (err) {
        console.error("ERROR IN USEEFFECT : ")
        // console.log(err)
        if (err.response.status === 204) { // No content
        } else {
          // navigate('/login', { state: { from: location }, replace: true })
        }
      }
    }

    fetchNotifications()

    return ()=>{controller.abort();}

  }, [])

  return (
    <>
      <IconButton
        ref={anchorRef}
        color={open ? 'secondary' : 'primary'}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" width={20} height={20} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unattended notifications
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dotted' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {unReadNotification.map((notification) =>{
              if(count<6) {
                count+=1;
                return(<NotificationItem key={notification._id} date-id={notification._id} value={notification._id} notification={notification} onClick={()=>loadTimeline(notification.link)} />);
              }
              return null;
            }
            )}
          </List>

          {count<6 && (<List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Older
              </ListSubheader>
            }
          >
            {readNotification.map((notification) =>{
              if(count<6) {
                return (<NotificationItem key={notification._id} notification={notification} />);
              }
              return null;
            })}
          </List>)}
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button 
          fullWidth 
          disableRipple
          >
            View All
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    _id: PropTypes.string,
    isUnRead: PropTypes.bool,
    project: PropTypes.string,
    description: PropTypes.string,
    link: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func,
  }),
};

function NotificationItem({ notification , onClick}) {
  const { avatar, title } = renderContent(notification);
  
  const link = notification.link;
  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.project}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  if (notification.type === 'approved') {
    return {
      avatar: <img alt={notification.type} src="/static/icons/ic_notification_package.svg" />,
      title,
    };
  }
  if (notification.type === 'deadline_exceeded') {
    return {
      avatar: <img alt={notification.type} src="/static/icons/ic_notification_shipping.svg" />,
      title,
    };
  }
  if (notification.type === 'push_notification') {
    return {
      avatar: <img alt={notification.type} src="/static/icons/ic_notification_mail.svg" />,
      title,
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: <img alt={notification.type} src="/static/icons/ic_notification_chat.svg" />,
      title,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.type} src={notification.avatar} /> : null,
    title,
  };
}

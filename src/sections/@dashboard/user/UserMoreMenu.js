import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, FormControlLabel, Checkbox } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
// component
import Iconify from '../../../components/Iconify';

//-----------------------------------------------------------------------

const CHANGE_USER_ROLES_URL = "/users/changeRoles" 

// ----------------------------------------------------------------------
UserMoreMenu.propTypes = {
  userId: PropTypes.string.isRequired,
  // setRefreshKey: PropTypes.func.isRequired
};

export default function UserMoreMenu({ userId, setRefreshKeyFunc }) {
  const axios = useAxiosPrivate()
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [adminChecked, setAdminChecked] = useState(false)
  const [DIChecked, setDIChecked] = useState(false)
  const [CEChecked, setCEChecked] = useState(false)
  const [DIEChecked, setDIEChecked] = useState(false)
  const [MEChecked, setMEChecked] = useState(false)
  const [IEChecked, setIEChecked] = useState(false)
  const [EAChecked, setEAChecked] = useState(false)
  const [DmanDIEChecked, setDmanDIEChecked] = useState(false)
  const [DmanDIChecked, setDmanDIChecked] = useState(false)
  
  const handleDelete = () => {
    console.log("WWWWWWWWWWWWWWWW")
  }

  const handleUserRoleSubmit = async () => {
    let newRolesList = {}
    if (adminChecked) newRolesList = {...newRolesList, "Admin": 2000} 
    if (DIChecked) newRolesList = {...newRolesList, "DI": 2001} 
    if (CEChecked) newRolesList = {...newRolesList, "CE": 2002} 
    if (DIEChecked) newRolesList = {...newRolesList, "DIE": 2003} 
    if (MEChecked) newRolesList = {...newRolesList, "ME": 2004} 
    if (IEChecked) newRolesList = {...newRolesList, "IE": 2005} 
    if (EAChecked) newRolesList = {...newRolesList, "EA": 2006} 
    if (DmanDIEChecked) newRolesList = {...newRolesList, "DmanDIE": 2007} 
    if (DmanDIChecked) newRolesList = {...newRolesList, "DmanDI": 2008} 

    const resultRole = await axios.put(`${CHANGE_USER_ROLES_URL}/${userId}`,
      {
        newRolesList
      },
      {
        withCredentials: true
      });
    // console.log(resultRole);
    setAdminChecked(false)
    setDIChecked(false)
    setCEChecked(false)
    setDIEChecked(false)
    setMEChecked(false)
    setIEChecked(false)
    setEAChecked(false)
    setDmanDIEChecked(false)
    setDmanDIChecked(false)

    setIsOverlayOpen(false)
    setIsOpen(false)
    setRefreshKeyFunc()
    
    // window.location.reload(false);
}

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }} onClick={() => setIsOverlayOpen(true)}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit user roles" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <Dialog
          open={isOverlayOpen}
          onClose={() => setIsOverlayOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Change the user roles"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <FormControlLabel
                control={
                  <Checkbox onChange={() => setAdminChecked(!adminChecked)} />
                }
                label="Admin"
              />
              <FormControlLabel
                control={
                  <Checkbox onChange={() => setDIChecked(!DIChecked)} />
                }
                label="DI"
              />
              <FormControlLabel
                control={
                  <Checkbox onChange={() => setCEChecked(!CEChecked)} />
                }
                label="CE"
              />
              <FormControlLabel
                control={
                  <Checkbox onChange={() => setDIEChecked(!DIEChecked)} />
                }
                label="DIE"
              />
              <FormControlLabel
                control={
                  <Checkbox onChange={() => setMEChecked(!MEChecked)} />
                }
                label="ME"
              />
              <FormControlLabel
                control={
                  <Checkbox onChange={() => setIEChecked(!IEChecked)} />
                }
                label="IE"
              /><FormControlLabel
                control={
                  <Checkbox onChange={() => setEAChecked(!EAChecked)} />
                }
                label="EA"
              />
              <FormControlLabel
                control={
                  <Checkbox onChange={() => setDmanDIChecked(!DmanDIChecked)} />
                }
                label="DmanDI"
              />
              <FormControlLabel
                control={
                  <Checkbox onChange={() => setDmanDIEChecked(!DmanDIEChecked)} />
                }
                label="DmanDIE"
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsOverlayOpen(false)}>Cancel</Button>
            <Button onClick={() => handleUserRoleSubmit()} autoFocus>
              Change
            </Button>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
}

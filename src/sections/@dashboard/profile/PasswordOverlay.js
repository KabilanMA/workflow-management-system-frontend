import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {toast} from "react-toastify";

// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, FormControlLabel, Checkbox, InputAdornment, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Iconify from '../../../components/Iconify';
// component

//-----------------------------------------------------------------------

const CHANGE_PASSWORD_URL = "/users/password" 

const toastInfo = {
  toastId: "1",position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: 0,
}

// ----------------------------------------------------------------------

export default function PasswordOverlay() {
    const storageData = JSON.parse(localStorage.getItem('user'))
    const id = storageData?.id;
    const [oldpassword, setOldPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const axios = useAxiosPrivate()
    const ref = useRef(null);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  

  const handleSubmit = async () => {

    const response = axios.patch(`${CHANGE_PASSWORD_URL}/${id}`,
      {
        oldpwd:oldpassword,
        newpwd:newpassword
      },
      {
        withCredentials: true
      }).then((res)=>{
        toast.dismiss();
        if(res?.status===200){
          toast.success('Password changed successfully');
        }else {
          toast.warn('Password not changed successfully');
        }
        setIsOverlayOpen(false);
      }).catch((err)=>{
        toast.dismiss();
        if(err?.response?.status === 406){
          toast.error('Wrong Password')
        }
        setIsOverlayOpen(false);
      });

    toast.info("Wait until change", toastInfo);
}

  return (
    <>
      <Button ref={ref} onClick={() => setIsOverlayOpen(true)} autoFocus>
        Change Password
      </Button>
        <Dialog
          open={isOverlayOpen}
          onClose={() => setIsOverlayOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Change password"}
          </DialogTitle>
          <DialogContent>
            <TextField 
                type={showOldPassword ? 'text': 'password'} 
                label='Old Password' 
                fullWidth
                margin="dense"
                onChange={(e)=>setOldPassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowOldPassword(!showOldPassword)} edge="end">
                          <Iconify icon={showOldPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
            />
            <TextField 
                type={showNewPassword ? 'text': 'password'} 
                label='New Password'
                fullWidth
                margin="dense"
                onChange={(e)=>setNewPassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                          <Iconify icon={showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setIsOverlayOpen(false)}>Cancel</Button>

            <Button onClick={() => handleSubmit()} autoFocus>
              Change
            </Button>

          </DialogActions>
        </Dialog>
    </>
  );
}

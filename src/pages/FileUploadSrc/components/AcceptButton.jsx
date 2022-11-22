import { useState } from "react";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import {ToastContainer,toast} from 'react-toastify';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';


const AcceptButton = () => {
  const CommenMailR=`/fileUpload/commentMail`;
  const axios = useAxiosPrivate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [comment, setComment] = useState("");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const submitter=async()=>{
    const controller = new AbortController();
    try {
      await axios.post(CommenMailR,{commentB:comment} ,{
        signal: controller.signal,
        withCredentials: true
      }).then(()=>{
        toast.success("Commented Via Email");
      });
      
  }
  catch(err){
    console.log(err);
  }
}

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
    const [accept, setAccept] = useState(0);
    const [decline, setDecline] = useState(0);
    const handleAcceptClick = () => {
      setAccept(1);
      setDecline(0);
    };
    const handleDeclineClick = () => {
      setDecline(1);
      setAccept(0);
    };
    
    
    return (
      <div>
<Button onClick={handleAcceptClick} variant="outlined" size="sm"
color={(accept) ? "success" :"primary"}>
{/* onClick={()=>updateAcceptance(row.fileTermID,row.fileURL,row.accceptance)} */}
{/* onClick={()=>updateAcceptance(row.fileTermID,row.fileURL,row.accceptance)} */}
{(accept===1)?"Accepted":"Accept"}
</Button>
<Button onClick={handleDeclineClick} variant="outlined" size="sm"
color={(decline) ? "error" :"primary"}>
{/* onClick={()=>updateAcceptance(row.fileTermID,row.fileURL,row.accceptance)} */}
{/* onClick={()=>updateAcceptance(row.fileTermID,row.fileURL,row.accceptance)} */}
{(decline===1)?"Declined":"Decline"}
</Button>



      <Button aria-describedby={id} size="sm" variant="outlined"  onClick={handleClick} >
        Comment
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
         <Box
         style={{backgroundColor: "#eeeeee"}}
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
      
      
      id="outlined-basic" label="Comment" variant="outlined"   error={comment.length === 0}
      helperText={!comment.length ? 'comment is required' : ''}
      value={comment}
      onChange={(e) => {
        setComment(e.target.value);
      }}/>
      <Fab onClick={()=>submitter()}  >
      <SendIcon />
      </Fab>
    </Box>
      </Popover>
   
{/* <Button variant="outlined" endIcon={<SendIcon />}>
Comment
</Button> */}
</div>)
}
 
export default AcceptButton;
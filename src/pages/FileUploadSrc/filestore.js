import * as React from 'react';
import { styled } from '@mui/material/styles';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import Button from '@mui/material/Button';
import CloudDownloadSharpIcon from '@mui/icons-material/CloudDownloadSharp';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {ToastContainer,toast} from 'react-toastify'
import { Link as RouterLink, useNavigate, useLocation,useParams } from 'react-router-dom';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';



export default function CustomizedTables() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: { 
      backgroundColor: theme.palette.getContrastText(theme.palette.primary.light),
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


const createData = (subtaskTitle,fileName,UploadDate)=> {
  return {subtaskTitle,fileName,UploadDate}

}

const navigate = useNavigate();
const location = useLocation();
const axios = useAxiosPrivate();
const GETFILESURL=`/fileUpload/multiple`;
const [isLoading, setIsLoading] = useState(true);
const [data, setdata] = useState([]);


useEffect(() => {
 
  let isMounted = true
  const controller = new AbortController();

  const fetchData = async () => {
    try {

      const uploadedFilesData = await axios.get(GETFILESURL, {
        signal: controller.signal,
        withCredentials: true
      });
      const rows=[]
      uploadedFilesData.data.forEach((uplodingTerm, index) => {

        Object.keys(uplodingTerm.files).forEach(async file => {
          rows.push(createData(uplodingTerm.title,(uplodingTerm.files[file]).fileName,uplodingTerm.createdAt))
         
        })})
      setdata(rows)

      if (true) {

        setIsLoading(false)
      }
      
    } catch (err) {
      console.error("ERROR IN USEEFFECT : ")
      console.log(err)
      if (err. uploadedFilesData?.status === 204) { // No content
        toast.error("No Uploaded Files yet");
      } else {
        console.log("BBBBBBBBBBB");
        navigate('/login', { state: { from: location }, replace: true })
      }
    }
  }

  fetchData();

  return () => {
    
    console.log(data);
    isMounted = false;
    controller.abort();
  }
}, [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
          <TableRow>
            <StyledTableCell align="right" >FileName</StyledTableCell>
            <StyledTableCell align="right">Author</StyledTableCell>
            <StyledTableCell align="right">Upload Date</StyledTableCell>
            <StyledTableCell align="right">Acceptance</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {!isLoading && data.map((row,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                < CloudDownloadSharpIcon/>
                <p>jsdcdgwggu</p>
                {row.fileName}
              </StyledTableCell>
              
              <StyledTableCell align="right">Nandana Bandara</StyledTableCell>
              <StyledTableCell align="right">{row.UploadDate}</StyledTableCell>
              <StyledTableCell align="right">
              <Stack direction="row" spacing={2}>
      <Button variant="outlined" startIcon={<CheckSharpIcon />}>
        Accept
      </Button>
      <Button variant="contained" endIcon={<SendIcon />}>
        Comment
      </Button>
    </Stack>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" disableElevation>
      Add Extra Files
    </Button>
    </TableContainer>
  );
}

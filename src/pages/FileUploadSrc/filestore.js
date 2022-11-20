import * as React from 'react';
import { styled } from '@mui/material/styles';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import Button from '@mui/material/Button';
import CloudDownloadSharpIcon from '@mui/icons-material/CloudDownloadSharp';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { makeStyles } from '@material-ui/core/styles';
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
import { Link , useNavigate, useLocation,useParams } from 'react-router-dom';
import { fDateTime } from '../../utils/formatTime';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';




// let USERS = [], STATUSES = ['Active', 'Pending', 'Blocked'];
// for(let i=0;i<14;i++) {
//   USERS[i] = {
//       name: faker.name.findName(),
//       email: faker.internet.email(),
//       phone: faker.phone.phoneNumber(),
//       jobTitle: faker.name.jobTitle(),
//       company: faker.company.companyName(),
//       joinDate: faker.date.past().toLocaleDateString('en-US'),
//       status: STATUSES[Math.floor(Math.random() * STATUSES.length)]
//   }
// }







function MTable() {
  const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
  }));
  const createData = (fileTermID,subtaskTitle,fileName,UploadDate,author,accceptance,comment,fileURL)=> {
    return {fileTermID,subtaskTitle,fileName,UploadDate,author,accceptance,comment,fileURL}
  
  }
  const AcceptChangeURL=`/fileUpload/stateA`;
  const [accept, setAccept] = useState();
  const[comment,setComment]=useState();
  const updateAcceptance=async(fID,cloudI)=>{
    // setAccept(!acceptance);
    const controller = new AbortController();
    try {
  
      const uploadedFilesData = await axios.put(AcceptChangeURL,{ftID:fID,cloudId:cloudI} ,{
        signal: controller.signal,
        withCredentials: true
      });
    }

  catch(err){
    console.log(err);
  }
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
        uploadedFilesData?.data.forEach((uplodingTerm, index) => {
  
          Object.keys(uplodingTerm.files).forEach(async file => {
            // subtaskTitle,fileName,UploadDate,author,accceptance,comment,fileURL

            rows.push(createData(uplodingTerm._id,uplodingTerm.title,(uplodingTerm.files[file]).fileName,uplodingTerm.createdAt,uplodingTerm.author,(uplodingTerm.files[file]).acceptance,(uplodingTerm.files[file]).comment,(uplodingTerm.files[file]).fileURL))
           
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
      console.log("exit");
      console.log(data);
      isMounted = false;
      controller.abort();
    }
  }, []);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table  className={classes.table} aria-label="simple table">
      <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>FileName</TableCell>
            <TableCell className={classes.tableHeaderCell}>Author</TableCell>
            {/* <TableCell className={classes.tableHeaderCell}>JobRole</TableCell> */}
            <TableCell className={classes.tableHeaderCell}>Uploaded Date|Time</TableCell>
            <TableCell className={classes.tableHeaderCell}>Acceptance</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {!isLoading && data.map((row,index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
              <a href={row.fileURL}>< CloudDownloadSharpIcon/></a>
                {row.fileName}
              </TableCell>
              
              <TableCell >{row.fileTermID}</TableCell>
              <TableCell >{fDateTime(row.UploadDate)}</TableCell>
              <TableCell>
              <Stack direction="row" spacing={2}>
      <Button onClick={()=>updateAcceptance(row.fileTermID,row.fileURL,row.accceptance)}  variant="outlined" startIcon={<CheckSharpIcon />}>
      {/* onClick={()=>updateAcceptance(row.fileTermID,row.fileURL,row.accceptance)} */}
        Accept
      </Button>
      <Button variant="contained" endIcon={<SendIcon />}>
        Comment
      </Button>
    </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" disableElevation>
      Add Extra Files
    </Button>
    </TableContainer>
  );
}
  
export default MTable;

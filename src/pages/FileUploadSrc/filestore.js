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
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { useEffect, useState } from 'react';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import {ToastContainer,toast} from 'react-toastify'
import { Link as RouterLink, useNavigate, useLocation,useSearchParams } from 'react-router-dom';
import { fDateTime } from '../../utils/formatTime';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import account from '../../_mock/account';
import AccecptButton from './components/AcceptButton';
// import DeclineButton from './components/DeclineButton';

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
  const ROLES_LIST = {
    "Admin": "2000",
    "DI": "2001",
    "CE": "2002",
    "DIE": "2003",
    "ME": "2004",
    "IE": "2005",
    "EA": "2006",
    "DmanDIE": "2007",
    "DmanDI": "2008"
}
  function getObjKey(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value);
  }
  const userID=account.userId;
  const loggedEmail=account.email;
  // const loggedRole=getObjKey(ROLES_LIST,((account.roles)[0]).toString());
  const loggedRole=(account.roles)[0]
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("subtask");
  const st=searchParams.get("st");
  console.log(id);

  const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 850
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

  const AcceptChangeURL=`/fileUpload/stateA`;

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
  const GETFILESURL=`/fileUpload/multiple/${id}`;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setdata] = useState([]);
  const toWorkArea=`/dashboard/WorkArea?id=${id}&st=${st}`;
  const toStr=`/dashboard/subtask?id=${id}`;
 
  const createData = (fileTermID,subtaskTitle,fileName,UploadDate,author,accceptance,comment,fileURL,role,userID,Cid)=> {
    return {fileTermID,subtaskTitle,fileName,UploadDate,author,accceptance,comment,fileURL,role,userID,Cid}
  
  }
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
        console.log(uploadedFilesData);
        uploadedFilesData?.data.forEach((uplodingTerm, index) => {
  
          Object.keys(uplodingTerm.files).forEach(async file => {
            // subtaskTitle,fileName,UploadDate,author,accceptance,comment,fileURL

            rows.push(createData(uplodingTerm._id,uplodingTerm.title,(uplodingTerm.files[file]).fileName,uplodingTerm.createdAt,(uplodingTerm.files[file]).author,(uplodingTerm.files[file]).acceptance,(uplodingTerm.files[file]).comment,(uplodingTerm.files[file]).fileURL,getObjKey(ROLES_LIST,(uplodingTerm.files[file]).roles ),(uplodingTerm.files[file]).userID,(uplodingTerm.files[file]).cloudinary_id
            ))
           
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

  const condiRender=(Cid,rolE,uID)=>{
    const r=Number(ROLES_LIST[rolE]);
    console.log(r);
    console.log(loggedRole);
    if((r<loggedRole)){
      return(
        <TableCell>
        <Stack direction="row" spacing={2}>
<AccecptButton/>
</Stack>
        </TableCell>
      )
    }
  }
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table  className={classes.table} aria-label="simple table">
      <Stack direction="row" spacing={1}>
      <Chip
        avatar={<Avatar alt="Natacha" src="https://cdn.vectorstock.com/i/1000x1000/88/73/colorful-briefcase-icon-in-modern-flat-style-vector-11648873.webp" />}
        label={st}
        variant="outlined"
      />
    </Stack>
      <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>FileName</TableCell>
            <TableCell className={classes.tableHeaderCell}>Author</TableCell>
            <TableCell className={classes.tableHeaderCell}>Position</TableCell>
            {/* <TableCell className={classes.tableHeaderCell}>JobRole</TableCell> */}
            <TableCell className={classes.tableHeaderCell}>Uploaded Date|Time</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {!isLoading && data.map((row,index) => 
            <TableRow key={index}>
              <TableCell component="th" scope="row">
              <a href={row.fileURL}>< CloudDownloadSharpIcon/></a>
                {row.fileName}
              </TableCell>
              <TableCell >{row.author}</TableCell>
              <TableCell >{row.role}</TableCell>
              <TableCell >{fDateTime(row.UploadDate)}</TableCell>
              {condiRender(row.Cid,row.role,row.userID)}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Button  to={toStr} component={RouterLink} color="warning" variant="outlined"  style={{float: 'right' }} startIcon={<BeenhereIcon/>}>
  Complete Task
</Button>
<Button to={toWorkArea} component={RouterLink} color="success" variant="outlined"  style={{float: 'left' }} startIcon={<AddIcon/>}>
  Add Files
</Button>
    </TableContainer>
  );
}
  
export default MTable;

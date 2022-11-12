/* eslint-disable consistent-return */
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { errorToast } from '../components/Toasts';
// mock
// import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------
const GET_USERS_URL = '/users'
const CHANGE_USER_STATUS_URL = '/users/changeStatus'

const TABLE_HEAD = [
  { id: 'fullname', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'roles', label: 'Roles', alignRight: false },
  { id: 'userStatus', label: 'Status', alignRight: false },
  { id: 'changeUserStatus', label: 'Change status',  alignRight: false},
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (orderBy === 'status') {
    a = a.toString()
    b = b.toString()
  }
  if (orderBy === 'roles') {
    let aRolesString = ''
    let bRolesString = ''
    
    if(a.roles === undefined || b.roles === undefined) return

    Object.keys(a.roles).forEach(role => {
      aRolesString = `${aRolesString}, ${role}`
    })
    aRolesString = aRolesString.slice(1).toLowerCase()

    Object.keys(b.roles).forEach(role => {
      bRolesString = `${bRolesString}, ${role}`
    })
    bRolesString = bRolesString.slice(1).toLowerCase()
    return aRolesString.localeCompare(bRolesString)
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.firstname.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {

  const axios = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [USERLIST, setUSERLIST] = useState([])
  const [isLoading, setIsLoading]= useState(true)
  const [refreshKey, setRefreshKey] = useState(0);
  // const [changedUserStatus]

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const fetchUsers = async () => {
      try {
        const usersData = await axios.get(GET_USERS_URL, {
          signal: controller.signal,
          withCredentials: true
        }); 
        
        if (isMounted) {
          const tempUserList = usersData.data.map(userObject => {
            const fn = userObject.firstname
            let ln = userObject.lastname
            if (ln === undefined) ln = ""

            const fullname = `${fn} ${ln}`
            const newUserObject = {...userObject, fullname}
            return newUserObject
          })
          setUSERLIST(tempUserList)
          setIsLoading(false)
        }

      } catch (err) {
        console.error("ERROR IN USEEFFECT : ")
        console.log(err)
        if (err.usersData?.status === 204) { // No content
          errorToast("No User data currently avaiable")
        } else {
          console.log("BBBBBBBBBBB")
          navigate('/login', { state: { from: location }, replace: true })
        }
      }
    }

    fetchUsers()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [refreshKey, UserMoreMenu])
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event, _id) => {
  //   const selectedIndex = selected.indexOf(_id);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, _id);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
  //   }
  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const getUserStatusColor = (userStatus) => {
    if (userStatus === 0) return "warning"
    if (userStatus === 1) return "success"
    return 'error'
  }

  const getSelectMenuItems = (currentUserStatus, userId) => {
    if (currentUserStatus === 0) // currently pending for approval 
      return (
          <Select
            labelId="change-user-status-select-label"
            id="demo-user-status-select"
            value={currentUserStatus}
            label="User status"
            onChange={(e) => handleSelectUserStatusChange(e, userId)}
          >
          <MenuItem value={0}>
            <Label variant="ghost"> </Label>
          </MenuItem>
          <MenuItem value={-1}>
            <Label variant="ghost" color={"error"}>
              Delete
            </Label>
          </MenuItem>
          <MenuItem value={1}>
            <Label variant="ghost" color={"success"}>
              Approve
            </Label>
          </MenuItem>
          </Select>
      )
    if (currentUserStatus === 1) // currently a Active User
      return (
          <Select
            labelId="change-user-status-select-label"
            id="demo-user-status-select"
            value={currentUserStatus}
            label="User status"
            onChange={(e) => handleSelectUserStatusChange(e, userId)}
          >
          <MenuItem value={1}>
            <Label variant="ghost" > </Label>
          </MenuItem>
          <MenuItem value={-1}>
            <Label variant="ghost" color={"error"}>
              Delete
            </Label>
          </MenuItem>
          <MenuItem value={0}>
            <Label variant="ghost" color={"warning"}>
              Unapprove
            </Label>
          </MenuItem>
          </Select>
      )
    if (currentUserStatus === -1) // currently a deleted user 
      return (
        <Select
          labelId="change-user-status-select-label"
          id="demo-user-status-select"
          value={currentUserStatus}
          label="User status"
          onChange={(e) => handleSelectUserStatusChange(e, userId)}
        >
          <MenuItem value={-1}>
            <Label variant="ghost" > </Label>
          </MenuItem>
          <MenuItem value={1}>
            <Label variant="ghost" color={"success"}>
              Make active
            </Label>
          </MenuItem>
        </Select>
      )
  }

  const  handleSelectUserStatusChange = async (e, userId) => {
    const newUserStatus = e.target.value.toString()
    const usersData = await axios.put(`${CHANGE_USER_STATUS_URL}/${userId}`, 
      {
        newUserStatus
      },
      {
        withCredentials: true
      });
    setRefreshKey(oldKey => oldKey +1)
    // window.location.reload(false);
  }

  const setRefreshKey2 = () => {
    console.log(refreshKey)
    setRefreshKey(oldKey => oldKey + 1)
    console.log(refreshKey)
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  let filteredUsers = []
  if (!isLoading) {
    filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);
  }

  const isUserNotFound = filteredUsers.length === 0;

  return ( !isLoading &&
    <Page title="All-Users">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            All-Users
          </Typography>
          {/* <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  // asc or desc 
                  order={order}
                  // orderby name or role or etc.
                  orderBy={orderBy}
                  // all the table header names
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {!isLoading && filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    let { _id, firstname, lastname, email, roles, userStatus } = row;
                    let userStatusString = "active"  
                    let rolesString = ""               
                    if (userStatus === -1) userStatusString = "deleted"
                    if (userStatus === 0) userStatusString = "pending"
                    if (!_id) _id = ""
                    if (!firstname) firstname = ""
                    if (!lastname) lastname = ""
                    if (!email) email = ""
                    if (typeof userStatus === "undefined") userStatus = "NA"
                    if (!roles) roles = []
                    else {
                      Object.keys(roles).forEach((role, roleNumber) => {
                        rolesString = `${rolesString}, ${role}`
                      })
                      rolesString = rolesString.slice(1)
                    }
                    const isItemSelected = selected.indexOf(_id) !== -1;

                    return (
                      <TableRow
                        hover
                        key={_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          {/* <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, _id)} /> */}
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* <Avatar alt={name} src={avatarUrl} /> */}
                            <Typography variant="subtitle2" noWrap>
                              {`${firstname} ${lastname}`}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">{rolesString}</TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={getUserStatusColor(userStatus)}>
                            {sentenceCase(userStatusString)}
                          </Label>
                        </TableCell>

                        <TableCell align="left">
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-simple-select-label">Change to:</InputLabel>
                              {getSelectMenuItems(userStatus, _id)}
                          </FormControl>
                        </TableCell>                         

                        <TableCell align="right">
                          <UserMoreMenu userId={_id} setRefreshKeyFunc={setRefreshKey2}/>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}

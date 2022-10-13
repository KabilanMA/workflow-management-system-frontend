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

const TABLE_HEAD = [
  { id: 'fullname', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'roles', label: 'Roles', alignRight: false },
  { id: 'userStatus', label: 'Status', alignRight: false },
  { id: '' },
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
  }, [])
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

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

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
          <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button>
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
                    if (userStatus === 0) userStatusString = "deleted"
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
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, _id)} />
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
                          <Label variant="ghost" color={(userStatus === 0 && 'error') || 'success'}>
                            {sentenceCase(userStatusString)}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <UserMoreMenu />
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

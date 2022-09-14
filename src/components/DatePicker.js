// import { useState } from 'react';

// import dayjs from 'dayjs';

// import Stack from '@mui/material/Stack';
// import TextField from '@material-ui/core/TextField';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';


// export default function DatePickers(props) {
//     const [value, setValue] = useState(dayjs('1999-03-25T21:11:54'));
//     const onChange = props.onChange

//     return (
//     //    <input type='date' onChange={onChange} value={value}/>
//         <LocalizationProvider 
//             dateAdapter={AdapterDayjs}
//             value={value}
//         >
//             <MobileDatePicker
//                 label='Deadline date'
//                 inputFormat='MMM/DD/YYYY'
//                 value={value}
//                 onChange={(event, newValue) => {
//                     setValue(newValue);
//                     onChange(newValue);
//                 }}
//                 renderInput={(params) =>{ 
//                     return(
//                     <TextField
//                         variant='outlined'
//                         size='small'
//                         {...params} 
//                     />)}
//                 }
//             />
//         </LocalizationProvider>

//     );
// }
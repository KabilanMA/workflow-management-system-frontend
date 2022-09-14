import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import { styled } from '@mui/material/styles';
import { Autocomplete, InputAdornment, Popper, TextField } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const PopperStyle = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '320px !important',
});

// ----------------------------------------------------------------------

EmployeeSearch.propTypes = {
  employees: PropTypes.array.isRequired,
};

export default function EmployeeSearch({ employees, onChange}) {
  const [value, setValue] = useState(null);
  return (
    <Autocomplete
      sx={{ mb: 2, width: 320 }}
      autoHighlight
      popupIcon={null}
      onChange={(event, newInputValue)=>{
        setValue(newInputValue);
        onChange(newInputValue);
      }}
      value={value}
      PopperComponent={PopperStyle}
      options={employees}
      getOptionLabel={(employee) => {
        return employee.firstname;
      }}
      
      isOptionEqualToValue={(option, value) => option._id === value._id}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Assign Employee..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}

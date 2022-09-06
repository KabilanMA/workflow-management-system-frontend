import PropTypes from 'prop-types';

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

export default function EmployeeSearch({ employees, other }) {
  console.log(other);
  return (
    <Autocomplete
      sx={{ mb: 2, width: 320 }}
      autoHighlight
      popupIcon={null}
      PopperComponent={PopperStyle}
      options={employees}
      getOptionLabel={(employee) => employee.Name}
      isOptionEqualToValue={(option, value) => option.empId === value.empId}
      renderInput={(params) => (
        <TextField
          {...params}
          {...other}
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

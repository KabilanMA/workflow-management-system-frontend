import PropTypes from 'prop-types';
// material
import { MenuItem, TextField } from '@mui/material';

// ----------------------------------------------------------------------

SelectTextField.propTypes = {
  options: PropTypes.array,
  label: PropTypes.string
};

export default function SelectTextField({ options, label, value, onChange}) {
  return (
    <TextField 
        select 
        size="small"
        label= {label}
        value={value}
        onChange={onChange}
    >
      {options.map((option, i) => (
        <MenuItem key={i} value={option.name}>
          {option.name}
        </MenuItem>
        ))}
    </TextField>
  );
}

// import PropTypes from 'prop-types';

// import TextField from "@material-ui/core/TextField";
// import CurrencyInput from 'react-currency-input-field';

// // CurrencyInputField.propTypes = {
// //     name: PropTypes.string.isRequired,
// //   };

// export default function CurrencyInputField(props) {
//     return (
//         <CurrencyInput
//             {...props}
//         />
//     );
// }

import { useState } from "react";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

// CurrencyTextField.propTypes = {
//     onChange: PropTypes.func.isRequired,
// }

export default function CurrencyInputField(props) {

  const [value, setValue] = useState(props.value);

  return (
    <CurrencyTextField
      variant="outlined"
      value={value}
      decimalCharacter="."
      minimumValue="0"
      digitGroupSeparator=","
      currencySymbol="Rs."
      outputFormat="number"
      onChange={props.onChange}
      label={props.label}
    />
  );
}

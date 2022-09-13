import React from "react";
import ReactDOM from "react-dom";
import { withStyles, MenuItem } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import { blue, grey } from "@material-ui/core/colors";
import CurrencyInput from 'react-currency-input-field';
import CurrencyInputField from "../../../components/CurrencyInputField";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  primaryColor: {
    color: blue[900]
  },
  secondaryColor: {
    color: grey[700]
  },

  padding: {
    padding: 0
  },
  mainHeader: {
    backgroundColor: grey[100],
    padding: 20,
    alignItems: "center"
  },
  mainContent: {
    padding: 40
  },
  secondaryContainer: {
    padding: "20px 25px",
    backgroundColor: grey[200]
  }
});
const countries = [
  {
    value: "USA",
    label: "USA"
  },
  {
    value: "EUR",
    label: "EUR"
  },
  {
    value: "BTC",
    label: "BTC"
  },
  {
    value: "JPY",
    label: "JPY"
  }
];

const taskCategory = [
  {
    label: "Dam Renovation"
  },
  {
    label: "Lake Restroration"
  }
];

function WireInfo(props) {
  const { classes, open, onClose } = props;
  const [values, setValues] = React.useState({
    shipping: "Cat in the Hat",
    country: "",
    city: "",
    state: "",
    postalCode: "",
    address: ""
  });

  return (
    <Dialog
      className={classes.root}
      fullWidth
      maxWidth="lg"
      open={open}
      onClose={() => onClose(false)}
    >
      <Grid item xs={12} align="right" className={classes.padding}>
        <IconButton
          edge="start"
          align="right"
          color="inherit"
          aria-label="Close"
          style={{ padding: 8 }}
          onClick={()=>onClose(false)}
        >
          <CloseIcon />
        </IconButton>
      </Grid>

      <DialogContent className={classes.padding}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container direction="row" className={classes.mainHeader}>
              <Grid item xs={8}>
                <Typography className={classes.primaryColor} variant="h5">
                  Add New Task
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              className={classes.mainContent}
              spacing={1}
            >
              
              <Grid item xs={12}>
                <TextField
                  style={{ marginBottom: 20 }}
                  fullWidth
                  select
                  margin="dense"
                  variant="outlined"
                  label="Category of Project"
                  defaultValue="None"
                  id="task-category"
                  required
                >
                  {(taskCategory.length === 0) && <MenuItem>None Present</MenuItem>}
                  {(taskCategory.length !== 0) && taskCategory.map((option, i) => (
                    <MenuItem key={i} value={i}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="dense"
                  multiline
                  minRows="6"
                  variant="outlined"
                  label="Description about the project"
                  id="description"
                />
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={10}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="Task 1"
                  id="task1"
                />
              </Grid>


              <Grid item xs={12}>
              <CurrencyInput
                id="input-example"
                name="input-name"
                placeholder="Please enter a number"
                defaultValue={0}
                decimalsLimit={2}
                onValueChange={(value, name) => console.log(value, name)}
                prefix="RS. "
              />
              </Grid>

              <Grid item xs={10}>
                <TextField
                  style={{ marginTop: 20 }}
                  label="Country"
                  fullWidth
                  select
                  variant="outlined"
                  value={values.country}
                  id="country"
                  margin="dense"
                  helperText="Please select your country"
                >
                  {countries.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="City"
                  id="city"
                />
              </Grid>
              <Grid item xs={7}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="State/Province"
                  id="state-province"
                />
              </Grid>

              <Grid item xs={7}>
                <CurrencyInputField 
                  id='currency'
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="Postal Code"
                  id="postal-code"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="Street Address"
                  id="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="dense"
                  multiline
                  minRows="5"
                  variant="outlined"
                  label="Additional Info"
                  id="additional-info"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default withStyles(styles)(WireInfo);

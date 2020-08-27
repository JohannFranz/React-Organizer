import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

function InputField(props) {
  const classes = useStyles();

  let value = "";
  if (props.value !== null) {
    value = props.value;
  }

  return (
    <TextField
      onInput={e => props.setInput(e.target.value)}
      id="outlined-required"
      label={props.label}
      defaultValue={value}
      className={classes.textField}
      margin="normal"
      variant="outlined"
    />
  );
}

function MultilineInputField(props) {
  const classes = useStyles();

  let value = "";
  if (props.value !== null) {
    value = props.value;
  }

  return (
    <TextField
      onInput={e => props.setInput(e.target.value)}
      id="outlined-multiline-static"
      label={props.label}
      multiline
      rows="4"
      defaultValue={value}
      className={classes.textField}
      margin="normal"
      variant="outlined"
    />
  );
}

function DateInputField(props) {
  const classes = useStyles();

  const convertDateToString = date => {
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    if (date.getMonth() < 9) {
      month = "0" + month;
    }
    if (date.getDate() < 10) {
      day = "0" + day;
    }
    return (
      date.getFullYear().toString() +
      "-" +
      month +
      "-" +
      day
    );
  };

  let value = "";
  if (props.value !== null) {
    value = convertDateToString(props.value);
  }

  return (
    <TextField
      onInput={e => props.setInput(e.target.value)}
      id="date"
      label={props.label}
      type="date"
      defaultValue={value}
      className={classes.textField}
      InputLabelProps={{
        shrink: true
      }}
    />
  );
}

function TimeInputField(props) {
  const classes = useStyles();

  const convertTimeToString = time => {
    let hours = time.getHours().toString();
    let minutes = time.getMinutes().toString();
    if (time.getHours() < 10) {
      hours = "0" + hours;
    }
    if (time.getMinutes() < 10) {
      minutes = "0" + minutes;
    }
    return hours + ":" + minutes;
  };

  let value = "";
  if (props.value !== null) {
    value = convertTimeToString(props.value);
  }

  return (
    <TextField
      onInput={e => props.setInput(e.target.value)}
      id="time"
      label={props.label}
      type="time"
      defaultValue={value}
      className={classes.textField}
      InputLabelProps={{
        shrink: true
      }}
    />
  );
}

export { TimeInputField, DateInputField, MultilineInputField, InputField };

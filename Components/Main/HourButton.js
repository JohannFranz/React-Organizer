import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles(theme => ({
  text: {
    paddingLeft: theme.spacing(4)
    //width: 200
  },
  button_normal: {
    paddingLeft: theme.spacing(4)
    //width: "100%",
    //width: 300
  },
  button_hasAppointment: {
    paddingLeft: theme.spacing(4)
    //width: 300,
    //height: 100
  }
}));

function SingleButton(props) {
  const [open, setOpen] = React.useState(false);
  const [hour, setHour] = React.useState(props.hour);
  //const [appointment, setAppointment] = React.useState(props.appointment);
  const handleClick = () => {
    setOpen(!open);
  };

  //If an appointment button is clicked, pass the id of the selected appointment for editing
  //Otherwise pass null, so a new appointment can be created
  const handleDoubleClick = () => {
    if (props.appointment !== null) {
      props.app_Function(hour, "hour", props.appointment);
    } else {
      props.app_Function(hour, "hour", null);
    }
  };

  let buttoncolor = "default";
  let clickEvent = null;
  let style = props.cls.button_normal;
  let buttontext = props.hour + " Uhr";
  let appointmentheader = null;
  let appointmenttext = null;
  if (props.appointment !== null) {
    buttoncolor = "primary";
    clickEvent = handleClick;
    style = props.cls.button_hasAppointment;
    let startApp = props.appointment.getStart();
    let endApp = props.appointment.getEnd();
    let zero = "";
    if (startApp.getMinutes() < 10) {
      zero = "0";
    }
    buttontext =
      startApp.getHours() + ":" + zero + startApp.getMinutes() + " bis ";
    if (endApp.getMinutes() < 10) {
      zero = "0";
    } else {
      zero = "";
    }
    buttontext += endApp.getHours() + ":" + zero + endApp.getMinutes();
    appointmentheader = props.appointment.getHeader();
    appointmenttext = props.appointment.getText();
  }
  return (
    <Paper style={{ width: "100%" }}>
      <Button
        fullWidth
        variant="contained"
        color={buttoncolor}
        className={style}
        onClick={clickEvent}
        onDoubleClick={handleDoubleClick}
      >
        {buttontext}
        <br />
        {appointmentheader}
      </Button>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={style}>
            <ListItemText primary={appointmenttext} />
          </ListItem>
        </List>
      </Collapse>
    </Paper>
  );
}

export default function HourButton(props) {
  const classes = useStyles();

  return (
    <Fragment>
      <ListItem style={{ justifyContent: "center" }}>
        <SingleButton
          cls={classes}
          hour={props.hour}
          appointment={props.appointment}
          app_Function={props.app_Function}
        />
      </ListItem>
    </Fragment>
  );
}

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
  },
  button_normal: {
    paddingLeft: theme.spacing(4)
    //width: 300
  },
  button_hasApppointment: {
    paddingLeft: theme.spacing(4)
    //width: 300,
    //height: 100
  }
}));

function SingleButton(props) {
  const [open, setOpen] = React.useState(false);
  const [day, setDay] = React.useState(props.day);
  const handleClick = () => {
    setOpen(!open);
  };

  //If an appointment button is clicked, pass the id of the selected appointment for editing
  //Otherwise pass null, so a new appointment can be created
  const handleDoubleClick = () => {
    if (props.appointment !== null) {
      props.app_Function(day, "day", props.appointment);
    } else {
      props.app_Function(day, "day", null);
    }
  };

  let buttoncolor = "default";
  let clickEvent = null;
  let style = props.cls.button_normal;
  let buttontext = "";
  if (props.show_Full_Date) {
    buttontext = props.day.getDate() + ". " + (props.day.getMonth() + 1) + ". ";
    buttontext +=
      "(" + props.day.toLocaleDateString("de-DE", { weekday: "long" }) + ")";
  } else {
    buttontext = props.day.toLocaleDateString("de-DE", { weekday: "long" });
  }

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
    //buttontext = props.start_hour + ":" + zero + props.start_minute + " bis ";
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

export default function DayButton(props) {
  const classes = useStyles();

  return (
    <Fragment>
      <ListItem style={{ justifyContent: "center" }}>
        <SingleButton
          appointment={props.appointment}
          cls={classes}
          day={props.day}
          app_Function={props.app_Function}
          show_Full_Date={props.show_Full_Date}
        />
      </ListItem>
    </Fragment>
  );
}

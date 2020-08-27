import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import HourButton from "./HourButton";
import List from "@material-ui/core/List";
import { AppointmentList } from "../../Classes/AppointmentList";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    //width: "100%"
    //maxWidth: 360
    //backgroundColor: theme.palette.background.paper
  },
  paper_appointment: {
    padding: theme.spacing(2),
    background: "#cfe8fc"
  },
  paper_default: {
    //width: "100%",
    padding: theme.spacing(2)
  }
}));

export default function HourList(props) {
  const classes = useStyles();

  const createListItems = () => {
    let items = [];

    var appointments = AppointmentList.getAppointmentsForDay();

    for (let i = 0; i < 24; i++) {
      items.push(
        <AppointmentPaper
          key={i}
          hour={i}
          app_Function={props.app_Function}
          appointments={appointments}
        />
      );
    }
    return items;
  };

  return (
    <List component="nav" className={classes.root}>
      {createListItems()}
    </List>
  );
}

function AppointmentPaper(props) {
  const classes = useStyles();

  let paperstyle = classes.paper_default;

  const createPaper = () => {
    let items = [];
    paperstyle = classes.paper_default;
    items.push(
      <HourButton
        key={-props.hour}
        appointment={null}
        hour={props.hour}
        app_Function={props.app_Function}
      />
    );
    //Loop through appointment array and get all appointments for current hour i
    for (let j = 0; j < props.appointments.length; j++) {
      let current = props.appointments[j];
      if (current.getStart().getHours() !== props.hour) {
        continue;
      }
      paperstyle = classes.paper_appointment;
      items.push(
        <HourButton
          key={current.getId()}
          hour={props.hour}
          appointment={current}
          app_Function={props.app_Function}
        />
      );
    }
    return <Paper className={paperstyle}>{items}</Paper>;
  };
  return createPaper();
}

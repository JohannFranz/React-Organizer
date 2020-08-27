import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DayButton from "./DayButton";
import List from "@material-ui/core/List";
import { AppointmentList } from "../../Classes/AppointmentList";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    //width: "100%",
    //maxWidth: 360
    //backgroundColor: theme.palette.background.paper
  },
  paper_appointment: {
    padding: theme.spacing(2),
    background: "#cfe8fc"
  },
  paper_default: {
    padding: theme.spacing(2)
  }
}));

export default function WeekList(props) {
  const classes = useStyles();

  //code from "https://medium.com/@quynh.totuan/how-to-get-the-current-week-in-javascript-9e64d45a9a08"
  const getCurrentWeek = () => {
    let curr = AppointmentList.getCurrentDate();
    let week = [];

    for (let i = 1; i <= 7; i++) {
      let first = null;
      if (curr.getDay() !== 0) {
        first = curr.getDate() - curr.getDay() + i;
      } else {
        first = curr.getDate() - curr.getDay() + i - 7;
      }
      let day = new Date(curr);
      day.setDate(first);
      week.push(day);
    }
    return week;
  };

  const createListItems = () => {
    let items = [];
    var appointments = AppointmentList.getAppointmentsForWeek();

    let week = getCurrentWeek();

    for (let i = 0; i < 7; i++) {
      items.push(
        <AppointmentPaper
          key={i}
          day={week[i]}
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
      <DayButton
        key={-props.day}
        appointment={null}
        day={props.day}
        show_Full_Date={false}
        app_Function={props.app_Function}
      />
    );
    //Loop through appointment array and get all appointments for current hour i
    for (let j = 0; j < props.appointments.length; j++) {
      let current = props.appointments[j];
      if (current.getStart().getDate() !== props.day.getDate()) {
        continue;
      }
      paperstyle = classes.paper_appointment;
      items.push(
        <DayButton
          key={current.getId()}
          appointment={current}
          day={props.day}
          show_Full_Date={false}
          app_Function={props.app_Function}
        />
      );
    }
    return <Paper className={paperstyle}>{items}</Paper>;
  };
  return createPaper();
}

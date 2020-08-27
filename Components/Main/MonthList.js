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

export default function MonthList(props) {
  const classes = useStyles();

  const getDaysInMonth = date => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getMonth = (date, countDays) => {
    let month = [];
    for (let i = 1; i <= countDays; i++) {
      let day = new Date(date.getFullYear(), date.getMonth(), i);
      month.push(day);
    }
    return month;
  };

  const createListItems = () => {
    let items = [];
    var appointments = AppointmentList.getAppointmentsForMonth();

    let countDays = getDaysInMonth(AppointmentList.getCurrentDate());
    let month = getMonth(AppointmentList.getCurrentDate(), countDays);

    for (let i = 0; i < countDays; i++) {
      items.push(
        <AppointmentPaper
          key={i}
          day={month[i]}
          appointments={appointments}
          app_Function={props.app_Function}
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
        day={props.day}
        appointment={null}
        show_Full_Date={true}
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
          show_Full_Date={true}
          app_Function={props.app_Function}
        />
      );
    }
    return <Paper className={paperstyle}>{items}</Paper>;
  };
  return createPaper();
}

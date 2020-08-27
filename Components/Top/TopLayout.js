import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import { AppointmentList } from "../../Classes/AppointmentList";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    display: "block",
    margin: theme.spacing(1),
    marginTop: theme.spacing(10),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function TopLayout(props) {
  const [currentWindowIndex, setCurrentWindowIndex] = React.useState(0);
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const classes = useStyles();

  var header = null;

  const handleViewMode = event => {
    props.index_Function(event.target.value);
    setCurrentWindowIndex(event.target.value);
  };

  const getHeader = () => {
    if (currentWindowIndex === 0) {
      header = currentDate.toLocaleDateString("de-DE", { weekday: "long" });
    } else if (currentWindowIndex === 1) {
      header = "Woche " + AppointmentList.getWeekNumber(currentDate)[1];
    } else if (currentWindowIndex === 2) {
      header = currentDate.toLocaleDateString("de-DE", { month: "long" });
    }
    return header;
  };

  const handleViewPrevious = () => {
    let changedDate = new Date(currentDate);
    if (currentWindowIndex === 0) {
      changedDate.setDate(currentDate.getDate() - 1);
      AppointmentList.setCurrentDate(changedDate);
      setCurrentDate(changedDate);
      props.index_Function(0);
    } else if (currentWindowIndex === 1) {
      changedDate.setDate(changedDate.getDate() - 7);
      AppointmentList.setCurrentDate(changedDate);
      setCurrentDate(changedDate);
      props.index_Function(1);
    } else if (currentWindowIndex === 2) {
      changedDate.setMonth(changedDate.getMonth() - 1);
      AppointmentList.setCurrentDate(changedDate);
      setCurrentDate(changedDate);
      props.index_Function(2);
    }
  };

  const handleViewNext = () => {
    let changedDate = new Date(currentDate);
    if (currentWindowIndex === 0) {
      changedDate.setDate(currentDate.getDate() + 1);
      AppointmentList.setCurrentDate(changedDate);
      setCurrentDate(changedDate);
      props.index_Function(0);
    } else if (currentWindowIndex === 1) {
      changedDate.setDate(changedDate.getDate() + 7);
      AppointmentList.setCurrentDate(changedDate);
      setCurrentDate(changedDate);
      props.index_Function(1);
    } else if (currentWindowIndex === 2) {
      changedDate.setMonth(changedDate.getMonth() + 1);
      AppointmentList.setCurrentDate(changedDate);
      setCurrentDate(changedDate);
      props.index_Function(2);
    }
  };

  return (
    <Fragment>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="View" />
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={currentWindowIndex}
          onChange={handleViewMode}
          style={{ width: "100%" }}
        >
          <MenuItem value={0}>Tag</MenuItem>
          <MenuItem value={1}>Woche</MenuItem>
          <MenuItem value={2}>Monat</MenuItem>
        </Select>
      </FormControl>

      <Grid container>
        <Grid item xs={3}>
          <Button variant="contained" onClick={handleViewPrevious}>
            &#171;
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">{getHeader()}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" onClick={handleViewNext}>
            &#187;
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
}

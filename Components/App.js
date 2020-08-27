import React, { Component } from "react";
import HourList from "./Main/HourList";
import WeekList from "./Main/WeekList";
import MonthList from "./Main/MonthList";
import TopLayout from "./Top/TopLayout";
import AppointmentView from "./Appointment/AppointmentView";
import { AppointmentList } from "../Classes/AppointmentList";
import GoogleAuth from "./GoogleAuth/GoogleAuth";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

class App extends Component {
  constructor(props) {
    super(props);
    this.setCurrentWindowIndex = this.setCurrentWindowIndex.bind(this);
    this.editAppointment = this.editAppointment.bind(this);
    this.saveAppointment = this.saveAppointment.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.closeAppointmentProcessing = this.closeAppointmentProcessing.bind(this);
    this.state = {
      /*currentWindowIndex: 0 - Day View
                        1 - Week View
                        2 - Month View
    */
      currentWindowIndex: 0,
      processAppointmnent: false,
      currentAppointment: null,
      timeValue: null,
      timeType: null
    };
  }

  getMainLayout() {
    if (this.state.currentWindowIndex === 0) {
      return <HourList app_Function={this.editAppointment} />;
    } else if (this.state.currentWindowIndex === 1) {
      return <WeekList app_Function={this.editAppointment} />;
    }
    return <MonthList app_Function={this.editAppointment} />;
  }

  getAppBar() {
    return (
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" style={{ textAlign: 'left', flexGrow: 1 }}>
            Personal Organizer
          </Typography>
          <Button color="inherit" onClick={this.logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    );
  }

  logout() {
    if(window.gapi.auth2) {
      window.gapi.auth2.getAuthInstance().signOut();
    }
  }

  onAuthInit() {
    AppointmentList.getAppointmentsFromServer();
  }

  setCurrentWindowIndex(index) {
    this.setState({
      currentWindowIndex: index
    });
  }

  editAppointment(value, type, appointment) {
    this.setState({
      processAppointmnent: true,
      currentAppointment: appointment,
      currentWindowIndex: 0,
      timeValue: value,
      timeType: type
    });
  }

  saveAppointment(appointment) {
    AppointmentList.saveAppointmentsToServer(appointment);
  }

  closeAppointmentProcessing() {
    this.setState({
      processAppointmnent: false,
      currentAppointment: null,
      currentWindowIndex: 0,
      timeValue: null,
      timeType: null
    });
  }

  deleteAppointment(appointment) {
    AppointmentList.deleteAppointmentFromServer(appointment);
  }

  render() {
    if (this.state.processAppointmnent === true) {
      return (
        <div className="App">
          <GoogleAuth onInit={this.onAuthInit}>
            {this.getAppBar()}
            <AppointmentView
              appointment={this.state.currentAppointment}
              timeValue={this.state.timeValue}
              timeType={this.state.timeType}
              saveAppointment={this.saveAppointment}
              deleteAppointment={this.deleteAppointment}
              closeProcessing={this.closeAppointmentProcessing}
            />
          </GoogleAuth>
        </div>
      );
    } else if (this.state.processAppointmnent === false) {
      return (
        <div className="App">
          <GoogleAuth onInit={this.onAuthInit}>
            {this.getAppBar()}
            <TopLayout index_Function={this.setCurrentWindowIndex} />
            {this.getMainLayout()}
          </GoogleAuth>
        </div>
      );
    }
  }
}

export default App;

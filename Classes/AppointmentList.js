import { Appointment } from "./Appointment";
import personalOrganizer from "../Api/personal-organizer";

class AppointmentList {
  //Holds information about the current date/week/month in the
  static currentDate = new Date();
  static appointments = [];

  static setCurrentDate(date) {
    this.currentDate = date;
  }

  static getCurrentDate() {
    return this.currentDate;
  }

  static formatDateTime(date) {
    let formattedDate = String(date.getFullYear()) + "-";

    if (date.getMonth() < 9) formattedDate += "0"
    formattedDate +=  String(date.getMonth() + 1) + "-";
    
    if (date.getDate() < 10) formattedDate += "0"
    formattedDate +=  String(date.getDate()) + "T";
    
    if (date.getHours() < 10) formattedDate += "0"
    formattedDate +=  String(date.getHours()) + ":";

    if (date.getMinutes() < 10) formattedDate += "0"
    formattedDate +=  String(date.getMinutes()) + ":";

    if (date.getSeconds() < 10) formattedDate += "0"
    formattedDate +=  String(date.getSeconds());
    return formattedDate;
  }

  static getAppointmentIndex(appointment) {
    let idx = -1;
    for (let i = 0; i < this.appointments.length; i++) {
      if (appointment.getId() === this.appointments[i].getId()) {
        idx = i;
        break;
      }
    }
    return idx;
  }

  static saveAppointmentsToServer(appointment) {
    if (appointment === null) return;

    if (appointment.getId() === null) {
      personalOrganizer.post('/appointments', {
        categoryId: 1,
        description: appointment.getText(),
        endDateTime: this.formatDateTime(appointment.getEnd()),
        repeatWeekly: false,
        notifications: [],
        startDateTime: this.formatDateTime(appointment.getStart()),
        title: appointment.getHeader()})
        .then(response => {
          let id = response.data.id;
          appointment.setId(id);
        })
        .catch(error => {
          console.log(error);
        });

        this.appointments.push(appointment);
    } else {
      let putString = "/appointments/" + String(appointment.getId());
      personalOrganizer.put(putString, {
        categoryId: 1,
        description: appointment.getText(),
        endDateTime: this.formatDateTime(appointment.getEnd()),
        repeatWeekly: false,
        notifications: [],
        startDateTime: this.formatDateTime(appointment.getStart()),
        title: appointment.getHeader()})
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });

        let idx = this.getAppointmentIndex(appointment);
        if (idx < 0) return;
        this.appointments[idx] = appointment;
    }
  }

  static deleteAppointmentFromServer(appointment) {
    if (appointment === null) return;

    let deleteString = "/appointments/" + String(appointment.getId());

    personalOrganizer.delete(deleteString)
      .then(response => {
        this.appointments = response.data.map(
          ({ id, title, description, startDateTime, endDateTime }) =>
            new Appointment(id, new Date(startDateTime), new Date(endDateTime), title, description)
        );
      })
      .catch(error => {
        console.log(error);
      });

    let idx = this.getAppointmentIndex(appointment);
    if (idx < 0) return;

    this.appointments.splice(idx, 1);
  }

  static getAppointmentsFromServer() {
    this.appointments = [];

    personalOrganizer.get('/appointments')
      .then(response => {
        this.appointments = response.data.map(
          ({ id, title, description, startDateTime, endDateTime }) =>
            new Appointment(id, new Date(startDateTime), 
			new Date(endDateTime), title, description)
        );
      })
      .catch(error => {
        console.log(error);
      });
  }

  static getAppointmentsForDay() {
    this.sortAppointments();
    let appointments = [];
    for (let i = 0; i < this.appointments.length; i++) {
      let app = this.appointments[i];
      let ndate = app.getStart();
      if (
        ndate.getDate() === this.currentDate.getDate() &&
        ndate.getMonth() === this.currentDate.getMonth() &&
        ndate.getFullYear() === this.currentDate.getFullYear()
      ) {
        appointments.push(app);
      }
    }
    return appointments;
  }

  static getAppointmentsForWeek() {
    this.sortAppointments();
    let appointments = [];
    for (let i = 0; i < this.appointments.length; i++) {
      let app = this.appointments[i];
      let ndate = app.getStart();
      if (
        this.getWeekNumber(ndate)[1] ===
          this.getWeekNumber(this.currentDate)[1] &&
        ndate.getFullYear() === this.currentDate.getFullYear()
      ) {
        appointments.push(app);
      }
    }
    return appointments;
  }

  static getAppointmentsForMonth() {
    this.sortAppointments();
    let appointments = [];
    for (let i = 0; i < this.appointments.length; i++) {
      let app = this.appointments[i];
      let ndate = app.getStart();
      if (
        ndate.getMonth() === this.currentDate.getMonth() &&
        ndate.getFullYear() === this.currentDate.getFullYear()
      ) {
        appointments.push(app);
      }
    }
    return appointments;
  }

  //bubble-sort implementation
  static sortAppointments() {
    for (let i = this.appointments.length; i > 1; --i) {
      for (let j = 0; j < i - 1; j++) {
        if (
          this.appointments[j].getStart().getHours() ===
          this.appointments[j + 1].getStart().getHours()
        ) {
          if (
            this.appointments[j].getStart().getMinutes() >
            this.appointments[j + 1].getStart().getMinutes()
          ) {
            let temp = this.appointments[j];
            this.appointments[j] = this.appointments[j + 1];
            this.appointments[j + 1] = temp;
          }
        }
      }
    }
  }

  //code from RobG - https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
  static getWeekNumber(day) {
    // Copy date so don't modify original
    day = new Date(Date.UTC(day.getFullYear(), day.getMonth(), day.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    day.setUTCDate(day.getUTCDate() + 4 - (day.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(day.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(((day - yearStart) / 86400000 + 1) / 7);
    // Return array of year and week number
    return [day.getUTCFullYear(), weekNo];
  }
}

export { AppointmentList };

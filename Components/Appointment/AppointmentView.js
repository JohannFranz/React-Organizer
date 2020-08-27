import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import { Appointment } from "../../Classes/Appointment";
import {
  InputField,
  MultilineInputField,
  DateInputField,
  TimeInputField
} from "./Inputs";

export default function AppointmentView(props) {
  let title = null;
  let start = null;
  let end = null;
  let text = null;

  if (props.appointment !== null) {
    title = props.appointment.getHeader();
    start = props.appointment.getStart();
    end = props.appointment.getEnd();
    text = props.appointment.getText();
  } else {
    start = new Date();
    end = new Date();
    if (props.timeType === "day") {
      start.setDate(props.timeValue.getDate());
      end.setDate(props.timeValue.getDate());
    } else if (props.timeType === "hour") {
      start.setHours(props.timeValue);
      end.setHours(props.timeValue + 1);
    }

    title = "";
    text = "";
  }

  const [titleInput, setTitleInput] = React.useState(null);
  const [textInput, setTextInput] = React.useState(null);
  const [startDateInput, setStartDateInput] = React.useState(null);
  const [startTimeInput, setStartTimeInput] = React.useState(null);
  const [endDateInput, setEndDateInput] = React.useState(null);
  const [endTimeInput, setEndTimeInput] = React.useState(null);

  const handleSaveAppointment = () => {
    let current = null;
    if (props.appointment === null) {
      current = new Appointment(null, null, null, null, null);
    } else {
      current = props.appointment;
    }

    if (titleInput !== null) {
      current.setHeader(titleInput);
    }

    if (textInput !== null) {
      current.setText(textInput);
    }

    if (startDateInput !== null) {
      let splitDate = startDateInput.split("-");
      start.setFullYear(parseInt(splitDate[0], 10));
      start.setMonth(parseInt(splitDate[1], 10) - 1);
      start.setDate(parseInt(splitDate[2], 10));
    }
    if (startTimeInput !== null) {
      let splitTime = startTimeInput.split(":");
      start.setHours(parseInt(splitTime[0], 10));
      start.setMinutes(parseInt(splitTime[1], 10));
    }
    if (endDateInput !== null) {
      let splitDate = endDateInput.split("-");
      end.setFullYear(parseInt(splitDate[0], 10));
      end.setMonth(parseInt(splitDate[1], 10) - 1);
      end.setDate(parseInt(splitDate[2], 10));
    }
    if (endTimeInput !== null) {
      let splitTime = endTimeInput.split(":");
      end.setHours(parseInt(splitTime[0], 10));
      end.setMinutes(parseInt(splitTime[1], 10));
    }
    current.setStart(start);
    current.setEnd(end);

    props.saveAppointment(current);
    props.closeProcessing();
  };

  const handleCancel = () => {
    props.saveAppointment(null);
    props.closeProcessing();
  };

  const handleDeleteAppointment = () => {
    props.deleteAppointment(props.appointment);
    props.closeProcessing();
  };

  

  return (
    <Fragment>
      <div style={{ marginTop: '80px' }}>
        <InputField setInput={setTitleInput} label={"Titel"} value={title} />
        <br />
        <DateInputField
          setInput={setStartDateInput}
          label={"Start-Datum"}
          value={start}
        />
        <br />
        <TimeInputField
          setInput={setStartTimeInput}
          label={"Start-Zeit"}
          value={start}
          endTime={false}
        />
        <br />
        <DateInputField
          setInput={setEndDateInput}
          label={"End-Datum"}
          value={end}
        />
        <br />
        <TimeInputField
          setInput={setEndTimeInput}
          label={"End-Zeit"}
          value={end}
          endTime={true}
        />
        <br />
        <MultilineInputField
          setInput={setTextInput}
          label={"Text"}
          value={text}
        />
      </div>

      <div>
        <Button variant="contained" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSaveAppointment}>
          Save
        </Button>
        <Button variant="contained" onClick={handleDeleteAppointment}>
          Delete
        </Button>
      </div>
    </Fragment>
  );
}

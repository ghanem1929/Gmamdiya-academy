import React from "react";
import "./schedule.scss";
import {
  ScheduleComponent,
  Inject,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
} from "@syncfusion/ej2-react-schedule";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Schedule = () => (
  <div className="schedule">
    <Sidebar />
    <div className="scheduleContainer">
      <Navbar />
      <ScheduleComponent currentView="Month">
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  </div>
);

export default Schedule;

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Button,
  Drawer,
  ListItem,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Scheduler } from "@aldabil/react-scheduler";
import dayjs from "dayjs";
import { EVENTS } from "./events";
function Calendar() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [training, setTraining] = useState([]);
  const events2 = [];
  const [month, setMonth] = React.useState({
    weekDays: [0, 1, 2, 3, 4, 5, 6, 7],
    weekStartOn: 6,
    startHour: 9,
    endHour: 17,
    navigation: true,
  });
  const [week, setWeek] = React.useState({
    weekDays: [0, 1, 2, 3, 4, 5, 6, 7],
    weekStartOn: 6,
    startHour: 8,
    endHour: 23,
    step: 60,
    navigation: true,
  });
  const [day, setDay] = React.useState({
    startHour: 0,
    endHour: 24,
    step: 60,
    navigation: true,
  });
  const convertTrainings = () => {
    for (let i = 0; i < training.length; i++) {
      if (training[i].customer == null) {
        i++;
      } else {
        let startDate = new Date(training[i].date);
        let endDate = new Date(
          startDate.getTime() + training[i].duration * 60000
        );
        let x = {
          event_id: i + 1,
          title:
            training[i].activity +
            " with " +
            training[i].customer.firstname +
            " " +
            training[i].customer.lastname,
          start: new Date(dayjs(startDate).format("YYYY/MM/DD HH:mm")),
          end: new Date(dayjs(endDate).format("YYYY/MM/DD HH:mm")),
        };
        events2.push(x);
      }
    }
  };
  const fetchTrainings = () => {
    fetch("http://traineeapp.azurewebsites.net/api/trainings")
      .then((response) => response.json())
      .then((data) => setTraining(data));
  };
  useEffect(() => {
    fetchTrainings();
    convertTrainings();

    console.log("saa");
    console.log("haloo??");
  });
  return (
    <div>
      <AppBar position="static">
        <Toolbar color="black">
          {" "}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Calendar
          </Typography>
          <Drawer
            PaperProps={{
              sx: { width: "18%" },
            }}
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <List>
              <ListItem>
                <div>
                  <IconButton onClick={() => setIsDrawerOpen(false)}>
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
              </ListItem>
              <ListItem button component={Link} exact to="/trainingListingApp">
                <ListItemText primary="Trainings" />
              </ListItem>
              <ListItem button component={Link} exact to="/">
                <ListItemText primary="Customers"></ListItemText>
              </ListItem>
              <ListItem button component={Link} exact to="/calendar">
                <ListItemText primary="Calendar"></ListItemText>
              </ListItem>
            </List>

            <Outlet />
          </Drawer>
        </Toolbar>
      </AppBar>
      <Scheduler
        view="month"
        day={day}
        week={week}
        month={month}
        events={events2}
      />
    </div>
  );
}

export default Calendar;

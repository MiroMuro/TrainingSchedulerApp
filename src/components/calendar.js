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
function Calendar() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [training, setTraining] = useState([]);
  const [x, setX] = useState("x");
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
  const addMinutes = (date, minutes) => {
    date.setMinutes(date.getMinutes() + minutes);
    return date;
  };

  const deleteTraining = (id) => {
    console.log(id);

    fetch("http://traineeapp.azurewebsites.net/api/trainings/" + id, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        console.log("Ok");
        setX("changed");
      } else {
        console.log("Error");
      }
    });
  };

  useEffect(() => {
    fetch("https://traineeapp.azurewebsites.net/gettrainings")
      .then((response) => response.json())
      .then((data) =>
        setTraining(
          data.map((training) => ({
            event_id: training.id,
            title: `${training.activity} with ${training.customer.firstname} ${training.customer.lastname}`,
            start: new Date(training.date),
            end: new Date(
              addMinutes(new Date(training.date), training.duration)
            ),
            editable: true,
            deletable: true,
            customer: training.customer,
          }))
        )
      );
  }, [x]);
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
        events={training}
        onDelete={deleteTraining}
      />
    </div>
  );
}

export default Calendar;

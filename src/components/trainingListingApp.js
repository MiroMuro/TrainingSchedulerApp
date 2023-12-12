import React, { useState, useEffect } from "react";
import { AppBar, Drawer, ListItem, ListItemText, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import dayjs from "dayjs";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function TrainingListingApp() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [training, setTraining] = useState([]);
  const [open, setOpen] = useState(false);

  let gridApi;
  const onGridReady = (params) => {
    gridApi = params.api;
  };
  useEffect(() => {
    fetchTrainings();
    console.log(training);
    console.log("as");
  }, []);
  const fetchTrainings = () => {
    fetch("https://traineeapp.azurewebsites.net/gettrainings")
      .then((response) => response.json())
      .then((data) => setTraining(data));
  };

  const handleClick = () => {
    setOpen(true);
  };

  const deleteTraining = (id) => {
    console.log(id);
    if (
      window.confirm("Are you sure you want to delete this training?") === true
    ) {
      fetch("http://traineeapp.azurewebsites.net/api/trainings/" + id, {
        method: "DELETE",
      }).then((response) => {
        if (response.ok) {
          fetchTrainings();
          handleClick();
        } else {
        }
      });
    } else {
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [trainings, setTrainings] = useState([
    {
      headerName: "Delete",
      width: 100,
      field: "id",
      cellRenderer: (data) => (
        <div>
          <IconButton color="error" onClick={() => deleteTraining(data.value)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },

    {
      field: "date",
      sortable: true,
      cellRenderer: (training) => {
        const c = new Date(training.data.date);
        console.log(c.toLocaleString(), c.toLocaleTimeString());
        return c.toLocaleString();
      },
      resizable: true,
    },
    {
      headerName: "Duration (in minutes)",
      field: "duration",
      sortable: true,
      flex: 1,
      resizable: true,
    },
    { field: "activity", sortable: true, flex: 1 },
    { field: "customer.firstname", sortable: true, flex: 1 },
    { field: "customer.lastname", sortable: true, flex: 1 },
  ]);

  return (
    <div
      style={{ margin: "auto", height: 600, width: "100%" }}
      className="ag-theme-alpine"
    >
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Training deleted succesfully!
        </MuiAlert>
      </Snackbar>
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
            Trainings
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
              <ListItem button component={Link} to="/trainingListingApp">
                <ListItemText primary="Trainings"></ListItemText>
              </ListItem>
              <ListItem button component={Link} to="/">
                <ListItemText primary="Customers"></ListItemText>
              </ListItem>
              <ListItem button component={Link} to="/calendar">
                <ListItemText primary="Calendar"></ListItemText>
              </ListItem>
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
      <AgGridReact
        onGridReady={onGridReady}
        rowData={training}
        columnDefs={trainings}
        paginationPageSize={10}
        pagination={true}
      ></AgGridReact>
    </div>
  );
}

export default TrainingListingApp;

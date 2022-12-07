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
import { AgGridReact } from "ag-grid-react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import EditCustomer from "./editCustomer";
import AddCustomer from "./addCustomer";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Addtraining from "./addTraining";
function ListingApp() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const DivStyle = {
    backgroundColor: "#1976d2",
    padding: 10,
    flexDirection: "row",
  };
  const buttonDivStyle = {
    display: "inline-block",
    paddingRight: 50,
  };
  const searchDivStyle = {
    display: "inline-block",
    paddingRight: 50,
  };
  const inputStyle = {
    height: 40,
    paddingBottom: 5,
  };

  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers/")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content));
  };

  const deleteCustomer = (url) => {
    if (
      window.confirm("Are you sure you want to delete this customer?") == true
    ) {
      fetch(url, {
        method: "DELETE",
      }).then((response) => {
        if (response.ok) {
          fetchCustomers();
          handleClick();
        } else {
        }
      });
    } else {
    }
  };

  const changeCustomer = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => fetchCustomers())
      .catch((error) => console.error);
  };

  const addCustomer = (customer, link) => {
    fetch(link, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => fetchCustomers())
      .catch((error) => console.error(error));
  };

  const addTraining = (training) => {
    console.log(training);
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(training),
    })
      .then((response) => fetchCustomers())
      .catch((error) => console.error(error));
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const inputListener = (e) => {
    gridApi.setQuickFilter(e.target.value);
  };

  const onExportClick = () => {
    var params = {
      columnKeys: [
        "firstname",
        "lastname",
        "email",
        "phone",
        "city",
        "streetaddress",
        "postcode",
      ],
    };
    gridApi.exportDataAsCsv(params);
  };
  const [customer, setCustomer] = useState([
    {
      headerName: "Delete",
      width: 100,
      field: "links.0.href",
      cellRenderer: (data) => (
        <div>
          <IconButton color="error" onClick={() => deleteCustomer(data.value)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
    {
      headerName: "Edit",
      width: 100,
      cellRenderer: (params) => (
        <EditCustomer updateCustomer={changeCustomer} customer={params.data} />
      ),
    },
    {
      headerName: "Add Training",
      cellRenderer: (params) => (
        <Addtraining appendTraining={addTraining} customer={params.data} />
      ),
    },

    { field: "firstname", sortable: true, filter: true },
    { field: "lastname", sortable: true, filter: true },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },
    { field: "city", sortable: true, filter: true },
    { field: "streetaddress", sortable: true, filter: true },
    { field: "postcode", sortable: true, filter: true },
  ]);

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

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
          Customer deleted succesfully!
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
            Customers
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

      <div style={DivStyle}>
        <div style={buttonDivStyle}>
          <AddCustomer appendCustomer={addCustomer} />
        </div>
        <div style={buttonDivStyle}>
          <Button variant="contained" onClick={() => onExportClick()}>
            export
          </Button>
        </div>
        <div style={searchDivStyle}>
          <input
            style={inputStyle}
            placeholder="Search for a customer"
            onChange={inputListener}
            type="search"
          ></input>
        </div>
      </div>

      <AgGridReact
        onGridReady={onGridReady}
        editType="fullRow"
        rowData={customers}
        columnDefs={customer}
        paginationPageSize={10}
        pagination={true}
      ></AgGridReact>
    </div>
  );
}

export default ListingApp;

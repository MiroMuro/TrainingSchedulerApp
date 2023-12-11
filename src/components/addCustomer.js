import React from "react";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
function Addcustomer(props) {
  // Komponenttiin täytyy luoda modaalinen tila
  // Dialogi toimii ikkunana
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    city: "",
    streetaddress: "",
    postcode: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    console.log("HCC");
    setOpen(false);
  };
  const handleInputChange = (event) => {
    setCustomer({ ...customer, [event?.target.name]: event?.target.value });
  };
  const addCustomer = () => {
    props.appendCustomer(
      customer,
      "http://traineeapp.azurewebsites.net/api/customers"
    );
    handleClickClose();
  };
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add customer
      </Button>
      <Dialog onClose={handleClickClose} open={open}>
        <DialogTitle>Add a new customer</DialogTitle>
        <DialogContent id="customerAdd">
          <DialogContentText>
            Fill in the customers information
          </DialogContentText>
          <TextField
            autoFocus
            label="Firstname"
            name="firstname"
            value={customer.firstname}
            onChange={(e) => handleInputChange(e)}
            margin="dense"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Lastname"
            name="lastname"
            value={customer.lastname}
            onChange={(e) => handleInputChange(e)}
            margin="dense"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={customer.email}
            onChange={(e) => handleInputChange(e)}
            margin="dense"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Phone"
            name="phone"
            value={customer.phone}
            onChange={(e) => handleInputChange(e)}
            margin="dense"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="City"
            name="city"
            value={customer.city}
            onChange={(e) => handleInputChange(e)}
            margin="dense"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Streetaddress"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={(e) => handleInputChange(e)}
            margin="dense"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Postcode"
            name="postcode"
            value={customer.postcode}
            onChange={(e) => handleInputChange(e)}
            margin="dense"
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button onClick={addCustomer}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Addcustomer;

import React from "react";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
function Editcustomer(props) {
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
    console.log(props.customer);
    setCustomer({
      firstname: props.customer.firstname,
      lastname: props.customer.lastname,
      email: props.customer.email,
      phone: props.customer.phone,
      city: props.customer.city,
      streetaddress: props.customer.streetaddress,
      postcode: props.customer.postcode,
    });

    setOpen(true);
  };

  const handleClickClose = () => {
    console.log("HCC");
    setOpen(false);
  };
  const handleInputChange = (event) => {
    setCustomer({ ...customer, [event?.target.name]: event?.target.value });
  };
  const updateCustomer = () => {
    props.updateCustomer(customer, props.customer.links[0].href);
    handleClickClose();
  };
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog onClose={handleClickClose} open={open}>
        <DialogTitle>Edit this customer</DialogTitle>
        <DialogContent id="customeredit">
          <DialogContentText>
            Edit this customers contact information
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
          <Button onClick={updateCustomer}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Editcustomer;

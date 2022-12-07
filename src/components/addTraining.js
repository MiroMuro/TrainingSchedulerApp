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
import dayjs from "dayjs";
function Addtraining(props) {
  // Komponenttiin täytyy luoda modaalinen tila
  // Dialogi toimii ikkunana
  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = React.useState({
    date: "",
    duration: "",
    activity: "",
    customer: props.customer.links[0].href,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    console.log("HCC");
    setOpen(false);
  };
  const handleInputChange = (event) => {
    setTraining({ ...training, [event?.target.name]: event?.target.value });
  };
  const handleDateChange = (date) => {
    setTraining({
      ...training,
      [date?.target.name]: date?.target.value,
    });
  };
  const addTraining = () => {
    training.date = dayjs(training.date).format();
    props.appendTraining(training);
    console.log(training);
    handleClickClose();
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add training
      </Button>
      <Dialog onClose={handleClickClose} open={open}>
        <DialogTitle>Add new training to this ustomer</DialogTitle>
        <DialogContent id="trainingAdd">
          <DialogContentText>
            Fill in the training information
          </DialogContentText>
          <TextField
            autoFocus
            name="date"
            id="date"
            type="datetime-local"
            value={training.date}
            onChange={handleDateChange}
            margin="dense"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="duration"
            name="duration"
            value={training.duration}
            onChange={(e) => handleInputChange(e)}
            margin="dense"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Activity"
            name="activity"
            value={training.activity}
            onChange={(e) => handleInputChange(e)}
            margin="dense"
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button onClick={addTraining}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Addtraining;

import "./App.css";
import ListingApp from "./components/listingApp";
import TrainingListingApp from "./components/trainingListingApp";
import Calendar from "./components/calendar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AppBar, Button, Toolbar } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListingApp />} />
        <Route index element={<ListingApp />} />
        <Route
          exact
          path="trainingListingApp"
          element={<TrainingListingApp />}
        />
        <Route path="calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

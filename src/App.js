import React from "react";
import { Search } from "./Components/Search";
import "./index.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export default function App() {
  const [open, setOpen] = React.useState(false);

  const style = {
    position: "absolute",
    left: "30%",
    right: "30%",
    width: "30%",
    bgcolor: "background.paper",
    boxShadow: 50,
    p: 4,
    fontFamily: "sans-serif",
    maxHeight: "1024px",
    transform: "none",
    transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
    height: "84vh",
    border: "none",
    borderRadius: "20px"
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="App">
      {/* calling the  search component */}
      <button className="btn" onClick={handleOpen}>Click to open the Coin-Selection-UI</button>
      <Modal open={open}
            onClose={handleClose} 
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
              <Box sx={style}>
                <Search/>      
              </Box>
      </Modal>
    </div>
  );
}

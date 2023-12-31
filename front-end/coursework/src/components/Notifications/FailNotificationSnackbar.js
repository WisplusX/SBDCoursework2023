import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FailNotificationSnackbar = ({ open, message, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert
        onClose={onClose}
        severity="error"
        sx={{
          width: "100%",
          color: "white",
          backgroundColor: "#FF3156",
          boxShadow: "none",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default FailNotificationSnackbar;

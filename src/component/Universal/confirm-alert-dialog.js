import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";

export default function ConfirmAlertDialog({
  open,
  handleClose,
  handleSubmit,
  title,
  children,
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title || "Your title goes here..."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {children ||
              `Let Google help apps determine location. This means sending anonymous location data to
                            Google, even when no apps are running.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Disagree
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

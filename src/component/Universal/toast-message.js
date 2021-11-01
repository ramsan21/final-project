import React, { useEffect } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import { amber, green } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";
import { ToastMessageContext } from "../../lib/contexts/message.context";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles((theme) => ({
  success: {
    backgroundColor: `${green[600]} !important`,
    color: "#fff !important",
  },
  error: {
    backgroundColor: `${theme.palette.error.dark} !important`,
    color: "#fff !important",
  },
  info: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: "#fff !important",
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: "flex",
    alignItems: "center",
    textTransform: "capitalize",
  },
}));

function ToastMessageWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={`${classes[variant]} ${className}`}
      aria-describedby="status-message"
      message={
        <span id="status-message" className={classes.message}>
          <Icon className={`${classes.icon} ${classes.iconVariant}`} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

export default function ToastMessage(props) {
  const messageState = React.useContext(ToastMessageContext);

  useEffect(() => {
    return () => (handleClose = () => null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    messageState.showToastMessage({
      ...messageState.toastMessage,
      open: false,
    });
  }

  const { variant, message, open } = messageState.toastMessage;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={7000}
      onClose={handleClose}
    >
      <ToastMessageWrapper
        onClose={handleClose}
        variant={variant}
        message={message}
      />
    </Snackbar>
  );
}

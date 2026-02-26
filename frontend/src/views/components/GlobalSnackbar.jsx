import { Alert, Snackbar } from "@mui/material";

export default function GlobalSnackbar({
  open,
  onClose,
  message,
  severity = "success",
  autoHideDuration = 4000,
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

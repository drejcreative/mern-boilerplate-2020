import { Alert, Snackbar, Stack } from "@mui/material";
import React from "react";
import { REMOVE_TOAST_MSG } from "../store/actionTypes";
import Store from "../store/store";

const ToastService = () => {
  const { state, dispatch } = React.useContext(Store);
  const handleClose = (_, reason, payload) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(payload);
  };

  return (
    <Stack spacing={8}>
      {state.toastMsgs.map(({ msg, id, type }) => {
        return (
          <Snackbar
            key={"snack" + id}
            open={true}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={(e, r) => {
              handleClose(e, r, { type: REMOVE_TOAST_MSG, payload: { id } });
            }}
          >
            <Alert
              key={"alert" + id}
              onClose={(e, r) => {
                handleClose(e, r, { type: REMOVE_TOAST_MSG, payload: { id } });
              }}
              severity={type}
              sx={{ width: "100%" }}
            >
              {msg}
            </Alert>
          </Snackbar>
        );
      })}
    </Stack>
  );
};

export default ToastService;

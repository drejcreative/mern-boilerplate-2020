import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { RECEIPT_ADD_HEADER } from "../../constants";
import Store from "../../store/store";
import { TakhmeenSummary } from "../common-components";
import Header from "../Header";

const Receipt = (props) => {
  const [paymentDate, setPaymentData] = useState(
    dayjs(new Date().toISOString().substring(0, 19))
  );

  const handleDateChange = (newValue) => {
    setPaymentData(newValue);
  };

  const [takhmeenDetails, setTakhmeenDetails] = useState({
    takhmeenAmount: null,
    zabihat: null,
    iftaari: null,
    niyaaz: null,
    chairs: null,
  });
  const { dispatch } = useContext(Store);
  const initialValues = {
    HOFId: "",
    date: "",
    amount: null,
    mode: "cash",
    details: "",
  };
  const {
    register,
    handleSubmit: submitIt,
    reset,
    setValue,
    watch,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: initialValues,
  });
  watch("HOFId");
  const { HOFId, mode } = getValues();
  const handleSubmit = () => {};
  // I know its dirty, but got no other way to re render when delete member
  const [render, reRender] = useState(false);

  return (
    <>
      <Header header={RECEIPT_ADD_HEADER} />
      <Paper>
        <div className="p-3">
          <form onSubmit={submitIt(handleSubmit)}>
            <Grid
              container
              spacing={3}
              direction={"row"}
              alignContent={"center"}
            >
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  id="HOFId"
                  name="HOFId"
                  label="HOF Id"
                  type="text"
                  value={HOFId}
                  onChange={(e) => {
                    setValue("HOFId", e.currentTarget?.value ?? "");
                    reRender(!render);
                  }}
                  error={errors.HOFId ? true : false}
                />
              </Grid>
              <Grid item xs={12} />
              <Grid item xs={12}>
                <FormLabel>Takhmeen summary</FormLabel>
                {TakhmeenSummary({
                  takhmeenDetails,
                })}
              </Grid>
              <Grid item xs={6}>
                <FormLabel>Total payments till date</FormLabel>
                <TextField
                  disabled
                  fullWidth
                  size="small"
                  id="paymentsTill"
                  name="paymentsTill"
                  type="number"
                  value={takhmeenDetails.totalPaymentsTill}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>Total pending amount</FormLabel>
                <TextField
                  disabled
                  fullWidth
                  size="small"
                  id="pendingAmount"
                  name="pendingAmount"
                  type="number"
                  value={takhmeenDetails.pendingAmount}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  id="amount"
                  name="amount"
                  label="Payment amount"
                  type="text"
                  {...register("amount")}
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Date desktop"
                    inputFormat="MM/DD/YYYY"
                    value={paymentDate}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <TextField {...params} size="small" fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel>Mode</FormLabel>
                  <RadioGroup
                    size="small"
                    name="paymentMode"
                    value={mode}
                    onChange={(e) => {
                      setValue("mode", e.target.value);
                    }}
                    row
                  >
                    <FormControlLabel
                      key="cash"
                      value="cash"
                      control={<Radio size="small" />}
                      label="Cash"
                    />
                    <FormControlLabel
                      key="cheque"
                      value="cheque"
                      control={<Radio size="small" />}
                      label="Cheque"
                    />
                    <FormControlLabel
                      key="online"
                      value="online"
                      control={<Radio size="small" />}
                      label="Online"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  id="details"
                  name="details"
                  label="Payment details"
                  type="textarea"
                  {...register("details")}
                />
              </Grid>
              <Grid
                className="d-flex"
                item
                xs={12}
                alignSelf="center"
                justifyContent={"center"}
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{
                    backgroundColor: "green",
                    margin: "5px",
                  }}
                >
                  {props.isEdit ? "Update" : "Submit"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Paper>
    </>
  );
};

export default Receipt;

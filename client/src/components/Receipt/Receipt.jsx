import dayjs from "dayjs";
import React, { useState } from "react";
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
import {
  calculateTakhmeenDetails,
  TakhmeenSummary,
  useCustomHook,
} from "../common-components";
import Header from "../Header";
import { formService } from "../../services/formService";
import { receiptService } from "../../services/receiptService";
import { useNavigate } from "react-router-dom";

const Receipt = (props) => {
  const { startLoading, endLoading, addToastMsg } = useCustomHook();
  const navigate = useNavigate();
  const takhmeenDetailsInitVal = {
    takhmeenAmount: 0,
    zabihat: 0,
    iftaari: 0,
    niyaaz: 0,
    chairs: 0,
    paidAmount: 0,
    pendingAmount: 0,
    formNo: "",
    HOFName: "",
  };
  const [paymentDate, setPaymentData] = useState(
    dayjs(new Date().toISOString().substring(0, 19))
  );
  const handleDateChange = (newValue) => {
    setPaymentData(newValue);
  };

  const [takhmeenDetails, setTakhmeenDetails] = useState(
    takhmeenDetailsInitVal
  );
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
  const handleSubmit = async () => {
    const vals = getValues();
    startLoading();
    try {
      const data = await receiptService.addToReceipts({
        ...vals,
        date: paymentDate,
        formNo: takhmeenDetails.formNo,
        HOFName: takhmeenDetails.HOFName,
      });
      if (data.success) {
        addToastMsg("Details saved : " + data._id, "success");
        reset();
        navigate("/");
      } else {
        throw new Error("Internal server error");
      }
    } catch (e) {
      console.log("error saving form", e);
      addToastMsg(
        "Unable to save details, please re validate entered values",
        "error"
      );
    }
    endLoading();
  };

  // I know its dirty, but got no other way to re render when delete member
  const [render, reRender] = useState(false);

  const getFormData = async (e) => {
    if (!e.target.value) return;
    startLoading();
    try {
      const data = await formService.isFormExistByHOF(e.target.value);
      if (!data.exists) {
        addToastMsg(
          "Data not registered, please fill registration form first",
          "warning"
        );
      } else {
        setTakhmeenDetails({
          ...calculateTakhmeenDetails(data.form),
          formNo: data.form.formNo,
          HOFName: data.form.HOFName,
        });
      }
    } catch (e) {
      console.log("error getting form details", e);
      addToastMsg("Unable to fetch form details", "error");
      reset({ ...initialValues });
      setTakhmeenDetails(takhmeenDetailsInitVal);
    }
    endLoading();
  };

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
                  onBlur={(e) => {
                    getFormData(e);
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
                  id="paidAmount"
                  name="paidAmount"
                  type="number"
                  value={takhmeenDetails.paidAmount}
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
                  type="number"
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

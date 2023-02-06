import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  MenuItem,
  Select,
  FormGroup,
  Checkbox,
  Button,
  Paper,
} from "@mui/material";
import { Grid } from "@mui/material";

const MaterialFormComponent = (props) => {
  const initialValues = {
    markaz: "ZM",
    HOFId: "",
    HOFName: "",
    HOFAddress: "",
    HOFPhone: "",
  };

  const {
    register,
    handleSubmit: submitIt,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: initialValues,
    // resolver: (props) => {
    //   return { values: props.values, errors: {} };
    // },
  });
  watch("HOFId");

  const handleSubmit = (event) => {
    // event?.preventDefault?.();
    console.log(getValues(), errors);
  };

  return (
    <Paper>
      <div className="p-3">
        <form onSubmit={submitIt(handleSubmit)}>
          <Grid container spacing={2} direction={"row"} alignContent={"center"}>
            <div className="d-flex w-100 align-items-end">
              <Grid
                item
                xs={6}
                style={{ paddingLeft: "16px", paddingTop: "16px" }}
              >
                <FormLabel>Select markaz</FormLabel>
                <FormControl label="Select markaz" fullWidth>
                  <Select
                    fullWidth
                    size="small"
                    name="markaz"
                    defaultValue={"ZM"}
                    {...register("markaz")}
                  >
                    <MenuItem key="zm" value="ZM">
                      Zainy Masjid
                    </MenuItem>
                    <MenuItem key="bh" value="BH">
                      Burhani Hall
                    </MenuItem>
                    <MenuItem key="jm" value="JM">
                      Jamali Markaz
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={6}
                style={{ paddingLeft: "16px", paddingTop: "16px" }}
              >
                <TextField
                  required
                  className="mt-2"
                  fullWidth
                  size="small"
                  id="HOFId"
                  name="HOFId"
                  label="HOF ID"
                  type="text"
                  {...register("HOFId")}
                  error={errors.HOFId ? true : false}
                />
              </Grid>
            </div>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                size="small"
                id="HOFName"
                name="HOFName"
                label="HOF Name"
                type="text"
                {...register("HOFName")}
                error={errors.HOFName ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                size="small"
                id="HOFAddress"
                name="HOFAddress"
                label="HOF Address"
                type="textarea"
                {...register("HOFAddress")}
                error={errors.HOFAddress ? true : false}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                size="small"
                id="HOFPhone"
                name="HOFPhone"
                label="HOF Phone"
                type="text"
                {...register("HOFPhone")}
                error={errors.HOFPhone ? true : false}
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
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Paper>
  );
};
export default MaterialFormComponent;

import React, { useState } from "react";
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
    firstName: "",
    lastName: "",
    gender: "male",
    country: "Canada",
    hobby: "",
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const [formValues, setFormValues] = useState(initialValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(getValues(), errors);
  };

  const methods = useForm({
    defaultValues: initialValues,
    resolver: (props) => {
      return { values: props.values, errors: {} };
    },
  });
  const {
    register,
    handleSubmit: submitIt,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
    getValues,
  } = methods;
  const onSubmit = (data) => console.log(data);

  return (
    <Paper>
      <div className="px-3">
        <form onSubmit={submitIt(handleSubmit)}>
          <Grid container spacing={2} direction={"row"}>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                size="small"
                id="firstName"
                name="firstName"
                label="First name"
                type="text"
                {...register("firstName")}
                error={errors.fullname ? true : false}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
                id="lastName"
                name="lastName"
                label="Last name"
                type="text"
                value={formValues.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  size="small"
                  name="gender"
                  value={formValues.gender}
                  onChange={handleInputChange}
                  row
                >
                  <FormControlLabel
                    key="male"
                    value="male"
                    control={<Radio size="small" />}
                    label="Male"
                  />
                  <FormControlLabel
                    key="female"
                    value="female"
                    control={<Radio size="small" />}
                    label="Female"
                  />
                  <FormControlLabel
                    key="other"
                    value="other"
                    control={<Radio size="small" />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormLabel>Select Country</FormLabel>
              <FormControl label="Select Country" fullWidth>
                <Select
                  size="small"
                  name="country"
                  value={formValues.country}
                  onChange={handleInputChange}
                >
                  <MenuItem key="canada" value="Canada">
                    Canada
                  </MenuItem>
                  <MenuItem key="japan" value="Japan">
                    Japan
                  </MenuItem>
                  <MenuItem key="germany " value="Germany">
                    Germany
                  </MenuItem>
                  <MenuItem key="switzerland " value="Switzerland">
                    Switzerland
                  </MenuItem>
                  <MenuItem key="australia " value="Australia">
                    Australia
                  </MenuItem>
                  <MenuItem key="united_states " value="United States">
                    United States
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormLabel>Hobby</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox name="hobby" defaultChecked />}
                  label="Writing"
                />
                <FormControlLabel
                  control={<Checkbox name="hobby" />}
                  label="Dance"
                />
                <FormControlLabel
                  control={<Checkbox name="hobby" />}
                  label="Painting"
                />
                <FormControlLabel
                  control={<Checkbox name="hobby" />}
                  label="Video Game"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={6} alignSelf="center">
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

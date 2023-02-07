import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  MenuItem,
  Select,
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Link,
  Modal,
  TableBody,
  Box,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { hofService } from "../../services/hofService";
import { formService } from "../../services/formService";
import {
  FORM_ADD_HEADER,
  FORM_EDIT_HEADER,
  MARKAZ_CONST,
} from "../../constants";
import Header from "../Header";
import { TakhmeenSummary, useCustomHook } from "../common-components";

const MaterialFormComponent = (props) => {
  const routeParams = useParams();
  const navigate = useNavigate();
  const { startLoading, endLoading, addToastMsg } = useCustomHook();
  const initialValues = {
    markaz: "ZM",
    HOFId: "",
    HOFName: "",
    HOFAddress: "",
    HOFPhone: "",
    familyMembers: [],
    takhmeenAmount: null,
    zabihat: null,
    iftaari: null,
    niyaaz: null,
    chairs: null,
    comments: "",
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
  watch("HOFId", "familyMembers");
  const {
    familyMembers,
    HOFName,
    HOFPhone,
    takhmeenAmount,
    zabihat,
    iftaari,
    niyaaz,
    chairs,
  } = getValues();
  const handleSubmit = async () => {
    const vals = getValues();
    if (!vals.familyMembers?.length) {
      return addToastMsg("Add atleast one member", "warning");
    }
    startLoading();
    try {
      if (props.isEdit) {
        await formService.updateForm(getValues());
        addToastMsg("Details saved successfully", "success");
        navigate("/list");
      } else {
        const data = await formService.addToForms(getValues());
        addToastMsg("Details saved : " + data.formNo, "success");
        reset();
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

  const [isPopUpOpen, setPopUpState] = useState(false);

  const handleHOFIdBlur = async (e) => {
    if (!e.target.value) return;
    startLoading();
    try {
      const data = await Promise.all([
        hofService.getMembersByHOF(e.target.value).catch((e) => {
          console.log("unable to fetch members list", e);
          addToastMsg("unable to fetch members list", "error");
        }),
        formService.isFormExistByHOF(e.target.value),
      ]);
      if (data[0]?.length) {
        const HOFDetails = data[0].find((d) => d.isHOF);
        setValue(
          "familyMembers",
          data[0].map((d) => {
            return {
              name: d.Full_Name,
              its: d.ITS_ID,
              age: d.Age,
              gender: d.Gender,
            };
          })
        );
        setValue("HOFName", HOFDetails.Full_Name, {
          shouldTouch: true,
          shouldDirty: true,
        });
        setValue("HOFPhone", HOFDetails.HOF_PHONE, { shouldDirty: true });
        reRender(!render);
      }

      if (data[1]?.exists) {
        addToastMsg("Data already exists for this HOF", "warning");
        reset();
      }
    } catch (e) {
      console.log("unexpected error", e);
      addToastMsg("unexpected error", "error");
    }
    endLoading();
  };

  // I know its dirty, but got no other way to re render when delete member
  const [render, reRender] = useState(false);

  // for edit mode
  useEffect(() => {
    async function t() {
      if (props.isEdit) {
        startLoading();
        try {
          const data = await formService.getFormbyFormNo(routeParams.formNo);
          reset(data);
          reRender(!render);
        } catch (e) {
          console.log("error getting form details", e);
          addToastMsg("Unable to fetch form details", "error");
          navigate("/list");
        }
        endLoading();
      }
    }
    t();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header header={props.isEdit ? FORM_EDIT_HEADER : FORM_ADD_HEADER} />
      <Paper>
        <div className="p-3">
          <form onSubmit={submitIt(handleSubmit)}>
            <Grid
              container
              spacing={3}
              direction={"row"}
              alignContent={"center"}
            >
              <div className="d-flex w-100 align-items-end">
                <Grid
                  item
                  xs={6}
                  style={{ paddingLeft: "24px", paddingTop: "24px" }}
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
                      {MARKAZ_CONST.map((item) => {
                        return (
                          <MenuItem key={item.value} value={item.value}>
                            {item.displayVal}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{ paddingLeft: "24px", paddingTop: "24px" }}
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
                    disabled={props.isEdit}
                    {...register("HOFId")}
                    onBlur={handleHOFIdBlur}
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
                  value={HOFName}
                  onChange={(e) => {
                    setValue("HOFName", e.currentTarget?.value ?? "");
                    reRender(!render);
                  }}
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
                  value={HOFPhone}
                  onChange={(e) => {
                    setValue("HOFPhone", e.currentTarget?.value ?? "");
                    reRender(!render);
                  }}
                  error={errors.HOFPhone ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Members list</FormLabel>
                {MemberTable({
                  familyMembers,
                  handleDeleteMember: (its) => {
                    const newFms = JSON.parse(JSON.stringify(familyMembers));
                    newFms.splice((fm) => fm.its === its, 1);
                    setValue("familyMembers", newFms);
                    reRender(!render);
                  },
                })}
                <Link
                  className="pt-2"
                  component="p"
                  role={"button"}
                  variant="body2"
                  onClick={() => {
                    setPopUpState(true);
                  }}
                >
                  Add Member
                </Link>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  id="takhmeenAmount"
                  name="takhmeenAmount"
                  label="Takhmeen amount"
                  type="number"
                  value={takhmeenAmount}
                  onChange={(e) => {
                    setValue("takhmeenAmount", e.currentTarget?.value ?? "");
                    reRender(!render);
                  }}
                  error={errors.HOFPhone ? true : false}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  id="zabihat"
                  name="zabihat"
                  label="Zabihat count"
                  type="number"
                  value={zabihat}
                  onChange={(e) => {
                    setValue("zabihat", e.currentTarget?.value ?? "");
                    reRender(!render);
                  }}
                  error={errors.HOFPhone ? true : false}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  id="iftaari"
                  name="iftaari"
                  label="Iftaari"
                  type="number"
                  value={iftaari}
                  onChange={(e) => {
                    setValue("iftaari", e.currentTarget?.value ?? "");
                    reRender(!render);
                  }}
                  error={errors.HOFPhone ? true : false}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  id="niyaaz"
                  name="niyaaz"
                  label="Niyaaz"
                  type="number"
                  value={niyaaz}
                  onChange={(e) => {
                    setValue("niyaaz", e.currentTarget?.value ?? "");
                    reRender(!render);
                  }}
                  error={errors.HOFPhone ? true : false}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  id="chairs"
                  name="chairs"
                  label="Chair count"
                  type="number"
                  value={chairs}
                  onChange={(e) => {
                    setValue("chairs", e.currentTarget?.value ?? "");
                    reRender(!render);
                  }}
                  error={errors.HOFPhone ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Takhmeen summary</FormLabel>
                {TakhmeenSummary({
                  takhmeenDetails: { ...getValues() },
                })}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  id="comments"
                  name="comments"
                  label="Comments"
                  type="textarea"
                  {...register("comments")}
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

        {AddMemberModal({
          open: isPopUpOpen,
          handleClose: () => {
            setPopUpState(false);
          },
          onSubmit: (vals) => {
            !familyMembers.find((fm) => fm.its === vals.its) &&
              setValue("familyMembers", [...familyMembers, vals]);
          },
        })}
      </Paper>
    </>
  );
};

const MemberTable = ({ familyMembers, handleDeleteMember }) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>ITS</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Age</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Gender</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {familyMembers.map((fm) => {
            return (
              <TableRow
                key={fm.its}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{fm.name}</TableCell>
                <TableCell>{fm.its}</TableCell>
                <TableCell>{fm.age}</TableCell>
                <TableCell>{fm.gender}</TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    size="medium"
                    onClick={() => {
                      handleDeleteMember(fm.its);
                    }}
                  >
                    <Delete fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AddMemberModal = ({ open, handleClose, onSubmit }) => {
  const { register, reset, getValues, setValue, watch } = useForm({
    defaultValues: {
      name: "",
      its: "",
      age: null,
      gender: "male",
    },
  });
  watch("gender");
  const { gender } = getValues();
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={boxStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Member
        </Typography>
        <form
          onSubmit={() => {
            onSubmit(getValues());
            reset();
            handleClose();
          }}
        >
          <Grid container spacing={2} direction={"row"} alignContent={"center"}>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                size="small"
                id="memberName"
                name="name"
                label="Name"
                type="text"
                {...register("name")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                size="small"
                id="memberITS"
                name="its"
                label="ITS"
                type="text"
                {...register("its")}
              />
            </Grid>
            <div className="d-flex w-100 align-items-end">
              <Grid
                item
                xs={6}
                style={{ paddingLeft: "16px", paddingTop: "16px" }}
              >
                <TextField
                  required
                  fullWidth
                  size="small"
                  id="age"
                  name="age"
                  label="Age"
                  type="number"
                  {...register("age")}
                />
              </Grid>
              <Grid
                item
                xs={6}
                style={{ paddingLeft: "16px", paddingTop: "16px" }}
              >
                <FormControl fullWidth>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup
                    size="small"
                    name="gender"
                    value={gender}
                    onChange={(e) => {
                      setValue("gender", e.target.value);
                    }}
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
                  </RadioGroup>
                </FormControl>
              </Grid>
            </div>
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
                Add Member
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default MaterialFormComponent;

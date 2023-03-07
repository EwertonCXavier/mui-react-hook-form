import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  IconButton,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import "./styles.css";
import CloseIcon from "@mui/icons-material/Close";
import { IFormInput } from "../../interface";
import { TextFieldComponent } from "../../components/TextFields";

const schema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required(),
    gatewayId: yup.string().required(),
  })
  .required();

export const Gateways = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      gatewayId: "",
    },
  });
  // Responsible for controlling the toast state
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IFormInput> = (data, e) => {
    console.log(data);
    setIsToastOpen(true);
    // Resets after submission
    reset();
  };

  const handleCloseToast = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setIsToastOpen(false);
  };

  const action = (
    <>
      <IconButton aria-label="close" color="inherit" onClick={handleCloseToast}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5">Gateway Page</Typography>
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <TextFieldComponent
          label={"Name"}
          name={"name"}
          marginDirection={"mt"}
          control={control}
          errors={errors}
        />
        <TextFieldComponent
          label={"Description"}
          name={"description"}
          marginDirection={"mt"}
          control={control}
          errors={errors}
        />
        <TextFieldComponent
          label={"Gateway Id"}
          name={"gatewayId"}
          marginDirection={"my"}
          control={control}
          errors={errors}
        />
        <Button type="submit" variant="contained">
          Register
        </Button>
      </Box>

      {/* Snackbar here */}
      <Snackbar
        open={isToastOpen}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity="success"
          sx={{ width: "100%" }}
        >
          Gateway registered successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

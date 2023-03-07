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

interface IFormInput {
  name: string;
  description: string;
  gatewayId: string;
}

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
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField {...field} variant="outlined" label="Name" />
            )}
          />
          {errors.name && (
            <Typography sx={{ color: "#ff0000" }}>Name is required!</Typography>
          )}
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField {...field} variant="outlined" label="Description" />
            )}
          />
          {errors.description && (
            <Typography sx={{ color: "#ff0000" }}>
              Description is required!
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            my: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Controller
            name="gatewayId"
            control={control}
            render={({ field }) => (
              <TextField {...field} variant="outlined" label="Gateway Id" />
            )}
          />
          {errors.gatewayId && (
            <Typography sx={{ color: "#ff0000" }}>
              GatewayId is required!
            </Typography>
          )}
        </Box>
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

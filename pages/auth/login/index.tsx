import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import React, { FC } from "react";
import Box from "@mui/material/Box";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import { loginProps } from "@/interface/auth.interface";
import { loginMutation } from "@/customHooks/query/auth.query.hooks";
import Link from "next/link";
import toast from "react-hot-toast";


const Login: FC<loginProps> = ({}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = loginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (formData: FieldValues) => {
    const { email, password } = formData as { email: string; password: string };
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    mutate(formData, {
    });
    console.log(formData);
    toast.success("Logged in successfully")
  };
  return (
    <>
      <Box
        sx={{
          p: 2,
          width: "400px",
          border: "1px solid",
          borderRadius: "10px",
          margin: "0 auto",
          marginTop: "30px",
          padding: "30px",
          bgcolor: "#002E6E",
        }}
      >
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <h2 style={{ marginBottom: "20px", color: "white" }}>Sign in</h2>
          <FormControl
            sx={{
              m: 1,
              width: "100%",
              mb: 3,
              bgcolor: "#fff",
              textTransform: "capitalize",
              borderColor: "#fff ",
              color: "#002E6E",
              borderRadius: "5px",
              margin: "0px"
            }}
            variant="filled"
          >
            <FilledInput
              id="filled-adornment-email"
              type="email"
              {...register("email")}
            />
            <InputLabel htmlFor="filled-adornment-email">Email</InputLabel>
          </FormControl>
          <FormControl
            sx={{
              m: 1,
              width: "100%",
              mb: 3,
              bgcolor: "#fff",
              textTransform: "capitalize",
              borderColor: "#fff ",
              color: "#002E6E",
              borderRadius: "5px",
              margin: "0px"
            }}
            variant="filled"
          >
            <InputLabel htmlFor="filled-adornment-password">
              Password
            </InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <br />
          <Button
            variant="outlined"
            sx={{
              bgcolor: "#fff",
              textTransform: "capitalize",
              borderColor: "#fff ",
              color: "#002E6E",
              fontWeight: "bold",
            }}
            type="submit"
            disabled={isPending}
          >
           Sign in
          </Button>
        </form>
      </Box>
      <h6 style={{ marginTop: "30px", color: "#002E6E", textAlign: "center", fontSize: "medium" }}>
        Not a member ? <Link href='/auth/register' style={{textDecoration: "none", color: "#002E6E"}}>Sign up</Link>
      </h6>
    </>
  );
};

export default Login;

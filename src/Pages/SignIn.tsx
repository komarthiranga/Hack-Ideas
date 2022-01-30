import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Layout from "../Components/Layout";
import useForm from '../Hooks/use-form';
import { authActions } from '../store/auth-slice';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React, {useState} from 'react';

const SignIn = () => {

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [authError, setAuthError] = useState(false);
  const [sumitted, setSubmitted] = useState(false);
  const {value: employeeId, filedValueChangeHandler: employeeIdChangeHandler, isValid: employeeIdIsValid, isTouched: employeeIdIsTouched } = useForm();
  const {value: password, filedValueChangeHandler: passwordChangeHandler, isValid: passwordIsValid, isTouched: passwordIsTouched } = useForm();
  const dispatch = useDispatch();
  const isAuthenicated = useSelector( (state: any) => state.auth.authenticated );
  const employees = useSelector( (state: any) => state.employees.employees)

  useEffect( () => {
    if(sumitted) {
      if(isAuthenicated) {
        setAuthError(false);
        console.log('Success');
      } else {
        setAuthError(true);
      }
    }
  }, [isAuthenicated, sumitted])

  const useNameChange= (event: any) => {
    employeeIdChangeHandler(event.target.value);
  };

  const passwordChange = (event: any) => {
    passwordChangeHandler(event.target.value);
  };

  const signInHandler = (event: any) => {
    event.preventDefault();
    if (employeeIdIsValid && passwordIsValid) {
      setSubmitted(true);
      dispatch(authActions.authenticate({employeeId, password, employees}));
    } else {
      employeeIdChangeHandler(employeeId);
      passwordChangeHandler(password)
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={signInHandler}
        >
          { authError && <Alert severity="error">Please enter the correct credentials!</Alert>}
          <TextField
            margin="normal"
            error={employeeIdIsTouched && !employeeIdIsValid}
            required
            fullWidth
            id="employeeId"
            label="Employee ID"
            name="employeeId"
            autoComplete="employeeId"
            autoFocus
            value={employeeId}
            onChange={useNameChange}
            helperText={`${employeeIdIsTouched && !employeeIdIsValid ? 'Please enter employee Id': ''}`}
          />

          <TextField
            margin="normal"
            error={passwordIsTouched && !passwordIsValid}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
            value={password}
            onChange={passwordChange}
            helperText={`${passwordIsTouched && !passwordIsValid ? 'Please enter password': ''}`}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default SignIn;

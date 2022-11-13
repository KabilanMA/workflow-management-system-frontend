import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import { errorToast, successToast } from '../../../components/Toasts';
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import axios from "../../../api/axios"

// REGEX
const USER_REGEX = /^[a-zA-Z][a-zA-Z]{2,50}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,80}$/;

const REGISTER_URL = '/register';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  // const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().matches(USER_REGEX, "Name should only contain between 2 to 50 English alphabet characters").required('First name required'),
    lastName: Yup.string().matches(USER_REGEX, "Name should only contain between 2 to 50 English alphabet characters").required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().matches(PWD_REGEX, "Password should be between 8 to 80 characters of alphabets, numbers and special characters (!@#$%) only").required('Password is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    const firstName = methods.getValues('firstName');
    const lastName = methods.getValues('lastName');
    const email = methods.getValues('email');
    const password = methods.getValues('password');
    console.log(PWD_REGEX.test(password));
    if (!USER_REGEX.test(firstName) || !USER_REGEX.test(lastName) || !PWD_REGEX.test(password)) {
      errorToast("Not Registered <<REGEX FAIL>>");
    } else {
      // successToast("Registering");
      // console.log("Registering");
      console.log(email, password)

      try {
        const response = await axios.post(REGISTER_URL,
          JSON.stringify({ email, pwd: password }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );
        console.log(response?.data);
        console.log(response?.accessToken);
        console.log(JSON.stringify(response))
        // setSuccess(true);
        successToast("Register Completed. Check your mail.");

        // setEmail('');
        // setPwd('');
        // setMatchPwd('');
      } catch (err) {
        if (!err?.response) {
          errorToast('No Server Response');
        } else if (err.response?.status === 409) {
          errorToast('email Taken');
        } else {
          errorToast('Registration Failed')
        }
        // errRef.current.focus();
      }
    }

    // navigate('/login', { replace: true });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField 
            name="firstName" 
            label="First name"
            pattern={USER_REGEX}
          />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

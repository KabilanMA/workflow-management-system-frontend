import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components

// import axios from '../../../api/axios';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"
import useLogout from '../../../hooks/useLogOut';

import { errorToast } from '../../../components/Toasts';
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

const LOGIN_URL = '/login';

// ----------------------------------------------------------------------

export default function LoginForm(props) {
  const navigate = useNavigate();
  const logout = useLogout();
  const from = "/dashboard/app"
  const axios = useAxiosPrivate()

  const [showPassword, setShowPassword] = useState(false);


  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const setPassforgetButtonClick = (event) =>{
    props.setPassforget(true)
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ email: data.email, pwd: data.password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      localStorage.setItem("user", JSON.stringify({ email: data.email, firstname: response?.data.firstname, id: response?.data?.id, roles, accessToken }))

      navigate(from, { replace: true })

    } catch (err) {
      console.log(err)
      if (!err?.response) {
        errorToast('No Server Response');
      } else if (err.response?.status === 400) {
        errorToast('Missing Username or Password');
      } else if (err.response?.status === 401) {
        errorToast('Unauthorized');
      } else {
        errorToast('Login Failed');
      }
    }

  };

  return (
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <RHFTextField name="email" label="Email address" />

          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          {/* <RHFCheckbox name="remember" label="Remember me" /> */}
          <Button variant="subtitle2" underline="hover" sx={{marginLeft:'auto', marginRight: '0'}} onClick={setPassforgetButtonClick}>
            Forgot password?
          </Button>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Login
        </LoadingButton>


      </FormProvider>
  );
}

import * as Yup from 'yup';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
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

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation()
  const logout = useLogout();
  const from = location.state?.from?.pathname || "/dashboard/app"
  const axios = useAxiosPrivate()

  const signOut = async () => {
    await logout();
    navigate("/dashboard/app")
  }

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

      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      // setAuth({ email, pwd, roles, accessToken });
      localStorage.setItem("user", JSON.stringify({ email: data.email, roles, accessToken }))

      // console.log("aaaaaaa", auth)
      console.log("lllllllll", JSON.parse(localStorage.getItem("user")))
      // console.log(auth)

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
          <RHFCheckbox name="remember" label="Remember me" />
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Login
        </LoadingButton>


      </FormProvider>
  );
}

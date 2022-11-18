import * as Yup from 'yup';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components

// import axios from '../../../api/axios';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"
import useLogout from '../../../hooks/useLogOut';

import { errorToast, successToast } from '../../../components/Toasts';
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

const LOGIN_URL = '/login';
const PASSWORD_RESET_URL = '/password/reset/user'

// ----------------------------------------------------------------------

export default function ForgetPassword(props) {
  const navigate = useNavigate();
  const location = useLocation()
  const from = location.state?.from?.pathname || "/dashboard/app"
  const axios = useAxiosPrivate()


  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required')
  });

  const defaultValues = {
    email: '',
    firstname: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const setLoginButtonClick = (event) =>{
    props.setPassforget(false)
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(PASSWORD_RESET_URL,
        JSON.stringify({ email: data.email, firstname: data.firstname }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      if(response){
        successToast("Check your email inbox");
        navigate(from, { replace: true });
      }


    } catch (err) {
      console.log(err)
      if (!err?.response) {
        errorToast('No Server Response');
      } else if (err.response?.status === 404) {
        errorToast('Invalid Email or Username');
      } else if (err.response?.status === 500 || err.response?.status === 503) {
        errorToast('Try again');
      } else {
        errorToast('Something went wrong');
      }
    }

  };

  return (
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <RHFTextField name="email" label="Email address" />

          <RHFTextField
            name="firstname"
            label="Firstname"
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Button variant="subtitle2" underline="hover" onClick={setLoginButtonClick}>
            Login ?
          </Button>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Reset Password
        </LoadingButton>


      </FormProvider>
  );
}

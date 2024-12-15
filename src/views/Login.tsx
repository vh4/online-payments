'use client'

// React Imports
import React, { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";

// Next Imports
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react';

// MUI Imports
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import { useForm, SubmitHandler } from 'react-hook-form';

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { Mode } from '@core/types'

// Component Imports
import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import { Alert, CircularProgress } from '@mui/material';

interface LoginType {
  username: string;
  password: string;
}

const Login = ({ mode }: { mode: Mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [loading, setLoading] = React.useState(false);

  // Hooks
  const router = useRouter();
  const { settings } = useSettings();
  const authBackground = useImageVariant(mode, '/images/pages/auth-v2-mask-1-light.png', '/images/pages/auth-v2-mask-1-dark.png');
  const characterIllustration = useImageVariant(
    mode,
    '/images/illustrations/auth/v2-login-light.png',
    '/images/illustrations/auth/v2-login-dark.png',
    '/images/illustrations/auth/v2-login-light-border.png',
    '/images/illustrations/auth/v2-login-dark-border.png'
  );

  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
  } = useForm<LoginType>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const [err, setErr] = useState(false);

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        username: data.username,
        password: data.password,
        callbackUrl: '/'
      });

      if (result?.error) {
        setErr(true);
      } else {
        router.push(result?.url || '/home');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      reset();
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setIsPasswordShown(show => !show);

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <div className='pli-6 max-lg:mbs-40 lg:mbe-24'>
          <img
            src={characterIllustration}
            alt='character-illustration'
            className='max-bs-[673px] max-is-full bs-auto'
          />
        </div>
        <img src={authBackground} className='absolute bottom-[4%] z-[-1] is-full max-md:hidden' />
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link className='absolute block-start-5 sm:block-start-[38px] inline-start-6 sm:inline-start-[38px]'>
          <Logo />
        </Link>
        <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <div>
            <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
            <Typography className='mbs-1'>Please sign-in to your account and start the adventure</Typography>
          </div>
          {err && (
            <Alert variant="outlined" severity="error">
              {`Username or password is wrong.`}
            </Alert>
          )}
          <form
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-5'
          >
            <TextField
              {...register('username', { required: 'Username is required' })}
              autoFocus
              fullWidth
              label='Username'
              type='text'
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              {...register('password', { required: 'Password is required' })}
              fullWidth
              label='Password'
              type={isPasswordShown ? 'text' : 'password'}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      size='small'
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={e => e.preventDefault()}
                    >
                      <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <div className='flex justify-between items-center flex-wrap gap-x-3 gap-y-1'>
              <Typography className='text-end' color='primary' component={Link}>
                Forgot password?
              </Typography>
            </div>
            <Button fullWidth variant='contained' 
              type="submit"
              color="primary"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>New on our platform?</Typography>
              <a href="https://www.rajabiller.com/register">
                <Typography color='primary'>
                  Create an account
                </Typography>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

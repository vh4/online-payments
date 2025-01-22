'use client'

// React Imports
import { useRef, useState } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

import { signIn } from 'next-auth/react'

// MUI Imports
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

// Third-party Imports
import classnames from 'classnames'
import ReCAPTCHA from 'react-google-recaptcha'

// Type Imports
import { Alert, CircularProgress } from '@mui/material'

import type { Mode } from '@core/types'

// Component Imports

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

interface LoginType {
  username: string
  password: string
  recaptcha: string
}

const Login = ({ mode }: { mode: Mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [captcha, setCaptcha] = useState<string | null>(null)
  const [err, setErr] = useState(false)
  const captchaRef = useRef<ReCAPTCHA>(null)

  // Hooks
  const router = useRouter()
  const { settings } = useSettings()

  const authBackground = useImageVariant(
    mode,
    '/images/pages/auth-v2-mask-1-light.png',
    '/images/pages/auth-v2-mask-1-dark.png'
  )

  const characterIllustration = useImageVariant(mode, '/login.svg', '/login.svg')

  const {
    handleSubmit,
    reset,
    formState: { errors },
    register
  } = useForm<LoginType>({
    defaultValues: {
      username: '',
      password: '',
      recaptcha: ''
    }
  })

  const handleCaptchaChange = (value: string | null) => {
    setCaptcha(value)
  }

  const onSubmit: SubmitHandler<LoginType> = async data => {
    // if (!captcha) {
    //   alert('Please complete the reCAPTCHA.')
    //   return
    // }

    setLoading(true)

    try {
      const result = await signIn('credentials', {
        redirect: false,
        username: data.username,
        password: data.password,
        recaptcha: captcha,
        callbackUrl: '/'
      })

      if (result?.error) {
        setErr(true)
      } else {
        router.push('/pln')
      }
    } catch (error) {
      console.error('Unexpected error:', error)
    } finally {
      reset()
      captchaRef.current?.reset()
      setLoading(false)
    }
  }

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

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
        <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <div>
            <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
            <Typography className='mbs-1'>Please sign-in to your account and start the adventure</Typography>
          </div>
          {err && (
            <Alert variant='outlined' severity='error'>
              {`Username, password, or reCAPTCHA is invalid.`}
            </Alert>
          )}
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
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
            <ReCAPTCHA
              ref={captchaRef}
              sitekey='6LdGRpEoAAAAAOqcTSI_5GvfV0_FwqiyOAarv9KM'
              onChange={handleCaptchaChange}
            />
            <Button
              fullWidth
              variant='contained'
              type='submit'
              color='primary'
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>New on our platform?</Typography>
              <a href='https://www.rajabiller.com/register'>
                <Typography color='primary'>Create an account</Typography>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

import React from 'react';
import {
  Box,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  Button as ButtonMui,
  Modal,
  Fade,
  Backdrop,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Input, Notification, useToaster } from 'rsuite';
import PropTypes from 'prop-types';
import Profile from './Profile';
import { IconBellRinging, IconMenu } from '@tabler/icons-react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

interface LoginType {
  username: string;
  password: string;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const toaster = useToaster();
  const { data: session, status } = useSession();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginType>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        username: data.username,
        password: data.password,
        callbackUrl:'/'
      });

      if (result?.error) {
        toaster.push(
          <Notification
            className="m-4 pr-24"
            type="error"
            title="Failed"
            header="Failed"
          >
            {'Username or password is wrong.'}
          </Notification>,
          {
            placement: "topEnd",
          }
        );
      } else {
        toaster.push(
          <Notification
            className="m-4 pr-24"
            type="success"
            title="Success"
            header="Success"
          >
            {'Login successful.'}
          </Notification>,
          {
            placement: "topEnd",
          }
        );
        setTimeout(() => {
          handleClose();
        }, 1000);
      }
    } catch (error) {
      toaster.push(
        <Notification
          className="m-4 pr-24"
          type="error"
          title="Failed"
          header="Failed"
        >
          {'An error occurred. Please try again later.'}
        </Notification>,
        {
          placement: "topEnd",
        }
      );
    } finally {
      reset();
      setLoading(false);
    }
  };

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            component="div"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" component="h2" mb={2}>
              Login
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)} // Pass handleSubmit directly
              noValidate
            >
              {/* Username Field */}
              <div>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: 'Username is required.' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Username"
                      style={{ width: '100%', marginBottom: '16px' }}
                    />
                  )}
                />
                <small className="block text-red-500 my-2">{errors.username?.message}</small>
              </div>

              {/* Password Field */}
              <div>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: 'Password is required.' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="password"
                      placeholder="Password"
                      style={{ width: '100%', marginBottom: '16px' }}
                    />
                  )}
                />
                <small className="block text-red-500 my-2">{errors.password?.message}</small>
              </div>

              <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
                <ButtonMui
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </ButtonMui>
                <ButtonMui
                  onClick={handleClose}
                  variant="outlined"
                >
                  Cancel
                </ButtonMui>
              </Stack>
            </form>
          </Box>
        </Fade>
      </Modal>

      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: 'none',
              xs: 'inline',
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>
        <IconButton size="large" aria-label="show notifications" color="inherit">
          <Badge variant="dot" color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge>
        </IconButton>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <ButtonMui
            onClick={handleOpen}
            variant="contained"
            disableElevation
            color="primary"
          >
            Login
          </ButtonMui>
          {}
        </Stack>
      </ToolbarStyled>
    </div>
  );
};

Header.propTypes = {
  toggleMobileSidebar: PropTypes.func.isRequired,
};

export default Header;

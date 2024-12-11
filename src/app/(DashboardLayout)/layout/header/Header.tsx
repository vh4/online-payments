import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  Button as ButtonMui,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import Profile from './Profile';
import { IconBellRinging, IconMenu } from '@tabler/icons-react';
import { Modal, Button } from 'rsuite';
import { useForm, SubmitHandler } from 'react-hook-form';

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

interface LoginType {
  username: string;
  password: string;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger, // Trigger validation manually
  } = useForm<LoginType>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    const isValid = await trigger(); // Validate fields manually
    if (isValid) {
      console.log('Login Data:', data);
      setOpen(false); // Close modal only if no errors
    }
  };

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <Modal keyboard={false} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col items-center w-full"
          >
            <div className="w-full max-w-md">
              {/* Username Field */}
              <div className="mb-4">
                <TextField
                  {...register('username', { required: 'Username is required.' })}
                  label="Username"
                  variant="outlined"
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              </div>

              {/* Password Field */}
              <div>
                <TextField
                  {...register('password', { required: 'Password is required.' })}
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            appearance="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
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
        <IconButton
          size="large"
          aria-label="show notifications"
          color="inherit"
        >
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
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  toggleMobileSidebar: PropTypes.func.isRequired,
};

export default Header;

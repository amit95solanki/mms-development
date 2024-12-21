import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Button } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import AuthContext from '../../../context/AuthProvider';
import SocietySelect from './SocietySelect';

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const NAV_WIDTH = 0;

  const HEADER_MOBILE = 64;

  const HEADER_DESKTOP = 92;

  const StyledRoot = styled(AppBar)(({ theme }) => ({
    ...bgBlur({ color: theme.palette.background.default }),
    boxShadow: 'none',
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${NAV_WIDTH + 1}px)`,
    },
  }));

  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    minHeight: HEADER_MOBILE,
    [theme.breakpoints.up('lg')]: {
      minHeight: HEADER_DESKTOP,
      padding: theme.spacing(0, 5),
    },
  }));
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />
        <Searchbar />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 1,
            sm: 2,
          }}
        >
          {/* <LanguagePopover /> */}
          <SocietySelect />
          <NotificationsPopover />
          {user ? (
            <AccountPopover user={user} />
          ) : (
            <Button
              variant="outlined"
              onClick={() => {
                navigate('');
              }}
            >
              login
            </Button>
          )}
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}

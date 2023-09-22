import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useCurrentUserData } from '../../helpers/useCurrentUserData';
import { useState } from 'react';
import { ENGLISH, RUSSIAN } from '../../constans/languages';
import Brightness4Icon from "@mui/icons-material/Brightness4"; 
import Brightness7Icon from "@mui/icons-material/Brightness7"; 
import i18n from 'i18next'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

interface HeaderProps {
    isDarkTheme: boolean;
    toggleTheme: () => void;
    toggleLanguage: () => void;
  }

export const Header: React.FC<HeaderProps> = ({ isDarkTheme, toggleTheme, toggleLanguage }) => {
    const { isLoggedIn } = useCurrentUserData();
    const { t } = useTranslation();
    const [language, setLanguage] = useState(RUSSIAN);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleToggleLanguage = () => {
        const newLanguage = language === RUSSIAN ? ENGLISH  : RUSSIAN;
        setLanguage(newLanguage); 
        i18n.changeLanguage(newLanguage);
        toggleLanguage();
    };

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const loggedInButtons = (
        <>
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
        </>

    );
    const notLoggedInButtons = (
        <Box mr={2}>
            <Button
                sx={{ m: 1 }}
                component={Link} 
                to="/login"
                className="menuButton"
                color='inherit'
                variant='outlined'
            >
                {t('logIn')}
            </Button>
            <Button
                sx={{ m: 1 }}
                component={Link} 
                to="/registration"
                color='secondary'
                variant='contained'
                className="SignUpButton"
            >
                {t('signUp')}
            </Button>
        </Box>
    );
    const unConditionalButtons = (
        <Box mr={2}>
            <IconButton color="inherit" onClick={toggleTheme} style={{ marginLeft: '10px' }}  sx={{ m: 1 }}>
                {isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Button color='inherit' onClick={handleToggleLanguage} style={{ marginLeft: '10px' }}  sx={{ m: 1 }}>
                {language === RUSSIAN ? ENGLISH : RUSSIAN}
            </Button>
        </Box>
    )
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>My dashboard</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>{unConditionalButtons}</MenuItem>
            {isLoggedIn ? (
                <MenuItem onClick={handleMenuClose}>{loggedInButtons}</MenuItem>
            ) : (
                <MenuItem onClick={handleMenuClose}>{notLoggedInButtons}</MenuItem>
            )}
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
            >
                {t('webBlock')}
            </Typography>
            <Search>
                <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {unConditionalButtons}
                { isLoggedIn ? loggedInButtons : notLoggedInButtons }
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                >
                    <MoreIcon />
                </IconButton>
            </Box>
            </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        </Box>
    );
}
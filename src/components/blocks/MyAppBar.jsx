import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Stack, Typography, Paper } from '@mui/material';
import { Button } from '@mui/material';
import { AppBar, Toolbar, InputBase, IconButton } from '@mui/material';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';

export const MyAppBar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button
          size="large"
          color="appbartitle"
          variant="text"
          startIcon={<LocalCafeIcon />}
          component={Link}
          to={'/'}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, ml: 2, display: { sm: 'block' } }}
          >
            翻訳アプリ
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

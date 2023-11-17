import React from 'react';
import { changeMode } from '@/features/user/userSlice';
import { Stack, IconButton, Theme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useAppDispatch, useAppSelector } from '@/app/store';
import LandingList from '../SimpleList/SimpleList';
// import BasicDetailPanels from '../MasterDetail/MasterDetail';
import '../../main.css';

const TemplateTester = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.user.mode);

  return (
    <Stack
      sx={{
        p: 2,
        boxShadow: 3,
        borderRadius: 5,
        position: 'relative',
        background: (theme: Theme) =>
          mode === 'dark' ? theme.palette.background.paper : theme.palette.background.default,
        backdropFilter: 'blur(10px)',
      }}
      gap={2}
    >
      <IconButton onClick={() => dispatch(changeMode())} sx={{ position: 'absolute', top: 10, right: 10 }}>
        <Brightness4Icon
          sx={{
            transition: 'transform 0.4s',
            transform: mode === 'dark' ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        />
      </IconButton>
      <div style={{ marginTop: 50 }}>
        <LandingList></LandingList>
      </div>
    </Stack>
  );
};

export default TemplateTester;

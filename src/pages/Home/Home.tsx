import React from 'react';
import TemplateTester from '@/components/TemplateTester/TemplateTester';
import { Typography, Stack, Container } from '@mui/material';
import Counter from '@/components/Counter/Counter';

const Home = () => {
  return (
    <Container sx={{ py: 2, position: 'relative' }}>
      <Stack gap={1} my={2}>
        <Typography textAlign="center" variant="h2">
          SpaceX Landing Zones
        </Typography>
        <Typography textAlign="center" variant="subtitle1">
          Click on pictures to find more details
        </Typography>
      </Stack>
      <TemplateTester />
      <Counter />
    </Container>
  );
};

export default Home;

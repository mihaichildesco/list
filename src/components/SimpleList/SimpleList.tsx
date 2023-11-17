import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { ListItemButton } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../../main.css';

interface Images {
  large: string[];
}

interface Mission {
  name: string;
  flight: number;
}

interface LandingZone {
  images: Images;
  name: string;
  full_name: string;
  status: string;
  type: string;
  locality: string;
  region: string;
  latitude: number;
  longitude: number;
  landing_attempts: number;
  landing_successes: number;
  wikipedia: string;
  details: string;
  missions: Mission[];
}

const LandingList: React.FC = () => {
  const [data, setData] = useState<LandingZone[]>([]);
  const [selectedLandingZone, setSelectedLandingZone] = useState<LandingZone | null>(null);

  useEffect(() => {
    // Fetch data from the SpaceX API
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.spacexdata.com/v4/landpads');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLandingZoneClick = (landingZone: LandingZone) => {
    setSelectedLandingZone((prev) => (prev === landingZone ? null : landingZone));
  };

  return (
    <Box>
      <List>
        {data.map((landingZone) => (
          <React.Fragment key={landingZone.name}>
            <ListItemButton onClick={() => handleLandingZoneClick(landingZone)}>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography
                      variant="h1"
                      align="center"
                      marginBottom={2}
                    >{`Landing Zone: ${landingZone.name}`}</Typography>
                    <img
                      src={landingZone.images.large[0]}
                      alt={`Preview of ${landingZone.name}`}
                      style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px' }}
                    />
                  </React.Fragment>
                }
              />
            </ListItemButton>
            {selectedLandingZone === landingZone && (
              <Card>
                <CardContent>
                  <Typography variant="h5">{landingZone.name}</Typography>
                  <Typography color="textSecondary">Status: {landingZone.status}</Typography>
                  <Typography color="textSecondary">Type: {landingZone.type}</Typography>
                  <Typography color="textSecondary">Locality: {landingZone.locality}</Typography>
                  <Typography color="textSecondary">Region: {landingZone.region}</Typography>
                  <Typography color="textSecondary">Latitude: {landingZone.latitude}</Typography>
                  <Typography color="textSecondary">Longitude: {landingZone.longitude}</Typography>
                  <Typography color="textSecondary">
                    Location on Google Maps:{' '}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${landingZone.latitude},${landingZone.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in Google Maps
                    </a>
                  </Typography>
                  <Typography color="textSecondary">Landing Attempts: {landingZone.landing_attempts}</Typography>
                  <Typography color="textSecondary">Landing Successes: {landingZone.landing_successes}</Typography>
                  <Typography color="textSecondary">
                    Wikipedia:{' '}
                    <a href={landingZone.wikipedia} target="_blank" rel="noopener noreferrer">
                      Link
                    </a>
                  </Typography>
                  <Typography color="textSecondary">Details: {landingZone.details}</Typography>
                  {/* <Typography color="textSecondary">
                    Missions:{' '}
                    {landingZone.missions.map((mission) => (
                      <span key={mission.flight}>
                        {mission.name} (Flight: {mission.flight}),{' '}
                      </span>
                    ))}
                  </Typography> */}
                </CardContent>
              </Card>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default LandingList;

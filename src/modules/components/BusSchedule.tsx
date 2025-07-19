import React, { useMemo } from 'react';
import { Paper, Typography, Box } from '@mui/material';

// Sample schedule (24-hour format)
const busSchedule = [
  { name: 'Bus A', time: '08:00', road: 'Arandangi' },
  { name: 'Bus B', time: '10:30', road: 'Arandangi' },
  { name: 'Bus C', time: '12:00', road: 'Arandangi' },
  { name: 'Bus D', time: '14:45', road: 'Arandangi' },
  { name: 'Bus E', time: '16:00', road: 'Arandangi' },
  { name: 'Bus F', time: '18:15', road: 'Arandangi' },
  { name: 'Bus G', time: '01:50', road: 'Arandangi' }, // next day early bus
];

// Convert time string to total minutes since midnight
const parseTime = (time: string): number => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

// Convert to AM/PM display
const formatTimeAMPM = (time: string): string => {
  const [hStr, mStr] = time.split(':');
  let hour = parseInt(hStr);
  const min = parseInt(mStr);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour}:${min.toString().padStart(2, '0')} ${ampm}`;
};

const BusSchedule = ({data}: any) => {
  console.log('BusSchedule data:', data);
  
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const upcoming = useMemo(() => {
    // Add current time tolerance (for example, current bus = within 10 minutes of now)
    const tolerance = 10;

    const allSorted = [...data]
      .map((bus) => ({
        ...bus,
        totalMinutes: parseTime(bus.time),
      }))
      .sort((a, b) => a.totalMinutes - b.totalMinutes);

    // Handle buses from next day (e.g., 01:50 AM) — treat as after midnight
    const todayBuses = allSorted.filter((bus) => bus.totalMinutes >= currentMinutes);
    const nextDayBuses = allSorted.filter((bus) => bus.totalMinutes < currentMinutes);

    const fullList = [...todayBuses, ...nextDayBuses];

    // Find if any bus is current (within tolerance of now)
    const currentBus = fullList.find(
      (bus) =>
        Math.abs(bus.totalMinutes - currentMinutes) <= tolerance
    );

    // Exclude current bus from upcoming
    const upcomingBuses = fullList.filter(
      (bus) => !currentBus || bus.name !== currentBus.name
    );

    return {
      currentBus,
      upcoming: upcomingBuses,
    };
  }, [data, currentMinutes]);

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 2, mt: 2 }}>

      {upcoming.currentBus && (
        <Paper sx={{ p: 2, backgroundColor: '#e0f2f1' }}>
          <Typography fontWeight="bold">🟢 Current Bus: {upcoming.currentBus.name}</Typography>
          <Typography>🕒 Time: {formatTimeAMPM(upcoming.currentBus.time)}</Typography>
          <Typography>🛣️ Road: {upcoming.currentBus.road}</Typography>
        </Paper>
      )}

      {upcoming.upcoming.length > 0 ? (
        upcoming.upcoming.map((bus, idx) => (
          <Paper key={idx} sx={{ p: 2 }}>
            <Typography fontWeight="bold">🚌 Upcoming Bus: {bus.name}</Typography>
            <Typography>🕒 Time: {formatTimeAMPM(bus.time)}</Typography>
            <Typography>🛣️ Road: {bus.road}</Typography>
          </Paper>
        ))
      ) : (
        <Typography>No upcoming buses for today.</Typography>
      )}
    </Box>
  );
};

export default BusSchedule;

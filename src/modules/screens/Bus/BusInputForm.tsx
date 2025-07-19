import React, { useEffect, useState } from 'react';
import {
    Typography,
    Button,
    TextField,
    Paper,
    Box,
} from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import BusSchedule from '../../components/BusSchedule';
import { Add } from '@mui/icons-material';
import BasicModal from '../../components/Model';
import TransparentLoader from '../../components/TransparentLoader';
import { useSelector } from 'react-redux';
import { store } from '../../service/redux/store';
import { getBus } from '../../service/apis/userService';

const busImage = require('../../assets/bus.jpg'); // Replace with your bus image URL


const BusInputForm = () => {
    const { bus } = useSelector(({ user }: any) => user);

    const [busName, setBusName] = useState('');
    const [road, setRoad] = useState('');
    const [time, setTime] = useState<Date | null | any>(new Date());
    const [open, setOpen] = React.useState(false);

    // Validation states
    const [errors, setErrors] = useState({
        busName: false,
        road: false,
        time: false,
    });

    const handleSubmit = () => {
        const isBusNameValid = busName.trim() !== '';
        const isRoadValid = road.trim() !== '';
        const isTimeValid = !!time;

        setErrors({
            busName: !isBusNameValid,
            road: !isRoadValid,
            time: !isTimeValid,
        });

        if (isBusNameValid && isRoadValid && isTimeValid) {
            console.log({
                name: busName,
                road,
                time: time?.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            });
        }
    };

    const Model = () => {
        return (
            <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                    🚌 Add Bus Details
                </Typography>

                <TextField
                    label="Bus Name"
                    fullWidth
                    margin="normal"
                    value={busName}
                    onChange={(e) => setBusName(e.target.value)}
                    error={errors.busName}
                    helperText={errors.busName ? 'Bus name is required' : ''}
                />

                <TextField
                    label="Road"
                    fullWidth
                    margin="normal"
                    placeholder="from - to"
                    value={road}
                    onChange={(e) => setRoad(e.target.value)}
                    error={errors.road}
                    helperText={errors.road ? 'Road is required' : ''}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker']}>
                        <TimePicker label="Time"
                            onChange={(newValue) => setTime(newValue)}
                        />
                    </DemoContainer>
                </LocalizationProvider>

                <Box textAlign="right" mt={2}>
                    <Button variant="contained" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box>
            </Paper>
        )
    }

      useEffect(() => {
            const fetchList = async () => {
                await store.dispatch(getBus({}));
            }
            fetchList();
        }, [])

    return (
        <Box>
            {bus?.isLoading
                && <TransparentLoader />}
            <BasicModal open={open} setOpen={setOpen}>
                <Model />
            </BasicModal>
            <Button variant='contained' sx={{
                mb: 2
            }}
                onClick={() => setOpen((pre) => !pre)}
            >
                <Add /> Add New Bus
            </Button>
            <div
                style={{
                    backgroundImage: `url(${busImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    minHeight: '100vh',
                    padding: '20px 0',
                }}
            >
                <Box sx={{
                    mb: 2,
                    mt: 2,
                }}>
                    <BusSchedule data={bus?.data} />
                </Box>
            </div>
        </Box>
    );
};

export default BusInputForm;

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect({ data, dropDown, setDropDown, label, width }: any) {

    const handleChange = (event: SelectChangeEvent) => {
        setDropDown(event.target.value as string);
    };
    return (
        <Box sx={{ width: width }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={dropDown}
                    label={label}
                    onChange={handleChange}
                >
                    {data?.map((item: string | number | readonly string[] | undefined, index: any) => 
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    );
}

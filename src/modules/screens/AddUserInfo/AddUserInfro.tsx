import React, { useState } from 'react';
import {
    Paper, Typography, TextField, Button, Box
} from '@mui/material';

const AddUserInfo = () => {
    const [name, setName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [contact, setContact] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [errors, setErrors] = useState({
        name: false,
        familyName: false,
        image: false,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        const newErrors = {
            name: !name,
            familyName: !familyName,
            image: !image,
        };
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(Boolean);
        if (!hasErrors) {
            console.log({ name, familyName, contact, image });
            alert('Form submitted!');
        }
    };

    return (
        <Paper sx={{ p: 3, mx: 'auto', mt: 4, overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom>
                👪 Family Information Form
            </Typography>
            <Box mb={2}>
                <TextField
                    label="Your Name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                    helperText={errors.name ? 'Name is required' : ''}
                />
            </Box>

            <Box mb={2}>
                <TextField
                    label="Family Member Name"
                    fullWidth
                    value={familyName}
                    onChange={(e) => setFamilyName(e.target.value)}
                    error={errors.familyName}
                    helperText={errors.familyName ? 'Family member name is required' : ''}
                />
            </Box>

            <Box mb={2}>
                <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    color={errors.image ? 'error' : 'primary'}
                >
                    Upload Image
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                    />
                </Button>
                {errors.image && (
                    <Typography variant="caption" color="error">
                        Image is required
                    </Typography>
                )}
            </Box>

            {preview && (
                <Box mb={2}>
                    <Box
                        component="img"
                        src={preview}
                        alt="Preview"
                        sx={{ width: '100%', maxHeight: '200px', objectFit: "contain", borderRadius: 2 }}
                    />
                </Box>
            )}

            <Box mb={2}>
                <TextField
                    label="Contact Number (Optional)"
                    fullWidth
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                />
            </Box>

            <Box textAlign="right">
                <Button variant="contained" onClick={handleSubmit}>
                    Submit
                </Button>
            </Box>
        </Paper>
    );
};

export default AddUserInfo;

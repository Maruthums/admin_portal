import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { color } from '../../styles/color';

const getDriveImageUrl = (fileId: string) => `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;


const UserCard = ({ people }: any) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {people?.map((person: any, index: any) => {
                    return (
                        <Grid size={{ xs: 12, md: 4, lg: 3 }} key={index}>
                            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 3 }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={getDriveImageUrl(person.image)}
                                    alt={person.name}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent>
                                    <Typography variant="h6"
                                        sx={{
                                            fontSize: { xs: 16, md: 20 },
                                            fontWeight: 600,
                                            color: color.Mono5
                                        }} gutterBottom>
                                        {person.name}
                                    </Typography>
                                    <Typography sx={{
                                        color: color.Mono5
                                    }}>
                                        {person.family ?? 'No family members listed Available'}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default UserCard;

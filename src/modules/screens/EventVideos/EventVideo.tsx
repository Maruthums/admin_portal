import React, { use, useEffect, useRef, useState } from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Grid,
    Box,
} from '@mui/material';
import { store } from '../../service/redux/store';
import { getVideos } from '../../service/apis/userService';
import { useSelector } from 'react-redux';
import TransparentLoader from '../../components/TransparentLoader';
import { color } from '../../styles/color';

const VideoCard = () => {
    const { videos } = useSelector(({ user }: any) => user);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);
    console.log('videos', videos);

    const handlePlay = (index: number) => {
        videoRefs.current.forEach((video, i) => {
            if (video && i !== index) {
                video.pause();
            }
        });
        setPlayingIndex(index);
    };

    useEffect(() => {
        const fetchList = async () => {
            await store.dispatch(getVideos({}));
        }
        fetchList();
    }, [])

    return (
        <Box sx={{ p: 2 }}>
            {videos?.isLoading
                && <TransparentLoader />}
            <Typography sx={{
                mb: 2,
                fontSize: { xs: 16, md: 20 },
                fontWeight: 600,
                color: color.Mono5
            }}>
                Video Gallery
            </Typography>
            <Grid container spacing={3}>
                {videos?.data?.map((video: any, index: any) => {
                    const youTubeId = video?.videoId
                    const isPlaying = index === playingIndex;

                    return (
                        <Grid size={{ xs: 12, md: 4, lg: 3 }} key={index}>
                            <Card>
                                {youTubeId ? (
                                    <CardMedia
                                        component="iframe"
                                        src={`https://www.youtube.com/embed/${youTubeId}?autoplay=${isPlaying ? 1 : 0}`}
                                        onClick={() => setPlayingIndex(index)}
                                        sx={{ height: 200 }}
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                    />
                                ) : (
                                    <CardMedia
                                        component="video"
                                        src={video.url}
                                        controls
                                        muted
                                        sx={{ height: 200 }}
                                        ref={(el) => {
                                            videoRefs.current[index] = el;
                                        }}
                                        onPlay={() => handlePlay(index)}
                                    />
                                )}
                                <CardContent>
                                    <Typography variant="subtitle1" noWrap>
                                        {video.title}
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

export default VideoCard;

import {
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Typography,
    Box,
    Paper,
} from '@mui/material';

type GroupedImageListsProps = {
    groupedData: Record<string, { name: string; image: string }[]>;
    openModel: any
};

// ✅ Helper to build proper Google Drive image URL
function srcset(imageId: string, width: number, height: number, rows = 1, cols = 1) {
    const totalHeight = height * rows;
    const thumbnailUrl = `https://drive.google.com/thumbnail?id=${imageId}&sz=w1000`;
    return {
        src: thumbnailUrl,
        srcSet: thumbnailUrl,
        style: {
            height: totalHeight,
            objectFit: "cover",
            borderRadius: 8,
            display: "block",
        },
    };
}

function GroupedImageLists({ groupedData, openModel }: GroupedImageListsProps) {
    return (
        <Box sx={{ p: 2 }}>
            {Object.entries(groupedData).map(([groupTitle, images]) => {
                const itemData = images.map((item, index) => ({
                    img: item.image,
                    title: item.name,
                    featured: index === 0 || index % 6 === 0,
                }));

                return (
                    <Box key={groupTitle} sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom>
                            {groupTitle}
                        </Typography>
                        <Paper sx={{ p: 1 }}>
                            <ImageList
                                sx={{
                                    width: { xs: '100%', md: 1000 },
                                    transform: 'translateZ(0)',
                                }}
                                rowHeight={200}
                                gap={1}
                            >
                                {itemData.map((item, i) => {
                                    const cols = item.featured ? 2 : 1;
                                    const rows = item.featured ? 2 : 1;
                                    const { src, srcSet, style }: any = srcset(item.img, 250, 200, rows, cols);

                                    return (
                                        <ImageListItem onClick={() => openModel(item)} key={i} cols={cols} rows={rows}>
                                            <img
                                                src={src}
                                                srcSet={srcSet}
                                                alt={item.title}
                                                loading="lazy"
                                                style={style}
                                            />
                                            <ImageListItemBar
                                                title={item.title}
                                                position="bottom"
                                            />
                                        </ImageListItem>
                                    );
                                })}
                            </ImageList>
                        </Paper>
                    </Box>
                );
            })}
        </Box>
    );
}

export default GroupedImageLists;

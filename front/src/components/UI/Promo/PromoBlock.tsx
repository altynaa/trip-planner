import React from 'react';
import {
    Box,
    Card,
    CardMedia, Container,
    Grid, styled,
    Typography
} from "@mui/material";

const ImageCardMedia = styled(CardMedia)({
    height: 200,
});

const PromoBlock = () => {
    const promoItems = [
        {title: 'Some travel title', photo: '/assets/images/hotel.jpeg'},
        {title: 'Some travel title', photo: '/assets/images/travel1.jpeg'},
        {title: 'Some travel title', photo: '/assets/images/travel2.jpeg'},
        {title: 'Some travel title', photo: '/assets/images/travel.jpeg'}
    ];

    return (
        <Container maxWidth="xl">
            <Box display="flex" alignItems="center" justifyContent="center" marginBottom={2}>
                <Typography> Choose your destination with BonVoyage </Typography>
            </Box>
            <Grid container spacing={4}>
                {promoItems.map((item, index) => (
                    <Grid item xs={8} sm={6} md={4} lg={3} key={index}>
                        <Card>
                            <ImageCardMedia image={item.photo} title={item.title}/>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Typography
                                    variant="h6" style={{color: "#3f51b5"}}
                                >
                                    {item.title}
                                </Typography>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default PromoBlock;




import React, { useState } from "react";
import Paper from '@material-ui/core/Paper';
import {Grid, Card, CardContent, CardActionArea,
   CardMedia,CardActions, Button, Typography, makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
});

const Details = ({ business }) => {
  const classes = useStyles();
//   const [pixelColor, changeColor] = useState(color);
const { business_images } = business;
let imgUrl = '';
if(business_images !== undefined && business_images.length>0) {
  imgUrl = business_images[0].image_url;
}
  return (
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={business.title}
          height="200"
          image={imgUrl}
          title={business.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {business.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {business.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
        </Grid>
  );
};

export default Details;
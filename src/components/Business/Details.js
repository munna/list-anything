import React, { useState } from "react";
import Paper from '@material-ui/core/Paper';
import {Grid, Card, CardContent, CardActionArea,
   CardMedia,CardActions, Button, Typography, Container, makeStyles} from '@material-ui/core';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import { Twitter, Facebook, LinkedIn, GitHub, Instagram } from '@material-ui/icons';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const useStyles = makeStyles({
  business_area:{
    backgroundColor:'#fff',
    width:'100%',
    height:'90vh',
    overflowY:'hidden',
  },
  title: {
    fontSize:'30px',
    fontWeight:'bold',
    textAlign: 'left',
    padding: '0px 10px'
  },
  table:{
    width:'98%'
  }
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
    
    <Container maxWidth="xl" style={{marginTop:'20px'}}>
      <Grid container spacing={0}>

      <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
        <Paper className={classes.business_area} elevation={3} >
        <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableBody>
        <TableRow>
            <TableCell colSpan={2} component="h2"  variant="h2">
              {business.title}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} component="th" scope="row">
              Contact Information
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Name
            </TableCell>
            <TableCell>
              {business.contact_owner}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Mobile No
            </TableCell>
            <TableCell>
              {business.mobile_no}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Email
            </TableCell>
            <TableCell>
              {business.email}
            </TableCell>
          </TableRow>
          <TableRow>
          <TableCell component="th" scope="row">
              Social
            </TableCell>
            <TableCell >
              <Twitter color="primary"  fontSize="large" />
              <Facebook color="primary"  fontSize="large" />
              <LinkedIn  fontSize="large" />
              <Instagram  fontSize="large" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
          </Paper>
      </Grid>
      <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
        <Carousel showThumbs={false} dynamicHeight={false}>
          {business_images.map(item=>{
            return <div style={{height:'350px'}}>
                <img src={item.image_url} alt="business.title" />
                  <p className="legend">{business.title}</p>
            </div>
          })}
          </Carousel>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography component="h1" className={classes.title}>{business.title}</Typography>
            <Typography component="div">{business.description}</Typography>

            </Grid>
          </Grid>
      </Grid>
      </Grid>
    
    </Container>
  );
};

export default Details;

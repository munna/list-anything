import React, { useState, useEffect, useRef } from 'react';
import { useRouteMatch, useParams } from 'react-router-dom';
import { useQuery } from "@apollo/react-hooks";
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import { AddCircleOutline, Email } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { GET_BUSINESS_BY_URL } from '../../constants/graphql/business';
import Details from '../../components/Business/Details';

const Alert=(props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const BusinessDetails = () => {
    // let match = useRouteMatch();
    const { url }= useParams();
    const { loading, error, data } = useQuery(GET_BUSINESS_BY_URL, {
        variables: { url },
      });
    if (loading) {
        return <></>;
    }
    const { business } = data;
    return (
      <div className="content">
        <Grid container spacing={3}>
            
          {
            business.map(b=>{
              return <Details business={b}></Details>
            })
          }
        </Grid>
      </div>
    );
}
export default BusinessDetails;
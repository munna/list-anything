import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_BUSINESS } from './constants/graphql/business';
import Business from "./components/Business/Index";
import AddBusiness from "./components/AddBusiness/Index";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';



function App() {
  const { loading, error, data } = useQuery(GET_BUSINESS);
  if (loading) {
      return <></>;
  }
  const { business } = data;
  return (
    <div className="content">
      <div className="logo">Business Listing</div>
      <Grid container spacing={3}>
          
        {
          business.map(b=>{
            return <Business business={b}></Business>
          })
        }
      </Grid>
        <AddBusiness  />
      {/* <p>Pick a Color</p>
      <ColorPicker changeColor={changeColor} />
      <p>Click a Pixel</p>
      <div className="container">
        {pixels.map((pixel, idx) => (
          <Pixel color={pixel} key={idx} newColor={color} />
        ))}
      </div> */}
    </div>
  );
}

export default App;

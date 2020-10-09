import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_BUSINESS } from '../../constants/graphql/business';
import Business from "../../components/Business/Index";
import AddBusiness from "../../components/AddBusiness/Index";
import Grid from '@material-ui/core/Grid';



function BusinessList({ history }) {
  const { loading, error, data } = useQuery(GET_BUSINESS);
  if (loading) {
      return <></>;
  }
  const { business } = data;
  return (
    <div className="content" style={{marginTop: '100px'}}>
      <Grid container spacing={3}>
          
        {
          business.map(b=>{
            return <Business business={b} history={history}></Business>
          })
        }
      </Grid>
        <AddBusiness  />
    </div>
  );
}

export default BusinessList;

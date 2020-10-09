import React, { useState, useEffect, useRef } from 'react';
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {Drawer, TextField, Button,Fab, CircularProgress,Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { loadModules } from 'esri-loader';
import { AddCircleOutline, Email } from '@material-ui/icons';
import {DropzoneArea} from 'material-ui-dropzone'
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import randomstring from 'randomstring';

import request from 'superagent';
import { SAVE_BUSINESS, SAVE_BUSINESS_IMAGES } from '../../constants/graphql/business';

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

const AddBusiness = ({ business }) => {
  
  const [open, setOpen] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [addressLocation, setAddresLocation] = React.useState({});

  const classes = useStyles();
  const addressField = useRef(null);
  const formRef = useRef(null);
  let search = null;
  useEffect(()=>{
    loadModules(['esri/widgets/Search'], { css: true })
      .then(([Search]) => {
        if(search !== null) { 
          search.destroy();
        }
        search = new Search({
          container: 'dvspotsearch',
        });
      
        // this.search = search;
        search.on('select-result', (event) => {
          const selectedLocation = event.result.feature;
         //  this.setState({ selectedLocation: event.result.feature });
           const { geometry: { longitude, latitude }, attributes: { Match_addr } } = selectedLocation;
          // stories[currentNo].address = Match_addr;
          // stories[currentNo].latitude = latitude;
          // stories[currentNo].longitude = longitude;
          setAddresLocation({address: Match_addr, latitude, longitude});
          
        });
        // setOpen(false);
        clearForm();
      });
  },[open, successMessage])


  
  const [saveBusiness, { data,loading: savingBusiness }] = useMutation(SAVE_BUSINESS);
  const [saveBusinessImages, { data: imagesData,loading: savingImages }] = useMutation(SAVE_BUSINESS_IMAGES);
  const [files, setFiles] = React.useState([]);
  const [error, setError] = React.useState({title: ''});

  const handleOpen = () => {
    setOpen(true);
  };

  const toggleDrawer =()=>{
    setOpen(!open);
  }
  const handleChange = (files) =>{
    setFiles(files);
  }
  const uploadFiles = (business_id, files) => {
    const url = `https://api.cloudinary.com/v1_1/dbsi1o9qm/upload`;
    const title = 'test';
    const promissAll = [];
    for (let file of files) {
        // const photoId = this.photoId++;
        const fileName = file.name;
       promissAll.push(new Promise((resolve,reject)=>{
        request.post(url)
        .field('upload_preset', 'ml_default')
        .field('file', file)
        .field('multiple', true)
        .field('tags', title ? `myphotoalbum,${title}` : 'myphotoalbum')
        .field('context', title ? `photo=${title}` : '')
        // .on('progress', (progress) => this.onPhotoUploadProgress(photoId, file.name, progress))
        .end((error, response) => {
          if(response !== undefined) {
            resolve(response.body.secure_url);
          }
            //this.onPhotoUploaded(photoId, fileName, response);
        });
       }));
      }
      let jsonData = {objects: []};
      Promise.all(promissAll).then(values=>{
        values.forEach(value => {
          jsonData.objects.push({business_id:business_id,image_url: value})
        });
        saveBusinessImages({variables:jsonData}).then(d=>{
          setSuccessMessage(true);
          clearForm();
        }).catch(err=>{
          setSuccessMessage(true);
          clearForm();
        });
      }); 
    }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = validateForm();
    if(formData === null)
      return;
    formData.files = files;
    console.log(formData);
    if(addressLocation.latitude === undefined || addressLocation.latitude === "") {
      alert("Please select location on map");
    } else {
      formData.lat = addressLocation.latitude;
      formData.lng = addressLocation.longitude;
      const {title, description, contact_owner ,address ,lat ,lng ,category ,email ,mobile_no } = formData;
      
      saveBusiness({variables: 
        {
          "title": title,
          "description": description,
          "contact_owner": contact_owner,
          "address": address,
          "lat": lat.toString(),
          "lng": lng.toString(),
          "created_at": (new Date()).toUTCString(),
          "category": category,
          "email": email,
          "mobile_no": mobile_no.toString(),
          "url": randomstring.generate(10)
        }
      }).then(d=>{
        const data = d.data;
        if(data.insert_business.affected_rows>0) {
          const returning = d.data.insert_business.returning[0];
          const { id } = returning;
          if(files.length > 0 ){
            uploadFiles(id,files);
          } else {
            setSuccessMessage(true);
            clearForm();
          }
        }
      }).catch(err=>{
        console.log(err);
      });

    }
  }
  const clearForm = () => {
    if(formRef == null || formRef.current === null) 
      return;
    Array.prototype.forEach.call(formRef.current.elements, function(element) {
      if(element.name === undefined || element.name === '')
        return;
        element.value = "";
    });
  }
  const validateForm = () => {
    const requiredFields = ["title","description","address","contact_owner","mobile_no"];
    const erroritems = {};
    const formData ={}
    requiredFields.forEach(item=>{
      const value = formRef.current.elements[item].value;
      if(value === '') {
        erroritems[item] = 'required';
      }
    });
    setError(erroritems);
    if(Object.keys(erroritems).length > 0) {
      return null;
    } else {
      Array.prototype.forEach.call(formRef.current.elements, function(element) {
        if(element.name === undefined || element.name === '')
          return;
        formData[element.name] = element.value;
      });
      return formData;
    }
  }
  const handleSnackBarClose = ()=>{
    setSuccessMessage(false);
  }
  const handleAddressChange=(e)=>{
    const addressData = Object.assign({},addressLocation);
    addressData.address = e.target.value;
    setAddresLocation(addressData);
  }
    
  const body = (
    <div>
      <h2>
  New Business
  </h2>
      <hr/>
      <form id="simple-modal-description" onSubmit={handleSubmit} noValidate ref={formRef}>
        <div className={classes.margin}>
          <label style={{float: 'left'}}>Select Your Location</label>
          <div id="dvspotsearch" name="dvspotsearch" style={{width:'100%'}}></div>
        </div>
        <div className={classes.margin}>
          <TextField name="title" label="What is name of your business?"  error={error.title} fullWidth variant="standard" inputMode="text" required></TextField>
        </div>
        <div className={classes.margin}> 
          <TextField name="category" label="In which category your business belongs?" fullWidth variant="standard" inputMode="text" required></TextField>
        </div>
        <div className={classes.margin}>         
          <TextField name="address" label="Where is located this business?" ref={addressField} onChange={(e)=>{handleAddressChange(e)}} value={addressLocation.address} fullWidth variant="standard" inputMode="text" required></TextField>
        </div>
        <div className={classes.margin}>
        <TextField name="description"  label="Descibe your business with few words" error={error.description} multiline rowsMax="4" fullWidth variant="standard" inputMode="text" required> </TextField>
        </div>
        
        <div className={classes.margin}>
          <TextField name="contact_owner" label="Proivde name of contact person" error={error.contact_owner} fullWidth variant="standard" inputMode="text"></TextField>
        </div>
        <div className={classes.margin}>
          <TextField name="email" label="Provide email address"  error={error.email} fullWidth variant="standard" inputMode="email"></TextField>
        </div>
        <div className={classes.margin}>
          <TextField name="mobile_no" label="Contact person mobile number" error={error.mobile_no} fullWidth variant="standard" inputMode="numeric"></TextField>
        </div>
        <div  className={classes.margin} style={{maxWidth:'450px'}}>
        <DropzoneArea style={{height:'100px'}}
        name="files" filesLimit={3} 
        onChange={handleChange}
        />
        </div>
        <div>
          <Button className={classes.margin} disabled={savingBusiness} size="large" color="primary" variant="contained" type="submit" >Save</Button>
          {(savingBusiness || savingImages) && <CircularProgress size={24} className={classes.buttonProgress} />}
          <Button className={classes.margin}  variant="contained" size="large" type="button" onClick={clearForm}>Clear</Button>
          <Snackbar open={successMessage} autoHideDuration={6000} onClose={handleSnackBarClose}>
          <Alert onClose={handleSnackBarClose} severity="success">
            <strong>Congratulations!</strong> Created profile successfully.
          </Alert>
</Snackbar>
        </div>
      </form>
    </div>
  );

      return (
        <>
        <Fab color="secondary" style={{position:'fixed',bottom:'20px',right:'0px'}} variant="extended" onClick={toggleDrawer} aria-label="add">
  <AddCircleOutline className={classes.extendedIcon} />
  Add New Business
</Fab>
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
            {body}
          </Drawer>
      </>
      );
    };
export default AddBusiness;
    
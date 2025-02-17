import React, { useState } from "react";
import { TextField, MenuItem, Button, Typography, Box } from "@mui/material";
import dayjs from "dayjs";

const PersonForm = () => {
  const [person, setPerson] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    title: "",
  });

  const titles = ["Mr", "Mrs", "Ms", "Dr", "Prof"];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPerson({ ...person, [name]: value });
  };

  const handleDateChange = (event) => {
    setPerson({ ...person, dob: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        width: 400,
        margin: "auto",
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Person Information Form
      </Typography>
      <form onSubmit={handleSubmit}>
       
        <TextField 
        label ="First Name"
        variant = "outlined"
        fullWidth
        name =  "firstName"
        value = {person.firstName}
        onChange = {handleChange}
        sx = {{mb: 2}}
        />

        <TextField 
        label = "Last Name"
        variant = "outlined"
        fullWidth
        name = "lastName"
        value = {person.lastName}
        onChange={handleChange}
        sx = {{mb: 2}}
        />

        <TextField 
        label = "Date of Birth"
        type = "date"
        variant="outlined"
        fullWidth
        name = "dob"
        value = {person.dob}
        onChange={handleChange}
        InputLabelProps = {{shrink: true}}
            sx={{mb: 2}}
        />

        <TextField 
        select
        label = "Title"
        variant="outlined"
        fullWidth
        name ="title"
        value = {person.title}
        onChange={handleChange}
        sx={{mb: 2}}
        >
        {titles.map((option) =>(
            <MenuItem key={option} value={option}>
            {option}
            </MenuItem>
        )) }
        </TextField>
        
        <Button type="submit" variant="contained" color="primary"fullWidth>
            Submit

        </Button>
        
      </form>

      {person.firstName &&(
        <Box mt={3} p={2} bgcolor="grey.100">
        <Typography variant="h6">Stored Information:</Typography>
        <Typography>Title: {person.title}</Typography>
        <Typography>Name: {person.firstName} {person.lastName}</Typography>
        <Typography>Date of Birth: {dayjs(person.dob).format("DD/MM/YYYY")}</Typography>
 </Box>
      )}
   </Box>
  );
};

export default PersonForm;

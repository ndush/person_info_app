import React, { useState } from "react";
import { TextField, MenuItem, Button, Typography, Box } from "@mui/material";
import axios from "axios";

const PersonForm = () => {
  const [person, setPerson] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    title: "",
  });

  const [errors, setErrors] = useState({});

  const titles = ["Mr", "Mrs", "Ms", "Dr", "Prof"];

  const validateForm = () => {
    let newErrors = {};

    if (!person.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!person.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!person.dob) newErrors.dob = "Date of birth is required";
    if (!person.title) newErrors.title = "Title is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPerson({ ...person, [name]: value });
  };

  const handleDateChange = (event) => {
    setPerson({ ...person, dob: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:5173/api/persons", person);
      setPerson({ firstName: "", lastName: "", dob: "", title: "" });
      setErrors({});
    } catch (error) {
      console.error("There was an error adding the person!", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ width: 400, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Person Information Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            name="firstName"
            value={person.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            name="lastName"
            value={person.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Date of Birth"
            type="date"
            variant="outlined"
            fullWidth
            name="dob"
            value={person.dob}
            onChange={handleDateChange}
            InputLabelProps={{ shrink: true }}
            error={!!errors.dob}
            helperText={errors.dob}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Title"
            variant="outlined"
            fullWidth
            name="title"
            value={person.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            sx={{ mb: 2 }}
          >
            {titles.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default PersonForm;

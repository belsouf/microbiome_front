import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  TextField,
  Typography,
  Stack,
  Divider,
  Box,
} from "@mui/material";

import api from "../../helpers/api";

const validationSchema = yup.object({
  name: yup
    .string("Veuillez saisir le nom de l'organisation")
    .required("Champ obligatoire"),
});

const OrganizationForm = ({ onOrganizationSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      api
        .post(`/organizations`, values)
        .then(function (response) {
          onOrganizationSubmit(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Nouvelle organisation
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 2 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Nom"
          name="name"
          autoComplete="name"
          autoFocus
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          margin="normal"
          name="description"
          label="Description"
          id="description"
          fullWidth
          multiline
          rows={4}
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <Stack
          direction="row"
          spacing={2}
          justifyContent="end"
          sx={{ mt: 2, mb: 2 }}
        >
          <Button variant="outlined">Annuler</Button>
          <Button variant="contained" type="submit">
            Enregistrer
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default OrganizationForm;

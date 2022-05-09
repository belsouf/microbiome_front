import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  TextField,
  Typography,
  Stack,
  Divider,
  MenuItem,
  Box,
} from "@mui/material";

import api from "../../helpers/api";

const validationSchema = yup.object({
  code: yup
    .string("Veuillez saisir le code du projet")
    .required("Champ obligatoire"),
  user_id: yup
    .string("Veuillez choisir un utilisateur")
    .required("Champ obligatoire"),
});

const ProjectForm = ({ onProjectSubmit }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      user_id: "",
      code: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      api
        .post(`/users/${values.user_id}/projects`, values)
        .then(function (response) {
          onProjectSubmit(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Nouveau projet
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
          id="code"
          label="Code"
          name="code"
          autoComplete="code"
          autoFocus
          value={formik.values.code}
          onChange={formik.handleChange}
          error={formik.touched.code && Boolean(formik.errors.code)}
          helperText={formik.touched.code && formik.errors.code}
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
        {users && (
          <TextField
            margin="normal"
            id="user_id"
            name="user_id"
            label="Utilisateur"
            select
            required
            fullWidth
            value={formik.values.user_id}
            onChange={formik.handleChange}
            error={formik.touched.user_id && Boolean(formik.errors.user_id)}
            helperText={formik.touched.user_id && formik.errors.user_id}
          >
            {users.map((user, i) => (
              <MenuItem key={i} value={user.id}>
                {`${user.first_name} ${user.last_name}`}
              </MenuItem>
            ))}
          </TextField>
        )}
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

export default ProjectForm;

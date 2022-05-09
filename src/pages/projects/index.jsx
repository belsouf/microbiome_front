import React, { useState, useEffect } from "react";
import {
  Stack,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
  Drawer,
  Box,
} from "@mui/material";

import api from "../../helpers/api";

import Layout from "../../common/components/Layout";
import ProjectForm from "./form";

const Projects = () => {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects").then((response) => {
      setProjects(response.data);
    });
  }, []);

  const onProjectSubmit = (data) => {
    setProjects([data, ...projects]);
    setToggleDrawer(false);
  };

  return (
    <Layout>
      <Container>
        <Stack sx={{ py: 4 }} direction="row" justifyContent="space-between">
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Liste des projets
          </Typography>
          <Button variant="contained" onClick={() => setToggleDrawer(true)}>
            Nouveau projet
          </Button>
        </Stack>

        {projects && (
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Utilisateur</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((project, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {project.code}
                    </TableCell>
                    <TableCell>{project.description}</TableCell>
                    <TableCell>{`${project.owner.first_name} ${project.owner.last_name}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>

      <Drawer
        anchor="right"
        open={toggleDrawer}
        onClose={() => setToggleDrawer(false)}
      >
        <Box sx={{ width: 450, px: 4, py: 5 }}>
          <ProjectForm onProjectSubmit={onProjectSubmit} />
        </Box>
      </Drawer>
    </Layout>
  );
};

export default Projects;

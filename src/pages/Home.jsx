import React, { useState } from "react";
import {
  Button,
  Stack,
  Container,
  Typography,
  Drawer,
  Box,
} from "@mui/material";

import Layout from "../common/components/Layout";
import ProjectForm from "./projects/form";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const navigate = useNavigate();
  return (
    <Layout>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{ pt: 8 }}
        >
          Microbiome
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Bienvenue dans le portail de gestion des projets Microbiome
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained" onClick={() => setToggleDrawer(true)}>
            Nouveau projet
          </Button>
          <Button variant="outlined" href="/projects">
            List des projets
          </Button>
          <Button variant="outlined" href="/organizations">
            Organisations
          </Button>
        </Stack>
      </Container>

      <Drawer
        anchor="right"
        open={toggleDrawer}
        onClose={() => setToggleDrawer(false)}
      >
        <Box sx={{ width: 450, px: 4, py: 5 }}>
          <ProjectForm onProjectSubmit={(data) => navigate("/projects")} />
        </Box>
      </Drawer>
    </Layout>
  );
};

export default Home;

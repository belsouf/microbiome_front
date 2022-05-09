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
import OrganizationForm from "./form";

const Organizations = () => {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    api.get("/organizations").then((response) => {
      setOrganizations(response.data);
    });
  }, []);

  const onOrganizationSubmit = (data) => {
    setOrganizations([data, ...organizations]);
    setToggleDrawer(false);
  };

  return (
    <Layout>
      <Container>
        <Stack sx={{ py: 4 }} direction="row" justifyContent="space-between">
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Liste des organisations
          </Typography>
          <Button variant="contained" onClick={() => setToggleDrawer(true)}>
            Nouvelle organisation
          </Button>
        </Stack>

        {organizations && (
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {organizations.map((organization, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {organization.name}
                    </TableCell>
                    <TableCell>{organization.description}</TableCell>
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
          <OrganizationForm onOrganizationSubmit={onOrganizationSubmit} />
        </Box>
      </Drawer>
    </Layout>
  );
};

export default Organizations;

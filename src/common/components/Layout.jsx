import * as React from "react";
import { AppBar, Button, Box, Toolbar, Link } from "@mui/material";

export default function Layout({ children }) {
  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Link
            noWrap
            variant="h6"
            color="text.primary"
            href="/"
            sx={{ flexGrow: 1, my: 1, mx: 1.5, textDecoration: "none" }}
          >
            Microbiome
          </Link>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="/projects"
              sx={{ my: 1, mx: 1.5, textDecoration: "none" }}
            >
              Projets
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/organizations"
              sx={{ my: 1, mx: 1.5, textDecoration: "none" }}
            >
              Organisations
            </Link>
          </nav>
          <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          {children}
        </Box>
      </main>
    </>
  );
}

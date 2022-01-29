import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
const theme = createTheme();
const Layout: React.FC<{}> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {children}
      </Container>
    </ThemeProvider>
  );
};

export default Layout;

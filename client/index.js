import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./history";
import store from "./store";
import App from "./App";
import { Container, ThemeProvider } from "@mui/material";
import theme from "../styles/theme";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <Container
          maxWidth="x1"
          sx={{
            background: "#fff",
          }}
        >
          <App />
        </Container>
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("app")
);

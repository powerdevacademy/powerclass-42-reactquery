import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import queryClient from './services/query';

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#37474F",
    },
    secondary: {
      main: "#e1f5fe",
    },
  },
});

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>,
  document.getElementById("root")
);

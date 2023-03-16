import * as React from "react";
import { Provider } from "react-redux/es/exports";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/root";
import { Toaster } from "react-hot-toast";
import { store } from "./redux-toolkit/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    {" "}
    {/* <React.StrictMode> */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
      <Toaster position="bottom-left" />
    </ThemeProvider>
    {/* </React.StrictMode> */}
  </Provider>
);

import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Outlet } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-activity/dist/library.css";
import Topbar from "./pages/global/Topbar";

import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import Bar from "./pages/growthRate";
import Line from "./pages/revenue";
import Pie from "./pages/transactionVolume";
import Geography from "./pages/geography";
import Login from "./login/login";
import ForgotPassword from "./forgotPassword";
import authVerify from "./common/authVerify";
import { AuthContextProvider } from "./components/shared/authContext";

const App = () => {
  const [theme, colorMode] = useMode();
  
const SidebarLayout = () => (
  <>
  <CssBaseline />
   <MyProSidebarProvider>
   <div style={{ height: "100%", width: "100%" }}>
      <main>
      <Topbar />
      <Outlet />
      </main>
      </div>
   </MyProSidebarProvider>
  </>
);
  return (
    <AuthContextProvider>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        {/* <MyProSidebarProvider> */}
          {/* <div style={{ height: "100%", width: "100%" }}> */}
            {/* <main> */}
              {/* <Topbar /> */}
              <Routes>
                <Route element={<SidebarLayout />} >
                  <Route path="/home" element={<Dashboard />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/line" element={<Line />} />
                  <Route path="/geography" element={<Geography />} />
                </Route>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot" element={<ForgotPassword />} />
              </Routes>
            {/* </main> */}
          {/* </div> */}
        {/* </MyProSidebarProvider> */}
      </ThemeProvider>
    </ColorModeContext.Provider>
    </AuthContextProvider>
  );
};

export default App;

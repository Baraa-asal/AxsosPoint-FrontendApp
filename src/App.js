import { useState, useEffect, useMemo } from "react";
import UserContext from "./context/UserContext";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "./assets/theme";
import routes from "routes";
import SignIn from "layouts/authentication/sign-in";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";
import brand from "assets/images/favicon.png";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const [user, setUser] = useState();
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  //each time any change happens to the user, i will sync it with localStorage:
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (user && JSON.stringify(user) !== storedUser) {
      localStorage.setItem("user", JSON.stringify(user));
    }
    console.log("app: user: ", user);
  }, [user]);


  //didMount useEffect: (it works once only when the app is loaded)
  //when first app is loaded, get the data from localstorage and put it into the user state(assignment)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("storedUser",storedUser);
    setUser(JSON.parse(storedUser));
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) => {
    const role =  (user?.token?.length) ? user?.user?.role === 0 ? "admin" : "student" : false;
    
    return allRoutes.map((route) => {
      if ((route.role === "" || (role && route.role === role)) && route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        console.log("role check " + route.key + " " + route.role)
        if (route.isProtected && !user?.token?.length && (route.role === "" || (role && route.role === role))) {
          return <Route exact path={route.route} element={<SignIn />} key={route.key} />;
        }
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });
  }
  const configsButton = (
    <SoftBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SoftBox>
  );

  return (
    <UserContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={brand}
              brandName="AXSOS POINT"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

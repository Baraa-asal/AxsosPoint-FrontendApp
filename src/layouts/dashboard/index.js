import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview/index";
import OrderOverview2 from "layouts/dashboard/components/OrderOverview/OrderOverview2";
import { useContext, useState } from "react";
import UserContext from "context/UserContext";

function Dashboard() {
  const { user } = useContext(UserContext);
  const myRole = user?.token?.length ? (user?.user?.role === 0 ? "admin" : "student") : false;

  return (
    <DashboardLayout>
      {/* <p style={{ color: "red" }}>{msg}</p> */}
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3}>
          {myRole === "admin" && (
            <Grid item xs={12} md={6} lg={12}>
              <Projects />
            </Grid>
          )}
          {myRole === "student" && (
            <Grid item xs={12} md={6} lg={4}>
              <OrderOverview />
              <OrderOverview2 />
            </Grid>
          )}
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;

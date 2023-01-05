import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import Header from "layouts/profile/components/Header";
import { useState, useEffect, useContext } from "react";
import UserContext from "context/UserContext";
import Grid from "@mui/material/Grid";
import { format, parseISO, differenceInHours } from "date-fns";

import axios from "axios";
import { Table } from "@mui/material";
import SoftTypography from "components/SoftTypography";

function Overview() {
  const [rows, setRows] = useState([]);
  const getDaysObject = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
    const today = parseInt(format(new Date(), "i")) - 1;
    let daysObj = {};
    days.map((day, index) => {
      daysObj[day] = index <= today ? "Abscent" : "N/A";
    });
    return daysObj;
  };
  useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_URL + "/attendance").then((res) => {
      let dateMap = {};
      let usersMap = {};
      res.data.map((attendace) => {
        if (dateMap[attendace?.user_id?._id]) {
          dateMap[attendace.user_id._id].push(attendace.createdAt);
        } else {
          dateMap[attendace.user_id._id] = [attendace.createdAt];
        }
        if (!usersMap[attendace.user_id._id]) {
          usersMap[attendace.user_id._id] =
            attendace.user_id.firstName + " " + attendace.user_id.lastName;
        }
        console.log(attendace.user_id);

        const r = Object.keys(dateMap).map((userId) => {
          let attendaceObj = getDaysObject();
          dateMap[userId].map((timestamp) => {
            const startDate = new Date(
              //comment
              format(parseISO(timestamp), "yyyy-MM-dd") + "T08:30:00"
            );

            const endDate = new Date(timestamp);
            const hours = differenceInHours(endDate, startDate);
            const colors = ["success", "info", "warning"];
            let color = "error";
            if (hours < 3) {
              color = colors[hours];
            }
            attendaceObj[format(parseISO(timestamp), "iiii")] = (
              <SoftTypography fontSize="14px" color={color}>
                {hours + "hours (" + format(parseISO(timestamp), "H:m") + ")"}
              </SoftTypography>
            );
          });
          return {
            student: usersMap[userId],
            ...attendaceObj,
          };
        });
        setRows(r);
      });
    });
  }, []);
  const columns = [
    { name: "student", align: "left" },
    { name: "Sunday", align: "left" },
    { name: "Monday", align: "left" },
    { name: "Tuesday", align: "left" },
    { name: "Wednesday", align: "left" },
    { name: "Thursday", align: "left" },
  ];
  return (
    <DashboardLayout>
      <Header />
      <SoftBox mt={5} mb={3}>
        <Table columns={columns} rows={rows} />
      </SoftBox>
    </DashboardLayout>
  );
}

export default Overview;

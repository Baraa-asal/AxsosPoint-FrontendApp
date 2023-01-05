import { useEffect, useState } from "react";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import SoftTypography from "components/SoftTypography";
import axios from "axios";
import { format, parseISO, differenceInHours } from "date-fns";

function AttendanceRecord() {
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
  /*const rows = [
    {
      student: "Bara'a AboAsal",
      Tuesday: "on-pace",
      warnings: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          0
        </SoftTypography>
      ),
      progress: (
        <SoftBox width="8rem" textAlign="left">
          <SoftProgress value={90} color="info" variant="gradient" label={false} />
        </SoftBox>
      ),
    },
  ];
*/
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Table columns={columns} rows={rows} />
    </DashboardLayout>
  );
}

export default AttendanceRecord;

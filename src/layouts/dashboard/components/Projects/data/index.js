// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftProgress from "components/SoftProgress";


export default function data() {
 

  return {
    columns: [
      { name: "student", align: "left" },
      { name: "status", align: "left" },
      { name: "warnings", align: "center" },
      { name: "progress", align: "center" },
    ],

    rows: [
      {
        student: [,"Bara'a AboAsal"],
        status: "on-pace",
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
      {
        student: [,"Fatima Afaneh"],
        status: "behind",
        warnings: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            1
          </SoftTypography>
        ),
        progress: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={40} color="info" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        student: [,"Mohammad Ismael"],
        status: "way-behind",
        warnings: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            0
          </SoftTypography>
        ),
        progress: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={30} color="success" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        student: [,"Maram Naqeeb"],
        status: "ahead",
        warnings: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            2
          </SoftTypography>
        ),
        progress: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={20} color="info" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        student: [,"Riyad Busstami"],
        status: "on-pace",
        warnings: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            5
          </SoftTypography>
        ),
        progress: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={100} color="info" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        student: [,"Hasan Sadaqa"],
        status: "ahead",
        warnings: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            1
          </SoftTypography>
        ),
        progress: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={100} color="success" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
    ],
  };
}

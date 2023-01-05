import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import PropTypes from "prop-types";

// Soft UI Dashboard React examples

function OrdersOverview({ color }) {
  return (
    <Card className="h-100" style={{ minHeight: 200, marginBottom: 30 }}>
      <SoftBox pt={3} px={3}>
        <SoftTypography variant="h6" fontWeight="medium">
          Attendance
        </SoftTypography>
        <SoftBox mt={2}>
          <SoftButton
            component="a"
            href="/attendance"
            rel="noreferrer"
            variant="gradient"
            color={color}
            fullWidth
          >
            Take Attendance
          </SoftButton>
        </SoftBox>
        <SoftBox mt={2}>
          <SoftButton
            component="a"
            href="/this is supposed to go to the attendance table"
            target="_blank"
            rel="noreferrer"
            variant="gradient"
            color="secondary"
            fullWidth
          >
            View Record
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}
OrdersOverview.defaultProps = {
  color: "info",
};
OrdersOverview.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
};
export default OrdersOverview;

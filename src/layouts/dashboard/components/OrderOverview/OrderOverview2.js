import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import PropTypes from "prop-types";

// Soft UI Dashboard React examples

function OrdersOverview2({ color }) {
  return (
    <Card className="h-100" style={{ minHeight: 200, marginBottom: 30 }}>
      <SoftBox pt={3} px={3}>
        <SoftTypography variant="h6" fontWeight="medium">
          Assignments
        </SoftTypography>
        <SoftBox mt={2}>
          <SoftButton
            component="a"
            href="this is supposed to open the f camera"
            target="_blank"
            rel="noreferrer"
            variant="gradient"
            color={color}
            fullWidth
          >
            Upload Assignment
          </SoftButton>
        </SoftBox>
        <SoftBox mt={2}>
          <SoftButton
            component="a"
            href="/assignments"
            target="_blank"
            rel="noreferrer"
            variant="gradient"
            color="secondary"
            fullWidth
          >
            View Assignments
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}
OrdersOverview2.defaultProps = {
  color: "primary",
};
OrdersOverview2.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
};
export default OrdersOverview2;

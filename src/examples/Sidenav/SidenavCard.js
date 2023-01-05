import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import { useNavigate } from "react-router-dom";

// Custom styles for the SidenavCard
import { card, cardContent } from "examples/Sidenav/styles/sidenavCard";

// Soft UI Dashboard React context
import { useSoftUIController } from "context";

function SidenavCard() {
  const navigate = useNavigate();
  const [controller] = useSoftUIController();
  const { miniSidenav, sidenavColor } = controller;

  return (
    <Card style={{marginBottom: 20}} sx={(theme) => card(theme, { miniSidenav })}>
      <CardContent sx={(theme) => cardContent(theme, { sidenavColor })}>
        <SoftBox lineHeight={1}>
          <SoftButton
            onClick={() => navigate("/authentication/sign-up")}
            component={Link}
            rel="noreferrer"
            size="small"
            color="white"
            fullWidth
          >
            Add New Student
          </SoftButton>
          
        </SoftBox>
      </CardContent>
    </Card>
  );
}

export default SidenavCard;

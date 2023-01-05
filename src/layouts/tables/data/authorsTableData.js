/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import SoftButton from "components/SoftButton";
import Icon from "@mui/material/Icon";
// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function Author({ image, name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Function({ job, org }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {org}
      </SoftTypography>
    </SoftBox>
  );
}

const authorsTableData = {
  columns: [
    { name: "name", align: "left" },
    { name: "function", align: "left" },
    { name: "cohort", align: "center" },
    { name: "enrolled", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      name: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
      function: <Function job="Electrical Engineering" />,
      cohort: (
        <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
      ),
      enrolled: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          23/04/18
        </SoftTypography>
      ),
      action: (
        <SoftBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
          <SoftBox mr={1}>
            <SoftButton variant="text" color="error">
              <Icon>delete</Icon>&nbsp;delete
            </SoftButton>
          </SoftBox>
          <SoftButton href="/authentication/sign-up" variant="text" color="dark">
            <Icon>edit</Icon>&nbsp;edit
          </SoftButton>
        </SoftBox>
      ),
    },
    {
      name: <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
      function: <Function job="Programator" />,
      cohort: (
        <SoftBadge variant="gradient" badgeContent="onsite" color="secondary" size="xs" container />
      ),
      enrolled: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          11/01/19
        </SoftTypography>
      ),
      action: (
        <SoftBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
          <SoftBox mr={1}>
            <SoftButton variant="text" color="error">
              <Icon>delete</Icon>&nbsp;delete
            </SoftButton>
          </SoftBox>
          <SoftButton href="/authentication/sign-up" variant="text" color="dark">
            <Icon>edit</Icon>&nbsp;edit
          </SoftButton>
        </SoftBox>
      ),
    },
    {
      name: <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
      function: <Function job="English Literature" />,
      cohort: (
        <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
      ),
      enrolled: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          19/09/17
        </SoftTypography>
      ),
      action: (
        <SoftBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
          <SoftBox mr={1}>
            <SoftButton variant="text" color="error">
              <Icon>delete</Icon>&nbsp;delete
            </SoftButton>
          </SoftBox>
          <SoftButton href="/authentication/sign-up" variant="text" color="dark">
            <Icon>edit</Icon>&nbsp;edit
          </SoftButton>
        </SoftBox>
      ),
    },
    {
      name: <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
      function: <Function job="Mathematics" />,
      cohort: (
        <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
      ),
      enrolled: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          24/12/08
        </SoftTypography>
      ),
      action: (
        <SoftBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
          <SoftBox mr={1}>
            <SoftButton variant="text" color="error">
              <Icon>delete</Icon>&nbsp;delete
            </SoftButton>
          </SoftBox>
          <SoftButton href="/authentication/sign-up" variant="text" color="dark">
            <Icon>edit</Icon>&nbsp;edit
          </SoftButton>
        </SoftBox>
      ),
    },
    {
      name: <Author image={team2} name="Richard Gran" email="richard@creative-tim.com" />,
      function: <Function job="Manager" />,
      cohort: (
        <SoftBadge variant="gradient" badgeContent="onsite" color="secondary" size="xs" container />
      ),
      enrolled: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          04/10/21
        </SoftTypography>
      ),
      action: (
        <SoftBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
          <SoftBox mr={1}>
            <SoftButton variant="text" color="error">
              <Icon>delete</Icon>&nbsp;delete
            </SoftButton>
          </SoftBox>
          <SoftButton href="/authentication/sign-up" variant="text" color="dark">
            <Icon>edit</Icon>&nbsp;edit
          </SoftButton>
        </SoftBox>
      ),
    },
    {
      name: <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
      function: <Function job="Civil Engineering" />,
      cohort: (
        <SoftBadge variant="gradient" badgeContent="onsite" color="secondary" size="xs" container />
      ),
      enrolled: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          14/09/20
        </SoftTypography>
      ),
      action: (
        <SoftBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
          <SoftBox mr={1}>
            <SoftButton variant="text" color="error">
              <Icon>delete</Icon>&nbsp;delete
            </SoftButton>
          </SoftBox>
          <SoftButton href="/authentication/sign-up" variant="text" color="dark">
            <Icon>edit</Icon>&nbsp;edit
          </SoftButton>
        </SoftBox>
      ),
    },
  ],
};

export default authorsTableData;

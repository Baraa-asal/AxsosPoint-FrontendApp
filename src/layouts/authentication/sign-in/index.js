import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Switch from "@mui/material/Switch";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import UserContext from "context/UserContext";

function SignIn() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(true);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {}, [user]);
  if (user?.token?.length) {
    navigate("/dashboard");
  }
  const handleSubmit = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/login`, formData).then((res) => {
      // if the user exists in the data of response, set in in the state, and redirect on dashboard
      // context is a global stat of our application
      // the issue is context will be gone whenever i reload the page or go to a new page
      // so, we need sth presistent to keep the user, such as cookies, local storage, sth from backend.

      if (res?.data?.user) {
        console.log(res);

        setUser(res.data);
        navigate("/dashboard");
      } else {
        setError(res?.data?.msg);
      }
    });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <CoverLayout title="Welcome back :) !" description="" image={curved9}>
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography color="error" fontSize="14px">
              {error}
            </SoftTypography>
          </SoftBox>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput onChange={handleChange} name="email" type="email" placeholder="Email" />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
          />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={3} mb={1}>
          <SoftButton onClick={handleSubmit} variant="gradient" color="info" fullWidth>
            sign in
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;

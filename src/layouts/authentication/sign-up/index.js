import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import curved6 from "assets/images/curved-images/curved14.jpg";
import SoftTypography from "components/SoftTypography";


function SignUp() {
  const navigate = useNavigate();
  const [formInfo, setFormInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [errors, setErrors] = useState(undefined);
  const register = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/register`, formInfo, {
        withCredentials: true,
      })
      .then((res) => {
        navigate("/authentication/upload-image/"+res.data._id)
        console.log(res)})
      .catch((e)=> {
        if (e?.response?.data?.errors) {
          console.log(e.response.data.errors)
        setErrors(e?.response?.data?.errors)
      } else {
        // navigate("/authentication/upload-image")
        console.log("hiii")
      }
      
      });
  };
  const errorFontSize = "14px"
  const handleChange = (e) => {
    console.log("hii");
    console.log({ ...formInfo, [e.target.name]: e.target.value });
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  };
  console.log("errors: ",errors?.confirmPassword)
  return (
    <BasicLayout  title="Add a new Ninja" image={curved6}>
      <Card>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
      
            <SoftBox mb={2}>
              <SoftInput onChange={handleChange} name="firstName" placeholder="First Name" /> 
              {
                errors?.firstName  ? (<SoftTypography color="error"  fontSize={errorFontSize} mb={2}>{errors.firstName.message}</SoftTypography>) : null 
              }
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput onChange={handleChange} name="lastName" placeholder="Last Name" />
              {
                errors?.lastName  ? (<SoftTypography color="error"  fontSize={errorFontSize} mb={2}>{errors.lastName.message}</SoftTypography>) : null 
              }
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput onChange={handleChange} name="email" type="email" placeholder="Email" />
              {
                errors?.email  ? (<SoftTypography color="error"  fontSize={errorFontSize} mb={2}>{errors.email.message}</SoftTypography>) : null 
              }
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Password"
              />
                  {
                errors?.password  ? (<SoftTypography color="error"  fontSize={errorFontSize} mb={2}>{errors.password.message}</SoftTypography>) : null 
              }
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                onChange={handleChange}
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
              />
                  {
                errors?.confirmPassword  ? (<SoftTypography color="error" fontSize={errorFontSize} mb={2}>{errors.confirmPassword.message}</SoftTypography>) : null 
              }
            </SoftBox>
            <SoftBox display="flex" alignItems="center"></SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton onClick={register} variant="gradient" color="dark" fullWidth>
                add ninja
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>

    </BasicLayout>
  );
}

export default SignUp;

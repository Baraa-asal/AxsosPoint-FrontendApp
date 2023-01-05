import { useState , useEffect} from "react";
import axios from "axios";
// react-router-dom components
import { useNavigate, useParams } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

function UploadImage() {
  const [avatar, setAvatar] = useState("")
  const [registerdUser, setRegisterdUser] = useState({});
  const [errors, setErrors] = useState(undefined);
  const navigate = useNavigate();
  const { id } = useParams();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/api/users/registered", {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       setRegisterdUser(res.data.addedUser
  //       );
  //       console.log("this is who reg:", registerdUser);
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       // navigate("/");
  //     });
  // }, []);


  // request to add photo to specifec ninja
  const addPhoto = (e) => {
    e.preventDefault();

    const formData = new FormData();
    console.log(avatar)
    formData.append("avatar", avatar);
    formData.append("user_id", id);

    axios
    .post(`${process.env.REACT_APP_BASE_URL}/photo`, formData)
    .then((res) => {
      console.log(res);
      navigate("/dashboard");
    })
    // axios
    //   .post(`${process.env.REACT_APP_BASE_URL}/register`, formInfo, {
    //     withCredentials: true,
    //   })
    //   .then((res) => console.log(res)).catch((e)=> {
    //     if (e?.response?.data?.errors) {
    //     setErrors(e?.response?.data?.errors)
    //   } else {
    //     console.log(e)
        
    //   }
      
    //   });
  };
  const errorFontSize = "14px"
  const handleChange = (e) => {
    console.log("hii");
    setAvatar(e.target.files[0]);
  };
  console.log("errors: ",errors?.confirmPassword)
  return (
    <BasicLayout  title="Add a new Ninja" image={curved6}>

      <Card>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput
                onChange={handleChange}
                name="confirmPassword"
                type="file"
                placeholder="upload image"
              />
            </SoftBox>
            <SoftBox display="flex" alignItems="center"></SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton onClick={addPhoto} variant="gradient" color="dark" fullWidth>
                add image
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default UploadImage;

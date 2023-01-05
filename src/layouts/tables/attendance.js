import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftBox from "components/SoftBox";

function Attendance() {
  const height = 560;
  const width = 720;
  const [initializing, setinitializing] = useState(false);
  const [person, setPerson] = useState({});
  const webRef = useRef(null);
  const canvasRef = useRef();
  let isRequestSent = false;
  useEffect(() => {
    // const loadModels =() =>{
    //   setinitializing(true)
    //   Promise.all([
    //     faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    //     faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    //     faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    //   ])
    //   .then(startVideo)
    //   .catch(e=>console.log("error"))
    // };
    // webRef.current && loadModels();
    const video = webRef.current;
    const canvasContainer = canvasRef.current;

    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(startVideo);

    // let face;
    function startVideo() {
      // getImage().then((result)=>{
      //   console.log(result)
      //   face = result;
      // })
      navigator.getUserMedia(
        { video: {} },
        (stream) => {
          console.log(video);
          video.srcObject = stream;
        },
        (err) => console.error(err)
      );
    }
    // async function getImage() {
    //   const img = await faceapi.fetchImage("http://localhost:8000/1672599766257.jpg")
    //   const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
    //   console.log(detections[0].descriptor)
    //   return detections[0].descriptor;
    // }

    video.addEventListener("play", () => {
      const canvas = faceapi.createCanvasFromMedia(video);
      canvasContainer.append(canvas);
      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);
      let faceMatcher;
      // if (face){
      //   // console.log(face);
      //   faceMatcher = new faceapi.FaceMatcher(face, 0.6)
      // }

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();
        // console.log("desc",detections[0].descriptor);
        // let face= {"avatarDesc": detections[0].descriptor};

        // let face = detections[0].descriptor;

        const getPerson = (face) => {
          axios.post("http://localhost:8000/api/findface", face).then((res) => {
            console.log(res.data)
            isRequestSent = false;
            //setPerson(res.data);
            //console.log(person);
            if (person.name === "undefined") {
             // isRequestSent = true;
              //window.alert("Try again");
            } else {
              //isRequestSent = true;
             // window.alert(`welcome ${person.name}`);
            }
          });
        };
        if (!isRequestSent && detections.length > 0) {
          let face = { desc: detections[0].descriptor };
          console.log("face", face)
          getPerson(face);
          isRequestSent = true;
        }
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        if (faceMatcher) {
          const results = resizedDetections.map((d) => faceMatcher.findBestMatch(d.descriptor));
          // console.log(results);
        }
        // console.log("resizedDetections",resizedDetections)
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        //.drawFaceLandmarks(canvas, resizedDetections)
        //faceapi.draw.drawfaceDescriptors(canvas, resizedDetections);
      }, 100);
    });
    return () => {
      //turning the camera off on unmount(switching to other pages)
      video.pause();
      video.srcObject.getTracks().forEach(function (track) {
        track.stop();
      });
      // navigator.getUserMedia(
      //   { video: {} },
      //   stream => {stream.stop()},
      //   err => console.error(err)
      // )
      window.removeEventListener("play", video);
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox>
        <div style={{ color: "#6f2c90" }}>
          <video id="video" ref={webRef} autoPlay={true} width="720" height="560"></video>
          <div
            ref={canvasRef}
            style={{
              position: "absolute",
              width: "720px",
              height: "500px",
              top: "0px",
              left: "0px",
            }}
          ></div>
        </div>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Attendance;

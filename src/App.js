import React, { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./App.css";
import {storage} from "./firebase";
import {ref} from "firebase/storage";
import {v4} from 'uuid';
import { uploadBytes, getDownloadURL } from 'firebase/storage';



const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const App = () => {
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const cropperRef = useRef(null);
  const [imageUpload, setimageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [prediction, setPrediction] = useState('');
  const [fullprediction, setfullprediction] = useState('');


  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setimageUpload(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
};

  const getCropData = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      setCropData(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
    }
  };

  // const getfullImage = () => {
  //   if (imageUpload) {
  //     const fullImageRef = ref(storage, `fullImages/${v4()}`);
  //     const blob = dataURLtoBlob(imageUpload);
  //     uploadBytes(fullImageRef, blob)
  //       .then(() => getDownloadURL(fullImageRef))
  //       .then((downloadURL) => {
  //         console.log("Full Image Download URL:", downloadURL);
  //         // You can use the downloadURL as needed
  //         // Maybe display it or store it in state
  //       })
  //       .catch((error) => {
  //         console.error("Error uploading full image:", error);
  //       });
  //   } else {
  //     console.warn("No original image to upload");
  //   }
  // };

  const getfullImage = async () => {
    if (imageUpload) {
      const fullImageRef = ref(storage, `fullImages/${v4()}`);
      const blob = dataURLtoBlob(imageUpload);
  
      uploadBytes(fullImageRef, blob)
        .then(() => getDownloadURL(fullImageRef))
        .then((downloadURL) => {
          console.log("Full Image Download URL:", downloadURL);
  
          // Make a request to your backend for full image processing
          fetch('http://127.0.0.1:5000/process_full_image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({
              imageUrl: downloadURL
            }),
          })
          
            .then(response => response.json())
            .then(result => {

          
      // Assuming data.result is the value you want to set as the prediction state
              // setfullprediction(result);
              // Handle the result from the backend as needed
              console.log("Backend Result for Full Image Processing:", result);
              let data ={result}
                console.log(data);

              if (Array.isArray(result) && result.length > 0) {
                const extractedTextArray = result[0].boxes.map(box => box.extracted_text);
                console.log("Extracted Text Array:", extractedTextArray);
                setfullprediction(extractedTextArray);

                
              } else {
                console.error("Unexpected response format. Expected an array with at least one element.");
              }
            })
            .catch(error => {
              console.error("Error processing full image on the backend:", error);
            });
        })
        .catch((error) => {
          console.error("Error uploading full image:", error);
        });
    } else {
      console.warn("No original image to upload");
    }
  };

  const handleSendToServer = async () => {
    
    //console.log("here>>>>")
    const imageRef = ref(storage, `images/${v4()}`);
    const blob = dataURLtoBlob(cropData);
    // uploadBytes(imageRef, blob).then(() => {
    //   alert ("Image Sent");
    uploadBytes(imageRef, blob)
    .then(() => getDownloadURL(imageRef))
    .then((downloadURL) => {
      setImageUrl(downloadURL)
        alert("Image Sent");
        console.log("Download URL:", downloadURL);
    })
    // if (imageUrl) {
    //   console.log( "downloadURL::::" ,  imageUrl);
    //   try {
    //     const res = await fetch("http://127.0.0.1:5000/process_image", {
    //       method: "POST",
    //       body: JSON.stringify({ imageUrl }),
    //       headers: { "Content-Type": "application/json" },
    //     }).then(res => res.json()).then(data => {setPrediction(data.stringify()); console.log(prediction)})
    
    //     if (!prediction) {
    //       const errorData = await res.json(); // Try to parse the response body as JSON
    //       alert(`Fetching prediction from server failed: ${errorData.message || 'Unknown error'}`);
    //     } 
    //   } catch (error) {
    //     console.error("Error during registration:", error);
    //     alert("An error occurred during registration. Please try again later.");
    //   }
    // }
};
// delete later
useEffect(() => {
  // This block will run whenever 'prediction' changes
  console.log("Prediction:", prediction);
}, [prediction]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/process_image", {
        method: "POST",
        body: JSON.stringify({ imageUrl }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      // Assuming data.result is the value you want to set as the prediction state
      setPrediction(data.result);

      console.log("Prediction (within fetchData):", data.result);
    } catch (error) {
      console.error("Error during prediction fetch:", error);
      alert("An error occurred during prediction fetch. Please try again later.");
    }
  };

  if (imageUrl) {
    fetchData();
  }
}, [imageUrl]);


  return (
    <div>
      <div style={{  }}>
        <input type="file" onChange={onChange} />
        {/* <button>Use default img</button> */}
        <br />
        <br />
        <Cropper
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={true}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1% 10%"  }}>
        <form >  
        Predicted surname : <br/> 
      <input type="text" name="username"/>  
      <br/> Predicted first name :  <br/> 
      <input type="text" name="username"/>  
      <br/>  Predicted DOB :  <br/> 
      <input type="text" name="username"/>  
      <br/>  Predicted Gender :  <br/> 
      <input type="text" name="username"/> 
      <br/>  Predicted dateofissue :  <br/> 
      <input type="text" name="username"/> 
      <br/> Predicted dateofexpiry :  <br/> 
      <input type="text" name="username"/> 
      <br/> Predicted IdNumber :  <br/> 
      <input type="text" name="username"/> <br/>  <br/>  

      </form> 
      
      <div>
        
       
          <h1>
            {/* <span>Crop</span> */}
           
          </h1>
         
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", }}>
        <button style={{ margin: "10px 0px"}} onClick={getCropData}>
              Crop Image
            </button>
        <button style={{ margin: "10px 0px" }} onClick={handleSendToServer}> 
           Upload Cropped Image</button>
           <button style={{ margin: "10px 0px" }} onClick={getfullImage}> 
           Upload Full Image</button>
           { prediction ?  (<p style={{ margin: "10px 0px", color: ""}}>Crop Result: {prediction}</p>):(<p></p>) }
           </div>
           { fullprediction ?  (<p style={{ margin: "10px 0px", color: ""}}>Crop Result: {fullprediction}</p>):(<p></p>) }
            <img style={{ width: "30%", }} className="box" src={cropData} alt="cropped" />
            

      </div>
      </div>
      
      <br style={{ clear: "both" }} />
      
      <div>
      
    </div> 
    

    </div>
  );
};

export default App;
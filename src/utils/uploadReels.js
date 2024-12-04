import axios from "axios";

export const uploadFileToS3 = async (file) => {
  try {
    // Generate a unique file name with a timestamp
    const fileName = file.name + Date.now();

    // Request a pre-signed URL from your backend
    const response = await fetch('https://trakies-backend.onrender.com/api/putObject', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileName, contentType: file.type }),
    });

    if (!response.ok) {
      throw new Error("Failed to get the pre-signed URL for " + file.name);
    }

    const presignedUrl = await response.json();

    // Read file content as binary data
    const fileReader = new FileReader();
    const binaryData = await new Promise((resolve, reject) => {
      fileReader.onloadend = () => resolve(fileReader.result);
      fileReader.onerror = () => reject(fileReader.error);
      fileReader.readAsArrayBuffer(file); // Reads the file as an ArrayBuffer
    });

    // Upload the file to S3 using the pre-signed URL
    const uploadResponse = await axios.put(presignedUrl, binaryData, {
      headers: {
        "Content-Type": file.type,
      },
    });

    if (uploadResponse.status === 200) {
      // Construct the file URL based on your S3 bucket configuration
      const url = `https://s3.ap-south-1.amazonaws.com/sanathana.sarthi/uploads/${fileName}`;
      return url;
    } else {
      throw new Error(`Error while uploading the file: ${uploadResponse.status}`);
    }
  } catch (error) {
    console.error("Error while uploading file:", error);
    throw error; // Re-throw the error for higher-level handling
  }
};
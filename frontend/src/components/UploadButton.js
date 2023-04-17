import React, { useState } from "react";
import { Button, FileButton, Text } from "@mantine/core";
import "./UploadButton.css";

function UploadButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState(null);
  // const [filetype, setFiletype] = useState(0);

  const handleFileUpload = async (e) => {
    // Handle file upload logic here
    console.log("Selected Files:", e.target.files);
    const file = e.target.files[0]; // Get the first file from the selected files array
    console.log("File Name:", file.name);
    console.log("File Size:", file.size);
    console.log("File Type:", file.type);

    // Create a FormData object to send the file as binary data
    const formData = new FormData();
    formData.append("file", file);

    // Make a POST request to the /uploadfile endpoint with the file data
    try {
      const response = await fetch("http://localhost:8000/uploadfile", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // File upload successful
        console.log("File uploaded successfully");
        return <p>success</p>;
        // You can handle the response data or update the UI as needed
      } else {
        // File upload failed
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("File upload failed:", error);
    }

    setSelectedFile(file);
    setIsDialogOpen(false);
  };

  // Render the selected file details in the UI
  const renderSelectedFile = () => {
    if (selectedFile) {
      return (
        <div>
          <h4>Selected File Details:</h4>
          <p>File Name: {selectedFile.name}</p>
          <p>File Size: {selectedFile.size} bytes</p>
          <p>File Type: {selectedFile.type}</p>
        </div>
      );
    }
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="upload-button-container">
      <FileButton onChange={setFile} accept="pdf">
        {(props) => <Button {...props}>Upload Document</Button>}
      </FileButton>
      {file && (
        <Text size="sm" align="center" mt="sm">
          Picked File: {file.name}
        </Text>
      )}
      <h2 className="upload-button-heading">Upload Button</h2>
      <div className="upload-button-options">
        <button className="upload-button" onClick={openDialog}>
          Upload Documents
        </button>
      </div>
      {renderSelectedFile()}
      {isDialogOpen && (
        <div className="upload-backdrop">
          <div className="upload-dialog-container">
            <div className="upload-dialog-content">
              <div className="upload-dialog-header">
                <h3 className="upload-dialog-heading">Select an option</h3>
                <button
                  className="upload-dialog-close-button"
                  onClick={closeDialog}
                >
                  &#x2715;
                </button>
              </div>
              <div className="upload-dialog-buttons">
                <button
                  className="upload-dialog-button"
                  onClick={() =>
                    document.getElementById("agendaFileInput").click()
                  }
                >
                  Upload Agenda
                </button>
                <button
                  className="upload-dialog-button"
                  onClick={() =>
                    document.getElementById("handbookFileInput").click()
                  }
                >
                  Upload Handbook
                </button>
                <button
                  className="upload-dialog-button"
                  onClick={() =>
                    document.getElementById("minutesFileInput").click()
                  }
                >
                  Upload Minutes
                </button>
              </div>
              <input
                type="file"
                id="agendaFileInput"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <input
                type="file"
                id="handbookFileInput"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <input
                type="file"
                id="minutesFileInput"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadButton;

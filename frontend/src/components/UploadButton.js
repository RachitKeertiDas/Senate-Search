import React, { useState } from "react";
import { Button, FileInput, Text, Portal, Modal } from "@mantine/core";

function UploadButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileUpload = async (e) => {
    console.log("Selected Files:", e.target.files);
    const file = e.target.files[0];
    console.log("File Name:", file.name);
    console.log("File Size:", file.size);
    console.log("File Type:", file.type);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/uploadfile", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully");
        return <p>success</p>;
      } else {
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("File upload failed:", error);
    }

    setSelectedFile(file);
    setIsDialogOpen(false);
  };

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
    <div>
      <FileInput onChange={setFile} accept=".pdf">
        <Button>Upload Document</Button>
      </FileInput>
      {file && (
        <Text align="center" mt="sm">
          Picked File: {file.name}
        </Text>
      )}
      <h2>Upload Button</h2>
      <div>
        <Button onClick={openDialog}>Upload Documents</Button>
      </div>
      {renderSelectedFile()}
      {isDialogOpen && (
        <Portal>
          <Modal
            title="Select an option"
            onClose={closeDialog}
            closeButtonLabel="Close"
            size="sm"
          >
            <div>
              <Button
                fullWidth
                onClick={() =>
                  document.getElementById("agendaFileInput").click()
                }
              >
                Upload Agenda
              </Button>
              <Button
                fullWidth
                onClick={() =>
                  document.getElementById("handbookFileInput").click()
                }
              >
                Upload Handbook
              </Button>
              <Button
                fullWidth
                onClick={() =>
                  document.getElementById("minutesFileInput").click()
                }
              >
                Upload Minutes
              </Button>
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
          </Modal>
        </Portal>
      )}
    </div>
  );
}

export default UploadButton;

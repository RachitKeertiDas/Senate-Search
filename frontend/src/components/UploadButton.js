import React, { useState } from "react";
import "./UploadButton.css";

function UploadButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFileUpload = (e) => {
    // Handle file upload logic here
    console.log("Selected Files:", e.target.files);
    setIsDialogOpen(false);
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="upload-button-container">
      <h2 className="upload-button-heading">Upload Button</h2>
      <div className="upload-button-options">
        <button className="upload-button" onClick={openDialog}>
          Upload Documents
        </button>
      </div>
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

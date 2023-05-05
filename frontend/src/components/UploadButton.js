import React, { useState } from "react";
import {
  Button,
  FileInput,
  Portal,
  Modal,
  Space,
  NumberInput,
  Grid,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

function UploadButton() {
  const [file, setFile] = useState(null);
  const [fileNumber, setFileNumber] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleFileUpload = async (upload_type) => {
    const formData = new FormData();
    formData.append("file", file);

    let request_url = `http://localhost:8000/upload_${upload_type}/`;
    request_url += upload_type === "handbook" ? `` : `${fileNumber}`;
    try {
      console.log(request_url);
      const response = await fetch(request_url, {
        method: "POST",
        body: formData,
      });
      // Todo: Upgrade Response Message to Mantine Notification
      if (response.ok) {
        console.log("File uploaded successfully");
        setResponseMessage("File uploaded successfully");
        close();
        return;
      } else {
        console.error("File upload failed");
        setResponseMessage("File upload failed");
      }
    } catch (error) {
      console.error("File upload failed:", error);
      setResponseMessage("File upload failed");
    }
  };

  return (
    <div>
      <Grid>
        <Grid.Col span={8}>
          <FileInput
            placeholder="Choose any .pdf file"
            onChange={setFile}
            accept=".pdf"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <NumberInput placeholder="Version number" onChange={setFileNumber} />
        </Grid.Col>
      </Grid>

      <div>
        <Button
          onClick={() => {
            open();
          }}
          mt={8}
        >
          Upload Documents
        </Button>

        <Text mt={8}>{responseMessage}</Text>
      </div>

      {
        <main style={{ position: "relative", zIndex: 1 }}>
          <Portal>
            <Modal
              title="Choose what to upload"
              opened={opened}
              onClose={close}
              size="sm"
              centered
            >
              <div>
                <Button
                  fullWidth
                  onClick={(e) => {
                    e.preventDefault();
                    handleFileUpload("agenda");
                  }}
                >
                  Upload Agenda
                </Button>
                <Space h="sm" />
                <Button
                  fullWidth
                  onClick={(e) => {
                    e.preventDefault();
                    handleFileUpload("handbook");
                  }}
                >
                  Upload Handbook
                </Button>
                <Space h="sm" />
                <Button
                  fullWidth
                  onClick={(e) => {
                    e.preventDefault();
                    handleFileUpload("minutes");
                  }}
                >
                  Upload Minutes
                </Button>
              </div>
            </Modal>
          </Portal>
        </main>
      }
    </div>
  );
}

export default UploadButton;

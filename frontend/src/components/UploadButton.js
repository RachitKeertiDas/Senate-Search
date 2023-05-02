import React, { useState } from "react";
import { Button, FileInput, Portal, Modal,Space, NumberInput, Grid } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';

function UploadButton() {
  const [file, setFile] = useState(null);
  const [fileNumber, setFileNumber] = useState(null);

  const handleFileUpload = async (upload_type) => {
    const formData = new FormData();
    formData.append("file", file);
    
    const request_url = `http://localhost:8000/upload_${upload_type}/` + (upload_type === "handbook")? ``: `${fileNumber}`
    try {
      const response = await fetch(request_url, {
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

  };



  // const openDialog = () => {
  //   setIsDialogOpen(true);
  //   console.log(isDialogOpen);
  // };

  // const closeDialog = () => {
  //   setIsDialogOpen(false);
  //   console.log("Modal Closed");
  // };

  const [opened, { open, close }] = useDisclosure(false);


  return (
    <div>
      <Grid>
      <Grid.Col span={8}>
        <FileInput placeholder="Choose any .pdf file" onChange={setFile} accept=".pdf"/>
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput  placeholder="Version number" onChange={setFileNumber}/>
      </Grid.Col>
      </Grid>
      

      <div>
        <Button onClick={()=>{
          // openDialog();
          open();}}>Upload Documents</Button>
      </div>
      
      
      {(
        <main style={{ position: 'relative', zIndex: 1 }}>
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
                onClick={handleFileUpload("agenda")}
              >
                Upload Agenda
              </Button>
              <Space h="sm" />
              <Button
                fullWidth
                onClick={handleFileUpload("handbook")}
              >
                Upload Handbook
              </Button>
              <Space h="sm" />
              <Button
                fullWidth
                onClick={handleFileUpload("minutes")}
              >
                Upload Minutes
              </Button>
            </div>
            
          </Modal>
        </Portal>
        </main>
      ) } 
    </div>
  );
}

export default UploadButton;

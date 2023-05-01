import React, { useState, useEffect } from "react";
import axios from "axios";
import { Center, Card, Text, Container } from "@mantine/core";
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import Shell from "../components/AppShell";

function Handbook() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    axios.get("https://example.com/path/to/pdf/file.pdf", {
      responseType: "arraybuffer",
    })
    .then(response => {
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfFile(pdfUrl);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  return (
    <Shell
      content={
        <div>
          <Center
            style={{
              height: "50vh",
              maxWidth: "100vw",
              backgroundColor: "#FFE8CC",
            }}
          >
            <Card>
              <Container>
                <Text fw={700}>
                  Welcome to IITH Senate Search portal- Handbook.
                  <br />
                </Text>
                <Text>
                  Here you can easily view and track previous Senate Meeting
                  Minutes.
                </Text>
              </Container>
            </Card>
          </Center>
          {pdfFile && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.5.141/build/pdf.worker.min.js">
              <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
            </Worker>
          )}
          {!pdfFile && 
            <Center>
              <Text
                style={{
                  color: "red",
                  fontSize: "50px",
                }}
              >No PDF Found!!!
              </Text>
            </Center>
          }
        </div>
      }
    />
  );
}

export default Handbook;

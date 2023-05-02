import React, { useState, useEffect } from "react";
import axios from "axios";
import { Center, Card, Text, Container } from "@mantine/core";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import Shell from "../components/AppShell";

function Handbook() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/handbook", {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfFile(pdfUrl);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Shell
      content={
        <Center
          style={{
            height: "85vh",
            maxWidth: "100vw",
            backgroundColor: "#FFE8CC",
          }}
        >
          {pdfFile && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.5.141/build/pdf.worker.min.js">
              <Viewer
                fileUrl={pdfFile}
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
          )}
          {!pdfFile && (
            <Center>
              <Text
                style={{
                  color: "red",
                  fontSize: "50px",
                }}
              >
                No PDF Found!!!
              </Text>
            </Center>
          )}
        </Center>
      }
    />
  );
}

export default Handbook;

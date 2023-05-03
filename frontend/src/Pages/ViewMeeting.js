import React, { useState, useEffect } from "react";
import axios from "axios";
import { Center, Text, NumberInput, Card } from "@mantine/core";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import Shell from "../components/AppShell";

function ViewMeetings() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfFile, setPdfFile] = useState(null);
  const [senateNum, setSenateNum] = useState(49);

  useEffect(() => {
    console.log(senateNum);
    axios
      .get(`http://localhost:8000/minutes/pdf/${senateNum}`, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const pdfBlob = new Blob([response.data], {
          type: "application/pdf",
        });
        if (pdfBlob.size === 2) {
          setPdfFile(null);
        } else {
          const pdfUrl = URL.createObjectURL(pdfBlob);
          setPdfFile(pdfUrl);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [senateNum]);

  return (
    <Shell
      content={
        <Center style={{ flexDirection: "column", marginTop: 4 }}>
          <Card mt={280} pt={16} pb={16} style={{ minHeight: "5vw" }}>
            <NumberInput
              defaultvalue={49}
              min={1}
              max={51}
              label="Select Meeting Number"
              placeholder="Enter Meeting Number"
              onChange={(e) => {
                setSenateNum(e);
              }}
            />
          </Card>
          <Center
            style={{
              height: "90vh",
              minWidth: "80vw",
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
                    fontSize: "20px",
                  }}
                >
                  No PDF Found!
                </Text>
              </Center>
            )}
          </Center>
        </Center>
      }
    />
  );
}

export default ViewMeetings;

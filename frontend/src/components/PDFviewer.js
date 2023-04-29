import React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import myPdfFile from '../Sample_PDFs/A2-Design.pdf';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function Pdfviewer() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <Viewer fileUrl={myPdfFile} plugins={[defaultLayoutPluginInstance]} />
    </div>
  );
}

export default Pdfviewer;

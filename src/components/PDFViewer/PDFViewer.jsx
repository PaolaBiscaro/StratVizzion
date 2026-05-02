import React, { useState } from 'react';
import Button  from '../Button/Button';
import dadosPdf from './dados_pdf.json'; //Precisa alterar
import './PDFViewer.css'

function PDFViewer() {
    const [viewPdf, setViewPdf] = useState(false);

    const pdfUrl = `data:application/pdf;base64,${dadosPdf.base64_data}`;

    return (
        <div className='pdf-view'>

            <div className="format-button-pdf">
                <Button texto="Visualizar PDF" className="visualizar" onClick={() => setViewPdf(!viewPdf)} />
            </div>
           


            {viewPdf && (
                <div style={{
                    width: '100%',
                    margin: '0 auto',
                    maxWidth: '900px'
                }}>
                    <iframe
                        src={pdfUrl}
                        width="100%"
                        height="600px"
                        title="Visualizador PDF"
                    />
                </div>
            )}
        </div>
    );
}

export default PDFViewer;
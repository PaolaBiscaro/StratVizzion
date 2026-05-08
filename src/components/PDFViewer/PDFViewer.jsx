import React, { useState } from 'react';
import Button from '../Button/Button';
// import dadosPdf from './dados_pdf.json'; //Precisa alterar
import './PDFViewer.css'

function PDFViewer({ base64Data }) {
    const [viewPdf, setViewPdf] = useState(false);

    const pdfUrl = base64Data ? `data:application/pdf;base64,${base64Data}` : null;

    return (
        <div className='pdf-view'>

            <div className="format-button-pdf">
                <Button texto="Visualizar PDF" className="visualizar" onClick={() => setViewPdf(!viewPdf)} />
            </div>



            {/* {viewPdf && pdfUrl &&(
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
                    )}*/}

                    
            {viewPdf && pdfUrl && (
                <div style={{ width: '100%', margin: '20px auto', maxWidth: '900px' }}>
                    <iframe
                        src={pdfUrl}
                        width="100%"
                        height="600px"
                        title="Visualizador PDF"
                        style={{ border: 'none', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                    />
                </div>
            )}

            {!base64Data && <p style={{ fontSize: '12px', color: '#666' }}>Aguardando geração do relatório...</p>}

        </div>
    );
}

export default PDFViewer;
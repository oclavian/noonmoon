import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Document Export & Print Utility for Bengali text

export async function downloadAsPdf(title: string, htmlContent: string, filename: string = 'document.pdf'): Promise<void> {
  return new Promise((resolve, reject) => {
    // Create a temporary hidden container to hold the HTML
    const container = document.createElement('div');
    
    // Style it exactly like A4 print page
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '210mm'; // A4 width
    // Add some padding to match the print version
    container.style.padding = '20mm';
    container.style.backgroundColor = '#ffffff';
    container.style.color = '#111827';
    // Match the font used in printFormattedText
    container.style.fontFamily = "'Hind Siliguri', 'Noto Serif Bengali', sans-serif";
    container.style.fontSize = '15px';
    container.style.lineHeight = '1.7';
    
    container.innerHTML = `
      <h2 style="font-family: 'Noto Serif Bengali', serif; color: #064e3b; margin-bottom: 12px; font-size: 20px;">${title}</h2>
      ${htmlContent}
    `;

    document.body.appendChild(container);

    html2canvas(container, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      const finalFilename = filename.startsWith('Noon-Moon_') ? filename : `Noon-Moon_${filename}`;
      pdf.save(finalFilename.endsWith('.pdf') ? finalFilename : `${finalFilename}.pdf`);
      
      document.body.removeChild(container);
      resolve();
    }).catch(err => {
      console.error('Error generating PDF:', err);
      document.body.removeChild(container);
      reject(err);
    });
  });
}

export function downloadAsTxt(content: string, filename: string = 'bangla-document.txt'): void {
  if (!content) return;
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const finalFilename = filename.startsWith('Noon-Moon_') ? filename : `Noon-Moon_${filename}`;
  a.download = finalFilename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadAsDoc(
  title: string,
  contentHtml: string,
  filename: string = 'bangla-document.doc'
): void {
  const header = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        @page {
          size: A4;
          margin: 1in;
        }
        body {
          font-family: 'SolaimanLipi', 'Kalpurush', 'Nikosh', 'Arial', sans-serif;
          font-size: 14pt;
          line-height: 1.6;
          color: #1a1a1a;
        }
        p {
          margin-bottom: 12pt;
          text-align: justify;
        }
        h1, h2, h3 {
          color: #064e3b;
          font-family: 'SolaimanLipi', 'Kalpurush', sans-serif;
        }
        .date {
          text-align: right;
          margin-bottom: 20pt;
        }
        .signature-box {
          margin-top: 50pt;
          display: flex;
          justify-content: space-between;
        }
      </style>
    </head>
    <body>
      ${contentHtml}
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff' + header], {
    type: 'application/msword;charset=utf-8',
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const finalFilename = filename.startsWith('Noon-Moon_') ? filename : `Noon-Moon_${filename}`;
  a.download = finalFilename.endsWith('.doc') ? finalFilename : `${finalFilename}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function printFormattedText(title: string, htmlContent: string): void {
  const printWindow = window.open('', '_blank', 'width=800,height=900');
  if (!printWindow) {
    window.print();
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="bn">
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Noto+Serif+Bengali:wght@400;600;700&display=swap');
        @page {
          size: A4;
          margin: 20mm;
        }
        body {
          font-family: 'Hind Siliguri', 'Noto Serif Bengali', sans-serif;
          font-size: 15px;
          line-height: 1.7;
          color: #111827;
          background: #fff;
          margin: 0;
          padding: 24px;
        }
        h1, h2, h3 {
          font-family: 'Noto Serif Bengali', serif;
          color: #064e3b;
          margin-bottom: 12px;
        }
        p {
          margin-bottom: 14px;
          text-align: justify;
        }
        .print-footer {
          margin-top: 48px;
          padding-top: 12px;
          border-top: 1px solid #e5e7eb;
          font-size: 11px;
          color: #6b7280;
          display: flex;
          justify-content: space-between;
        }
        @media print {
          body {
            padding: 0;
          }
          button {
            display: none !important;
          }
        }
      </style>
    </head>
    <body>
      ${htmlContent}
      <div class="print-footer">
        <span>নুন-মুন (Noon-Moon) বাংলা সার্ভিসেস হাব দ্বারা মুদ্রিত</span>
        <span>${new Date().toLocaleDateString('bn-BD')}</span>
      </div>
      <script>
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

export const printInvoice = () => {
  const originalTitle = document.title;
  document.title = "Invoice";
  
  const printContent = document.querySelector('.invoice-preview');
  if (!printContent) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  // Add print styles
  printWindow.document.write(`
    <html>
      <head>
        <title>Print Invoice</title>
        <style>
          @media print {
            body { margin: 0; padding: 20px; }
            .invoice-preview { max-width: 100%; margin: 0; box-shadow: none; }
          }
        </style>
        ${document.head.innerHTML}
      </head>
      <body>
        ${printContent.outerHTML}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  
  // Print after images are loaded
  printWindow.onload = () => {
    printWindow.print();
    printWindow.onafterprint = () => {
      printWindow.close();
      document.title = originalTitle;
    };
  };
};
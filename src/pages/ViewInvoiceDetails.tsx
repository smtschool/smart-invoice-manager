import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import InvoicePreview from "@/components/InvoicePreview";
import { getInvoices } from "@/services/invoiceStorage";
import { printInvoice } from "@/utils/printUtils";

const ViewInvoiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const invoices = getInvoices();
  const invoice = invoices[Number(id)];

  if (!invoice) {
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invoice Not Found</h1>
          <Button onClick={() => navigate("/invoices")}>Back to Invoices</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={() => navigate("/invoices")}>
            Back to Invoices
          </Button>
          <Button onClick={() => printInvoice("invoice-preview")}>
            Print Invoice
          </Button>
        </div>
        <InvoicePreview data={invoice} />
      </div>
    </div>
  );
};

export default ViewInvoiceDetails;
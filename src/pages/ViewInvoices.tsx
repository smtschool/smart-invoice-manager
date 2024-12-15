import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getInvoices } from "@/services/invoiceStorage";
import { InvoiceData } from "@/types/invoice";
import { formatCurrency } from "@/utils/formatUtils";

const ViewInvoices = () => {
  const navigate = useNavigate();
  const [invoices] = useState<InvoiceData[]>(getInvoices());

  const calculateTotal = (invoice: InvoiceData) => {
    return invoice.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  console.log("Loaded invoices:", invoices);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">All Invoices</h1>
          <Button onClick={() => navigate("/create")}>Create New Invoice</Button>
        </div>

        <Card className="bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Total Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No invoices found. Create your first invoice!
                  </TableCell>
                </TableRow>
              ) : (
                invoices.map((invoice, index) => (
                  <TableRow key={index}>
                    <TableCell>{formatDate(invoice.date)}</TableCell>
                    <TableCell>{invoice.clientName}</TableCell>
                    <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(calculateTotal(invoice))}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/invoice/${index}`)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default ViewInvoices;
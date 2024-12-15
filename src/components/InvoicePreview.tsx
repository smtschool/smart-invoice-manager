import { Card } from "@/components/ui/card";

interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

interface InvoiceData {
  companyName: string;
  companyLogo: string;
  clientName: string;
  clientEmail: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  notes: string;
}

interface Props {
  data: InvoiceData;
}

const InvoicePreview = ({ data }: Props) => {
  const calculateSubtotal = () => {
    return data.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Card className="invoice-preview animate-fade-in p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          {data.companyLogo && (
            <img
              src={data.companyLogo}
              alt="Company logo"
              className="h-16 w-16 object-contain mb-2"
            />
          )}
          {data.companyName && (
            <h3 className="text-xl font-bold text-gray-900">{data.companyName}</h3>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">INVOICE</h2>
          <div className="mt-4 text-sm text-gray-600">
            <p>Date: {data.date}</p>
            <p>Due Date: {data.dueDate}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-2">Bill To:</h3>
        <div className="text-gray-600">
          <p className="font-medium">{data.clientName}</p>
          <p>{data.clientEmail}</p>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Description</th>
            <th className="text-right py-2">Qty</th>
            <th className="text-right py-2">Price</th>
            <th className="text-right py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-2">{item.description}</td>
              <td className="text-right py-2">{item.quantity}</td>
              <td className="text-right py-2">{formatCurrency(item.price)}</td>
              <td className="text-right py-2">
                {formatCurrency(item.quantity * item.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="flex justify-between py-2">
            <span className="font-medium">Subtotal:</span>
            <span>{formatCurrency(calculateSubtotal())}</span>
          </div>
          <div className="flex justify-between py-2 border-t border-gray-200">
            <span className="font-bold">Total:</span>
            <span className="font-bold">{formatCurrency(calculateSubtotal())}</span>
          </div>
        </div>
      </div>

      {data.notes && (
        <div className="border-t pt-4">
          <h4 className="font-semibold mb-2">Notes:</h4>
          <p className="text-gray-600 text-sm">{data.notes}</p>
        </div>
      )}
    </Card>
  );
};

export default InvoicePreview;
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Upload, Printer, Save } from "lucide-react";
import InvoicePreview from "@/components/InvoicePreview";
import { useToast } from "@/components/ui/use-toast";
import { InvoiceData, InvoiceItem } from "@/types/invoice";
import { saveInvoice } from "@/services/invoiceStorage";
import { printInvoice } from "@/utils/printUtils";

const CreateInvoice = () => {
  const { toast } = useToast();
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    companyName: "",
    companyLogo: "",
    clientName: "",
    clientEmail: "",
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    items: [{ description: "", quantity: 1, price: 0 }],
    notes: "",
  });

  // Load company data from localStorage on mount
  useEffect(() => {
    const savedCompanyName = localStorage.getItem("companyName");
    const savedCompanyLogo = localStorage.getItem("companyLogo");

    if (savedCompanyName || savedCompanyLogo) {
      setInvoiceData((prev) => ({
        ...prev,
        companyName: savedCompanyName || "",
        companyLogo: savedCompanyLogo || "",
      }));
    }
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setInvoiceData(prev => ({ ...prev, companyLogo: base64String }));
        localStorage.setItem("companyLogo", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setInvoiceData(prev => ({ ...prev, companyName: newName }));
    localStorage.setItem("companyName", newName);
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: "", quantity: 1, price: 0 }],
    });
  };

  const removeItem = (index: number) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const handlePrint = () => {
    printInvoice();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const savedInvoice = saveInvoice(invoiceData);
      console.log('Invoice saved successfully:', savedInvoice);
      toast({
        title: "Invoice Saved",
        description: "Your invoice has been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving invoice:', error);
      toast({
        title: "Error",
        description: "Failed to save invoice. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Invoice</h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="invoice-form">
              <Card className="p-4 mb-6">
                <h3 className="font-semibold mb-4">Company Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={invoiceData.companyName}
                      onChange={handleCompanyNameChange}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="logo">Company Logo</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="logo"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('logo')?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Logo
                      </Button>
                      {invoiceData.companyLogo && (
                        <img
                          src={invoiceData.companyLogo}
                          alt="Company logo"
                          className="h-10 w-10 object-contain"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    value={invoiceData.clientName}
                    onChange={(e) => setInvoiceData({ ...invoiceData, clientName: e.target.value })}
                    placeholder="Enter client name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientEmail">Client Email</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={invoiceData.clientEmail}
                    onChange={(e) => setInvoiceData({ ...invoiceData, clientEmail: e.target.value })}
                    placeholder="Enter client email"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Invoice Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={invoiceData.date}
                    onChange={(e) => setInvoiceData({ ...invoiceData, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={invoiceData.dueDate}
                    onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
                  />
                </div>
              </div>

              <Card className="p-4">
                <h3 className="font-semibold mb-4">Items</h3>
                {invoiceData.items.map((item, index) => (
                  <div key={index} className="grid md:grid-cols-[1fr,auto,auto,auto] gap-4 mb-4">
                    <Input
                      value={item.description}
                      onChange={(e) => updateItem(index, "description", e.target.value)}
                      placeholder="Item description"
                    />
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, "quantity", parseFloat(e.target.value))}
                      placeholder="Qty"
                      className="w-24"
                    />
                    <Input
                      type="number"
                      value={item.price}
                      onChange={(e) => updateItem(index, "price", parseFloat(e.target.value))}
                      placeholder="Price"
                      className="w-32"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(index)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addItem} className="w-full mt-2">
                  <Plus className="h-4 w-4 mr-2" /> Add Item
                </Button>
              </Card>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  value={invoiceData.notes}
                  onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
                  placeholder="Additional notes"
                />
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <Button type="button" variant="outline" onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print Invoice
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Save Invoice
                </Button>
              </div>
            </form>
          </div>

          <div className="lg:sticky lg:top-6">
            <InvoicePreview data={invoiceData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;

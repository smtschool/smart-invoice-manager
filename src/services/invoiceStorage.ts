import { InvoiceData } from "@/types/invoice";

export const saveInvoice = (invoice: InvoiceData): InvoiceData => {
  const id = crypto.randomUUID();
  const invoiceWithId = { ...invoice, id };
  
  const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
  const updatedInvoices = [...existingInvoices, invoiceWithId];
  
  localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
  console.log('Invoice saved:', invoiceWithId);
  
  return invoiceWithId;
};

export const getInvoices = (): InvoiceData[] => {
  return JSON.parse(localStorage.getItem('invoices') || '[]');
};
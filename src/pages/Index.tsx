import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PlusCircle, FileText } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Invoice Generator</h1>
          <p className="text-lg text-gray-600">Create and manage professional invoices with ease</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-center mb-6">
              <PlusCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900">Create Invoice</h2>
              <p className="text-gray-600 mt-2">Generate a new professional invoice</p>
            </div>
            <Button 
              className="w-full" 
              size="lg"
              onClick={() => navigate("/create")}
            >
              New Invoice
            </Button>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-center mb-6">
              <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900">View Invoices</h2>
              <p className="text-gray-600 mt-2">Manage your existing invoices</p>
            </div>
            <Button 
              className="w-full" 
              size="lg"
              variant="outline"
              onClick={() => navigate("/invoices")}
            >
              View All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Search, Filter, Phone, Mail, Calendar } from "lucide-react";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeframe: string;
  date: string;
  status: string;
}

const LeadManagement = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch this from your backend
    // For demo purposes, we're using localStorage
    const fetchLeads = () => {
      try {
        const storedLeads = localStorage.getItem("kvLeads");
        if (storedLeads) {
          const parsedLeads = JSON.parse(storedLeads);
          setLeads(parsedLeads);
          setFilteredLeads(parsedLeads);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  useEffect(() => {
    // Apply filters whenever search term or status filter changes
    let results = leads;
    
    if (searchTerm) {
      results = results.filter(lead => 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm)
      );
    }
    
    if (statusFilter !== "all") {
      results = results.filter(lead => lead.status === statusFilter);
    }
    
    setFilteredLeads(results);
  }, [searchTerm, statusFilter, leads]);

  const updateLeadStatus = (id: number, newStatus: string) => {
    const updatedLeads = leads.map(lead => 
      lead.id === id ? { ...lead, status: newStatus } : lead
    );
    
    setLeads(updatedLeads);
    localStorage.setItem("kvLeads", JSON.stringify(updatedLeads));
  };

  const exportToCsv = () => {
    const headers = ["Name", "Email", "Phone", "Project Type", "Budget", "Timeframe", "Date", "Status"];
    const csvData = filteredLeads.map(lead => [
      lead.name,
      lead.email,
      lead.phone,
      lead.projectType,
      lead.budget,
      lead.timeframe,
      new Date(lead.date).toLocaleDateString(),
      lead.status
    ]);
    
    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `kv-leads-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-500 hover:bg-blue-600";
      case "contacted": return "bg-yellow-500 hover:bg-yellow-600";
      case "qualified": return "bg-green-500 hover:bg-green-600";
      case "converted": return "bg-purple-500 hover:bg-purple-600";
      case "lost": return "bg-gray-500 hover:bg-gray-600";
      default: return "bg-blue-500 hover:bg-blue-600";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const formatBudget = (budget: string) => {
    switch (budget) {
      case "below-5L": return "Below ₹5L";
      case "5L-10L": return "₹5L - ₹10L";
      case "10L-25L": return "₹10L - ₹25L";
      case "25L-50L": return "₹25L - ₹50L";
      case "above-50L": return "Above ₹50L";
      default: return budget || "Not specified";
    }
  };

  const formatProjectType = (type: string) => {
    switch (type) {
      case "residential": return "Residential";
      case "commercial": return "Commercial";
      case "interior": return "Interior";
      case "renovation": return "Renovation";
      default: return type || "Not specified";
    }
  };

  const formatTimeframe = (timeframe: string) => {
    switch (timeframe) {
      case "immediately": return "Immediately";
      case "1-3-months": return "1-3 Months";
      case "3-6-months": return "3-6 Months";
      case "6-12-months": return "6-12 Months";
      case "planning": return "Just Planning";
      default: return timeframe || "Not specified";
    }
  };

  const getTotalsByStatus = () => {
    const totals = {
      all: leads.length,
      new: 0,
      contacted: 0,
      qualified: 0,
      converted: 0,
      lost: 0
    };
    
    leads.forEach(lead => {
      if (lead.status in totals) {
        totals[lead.status as keyof typeof totals]++;
      }
    });
    
    return totals;
  };

  const stats = getTotalsByStatus();

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Lead Management</h1>
          <p className="text-muted-foreground mt-1">Track and manage your architectural project leads</p>
        </div>
        
        <Button 
          onClick={exportToCsv} 
          className="mt-4 md:mt-0 flex items-center gap-2"
          disabled={filteredLeads.length === 0}
        >
          <Download size={16} />
          Export to CSV
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Card className={`cursor-pointer ${statusFilter === "all" ? "border-blue-500 dark:border-blue-400" : ""}`} onClick={() => setStatusFilter("all")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold">{stats.all}</CardTitle>
            <CardDescription>Total Leads</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className={`cursor-pointer ${statusFilter === "new" ? "border-blue-500 dark:border-blue-400" : ""}`} onClick={() => setStatusFilter("new")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-blue-500">{stats.new}</CardTitle>
            <CardDescription>New</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className={`cursor-pointer ${statusFilter === "contacted" ? "border-yellow-500 dark:border-yellow-400" : ""}`} onClick={() => setStatusFilter("contacted")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-yellow-500">{stats.contacted}</CardTitle>
            <CardDescription>Contacted</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className={`cursor-pointer ${statusFilter === "qualified" ? "border-green-500 dark:border-green-400" : ""}`} onClick={() => setStatusFilter("qualified")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-green-500">{stats.qualified}</CardTitle>
            <CardDescription>Qualified</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className={`cursor-pointer ${statusFilter === "converted" ? "border-purple-500 dark:border-purple-400" : ""}`} onClick={() => setStatusFilter("converted")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-purple-500">{stats.converted}</CardTitle>
            <CardDescription>Converted</CardDescription>
          </CardHeader>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search by name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="w-full md:w-64">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <Filter size={16} />
                <span>Filter by Status</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Leads</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading leads...</p>
        </div>
      ) : filteredLeads.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Project Details</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-muted-foreground" />
                        <span className="text-sm">{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-muted-foreground" />
                        <span className="text-sm">{lead.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="text-sm"><span className="font-medium">Type:</span> {formatProjectType(lead.projectType)}</div>
                      <div className="text-sm"><span className="font-medium">Budget:</span> {formatBudget(lead.budget)}</div>
                      <div className="text-sm"><span className="font-medium">Timeframe:</span> {formatTimeframe(lead.timeframe)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-muted-foreground" />
                      <span className="text-sm">{formatDate(lead.date)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={lead.status} 
                      onValueChange={(value) => updateLeadStatus(lead.id, value)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue>
                          <Badge className={getStatusBadgeColor(lead.status)}>
                            {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                        <SelectItem value="converted">Converted</SelectItem>
                        <SelectItem value="lost">Lost</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground mb-2">No leads found</p>
          {searchTerm || statusFilter !== "all" ? (
            <Button variant="outline" onClick={() => { setSearchTerm(""); setStatusFilter("all"); }}>
              Clear filters
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground">
              Leads captured from your website will appear here
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default LeadManagement;

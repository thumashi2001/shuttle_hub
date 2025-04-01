import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { toast } from "sonner";

const TshirtView = () => {
  const [designs, setDesigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tshirts/designs");
        setDesigns(response.data);
      } catch (error) {
        toast.error("Error fetching designs");
        console.error("Error fetching designs:", error);
      }
    };
    fetchDesigns();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this design?")) {
      try {
        await axios.delete(`http://localhost:5000/api/tshirts/designs/${id}`);
        setDesigns(designs.filter((design) => design._id !== id));
        toast.success("Design deleted successfully!");
      } catch (error) {
        toast.error("Error deleting design");
        console.error("Error deleting design:", error);
      }
    }
  };

  const handleEdit = (design) => {
    navigate("/tshirt-customize", { state: { design } });
  };

  const handlePayment = (design) => {
    navigate("/delivery-details", { state: { design } });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "#333" }}>
        Saved T-Shirt Designs
      </h1>
      <div style={{ backgroundColor: "#fff", borderRadius: "8px", padding: "20px", width: "1500px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", border: "1px solid #ddd" }}>
        {designs.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>No designs found. Create a new design to get started!</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <Table style={{ width: "100%", marginBottom: "20px" }}>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Design</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Logo</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {designs.map((design) => (
                  <TableRow key={design._id}>
                    <TableCell>{design.name || "Unnamed Design"}</TableCell>
                    <TableCell>{design.size}</TableCell>
                    <TableCell>
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          border: "1px solid #ccc",
                          backgroundColor: design.color,
                          margin: "auto",
                        }}
                      />
                    </TableCell>
                    <TableCell>{design.design || "N/A"}</TableCell>
                    <TableCell>{design.position}</TableCell>
                    <TableCell>{design.logo || "N/A"}</TableCell>
                    <TableCell>
                      <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(design)}
                          style={{ backgroundColor: "#28a745", color: "white", padding: "5px 10px" }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(design._id)}
                          style={{ backgroundColor: "#dc3545", color: "white", padding: "5px 10px" }}
                        >
                          Delete
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handlePayment(design)}
                          style={{ backgroundColor: "#007bff", color: "white", padding: "5px 10px" }}
                        >
                          Make Payment
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TshirtView;

// ClientList.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../Components/Common-Components/Searchbar.jsx";
import apiRequest from "../../Auth/ApiService.js";
import "./styles/ClientList.css";

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const result = await apiRequest("http://localhost:5228/api/Admin/ClientList");
      setClients(result);
    } catch (err) {
      console.error("Error fetching clients:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      fetchClients();
    } else {
      try {
        const result = await apiRequest(
          `http://localhost:5228/api/Admin/ClientSearch/${term}`
        );
        setClients(result);
      } catch (err) {
        console.error("Search error:", err);
      }
    }
  };

  const viewClient = (id) => {
    navigate(`/clientProfilePage/${id}`);
  };

  const addClient = () => {
    navigate("/clientCreation");
  };

  if (loading) {
    return (
      <div className="client-list-loading">
        <div className="spinner"></div>
        <div>Loading clients…</div>
      </div>
    );
  }

  return (
    <div className="client-list-container">
      <div className="client-list-header">
        <h2>Clients</h2>
        <button className="add-btn" onClick={addClient}>
          + Add Client
        </button>
      </div>
      <div className="client-list-controls">
        <SearchBar onSearch={handleSearch} />
      </div>
      {clients.length === 0 ? (
        <div className="empty-state">
          <div className="icon">📭</div>
          <div>No clients found{searchTerm && ` for “${searchTerm}”`}.</div>
        </div>
      ) : (
        <div className="table-container">
          <table className="ClientList">
            <thead>
              <tr>
                <th>Client ID</th>
                <th>Username</th>
                <th>Client Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.clientId}>
                  <td>#{c.clientId}</td>
                  <td>{c.userName}</td>
                  <td>{c.clientName}</td> 
                  <td>{c.email}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => viewClient(c.clientId)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

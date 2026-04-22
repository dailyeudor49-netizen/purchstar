"use client";

import { useState, useEffect } from "react";

interface Lead {
  data: string;
  prodotto: string;
  pagina: string;
  nome: string;
  cognome: string;
  telefono: string;
  email: string;
  indirizzo: string;
  citta: string;
  provincia: string;
  cap: string;
  prezzo: string;
  note: string;
  fullshipStatus: string;
}

export default function AdminLeads() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ pagina: "", search: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/admin/leads", {
        headers: { "x-admin-password": password },
      });

      if (res.ok) {
        setIsAuthenticated(true);
        sessionStorage.setItem("adminAuth", password);
        fetchLeads(password);
      } else {
        setError("Password non valida");
      }
    } catch {
      setError("Errore di connessione");
    }
  };

  const fetchLeads = async (pwd: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads", {
        headers: { "x-admin-password": pwd },
      });

      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    const savedAuth = sessionStorage.getItem("adminAuth");
    if (savedAuth) {
      setPassword(savedAuth);
      setIsAuthenticated(true);
      fetchLeads(savedAuth);
    }
  }, []);

  const filteredLeads = leads.filter((lead) => {
    const matchesPagina = !filter.pagina || lead.pagina === filter.pagina;
    const matchesSearch =
      !filter.search ||
      lead.nome?.toLowerCase().includes(filter.search.toLowerCase()) ||
      lead.cognome?.toLowerCase().includes(filter.search.toLowerCase()) ||
      lead.telefono?.includes(filter.search) ||
      lead.email?.toLowerCase().includes(filter.search.toLowerCase());
    return matchesPagina && matchesSearch;
  });

  const uniquePages = [...new Set(leads.map((l) => l.pagina).filter(Boolean))];

  const exportCSV = () => {
    const headers = [
      "Data",
      "Prodotto",
      "Pagina",
      "Nome",
      "Cognome",
      "Telefono",
      "Email",
      "Indirizzo",
      "Città",
      "Provincia",
      "CAP",
      "Prezzo",
      "Note",
      "Status",
    ];
    const rows = filteredLeads.map((l) => [
      l.data,
      l.prodotto,
      l.pagina,
      l.nome,
      l.cognome,
      l.telefono,
      l.email,
      l.indirizzo,
      l.citta,
      l.provincia,
      l.cap,
      l.prezzo,
      l.note,
      l.fullshipStatus,
    ]);

    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c || ""}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Admin Leads
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Inserisci password"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Accedi
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Gestionale Leads ({filteredLeads.length})
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => fetchLeads(password)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-sm font-medium"
            >
              Aggiorna
            </button>
            <button
              onClick={exportCSV}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
            >
              Esporta CSV
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem("adminAuth");
                setIsAuthenticated(false);
                setLeads([]);
              }}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Cerca
            </label>
            <input
              type="text"
              placeholder="Nome, cognome, telefono, email..."
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div className="w-full md:w-48">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Pagina
            </label>
            <select
              value={filter.pagina}
              onChange={(e) => setFilter({ ...filter, pagina: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">Tutte</option>
              {uniquePages.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="bg-white rounded-xl shadow p-12 text-center text-gray-500">
            Caricamento...
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Data
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Pagina
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Nome
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Telefono
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Città
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Prezzo
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                        Nessuna lead trovata
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                          {lead.data ? new Date(lead.data).toLocaleDateString("it-IT") : "-"}
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                            {lead.pagina}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {lead.nome} {lead.cognome}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{lead.telefono}</td>
                        <td className="px-4 py-3 text-gray-600">
                          {lead.citta}, {lead.provincia}
                        </td>
                        <td className="px-4 py-3 font-semibold text-gray-900">
                          {lead.prezzo}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              lead.fullshipStatus === "success"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {lead.fullshipStatus}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

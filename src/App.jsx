// src/App.jsx
import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [daftar, setDaftar] = useState([]);
  const [formData, setFormData] = useState({ jenis: "", nama: "", nilai: "" });
  const [filter, setFilter] = useState("all");

  const handleAddComponent = () => {
    if (!formData.jenis || !formData.nama || !formData.nilai) {
      alert("Semua field harus diisi!");
      return;
    }
    setDaftar([...daftar, { ...formData, nilai: parseFloat(formData.nilai) }]);
    setFormData({ jenis: "", nama: "", nilai: "" });
  };

  const handleDelete = (index) => {
    const updatedDaftar = daftar.filter((_, i) => i !== index);
    setDaftar(updatedDaftar);
  };

  const filteredDaftar =
    filter === "all" ? daftar : daftar.filter((item) => item.jenis === filter);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="App">
      <h1>Manajemen Komponen Elektronika</h1>

      {/* Form Tambah Komponen */}
      <div>
        <h2>Tambah Komponen</h2>
        <label>
          Jenis:
          <select
            value={formData.jenis}
            onChange={(e) => setFormData({ ...formData, jenis: e.target.value })}
          >
            <option value="">Pilih Jenis</option>
            <option value="resistor">Resistor</option>
            <option value="kapasitor">Kapasitor</option>
            <option value="induktor">Induktor</option>
          </select>
        </label>
        <br />
        <label>
          Nama:
          <input
            type="text"
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
          />
        </label>
        <br />
        <label>
          Nilai:
          <input
            type="number"
            value={formData.nilai}
            onChange={(e) => setFormData({ ...formData, nilai: e.target.value })}
          />
        </label>
        <br />
        <button onClick={handleAddComponent}>Tambah</button>
      </div>

      {/* Filter Komponen */}
      <div>
        <h2>Filter Komponen</h2>
        <button onClick={() => setFilter("all")}>Semua</button>
        <button onClick={() => setFilter("resistor")}>Resistor</button>
        <button onClick={() => setFilter("kapasitor")}>Kapasitor</button>
        <button onClick={() => setFilter("induktor")}>Induktor</button>
      </div>

      {/* Daftar Komponen */}
      <div>
        <h2>Daftar Komponen</h2>
        {filteredDaftar.length === 0 ? (
          <p>Belum ada komponen!</p>
        ) : (
          <ul>
            {filteredDaftar.map((item, index) => (
              <li key={index}>
                {item.nama} ({item.jenis}) - {item.nilai}
                <button onClick={() => handleDelete(index)}>Hapus</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
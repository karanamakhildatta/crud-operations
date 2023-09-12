import React, { useState, useEffect } from "react";
import axios from "axios";
const DataTable = () => {
  const [loader, setLoader] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoader(true);
        const response = await axios.get("/api/add-data/all");
        setApiData(response.data);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoader(false);
      }
    }
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  // Filter data based on the search input
  const filteredData = apiData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText) ||
      item.email.toLowerCase().includes(searchText) // Fixed property name
  );

  // Calculate the start and end indexes for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Define inline styles
  const inputStyles = {
    padding: "5px",
    margin: "10px 0",
  };

  const tableStyles = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const tableHeaderStyles = {
    backgroundColor: "#f2f2f2",
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "left",
    fontWeight: "bold",
  };

  const tableCellStyles = {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "left",
  };

  const evenRowStyles = {
    backgroundColor: "#f2f2f2",
  };

  const paginationButtonStyles = {
    display: "flex",
    listStyle: "none",
    padding: 0,
  };

  const paginationButton = {
    margin: "0 5px",
    cursor: "pointer",
    padding: "5px 10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const activeButton = {
    fontWeight: "bold",
    backgroundColor: "#007BFF",
    color: "white",
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <li
        key={i}
        onClick={() => setCurrentPage(i)}
        className={i === currentPage ? "active" : ""}
        style={{
          ...paginationButton,
          ...(i === currentPage ? activeButton : {}),
        }}
      >
        {i}
      </li>
    );
  }

  return (
    <div>
      {loader && <div>Loading...</div>}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <input
          type="text"
          id="searchInput"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchChange}
          style={inputStyles} // Apply inline styles
        />

        <select
          id="itemsPerPageSelect"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          style={inputStyles} // Apply inline styles
        >
          {[
            { label: "2 Items Per Page", value: 2, hold: "yes" },
            { label: "5 Items Per Page", value: 5, hold: "yes" },
            { label: "10 Items Per Page", value: 10 },
          ].map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          style={{
            width: "120px",
            color: "blue",
            background: "beige",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Add Data
        </button>
      </div>
      <table id="dataTable" style={tableStyles}>
        <thead>
          <tr>
            <th style={tableHeaderStyles}>Name</th>
            <th style={tableHeaderStyles}>Email</th>
            <th style={tableHeaderStyles}>Actions</th>
          </tr>
        </thead>
        <tbody id="tableBody">
          {filteredData.slice(startIndex, endIndex).map((item, index) => (
            <tr key={index} style={index % 2 === 0 ? evenRowStyles : {}}>
              <td style={tableCellStyles}>{item.name}</td>
              <td style={tableCellStyles}>{item.email}</td>
              <td style={tableCellStyles}>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul id="pagination" style={paginationButtonStyles}>
        {paginationButtons}
      </ul>
    </div>
  );
};

export default DataTable;

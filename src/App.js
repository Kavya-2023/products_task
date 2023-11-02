import Data from "./components/data";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [items, setItems] = useState(Data);
  const [pageSize, setPageSize] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const [records, setRecords] = useState(items.slice(0, pageSize));
  const [pageCount, setPageCount] = useState(Math.ceil(items.length / pageSize));
  const [searchQuery, setSearchQuery] = useState('');
  const [order, setOrder] = useState('asc');

  const filterItems = (query) => {
    const filteredData = records.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    return filteredData;
  };
  const sortItems = (data) => {
    if (order === "asc") {
      return data.sort((a, b) => a.price - b.price);
    } else {
      return data.sort((a, b) => b.price - a.price);
    }
  };
  const onPageChange = (index) => {
    setCurrentPage(index);
    let records = items.slice(index * pageSize, pageSize * (index + 1));
    setRecords(records);
  };
  const onLowToHigh = () => {
    setOrder('asc')
  }
  const onHighToLow = () => {
    setOrder('desc')
  }
  useEffect(() => {
    let filteredData = filterItems(searchQuery);
    const sortedData = sortItems(filteredData);
    setPageCount(Math.ceil(items.length / pageSize));
    setRecords(sortedData.slice(0, pageSize));

  }, [searchQuery, items, pageSize, order]);

  return (
    <div className="big-container">
      <nav className="d-flex mt-3">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Search Here.."
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-container d-flex">
          <button className="filter-btn btn btn-outline-primary" onClick={onLowToHigh}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
            </svg>
          </button>
          <button className="filter-btn btn btn-outline-primary" onClick={onHighToLow}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
            </svg>
          </button>
        </div>
      </nav>
      <div className="App d-flex flex-wrap justify-content-center">
        {records.map((item) => (
          <div className="col-4 p-3" key={item.id}>
            <div className="box">
              <img src={item.img} alt={item.title} className="image" />
              <h4 className="card-heading">{item.title}</h4>
              <p>&#8377;{item.price}</p>
              <p className="card-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 0} className="btn">Prev</button>
        {Array(pageCount).fill(null).map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index)}
            className={`${currentPage === index ? 'btn btn-primary' : 'btn'}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === pageCount - 1}
          className="btn"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
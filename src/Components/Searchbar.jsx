import React, { useState } from "react";
import "./SearchBar.css";
import { Link } from "react-router-dom";


function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.Product_name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
      
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
                <Link className="dataItem"  onClick={()=>{
                    window.location.reload();
                    window.location.href = `/product/${value.Id}`;
                }} key={key}>
                    <p>{value.Product_name}</p>
                </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
import { useState } from "react";
import Logo from "./Logo"
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

function App() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("description"); // State for sort option

  const handleAddItems = (addedItem) => {
    setItems((items) => [...items, addedItem]);
  };

  const handlePacked = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleDelete = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handleDeleteAll = () => {
    const confirmed = window.confirm("Are you sure you want to clear all items?");
    if (confirmed) {
      setItems([]);
    }
  };

  const handleSearch = (search) => {
    setSearchTerm(search);
  };

  const filteredItems = items.filter((item) =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSortChange = (sortOption) => {
    setSortOption(sortOption);
  };

  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList
        items={filteredItems}
        handlePacked={handlePacked}
        handleDelete={handleDelete}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        sortOption={sortOption}
        handleSortChange={handleSortChange}
      />
      <div className="footer-container">
        <Stats items={items} />
        <button className="delete-all-btn" onClick={handleDeleteAll}>Clear All</button>
      </div>
    
    </div>
  );
}

export default App;

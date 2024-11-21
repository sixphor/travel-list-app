import { useState } from "react";

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({ handleAddItems }) {
  const [description, setDescription] = useState("");

  const handleDescInput = (e) => {
    setDescription(e.target.value);
  };

  const [quantity, setQuantity] = useState(1);

  const handleQuantityInput = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false,
    };

    handleAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <select value={quantity} onChange={handleQuantityInput}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={handleDescInput}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, handlePacked, handleDelete, searchTerm, handleSearch }) {
  return (
    <div className="list">
      <div className="list-header">
        <input
          type="text"
          className="search-bar"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            quantity={item.quantity}
            description={item.description}
            packed={item.packed}
            handlePacked={() => handlePacked(item.id)}
            handleDelete={() => handleDelete(item.id)}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ quantity, description, packed, handlePacked, handleDelete }) {
  return (
    <li className={packed ? "crossed" : ""}>
      <input type="checkbox" checked={packed} onChange={handlePacked} />
      <span>{quantity}</span> {description}
      <button className="delete-btn" onClick={handleDelete}>
        x
      </button>
    </li>
  );
}

function Stats({ items }) {
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const packedPercentage =
    totalItems === 0 ? 0 : Math.round((packedItems / totalItems) * 100);

  return (
    <footer className="stats">
      <em>
        You have {totalItems} items in the list. You already packed {packedItems} ({packedPercentage}
        %).
      </em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearch = (search) => {
    setSearchTerm(search);
  };

  const filteredItems = items.filter((item) =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      />
      <Stats items={items} />
    </div>
  );
}

export default App;

import { useState } from "react";

export default function Form({ handleAddItems }) {
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
export default function Item({ quantity, description, packed, handlePacked, handleDelete }) {
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
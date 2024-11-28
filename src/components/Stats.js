export default function Stats({ items }) {
    const totalItems = items.length;
    const packedItems = items.filter((item) => item.packed).length;
    const packedPercentage =
      totalItems === 0 ? 0 : Math.round((packedItems / totalItems) * 100);
    
    return (
      <footer className="stats">
        <em>
          {packedPercentage === 100 ? `You got everything!` : `You have ${totalItems} items in the list. You already packed ${packedItems} (${packedPercentage}
          %).`}
        </em>

        <div className="progress-container">
            <progress value={packedPercentage} max="100"></progress>
        </div>
        
      </footer>
    );
  }
import Item from "./Item";

export default function PackingList({ items, handlePacked, handleDelete, searchTerm, handleSearch, sortOption, handleSortChange }) {

    const sortedItems = [...items].sort((a, b) => {
        if (sortOption === "description") {
            return a.description.localeCompare(b.description);
        } else if (sortOption === "quantity") {
            return a.quantity - b.quantity;
        } else if (sortOption === "packed") {
            return a.packed === b.packed ? 0 : a.packed ? 1 : -1;
        }
        return 0;
    });


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

                <select value={sortOption} onChange={(e) => handleSortChange(e.target.value)}>
                    <option value="description">Sort by Description</option>
                    <option value="quantity">Sort by Quantity</option>
                    <option value="packed">Sort by Packed Status</option>
                </select>


            </div>
            <ul>
                {sortedItems.map((item) => (
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
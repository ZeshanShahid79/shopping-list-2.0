import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [activeItem, setActiveItem] = useState([]);
  useEffect(() => {
    loadItems();
    async function loadItems() {
      try {
        const response = await fetch(
          "https://fetch-me.vercel.app/api/shopping/items"
        );
        const data = await response.json();
        setItems(data.data);
      } catch (error) {
        console.error(error);
      }
    }
  }, [items]);
  function handleOnChange(event) {
    setSearchValue(event.target.value);
  }
  function handleAddItem(title) {
    setActiveItem(title.target.value);
  }

  return (
    <>
      <h2>Shopping List:</h2>
      <ul>
        {items
          .filter((item) => {
            if (searchValue === "") {
              //  return item.name.en;
              return activeItem;
            } else if (
              item.name.en.toLowerCase().includes(searchValue.toLowerCase())
            ) {
              return item.name.en;
            }
            return null;
          })
          .map(({ name, _id }) => (
            <button onClick={handleAddItem} key={_id}>
              {name.en}
            </button>
          ))}
      </ul>
      <h2>what do you want to buy</h2>
      <input placeholder="Search..." onChange={handleOnChange}></input>
    </>
  );
}

export default App;

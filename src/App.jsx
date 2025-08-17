import React, { useState, useMemo } from "react";
import Burger from "./components/Burger";
import Controls from "./components/Controls";
import OrderSummary from "./components/OrderSummary";
import INGREDIENTS from "./data/ingredients";

export default function App() {
  // burger is an array of layer objects: { id, type }
  const [burger, setBurger] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  // add a new layer
  const addIngredient = (type) => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2);
    setBurger((prev) => [...prev, { id, type }]);
  };

  // remove a layer by id (used from modal / per-layer remove)
  const removeById = (id) => {
    setBurger((prev) => prev.filter((b) => b.id !== id));
  };

  // remove the last layer of a given type
  const removeOne = (type) => {
    const lastIndex = [...burger].map((b) => b.type).lastIndexOf(type);
    if (lastIndex === -1) return;
    setBurger((prev) => {
      const copy = [...prev];
      copy.splice(lastIndex, 1);
      return copy;
    });
  };

  const clearBurger = () => setBurger([]);
  const openSummary = () => setShowSummary(true);
  const closeSummary = () => setShowSummary(false);

  // counts (ingredient -> quantity)
  const counts = useMemo(() => {
    return burger.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {});
  }, [burger]);

  const totalPrice = useMemo(
    () => burger.reduce((s, i) => s + INGREDIENTS[i.type].price, 0),
    [burger]
  );

  const confirmOrder = () => {
    if (burger.length === 0) {
      alert("Your burger is empty!");
      return;
    }
    alert(`Order placed! Total: ₹${totalPrice}`);
    setBurger([]);
    closeSummary();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🍔 BRRRGRRR</h1>
        <p>Build Your Burger — Add Layers, Remove, and Checkout.</p>
      </header>

      <main className="main-content">
        <Burger layers={burger} />
        <Controls
          counts={counts}
          addIngredient={addIngredient}
          removeOne={removeOne}
          clearBurger={clearBurger}
          openSummary={openSummary}
          totalPrice={totalPrice}
        />
      </main>

      {showSummary && (
        <OrderSummary
          burger={burger}
          counts={counts}
          totalPrice={totalPrice}
          removeById={removeById}
          removeOne={removeOne}
          close={closeSummary}
          confirmOrder={confirmOrder}
        />
      )}
    </div>
  );
}

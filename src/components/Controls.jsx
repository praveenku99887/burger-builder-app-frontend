import React from "react";
import INGREDIENTS from "../data/ingredients";

export default function Controls({
  counts = {},
  addIngredient,
  removeOne,
  clearBurger,
  openSummary,
  totalPrice
}) {
  return (
    <div className="controls">
      <div className="controls-grid">
        {Object.keys(INGREDIENTS).map((name) => (
          <div className="control-card" key={name}>
            <div className="control-row">
              <div className="control-title">{name}</div>
              <div className="count-badge">{counts[name] || 0}</div>
            </div>
            <div className="control-actions">
              <button onClick={() => addIngredient(name)} className="btn add">
                + Add (₹{INGREDIENTS[name].price})
              </button>
              <button
                onClick={() => removeOne(name)}
                className="btn remove"
                disabled={!counts[name]}
              >
                - Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="controls-footer">
        <button onClick={clearBurger} className="btn clear">
          Clear Burger
        </button>
        <button onClick={openSummary} className="btn checkout">
          Checkout (₹{totalPrice})
        </button>
      </div>
    </div>
  );
}

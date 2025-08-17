import React from "react";
import INGREDIENTS from "../data/ingredients";

export default function OrderSummary({
  burger = [],
  counts = {},
  totalPrice = 0,
  removeById,
  removeOne,
  close,
  confirmOrder
}) {
  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal-content">
        <h2>Your Order</h2>

        <div className="summary-grid">
          <div>
            <h3>Items</h3>
            <ul className="summary-list">
              {Object.keys(counts).length === 0 && <li>No ingredients added</li>}
              {Object.keys(counts).map((type) => (
                <li key={type}>
                  <strong>{type}</strong> x {counts[type]} = ₹{INGREDIENTS[type].price * counts[type]}
                  <div className="summary-actions">
                    <button onClick={() => removeOne(type)} className="small-btn">Remove one</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Layers (detailed)</h3>
            <ul className="summary-list">
              {burger.map((layer) => (
                <li key={layer.id}>
                  {layer.type} - ₹{INGREDIENTS[layer.type].price}
                  <button onClick={() => removeById(layer.id)} className="small-btn">❌</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3>Total: ₹{totalPrice}</h3>

        <div className="modal-actions">
          <button onClick={close} className="btn gray">Close</button>
          <button onClick={confirmOrder} className="btn green">Confirm Order</button>
        </div>
      </div>
    </div>
  );
}

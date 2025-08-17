import React from "react";
import INGREDIENTS from "../data/ingredients";

export default function Burger({ layers = [] }) {
  return (
    <div className="burger-display" aria-label="Burger preview">
      <img src="/images/bun-top.png" alt="Top bun" className="bun bun-top" />
      <div className="stack" role="list">
        {layers.map((layer) => (
          <img
            key={layer.id}
            src={INGREDIENTS[layer.type].image}
            alt={layer.type}
            title={layer.type}
            className="ingredient-img drop"
            role="listitem"
          />
        ))}
      </div>
      <img src="/images/bun-bottom.png" alt="Bottom bun" className="bun bun-bottom" />
    </div>
  );
}

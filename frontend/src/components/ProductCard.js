// src/components/ProductCard.js
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ image, title, buttonText, className }) => {
  return (
    <div className={`product-card ${className}`}>
      <img src={image} alt={title} className="product-image" />
      <div className="product-title">{title}</div>
      <div className="button-wrapper">
        <button className="product-button">{buttonText}</button>
      </div>
    </div>
  );
};

export default ProductCard;

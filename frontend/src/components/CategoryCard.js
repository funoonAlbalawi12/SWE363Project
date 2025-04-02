import React from 'react'

function CategoryCard({ name , Icon}) {
    return (
      <div className="category-card">
        {Icon && <Icon className="category-icon" />}
        <p>{name}</p>
      </div>
    );
  }


export default CategoryCard;
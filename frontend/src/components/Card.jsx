import React from 'react';
import '../index.css';

const Card = ({ datePublished, title, author, coverImage }) => {

  const formattedDate = new Date(datePublished).toLocaleDateString('en-US', {
    year: 'numeric', 
    month: 'numeric',
    day: 'numeric'
  })

  return (
    <div className='card'>
      <div className='book-cover-container'>
      <img src={coverImage} alt='Book Cover' className='book-cover'/>
      </div>
      <div>
        <h2>{title}</h2>
        <p>Author: {author}</p>
        <p>Date Published: {formattedDate}</p>
      </div>
    </div>
  );
};

export default Card;

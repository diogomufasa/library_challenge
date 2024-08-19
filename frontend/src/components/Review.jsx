import React from 'react';

const Review = ({ rating, description }) => {


    if (rating > 5) rating = 5;
    if (rating < 1) rating = 1;

    const renderStars = (rating) => {
        let stars = [];
        for (let i = 1; i <=5; i++) {
            stars.push(<div key={--i} className={i <= rating ? 'star-colored' : 'star'}>&#9733;</div>);
        }
        return stars;
    }

    return (
        <div className='review-container'>
            <div className='rating row'>            
                {renderStars(rating)}

            </div>

            <p>Description: {description}</p>
        </div>
    );
};

export default Review;
import React from "react";

export const ReviewContext = React.createContext();

export const ReviewProvider = ({children}) => {
    const [reviewedBooks, setReviewedBooks] = React.useState({});

    const markAsReviewed = (bookId) => {
        setReviewedBooks((prev) => ({...prev, [bookId]: true}));
    }

    return (
        <ReviewContext.Provider value={{reviewedBooks, markAsReviewed}}>
            {children}
        </ReviewContext.Provider>
    )
}
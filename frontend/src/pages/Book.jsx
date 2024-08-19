import { useState, useEffect, useContext, useRef } from 'react';
import '../index.css';
import { useParams, Link, Form } from 'react-router-dom';
import client from '../api';
import { ReviewContext } from '../contexts/ReviewContext';
import Review from '../components/Review';

function Book() {
  const [book, setBook] = useState({});
  const [showForm, setShowForm] = useState(false);
  let { bookId } = useParams();
  const {reviewedBooks, markAsReviewed } = useContext(ReviewContext);
  const formRef = useRef(null);


  useEffect(() => {
    const fetchBook = async () => {
      try {
      const data = await client.fetchData("GET", `/books/${bookId}`);
      if (data.error) {
        return new Error("Book not found")
      }
      setBook(...data);
      } catch (error) {
        throw error;
      }
    }
    fetchBook();
  }, [bookId]);

  const formattedDate = new Date(book.publishDate).toLocaleDateString('en-US', {
    year: 'numeric', 
    month: 'numeric',
    day: 'numeric'
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const description = formData.get('description');
    const rating = formData.get('rating');

    console.log(description, rating);

    if (!description || !rating) {
      return
    }

    if (rating > 5 || rating < 1) {
      return window.alert('Invalid rating');
    }
    await client.fetchData('POST', `books/${book.id}/review`, {
      description: description,
      rating: rating
    })

    markAsReviewed(bookId);
  }

  const hasReviewed = reviewedBooks[bookId];
    
  return (<div className='wrapper'>
    <Link className='link-home' to='/'>Back Home</Link>
    <div className='book-grid'>
    <div className='book-container'>
    <div className='book-cover-container'>
      <img src={book.coverImage} alt='Book Cover' className='book-cover'/>
    </div>
    <div className='book-details'>
      <h1 className='details-title'>{book.title}</h1>
      <h2 className='details-author'>{book.author}</h2>
      <h3 className='details-date'>{formattedDate}</h3>
      <p className='details-description'> {book.description}</p>
    </div>
      {!hasReviewed && (
        <>
        <button className='grey' onClick={() => setShowForm(prevState => !prevState)}>Review book</button>
        {showForm && (

          <div className="form-review">
              <Form onSubmit={handleSubmit} ref={formRef} >
              <p className='bold'>Rating</p>
              <div className='rating'>
                <input type="radio" id="star5" name="rating" value={5}/>
                <label for="star5">&#9733;</label>
                <input type="radio" id="star4" name="rating" value={4}/>
                <label for="star4">&#9733;</label>
                <input type="radio" id="star3" name="rating" value={3}/>
                <label for="star3">&#9733;</label>
                <input type="radio" id="star2" name="rating" value={2} />
                <label for="star2">&#9733;</label>
                <input type="radio" id="star1" name="rating" value={1} />
                <label for="star1">&#9733;</label>
              </div>
              <textarea className='input--description' type="text" name="description" placeholder=' Comment' required />
              <button className='yellow' type="submit">Submit</button>
              </Form>
            </div>
        )}
        </>
      )}
      </div>
      <Review rating={4} description={"a nice book"}/>
      </div>
  </div>);
}

export default Book;

import {useEffect, useState} from 'react';
import '../index.css';
import Card from '../components/Card';
import client from '../api';
import { Link } from 'react-router-dom';

function Home() {

  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await client.fetchData("GET", "/books");
        setBooks(data);
      } catch (error) {
        console.error(error)
        console.log(books)
        setError(error)
      }
    };
    fetchBooks();
  }, [books]);


  return (
    <div>
      <h1 className='title'>Welcome, start by exploring a book!</h1>
      <div className='feed'>
        {error ?        <div className='container-error'>
          <p className='bold'>{error.name} : {error.message}</p>
        </div>

          : books.map(book => {
            return (<Link key={book.id} style={{ textDecoration: 'none', color: 'inherit' }} to={`/books/${book.id}`}><Card title={book.title} author={book.author} datePublished={book.publishDate} coverImage={book.coverImage} /></Link>)
          })
        }
      </div>
    </div>
  );
}

export default Home;

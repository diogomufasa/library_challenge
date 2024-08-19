import React from 'react';
import { Outlet } from 'react-router-dom';
import BookForm from './components/BookForm';
import { ReviewProvider } from './contexts/ReviewContext';

function Root() {
  const [showForm, setShowForm] = React.useState(false);


  return (
    <div className='layout'>
      <header>
        <ul className='nav'>
          <li className='item bold'>React Library</li>
          <li className='item'>
            <button className='yellow' onClick={() => setShowForm(true)}>Add Book</button>
          </li>
        </ul>
      </header>
      {showForm && 
        <div className='form-overlay' onClick={() => setShowForm(false)}>
          <div className='form-container' onClick={e => e.stopPropagation()}>
            <BookForm />
          </div>
        </div>
      }
      <ReviewProvider>
        <Outlet />
      </ReviewProvider>
      
    </div>
  );
}

export default Root;

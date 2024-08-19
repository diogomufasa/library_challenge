import React, { useState } from 'react';
import client from '../api';
import { Form } from 'react-router-dom';

const BookForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [datePublished, setDatePublished] = useState('');

    const handleSubmit = async (e) => {

        const formattedDate = new Date(datePublished).toISOString();

        console.log(formattedDate);


        return await client.fetchData('POST', '/books', {
            id: 0,
            title: title,
            author: author,
            description: description,
            publishDate: formattedDate,
            coverImage: coverImage
        });
        
    };

    return (
        <Form className='form' onSubmit={handleSubmit}>
            <label>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Author:
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Description:
                <textarea
                className='input--description'
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Cover Image:
                <input type="link"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder='please insert image URL'
                    required
                />
            </label>
            <br />
            <label>
                Date Published:
                <input type="date"
                    value={datePublished}
                    onChange={(e) => setDatePublished(e.target.value)} 
                    required
                />
            
            </label>
            <button type="submit" className='submit'>Add Book</button>
        </Form>
    );
};

export default BookForm;
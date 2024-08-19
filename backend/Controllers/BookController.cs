using System.Runtime.CompilerServices;
using LibraryAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.Net.Http.Headers;

namespace LibraryAPI.Controllers
{
    [ApiController]
    [Route("books")]
    public class BookController : ControllerBase
    {
        private MySqlConnector conn;

        public BookController(MySqlConnector conn)
        {
            this.conn = conn;
        }

        // GET '/books' 
        [HttpGet("")]
        public async Task<ActionResult<List<Book>>> GetBooks()
        {
            var books = await conn.ExecuteProcedureQuery<Book>("getBooks");

            if (books == null)
            {
                return NotFound();
            }

            return Ok(books);
        }
        // GET '/books/{id}'
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await conn.ExecuteProcedureQuery<Book>("getBook", new Dictionary<string, object>
            {
                { "p_id", id }
            });

            if (book == null)
            {
                return NotFound();
            }

            Response.Headers[HeaderNames.CacheControl] = "no-cache, no-store, must-revalidate";
            Response.Headers[HeaderNames.Expires] = "0";

            return Ok(book);
        }

        // POST '/books'
        [HttpPost("")]
        public async Task<ActionResult<Book>> AddBook(Book book)
        {
            var createdBook = await conn.ExecuteProcedureQuery<Book>("addBook", new Dictionary<string, object>
            {
                { "p_title", book.Title },
                { "p_author", book.Author },
                { "p_description", book.Description },
                { "p_publish_date", book.PublishDate },
                {"p_cover_image", book.CoverImage}
            });

            return Ok(createdBook);
        }

        // POST '/books/{id}/review
        [HttpPost("{id}/review")]
        public async Task<ActionResult<Review>> AddReview(int id, Review review)
        {
            var createdReview = await conn.ExecuteProcedureQuery<Review>("addReviewToBook", new Dictionary<string, object>
            {
                {"p_book_id", id},
                {"p_description",review.Description },
                {"p_rating", review.Rating}

            });

            return Ok(createdReview);
        }

    }
}

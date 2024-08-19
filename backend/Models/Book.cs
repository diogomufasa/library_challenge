namespace LibraryAPI.Models;

public class Book
{
    public required int Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string Author { get; set; }
    public required DateTime PublishDate { get; set; }
    public required string CoverImage { get; set; }
}
namespace LibraryAPI.Models;

public class Review
{
    public required int Id { get; set; }
    public required int BookId { get; set; }
    public required string Description { get; set; }
    public required int Rating { get; set; }
}
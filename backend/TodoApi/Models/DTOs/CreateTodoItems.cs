using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models.DTOs
{
    public class CreateTodoItems
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        public bool IsCompleted { get; set; } = false;
        
    }
}

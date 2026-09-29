using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;
using TodoApi.Models.DTOs;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TodosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodos()
        {
            var todos = await _context.TodoItems.ToListAsync();
            return Ok(todos);
        }
        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodos(TodoItem new_todo) {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var todo = _context.TodoItems.Add(new_todo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodos), new { id = new_todo.Id }, new_todo);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateTodo(int id, CreateTodoItems updatedTodo)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingTodo = await _context.TodoItems.FindAsync(id);
            if (existingTodo == null)
                return NotFound();

            existingTodo.Title = updatedTodo.Title;
            existingTodo.IsCompleted = updatedTodo.IsCompleted;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteTodos(int id)
        {

            var todo = await _context.TodoItems.FindAsync(id);
            if (todo == null)
                return NotFound();

            _context.TodoItems.Remove(todo);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}
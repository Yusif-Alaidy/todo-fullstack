using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Data
{
    public class AppDbContext:DbContext {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }


        #region Models

        public DbSet<TodoItem> TodoItems { get; set; }
        #endregion

    }
}

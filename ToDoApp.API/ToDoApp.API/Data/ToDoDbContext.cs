using Microsoft.EntityFrameworkCore;
using ToDoApp.API.Models;
namespace ToDoApp.API.Data
{
    public class ToDoDbContext : DbContext
    {
        public ToDoDbContext(DbContextOptions options) : base(options) { }
        public DbSet<ToDo> ToDos { get; set; }
    }
}

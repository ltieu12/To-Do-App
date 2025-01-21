using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoApp.API.Data;

namespace ToDoApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly ToDoDbContext _toDoDbContext;

        public ToDoController(ToDoDbContext toDoDbContext)
        {
            _toDoDbContext = toDoDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllToDos()
        {
            var toDos = await _toDoDbContext.ToDos.ToListAsync();

            return Ok(toDos);
        }
    }
}

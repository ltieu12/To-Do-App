using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoApp.API.Data;
using ToDoApp.API.Models;

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
            var toDos = await _toDoDbContext.ToDos
                .Where(x => x.IsRemoved == false)
                .OrderByDescending(x => x.CreatedDate)
                .ToListAsync();

            return Ok(toDos);
        }

        [HttpGet]
        [Route("get-deleted")]
        public async Task<IActionResult> GetDeletedToDos()
        {
            var deletedToDos = await _toDoDbContext.ToDos
                .Where (x => x.IsRemoved == true)
                .OrderByDescending(x => x.CreatedDate)
                .ToListAsync();

            return Ok(deletedToDos);
        }

        [HttpPost]
        public async Task<IActionResult> AddToDo(ToDo toDoTask)
        {
            toDoTask.Id = Guid.NewGuid();
            _toDoDbContext.ToDos.Add(toDoTask);
            await _toDoDbContext.SaveChangesAsync();

            return Ok(toDoTask);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateToDo([FromRoute] Guid id, ToDo toDoUpdateReq)
        {
            var toDo = await _toDoDbContext.ToDos.FindAsync(id);

            if (toDo == null)
            {
                return NotFound();
            }

            toDo.IsCompleted = toDoUpdateReq.IsCompleted;
            toDo.CompletedDate = DateTime.Now;
            await _toDoDbContext.SaveChangesAsync();

            return Ok(toDo);
        }

        [HttpPut]
        [Route("undo-deleted/{id:Guid}")]
        public async Task<IActionResult> UndoDeletedToDo([FromRoute] Guid id, ToDo toDoUndoReq)
        {
            var undoToDo = await _toDoDbContext.ToDos.FindAsync(id);

            if (undoToDo == null)
            {
                return NotFound();
            }

            undoToDo.IsRemoved = !toDoUndoReq.IsRemoved;
            undoToDo.RemovedDate = null;
            await _toDoDbContext.SaveChangesAsync();

            return Ok(undoToDo);

        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> RemoveToDo([FromRoute] Guid id)
        {
            var toDo = await _toDoDbContext.ToDos.FindAsync(id);

            if (toDo == null)
            {
                return NotFound();
            }

            toDo.IsRemoved = true;
            toDo.RemovedDate = DateTime.Now;

            await _toDoDbContext.SaveChangesAsync();
            return Ok(toDo);
        }
    }
}

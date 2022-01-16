using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ContextClass _context;

        public CategoryController(ContextClass context)
        {
            _context = context;
        }

        // GET: api/Category
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryClass>>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        // GET: api/Category/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryClass>> GetCategoryClass(int id)
        {
            var categoryClass = await _context.Categories.FindAsync(id);

            if (categoryClass == null)
            {
                return NotFound();
            }

            return categoryClass;
        }

        // PUT: api/Category/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategoryClass(int id, CategoryClass categoryClass)
        {
            if (id != categoryClass.CategoryId)
            {
                return BadRequest();
            }

            _context.Entry(categoryClass).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryClassExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Category
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CategoryClass>> PostCategoryClass(CategoryClass categoryClass)
        {
            _context.Categories.Add(categoryClass);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategoryClass", new { id = categoryClass.CategoryId }, categoryClass);
        }

        // DELETE: api/Category/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoryClass(int id)
        {
            var categoryClass = await _context.Categories.FindAsync(id);
            if (categoryClass == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(categoryClass);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CategoryClassExists(int id)
        {
            return _context.Categories.Any(e => e.CategoryId == id);
        }
    }
}

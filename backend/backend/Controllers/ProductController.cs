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
    public class ProductController : ControllerBase
    {
        private readonly ContextClass _context;

        public ProductController(ContextClass context)
        {
            _context = context;
        }

        // GET: api/Product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductClass>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductClass>> GetProductClass(int id)
        {
            var productClass = await _context.Products.FindAsync(id);

            if (productClass == null)
            {
                return NotFound();
            }

            return productClass;
        }

        // PUT: api/Product/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductClass(int id, ProductClass productClass)
        {
            if (id != productClass.ProductId)
            {
                return BadRequest();
            }

            _context.Entry(productClass).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductClassExists(id))
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

        // POST: api/Product
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductClass>> PostProductClass(ProductClass productClass)
        {
            _context.Products.Add(productClass);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductClass", new { id = productClass.ProductId }, productClass);
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductClass(int id)
        {
            var productClass = await _context.Products.FindAsync(id);
            if (productClass == null)
            {
                return NotFound();
            }

            _context.Products.Remove(productClass);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductClassExists(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }
    }
}

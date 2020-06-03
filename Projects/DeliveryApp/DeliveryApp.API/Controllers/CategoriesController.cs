using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DeliveryApp.Data;
using DeliveryApp.Data.Objects;
using System.Linq.Expressions;

namespace DeliveryApp.Web.ApiController
{
    [ApiController]
    [Route("api/[controller]/[action]")] //Attribute Routing
    public class CategoriesController : ControllerBase
    {
        private readonly DeliveryContext _context;

        public CategoriesController(DeliveryContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

         // PUT: api/Categories/5
         // To protect from overposting attacks, enable the specific properties you want to bind to, for
         // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
         [HttpPut("{id}")]
         public async Task<IActionResult> PutCategory(int id, Category category)
         {
             if (id != category.ID)
             {
                 return BadRequest();
             }

             _context.Entry(category).State = EntityState.Modified;

             try
             {
                 await _context.SaveChangesAsync();
             }
             catch (DbUpdateConcurrencyException)
             {
                throw; ;
             }

             return NoContent();
         }

        // POST: api/Categories
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategory", new { id = category.ID }, category);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Category>> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return category;
        }
        /*
        public bool CategoryExists(int id)
        {
            //Checks if the id being passed matches the id in the DB (t/f)
            return _context.Categories.Any(e => e.ID == id);
        }
        */
    }
}

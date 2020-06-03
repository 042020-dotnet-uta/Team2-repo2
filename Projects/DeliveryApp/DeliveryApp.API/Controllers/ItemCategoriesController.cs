using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DeliveryApp.Data;
using DeliveryApp.Data.Objects;

namespace DeliveryApp.Web.ApiController
{
    [ApiController]
    [Route("api/[controller]/[action]")] //Attribute Routing
    public class ItemCategoriesController : ControllerBase
    {
        private readonly DeliveryContext _context;

        public ItemCategoriesController(DeliveryContext context)
        {
            _context = context;
        }

        // GET: api/ItemCategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemCategory>>> GetItemCategories()
        {
            //Make joins with Item table and Category table 
            //so the result json will also contains the definition of related object i.e product and category
            return await _context.ItemCategories.Include(x=>x.Product).Include(x=>x.Category).ToListAsync();
        }

        // GET: api/ItemCategories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemCategory>> GetItemCategory(int id)
        {
            //Make joins with Item table and Category table 
            //so the result json will also contains the definition of related object i.e product and category
            var itemCategory = await _context.ItemCategories.Include(x => x.Product).Include(x => x.Category).Where(x=>x.ID == id).FirstOrDefaultAsync();

            if (itemCategory == null)
            {
                return NotFound();
            }

            return itemCategory;
        }

        // PUT: api/ItemCategories/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItemCategory(int id, ItemCategory itemCategory)
        {
            if (id != itemCategory.ID)
            {
                return BadRequest();
            }

            _context.Entry(itemCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return null;
            }

            return NoContent();
        }

        // POST: api/ItemCategories
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ItemCategory>> PostItemCategory(ItemCategory itemCategory)
        {
            _context.ItemCategories.Add(itemCategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItemCategory", new { id = itemCategory.ID }, itemCategory);
        }

        // DELETE: api/ItemCategories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ItemCategory>> DeleteItemCategory(int id)
        {
            var itemCategory = await _context.ItemCategories.FindAsync(id);
            if (itemCategory == null)
            {
                return NotFound();
            }

            _context.ItemCategories.Remove(itemCategory);
            await _context.SaveChangesAsync();

            return itemCategory;
        }

    }
}

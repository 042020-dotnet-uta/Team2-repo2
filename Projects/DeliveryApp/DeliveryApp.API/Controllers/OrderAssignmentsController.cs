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
    public class OrderAssignmentsController : ControllerBase
    {
        private readonly DeliveryContext _context;

        public OrderAssignmentsController(DeliveryContext context)
        {
            _context = context;
        }

        // GET: api/OrderAssignments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderAssignment>>> GetOrderAssignments()
        {
            //Make joins with user table and OrderAssignmentReason table as Reason 
            //so the result json will also contains the definition of related object
            return await _context.OrderAssignments.Include(x=>x.User).Include(x=>x.Reason).ToListAsync();
        }

        // GET: api/OrderAssignments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderAssignment>> GetOrderAssignment(int id)
        {
            //Make joins with user table and OrderAssignmentReason table as Reason 
            //so the result json will also contains the definition of related object
            var orderAssignment = await _context.OrderAssignments.Include(x => x.User).Include(x => x.Reason).Where(x=>x.ID == id).FirstOrDefaultAsync();

            if (orderAssignment == null)
            {
                return NotFound();
            }

            return orderAssignment;
        }

        // PUT: api/OrderAssignments/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderAssignment(int id, OrderAssignment orderAssignment)
        {
            if (id != orderAssignment.ID)
            {
                return BadRequest();
            }

            _context.Entry(orderAssignment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                /*if (!OrderAssignmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }*/
                throw;
            }

            return NoContent();
        }

        // POST: api/OrderAssignments
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<OrderAssignment>> PostOrderAssignment(OrderAssignment orderAssignment)
        {
            _context.OrderAssignments.Add(orderAssignment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrderAssignment", new { id = orderAssignment.ID }, orderAssignment);
        }

        // DELETE: api/OrderAssignments/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<OrderAssignment>> DeleteOrderAssignment(int id)
        {
            var orderAssignment = await _context.OrderAssignments.FindAsync(id);
            if (orderAssignment == null)
            {
                return NotFound();
            }

            _context.OrderAssignments.Remove(orderAssignment);
            await _context.SaveChangesAsync();

            return orderAssignment;
        }
/*
        private bool OrderAssignmentExists(int id)
        {
            return _context.OrderAssignments.Any(e => e.ID == id);
        }*/
    }
}

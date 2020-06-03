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
    public class OrderAssignmentReasonsController : ControllerBase
    {
        private readonly DeliveryContext _context;

        public OrderAssignmentReasonsController(DeliveryContext context)
        {
            _context = context;
        }

        // GET: api/OrderAssignmentReasons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderAssignmentReason>>> GetOrderAssignmentReasons()
        {
            return await _context.OrderAssignmentReasons.ToListAsync();
        }

        // GET: api/OrderAssignmentReasons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderAssignmentReason>> GetOrderAssignmentReason(int id)
        {
            var orderAssignmentReason = await _context.OrderAssignmentReasons.FindAsync(id);

            if (orderAssignmentReason == null)
            {
                return NotFound();
            }

            return orderAssignmentReason;
        }

        // PUT: api/OrderAssignmentReasons/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderAssignmentReason(int id, OrderAssignmentReason orderAssignmentReason)
        {
            if (id != orderAssignmentReason.ID)
            {
                return BadRequest();
            }

            _context.Entry(orderAssignmentReason).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                /*if (!OrderAssignmentReasonExists(id))
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

        // POST: api/OrderAssignmentReasons
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<OrderAssignmentReason>> PostOrderAssignmentReason(OrderAssignmentReason orderAssignmentReason)
        {
            _context.OrderAssignmentReasons.Add(orderAssignmentReason);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrderAssignmentReason", new { id = orderAssignmentReason.ID }, orderAssignmentReason);
        }

        // DELETE: api/OrderAssignmentReasons/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<OrderAssignmentReason>> DeleteOrderAssignmentReason(int id)
        {
            var orderAssignmentReason = await _context.OrderAssignmentReasons.FindAsync(id);
            if (orderAssignmentReason == null)
            {
                return NotFound();
            }

            _context.OrderAssignmentReasons.Remove(orderAssignmentReason);
            await _context.SaveChangesAsync();

            return orderAssignmentReason;
        }

        private bool OrderAssignmentReasonExists(int id)
        {
            return _context.OrderAssignmentReasons.Any(e => e.ID == id);
        }


        //This post method is only returning object of created on stuff so this method will be use for API Test
        /*[HttpPost]
        public async Task<ActionResult<OrderAssignmentReason>> PostOrderAssignmentReasonForAPITest(OrderAssignmentReason orderAssignmentReason)
        {
            _context.OrderAssignmentReasons.Add(orderAssignmentReason);
            await _context.SaveChangesAsync();  //save() vs SaveChangesAsync() ... b/c we are using async ... match the pair .... one or teh other

            return orderAssignmentReason;
        }*/
    }
}

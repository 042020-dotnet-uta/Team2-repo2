using System;
using System.Collections.Generic;
using System.Text;

namespace DeliveryApp.Data.Objects
{
    public class OrderAssignment
    {
        public int ID { get; set; }
        public User User { get; set; }
        public OrderAssignmentReason Reason { get; set; }
        public DateTime Timestamp { get; set; }
        public OrderAssignment() { }
    }
}

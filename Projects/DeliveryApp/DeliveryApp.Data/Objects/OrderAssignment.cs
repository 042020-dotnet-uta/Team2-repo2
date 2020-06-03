using System;
using System.Collections.Generic;
using System.Runtime;
using System.Text;

namespace DeliveryApp.Data.Objects
{
    public class OrderAssignment
    {
        public int ID { get; set; }
        //public int UserID { get; set; } // This is a navigation property, allows us to acces the User Property .. below
        public Order Order { get; set; }
        public User User { get; set; }
        //public int ReasonID { get; set; } // This is a navigation property, allows us to acces the Reason Property .. below
        public OrderAssignmentReason Reason { get; set; }
        public DateTime Timestamp { get; set; }
        public OrderAssignment() { }
    }
}

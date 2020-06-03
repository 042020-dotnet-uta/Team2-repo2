using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DeliveryApp.Data.Objects
{
    public class Order
    {
        [Key]
        public int ID { get; set; }
        //public int CustomerID { get; set; } //Gives id for each customer
        public User Customer { get; set; }  // This is a navigation property, allows us to acces the Customer Property
        //public int PreparerID { get; set; } 
        public User Preparer { get; set; }  // This is a navigation property, allows us to acces the Customer Property
        //public int DriverID { get; set; } 
        public User Driver { get; set; }    // This is a navigation property, allows us to acces the Customer Property
        //public int LocationID { get; set; } 
        public Restaurant Location { get; set; }
        public List<OrderItem> OrderItems { get; set; }
        public Order() { }

    }
}

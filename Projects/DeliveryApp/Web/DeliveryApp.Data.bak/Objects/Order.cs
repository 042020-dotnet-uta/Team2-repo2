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
        public User Customer { get; set; }
        public User Preparer { get; set; }
        public User Driver { get; set; }
        public Restaurant Location { get; set; }
        public List<Item> Items { get; set; }
        public Order() { }

    }
}

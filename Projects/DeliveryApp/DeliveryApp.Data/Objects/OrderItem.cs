using System;
using System.Collections.Generic;
using System.Text;

namespace DeliveryApp.Data.Objects
{
    public class OrderItem
    {
        public int ID { get; set; }
        public Order Order { get; set; }
        public Item Item { get; set; }
        public OrderItem() { }
    }
}

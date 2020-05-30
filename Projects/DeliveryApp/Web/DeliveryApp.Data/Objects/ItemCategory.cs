using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DeliveryApp.Data.Objects
{
    public class ItemCategory
    {
        [Key]
        public int ID { get; set; }
        public Item Product { get; set; }
        public Category Category { get; set; }
        public ItemCategory() { }


    }
}

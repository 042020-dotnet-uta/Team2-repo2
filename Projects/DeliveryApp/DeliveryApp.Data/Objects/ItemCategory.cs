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
        //public int ProductID { get; set; } // This is a navigation property, allows us to acces the Product Property .. below
        public Item Product { get; set; }
        //public int CategoryID { get; set; } // This is a navigation property, allows us to acces the Category Property .. below
        public Category Category { get; set; }
        public ItemCategory() { }


    }
}

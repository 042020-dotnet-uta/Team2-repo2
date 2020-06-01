using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DeliveryApp.Data.Objects
{
    public class Item
    {
        [Key]
        public int ID { get; set; }
        [Required]
        [DisplayName("Menu Item")]
        [RegularExpression(InputValidation.productPattern, ErrorMessage = InputValidation.productError)]
        public string Name { get; set; }
        [Required]
        [DisplayName("Item Description")]
        [RegularExpression(InputValidation.descriptionPattern, ErrorMessage = InputValidation.descriptionError)]
        public string Description { get; set; }
        [Required]
        [RegularExpression(InputValidation.pricePattern, ErrorMessage = InputValidation.priceError)]
        public decimal Price { get; set; }
        public int CategoryID { get; set; } // This is a navigation property, allows us to acces the Category Property .. below
        public Category Category { get; set; }
        public Item() { }



    }
}

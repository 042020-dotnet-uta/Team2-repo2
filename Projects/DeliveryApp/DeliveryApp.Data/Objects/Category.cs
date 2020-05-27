using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DeliveryApp.Data.Objects
{
    public class Category
    {
        [Key]
        public int ID { get; set; }
        [Required]
        [DisplayName("Menu Category")]
        [RegularExpression(InputValidation.productPattern, ErrorMessage = InputValidation.productError)]
        public string Name { get; set; }
        [Required]
        [DisplayName("Menu Category Description")]
        [RegularExpression(InputValidation.productPattern, ErrorMessage = InputValidation.productError)]
        public string Description { get; set; }
        public Restaurant Restaurant { get; set; }
        public Category() { }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DeliveryApp.Data.Objects
{
    public class Menu
    {
        public int ID { get; set; }
        public List<Category> Categories { get; set; }
        public List<Item> Products { get; set; }
        [Required]
        [DisplayName("Menu Description")]
        [RegularExpression(InputValidation.descriptionPattern, ErrorMessage = InputValidation.descriptionError)]
        public string Description { get; set; }
}
}

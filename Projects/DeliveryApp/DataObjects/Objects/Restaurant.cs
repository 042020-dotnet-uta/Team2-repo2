using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DeliveryApp.Data.Objects
{
    public class Restaurant
    {
        [Key]
        public int ID { get; set; }
        [Required]
        [DisplayName("Restaurant Name")]
      //  [RegularExpression(InputValidation.namePattern, ErrorMessage = InputValidation.nameError)]
        public string Name { get; set; }
        [Required]
        [DisplayName("Restaurant Description")]
        [RegularExpression(InputValidation.descriptionPattern, ErrorMessage = InputValidation.descriptionError)]
        public string Description { get; set; }
        public Restaurant() { }

    }
}

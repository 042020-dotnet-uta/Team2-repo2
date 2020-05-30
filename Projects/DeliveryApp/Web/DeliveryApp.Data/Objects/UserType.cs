using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DeliveryApp.Data.Objects
{
    public class UserType
    {
        [Key]
        public int ID { get; set; }
        [Required]
        [DisplayName("Menu Item")]
        [RegularExpression(InputValidation.productPattern, ErrorMessage =InputValidation.productError)]
        public string Type { get; set; }
        [Required]
        [DisplayName("Item Description")]
        [RegularExpression(InputValidation.descriptionPattern, ErrorMessage = InputValidation.descriptionError)]
        public string Description { get; set; }
        public UserType() { }

    }
}

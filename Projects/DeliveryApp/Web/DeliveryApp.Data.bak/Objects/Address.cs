using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DeliveryApp.Data.Objects
{
    public class Address
    {
        [Key]
        public int ID { get; set; }
        [Required]
        [DisplayName("Address Line 1")]
        [RegularExpression(InputValidation.address1Pattern, ErrorMessage = InputValidation.addressError)]
        public string Address1 { get; set; }
        [Required]
        [DisplayName("Address Line 2")]
        [RegularExpression(InputValidation.address2Pattern, ErrorMessage = InputValidation.addressError)]
        public string Address2 { get; set; }
        [Required]
        [DisplayName("City")]
        [RegularExpression(InputValidation.cityPattern, ErrorMessage = InputValidation.cityError)]
        public string City { get; set; }
        [Required]
        [DisplayName("State")]
        [UsStateTwoCharacterAbbreviation]
        public string State { get; set; }
        [Required]
        [DisplayName("Zip Code")]
        [RegularExpression(InputValidation.zipPattern, ErrorMessage = InputValidation.zipError)]
        public string ZipCode { get; set; }
        public User User { get; set; }
        public Address() { }




    }
}

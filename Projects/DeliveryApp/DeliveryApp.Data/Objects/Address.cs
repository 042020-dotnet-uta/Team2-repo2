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
        [RegularExpression(InputValidation.address1Pattern, ErrorMessage = InputValidation.addressError)]
        [DisplayName("Address Line 1")]
        public string Address1 { get; set; }
        [Required]
        [DisplayName("Address Line 2")]
        [RegularExpression(InputValidation.address2Pattern, ErrorMessage = InputValidation.addressError)]
        public string Address2 { get; set; }
        [Required]
        [RegularExpression(InputValidation.cityPattern, ErrorMessage = InputValidation.cityError)]
        [DisplayName("City")]
        public string City { get; set; }
        [UsStateTwoCharacterAbbreviation]
        [DisplayName("State")]
        public string State { get; set; }
        [DisplayName("Zip Code")]
        [RegularExpression(InputValidation.zipPattern, ErrorMessage = InputValidation.zipError)]
        public string ZipCode { get; set; }
        //public int UserID { get; set; } // This is a navigation property, allows us to acces the User Property .. below
        //public User User { get; set; }
        public Address() { }




    }
}

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
        public string Address1 { get; set; }
        [Required]
        [DisplayName("Address Line 2")]
        public string Address2 { get; set; }
        [Required]
        [DisplayName("City")]
        public string City { get; set; }
        [Required]
        [DisplayName("State")]
        public string State { get; set; }
        [Required]
        [DisplayName("Zip Code")]
        public string ZipCode { get; set; }
        // public int UserID { get; set; } // This is a navigation property, allows us to acces the User Property .. below
        // public User User { get; set; }
        public Address() { }




    }
}

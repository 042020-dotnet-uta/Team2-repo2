using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.RegularExpressions;
using DeliveryApp.Data;

namespace DeliveryApp.Data.Objects

{
    /// <summary>
    /// A class that contains the information for a user
    /// </summary>
    public class User
    {
        [Key]
        public int ID { get; set; }
        [Required]
        [RegularExpression(InputValidation.namePattern, ErrorMessage = InputValidation.nameError)]
        [DisplayName("First Name")]
        public string FName { get; set; }
        [Required]
        [RegularExpression(InputValidation.namePattern, ErrorMessage = InputValidation.nameError)]
        [DisplayName("Last Name")]
        public string LName { get; set; }
        [Required]
        [RegularExpression(InputValidation.passwordPattern, ErrorMessage = InputValidation.passwordError)]
        [PasswordPropertyText]
        public string Password { get; set; }
        public UserType UserType { get; set; }
        /// <summary>
        /// No-argument constructor
        /// </summary>
        public User() { }




    }
}

using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace DeliveryApp.Data.Objects
{
    class InputValidation
    {
        #region Pattern Declarations
        /// <summary>
        /// Stores the name pattern
        /// </summary>
        public const string namePattern = @"^([a-zA-Z-]{2,30})$";
        public const string nameError = "Please use only alpha characters and hyphens";
        /// <summary>
        /// Stores the email pattern
        /// </summary>
        public const string emailPattern = @"^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$";
        public const string emailError = "Invalid Email address";
        /// <summary>
        /// Stores the address line 1 and line 2 patterns pattern
        /// </summary>
        public const string address1Pattern = @"^([a-zA-Z0-9 .-]{2,50})$";
        public const string address2Pattern = @"^([a-zA-Z0-9 .-]{0,50})*$";
        public const string addressError = "Please use only alphanumeric characters, periods, or hyphens";
        /// <summary>
        /// Stores the city pattern
        /// </summary>
        public const string cityPattern = @"^([a-zA-Z -]{2,30})$";
        public const string cityError = "Invalid city name";
        /// <summary>
        /// Stores the phone pattern
        /// </summary>
        public const string phonePattern = @"^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$";
        public const string phoneError = "Invalid phone number";
        /// <summary>
        /// Stores the zip code pattern
        /// </summary>
        public const string zipPattern = @"^\d{5}$";
        public const string zipError = "Invalid Zip Code";
        /// <summary>
        /// Stores the Product name pattern
        /// </summary>
        public const string productPattern = @"^([a-zA-Z0-9 .,-]{0,500})$";
        public const string productError = "Enter a valid product name";
        /// <summary>
        /// Stores the description name pattern
        /// </summary>
        public const string descriptionPattern = @"^([a-zA-Z0-9 .,-]{0,500})$";
        public const string descriptionError = "Enter a valid description";
        /// <summary>
        /// Stores the Price pattern
        /// </summary>
        public const string pricePattern = @"^\d{0,8}(\.\d{2})?$";
        public const string priceError = "Invalid price";
        /// <summary>
        /// Stores the location pattern
        /// </summary>
        public const string locationPattern = @"^([a-zA-Z-. ]{2,30})$";
        public const string locationError = "Invalid location name";
        /// <summary>
        /// Stores the ID pattern
        /// </summary>
        public const string idPattern = @"^\d{1,10}$";

        /// <summary>
        /// Stores the quantity pattern
        /// </summary>
        public const string quantityPattern = @"^\d{1,3}$";
        public const string quantityError = "Invalid quantity";
        /// <summary>
        /// Stores the password pattern
        /// </summary>
        public const string passwordPattern = @"^(?=.*[a - z])(?=.*[A - Z])(?=.*\d)(?=.*[^\da - zA - Z]).{8,15}$";
        public const string passwordError = "The password must contain at least 1 upper case, 1 lower case, 1 number, and 1 special character";

    }
    #endregion
    sealed public class UsStateTwoCharacterAbbreviationAttribute : ValidationAttribute
    {

        private readonly string[] validStateAbbr = new string[] { "AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY" };

        public UsStateTwoCharacterAbbreviationAttribute()
            : base("must be a two character U.S. state abbreviation")
        {

        }



        public override string FormatErrorMessage(string name)
        {
            return String.Format("{0} {1}", name, ErrorMessageString);
        }


        public override bool IsValid(object value)
        {
            if (value == null) return true;
            bool isValid = false;

            if (value.ToString().Length == 2 && this.validStateAbbr.Contains(value.ToString()))
            {
                isValid = true;
            }


            return isValid;
        }


    }
}


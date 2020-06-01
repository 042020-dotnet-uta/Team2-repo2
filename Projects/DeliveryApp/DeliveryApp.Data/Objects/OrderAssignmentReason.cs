using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DeliveryApp.Data.Objects
{
    public class OrderAssignmentReason
    {
        [Key]
        public int ID { get; set; }
        [Required]
        [DisplayName("Reason")]
        public string Reason { get; set; }
        [Required]
        [DisplayName("Reason Description")]
        public string Description { get; set; }
        public OrderAssignmentReason() { }

    }
}

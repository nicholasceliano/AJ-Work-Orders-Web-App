using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WorkOrderWebApp.Models
{
    public class RefUsersData
    {
        public int ID { get; set; }
        public string EmailAddress { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool Enabled { get; set; }
        public bool Admin { get; set; }
        public bool WebUser { get; set; }
    }
}
using System;
using System.Web;

namespace WorkOrderWebApp.Models
{
    public class RefJobData : ReferenceTableData
    {
        public int SiteID { get; set; }
        public string JobNumber { get; set; }
    }
}
using System;
using System.Web;

namespace WorkOrderWebApp.Models
{
    public class WorkOrderWeb
    {
        public int? ID { get; set; }
        public int JobID { get; set; }
        public int SubmittedUserID { get; set; }
        public decimal? RegWorkHours { get; set; }
        public decimal? OvertimeWorkHours { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public bool? Reviewed { get; set; }
        public int? LastUpdatedBy { get; set; }
    }
}

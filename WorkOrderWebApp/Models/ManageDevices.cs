using System;
using System.Web;

namespace WorkOrderWebApp.Models
{
    public class ManageDevicesWeb
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        //public string UserNameLastName { get; set; }
        public int DeviceID { get; set; }
        public string GUID { get; set; }
        public int? LastUpdateBy { get; set; }
    }
}

using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WorkOrderWebApp.Models;

namespace WorkOrderWebApp.Controllers
{
    public class DevicesController : ApiController
    {
        // GET api/Devices
        public string Get()
        {
            //Get list of Devices for Admin Panel and Dropdown
            return JsonConvert.SerializeObject((from a in new WorkOrdersAppEntities().refDevices
                                                select new
                                                {
                                                    ID = a.ID,
                                                    Value = a.DeviceName,
                                                    Enabled = a.Enabled
                                                }).ToList());
        }

        // POST api/Devices
        public string Post([FromBody]ReferenceTableData refData)
        {
            //Add Devices to list from Admin Panel
            try
            {
                var dbCtxt = new WorkOrdersAppEntities();
                dbCtxt.refDevices.Add(new refDevice()
                {
                    DeviceName = refData.Value,
                    Enabled = true
                });
                dbCtxt.SaveChanges();
                return "Success";
            }
            catch
            {
                return "Failed";
            }
        }

        // DELETE api/Devices/5
        public string Delete(int id)
        {
            //Disable Devices from list on Admin Panel
            try
            {
                var dbCtxt = new WorkOrdersAppEntities();
                
                var record = dbCtxt.refDevices.Find(id);

                if (record != null)
                {
                    record.Enabled = false;
                    dbCtxt.SaveChanges();
                    return "Success";
                }
                return "Failed";
            }
            catch
            {
                return "Failed";
            }
        }
    }
}

using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity.SqlServer;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WorkOrderWebApp.Helper;
using WorkOrderWebApp.Models;

namespace WorkOrderWebApp.Controllers
{
    public class ManageDevicesController : ApiController
    {
        // GET api/ManageDevices
        public string Get()
        {
            //Gets list of records for Manage Devices page on Web UI
            var ctxt = new WorkOrdersAppEntities();

            return JsonConvert.SerializeObject((from a in ctxt.ManageDevices
                                                join b in ctxt.refUsers on a.UserID equals b.ID
                                                join c in ctxt.refUsers on a.LastUpdateBy equals c.ID into cc
                                                from c2 in cc.DefaultIfEmpty()
                                                select new
                                                {
                                                    ID = a.ID,
                                                    UserID = b.ID,
                                                    UserNameFirstName = b.First_Name,
                                                    UserNameLastName = b.Last_Name,
                                                    DeviceName = a.refDevice.DeviceName,
                                                    GUID = a.DeviceGUID,
                                                    LastUpdateBy = a.LastUpdateBy == null ? " " : c2.First_Name + " " + c2.Last_Name,
                                                    LastUpdateDate = a.LastUpdateDate == null ? null : SqlFunctions.DatePart("MONTH", a.LastUpdateDate) + "/" + SqlFunctions.DatePart("DAY", a.LastUpdateDate) + "/" + SqlFunctions.DatePart("YEAR", a.LastUpdateDate) + " " + SqlFunctions.DatePart("HOUR", a.LastUpdateDate) + ":" + +SqlFunctions.DatePart("MINUTE", a.LastUpdateDate)
                                                }).ToList());
        }

        // POST api/ManageDevices
        public string Post([FromBody]ManageDevicesWeb md)
        {
            try
            {
                var dbCtxt = new WorkOrdersAppEntities();
                var mdFound = dbCtxt.ManageDevices.Find(md.ID);

                if (mdFound == null) //insert
                {
                    dbCtxt.ManageDevices.Add(new ManageDevice
                    {
                        UserID = md.UserID,
                        DeviceID = md.DeviceID,
                        DeviceGUID = md.GUID,
                        LastUpdateBy = md.LastUpdateBy,
                        LastUpdateDate = FormattingFunctions.ESTDateTime()
                    });
                }
                else //update
                {
                    mdFound.UserID = md.UserID;
                    mdFound.DeviceID = md.DeviceID;
                    mdFound.DeviceGUID = md.GUID;
                    mdFound.LastUpdateBy = md.LastUpdateBy;
                    mdFound.LastUpdateDate = FormattingFunctions.ESTDateTime();
                }

                dbCtxt.SaveChanges();
                return "Success";
            }
            catch
            {
                return "Failed";
            }
        }

        // DELETE api/ManageDevices/5
        public string Delete(int id)
        {
            //Delete record from Manage Devices list on Web UI
            try
            {
                var dbCtxt = new WorkOrdersAppEntities();
                var record = dbCtxt.ManageDevices.Find(id);

                if (record != null)
                {
                    dbCtxt.ManageDevices.Remove(record);
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

using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using WorkOrderWebApp.Models;

namespace WorkOrderWebApp.Controllers
{
    public class SitesController : ApiController
    {
        // GET api/Sites
        public string Get()
        {
            //Get list of Sites for Device App and Admin Panel
            return JsonConvert.SerializeObject((from a in new WorkOrdersAppEntities().refSites
                                                select new
                                                {
                                                    ID = a.ID,
                                                    Value = a.SitesName,
                                                    Enabled = a.Enabled
                                                }).ToList());
        }

        // POST api/Sites
        public string Post([FromBody]ReferenceTableData refData)
        {
            //Add Site to list from Admin Panel
            try
            {
                var dbCtxt = new WorkOrdersAppEntities();
                dbCtxt.refSites.Add(new refSite()
                {
                    SitesName = refData.Value,
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

        // DELETE api/Sites/5
        public string Delete(int id)
        {
            //Disable Sites from list on Admin Panel
            try
            {
                var dbCtxt = new WorkOrdersAppEntities();
                var record = dbCtxt.refSites.Find(id);

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
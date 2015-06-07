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
    public class JobsController : ApiController
    {
        // GET api/Jobs
        public string Get()
        {
            return JsonConvert.SerializeObject((from a in new WorkOrdersAppEntities().refJobs
                                                select new
                                                {
                                                    ID = a.ID,
                                                    Value = a.JobNumber + " - " + a.JobName,
                                                    Enabled = a.Enabled
                                                }).ToList());
        }
        
        // GET api/Jobs/id
        public string Get(string id)
        {
            int siteID = Convert.ToInt32(id);
            //Get list of Jobs for Device App and Admin Panel
            return JsonConvert.SerializeObject((from a in new WorkOrdersAppEntities().refJobs
                                                where a.SiteID.Equals(siteID)
                                                select new
                                                {
                                                    ID = a.ID,
                                                    Value = a.JobNumber + " - " + a.JobName,
                                                    Enabled = a.Enabled
                                                }).ToList());
        }

        // POST api/Jobs
        public string Post([FromBody]RefJobData refJobData)
        {
            //Add Job to list from Admin Panel
            try
            {
                var dbCtxt = new WorkOrdersAppEntities();
                dbCtxt.refJobs.Add(new refJob()
                {
                    SiteID = refJobData.SiteID,
                    JobNumber = refJobData.JobNumber,
                    JobName = refJobData.Value,
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

        // DELETE api/Jobs/5
        public string Delete(int id)
        {
            //Disable Job from list on Admin Panel
            try
            {
                var dbCtxt = new WorkOrdersAppEntities();
                var record = dbCtxt.refJobs.Find(id);

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
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
    public class WorkOrdersController : ApiController
    {
        // GET api/WorkOrders
        public string Get()
        {
            //Get list of Work Orders
            var ctxt = new WorkOrdersAppEntities();
            return JsonConvert.SerializeObject((from a in ctxt.WorkOrders
                                                join b in ctxt.refUsers on a.SubmitUserID equals b.ID
                                                join c in ctxt.refUsers on a.LastUpdateBy equals c.ID into cc
                                                from c2 in cc.DefaultIfEmpty()
                                                select new
                                                {
                                                    ID = a.ID,
                                                    Site = a.refJob.refSite.SitesName,
                                                    Job = a.refJob.JobNumber + " - " + a.refJob.JobName,
                                                    SubmittedByUserID = a.SubmitUserID,
                                                    SubmittedByFirstName = b.First_Name,
                                                    SubmittedByLastName = b.Last_Name,
                                                    SubmittedDate = SqlFunctions.DatePart("MONTH", a.SubmittedDate) + "/" + SqlFunctions.DatePart("DAY", a.SubmittedDate) + "/" + SqlFunctions.DatePart("YEAR", a.SubmittedDate) + " " + SqlFunctions.DatePart("HOUR", a.SubmittedDate) + ":" + +SqlFunctions.DatePart("MINUTE", a.SubmittedDate),
                                                    Subject = a.Subject,
                                                    Description = a.Description,
                                                    Reviewed = a.Reviewed,
                                                    LastUpdatedBy = a.LastUpdateBy == null ? " " : c2.First_Name + " " + c2.Last_Name,
                                                    LastUpdatedDate = a.LastUpdateDate == null ? null : SqlFunctions.DatePart("MONTH", a.LastUpdateDate) + "/" + SqlFunctions.DatePart("DAY", a.LastUpdateDate) + "/" + SqlFunctions.DatePart("YEAR", a.LastUpdateDate) + " " + SqlFunctions.DatePart("HOUR", a.LastUpdateDate) + ":" + +SqlFunctions.DatePart("MINUTE", a.LastUpdateDate),
                                                    RegHoursWorked = a.RegHoursWorked,
                                                    OvertimeHoursWorked = a.OvertimeHoursWorked
                                                }).ToList());
        }

        // GET api/WorkOrders
        public string Get(string id)
        {
            //Gets 5 latest Work Orders which are unaccepted
            var ctxt = new WorkOrdersAppEntities();
            return JsonConvert.SerializeObject((from a in ctxt.WorkOrders
                                                join b in ctxt.refUsers on a.SubmitUserID equals b.ID
                                                join c in ctxt.ManageDevices on b.ID equals c.UserID
                                                join d in ctxt.refUsers on a.LastUpdateBy equals d.ID into dd
                                                from d2 in dd.DefaultIfEmpty()
                                                where c.DeviceGUID.Equals(id) && (a.Reviewed.HasValue ? a.Reviewed == false : a.Reviewed.Equals(null))
                                                orderby a.SubmittedDate descending
                                                select new
                                                {
                                                    ID = a.ID,
                                                    Job = a.refJob.JobNumber + " - " + a.refJob.JobName,
                                                    SubmittedByFirstName = a.refUser.First_Name,
                                                    SubmittedByLastName = a.refUser.Last_Name,
                                                    SubmittedDate = SqlFunctions.DatePart("MONTH", a.SubmittedDate) + "/" + SqlFunctions.DatePart("DAY", a.SubmittedDate) + "/" + SqlFunctions.DatePart("YEAR", a.SubmittedDate) + " " + SqlFunctions.DatePart("HOUR", a.SubmittedDate) + ":" + +SqlFunctions.DatePart("MINUTE", a.SubmittedDate),
                                                    Subject = a.Subject,
                                                    Description = a.Description,
                                                    Reviewed = a.Reviewed,
                                                    LastUpdatedBy = a.LastUpdateBy == null ? " " : d2.First_Name + " " + d2.Last_Name,
                                                    LastUpdatedDate = a.LastUpdateDate == null ? null : SqlFunctions.DatePart("MONTH", a.LastUpdateDate) + "/" + SqlFunctions.DatePart("DAY", a.LastUpdateDate) + "/" + SqlFunctions.DatePart("YEAR", a.LastUpdateDate) + " " + SqlFunctions.DatePart("HOUR", a.LastUpdateDate) + ":" + +SqlFunctions.DatePart("MINUTE", a.LastUpdateDate),
                                                    RegHoursWorked = a.RegHoursWorked,
                                                    OvertimeHoursWorked = a.OvertimeHoursWorked
                                                }).Take(5).ToList());
        }

        // POST api/WorkOrders
        public string Post([FromBody]WorkOrderWeb wo)
        {
            try
            {
                var dbCtxt = new WorkOrdersAppEntities();
                var woFound = dbCtxt.WorkOrders.Find(wo.ID);

                if (woFound == null) //insert
                {
                    dbCtxt.WorkOrders.Add(new WorkOrder
                    {
                        JobID = wo.JobID,
                        SubmitUserID = wo.SubmittedUserID,
                        SubmittedDate = FormattingFunctions.ESTDateTime(),
                        RegHoursWorked = wo.RegWorkHours,
                        OvertimeHoursWorked = wo.OvertimeWorkHours,
                        Subject = wo.Subject,
                        Description = wo.Description,
                        LastUpdateBy = wo.LastUpdatedBy,
                        LastUpdateDate = FormattingFunctions.ESTDateTime()
                    });
                }
                else //update
                {
                    if (wo.JobID != 0)//Denotes incoming update from app or web page
                    {
                        woFound.JobID = wo.JobID;
                        woFound.SubmitUserID = wo.SubmittedUserID;
                        woFound.RegHoursWorked = wo.RegWorkHours;
                        woFound.OvertimeHoursWorked = wo.OvertimeWorkHours;
                        woFound.Subject = wo.Subject;
                        woFound.Description = wo.Description;
                    }
                    woFound.Reviewed = wo.Reviewed;
                    woFound.LastUpdateBy = wo.LastUpdatedBy;
                    woFound.LastUpdateDate = FormattingFunctions.ESTDateTime();
                }

                dbCtxt.SaveChanges();
                return "Success";
            }
            catch(Exception ex)
            {
                return "Failed: " + ex.Message + ": " + ex.InnerException;
            }
        }

        // DELETE api/WorkOrders/5
        public string Delete(int id)
        {
            try
            {
                var dbCtxt = new WorkOrdersAppEntities();

                dbCtxt.WorkOrders.Remove(dbCtxt.WorkOrders.Find(id));
                dbCtxt.SaveChanges();

                return "Success";
            }
            catch
            {
                return "Failed";
            }
        }
    }
}

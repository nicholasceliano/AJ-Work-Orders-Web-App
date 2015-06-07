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
    public class UsersController : ApiController
    {
        // GET api/Users
        public string Get()
        {
            return JsonConvert.SerializeObject((from a in new WorkOrdersAppEntities().refUsers
                                                select new
                                                {
                                                    ID =a.ID,
                                                    FirstName = a.First_Name,
                                                    LastName= a.Last_Name,
                                                    Email = a.EmailAddress,
                                                    WebUser = a.WebUser,
                                                    Admin = a.Admin,
                                                    Enabled = a.Enabled
                                                }).ToList());
        }

        //GET api/Users/ID
        public string Get(string id)
        {
            try
            {
                var ctxt = new WorkOrdersAppEntities();
                return JsonConvert.SerializeObject((from a in ctxt.ManageDevices
                                                    join b in ctxt.refUsers on a.UserID equals b.ID
                                                    where a.DeviceGUID.Equals(id)
                                                    select b.First_Name + " " + b.Last_Name).FirstOrDefault());
            }
            catch
            {
                return null;
            }
        }

        // POST api/Users
        public string Post([FromBody]RefUsersData refData)
        {
            //Adds a User on the Admin Panel
            try
            {
                var dbCtxt = new WorkOrdersAppEntities();
                var userFound = dbCtxt.refUsers.Find(refData.ID);

                if (userFound == null)
                {

                    dbCtxt.refUsers.Add(new refUser()
                    {
                        First_Name = refData.FirstName,
                        Last_Name = refData.LastName,
                        EmailAddress = refData.EmailAddress,
                        WebUser = refData.WebUser,
                        Admin = refData.Admin,
                        Enabled = refData.Enabled
                    });
                }else
                {
                    userFound.First_Name = refData.FirstName;
                    userFound.Last_Name = refData.LastName;
                    userFound.EmailAddress = refData.EmailAddress;
                    userFound.WebUser = refData.WebUser;
                    userFound.Admin = refData.Admin;
                    userFound.Enabled = refData.Enabled;
                }
                dbCtxt.SaveChanges();
                return "Success";
            }
            catch
            {
                return "Failed";
            }
        }

        // DELETE api/Users/5
        public string Delete(int id)
        {
            //Disable User from list on Admin Panel
            try
            {
                var dbCtxt = new WorkOrdersAppEntities();
                var record = dbCtxt.refUsers.Find(id);

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
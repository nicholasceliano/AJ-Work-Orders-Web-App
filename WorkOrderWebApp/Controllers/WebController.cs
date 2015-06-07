using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WorkOrderWebApp.Models;

namespace WorkOrderWebApp.Controllers
{
    public class WebController : Controller
    {
        public static string userIDSession = "UserID";
        public static string userNameSession = "UserName";
        public ActionResult LogIn(string username, string password)
        {
            ViewBag.Title = "Log In";
            ViewBag.Page = 0;

            //check if user can log in
            if (username == null || password == null)
                return View();
            else
            {
                if (username.Length > 0 && password.Length > 0)
                {
                    List<refUser> userList = (from a in new WorkOrdersAppEntities().refUsers
                                              select a).ToList();

                    foreach (refUser user in userList)
                    {
                        if (username == user.EmailAddress)
                        {
                            Session.Add(userIDSession, user.ID);
                            Session.Add(userNameSession, user.First_Name + " " + user.Last_Name);
                            return RedirectToAction("WorkOrders");
                        }
                    }

                    ViewBag.Error = "User does not exist";
                    return View();
                }
                else
                {
                    ViewBag.Error = "Invalid Credentials";
                    return View();
                }
            }
                
        }

        public ActionResult LogOut()
        {
            Session.Remove(userIDSession);
            Session.Remove(userNameSession);
            return RedirectToAction("LogIn");
        }

        public ActionResult WorkOrders()
        {
            if (Session[userNameSession] == null)
                return RedirectToAction("LogIn");
            else
            {
                UpdateSessionUserName();
                ViewBag.Title = "Work Orders";
                ViewBag.Page = 1;
                return View();
            }
        }

        public ActionResult ManageDevices()
        {
            if (Session[userNameSession] == null)
                return RedirectToAction("LogIn");
            else
            {
                UpdateSessionUserName();
                ViewBag.Title = "Manage Devices";
                ViewBag.Page = 2;
                return View();
            }
        }

        public ActionResult AdminPanel()
        {
            if (Session[userNameSession] == null)
                return RedirectToAction("LogIn");
            else
            {
                UpdateSessionUserName();
                ViewBag.Title = "Admin Panel";
                ViewBag.Page = 3;
                return View();
            }
        }

        public ActionResult APITests()
        {
            ViewBag.Title = "API Tests";

            return View();
        }

        private void UpdateSessionUserName()
        {
            int userID = Convert.ToInt32(Session[userIDSession].ToString());
            List<refUser> userList = (from a in new WorkOrdersAppEntities().refUsers
                                              select a).ToList();

            foreach (refUser user in userList)
            {
                if (userID == user.ID)
                    Session[userNameSession] = user.First_Name + " " + user.Last_Name;
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WorkOrderWebApp.Helper
{
    public class FormattingFunctions
    {
        public static DateTime ESTDateTime()
        {
            DateTime timeUTC = DateTime.UtcNow;
            TimeZoneInfo estZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
            return TimeZoneInfo.ConvertTimeFromUtc(timeUTC, estZone);
        }
    }
}
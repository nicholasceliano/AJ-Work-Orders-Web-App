//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WorkOrderWebApp
{
    using System;
    using System.Collections.Generic;
    
    public partial class refSite
    {
        public refSite()
        {
            this.refJobs = new HashSet<refJob>();
        }
    
        public int ID { get; set; }
        public string SitesName { get; set; }
        public bool Enabled { get; set; }
    
        public virtual ICollection<refJob> refJobs { get; set; }
    }
}

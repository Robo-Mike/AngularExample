using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace AngularExample.Models
{
    public class Schedule
    {

        [JsonProperty(PropertyName = "urltoschedule")]
        public string UrlToSchedule
        {
            get;
            set;
        }
        [JsonProperty(PropertyName = "frequency")]
        public string Frequency { get; set; }
    }
}
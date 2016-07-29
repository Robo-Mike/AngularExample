using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AngularExample.Models;

namespace AngularExample.Controllers
{
    public class ScheduleRequestController : Controller
    {
        // GET: ScheduleRequest
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Add(Schedule schedule)
        {
            List<Schedule> schedules;
            try
            {
                schedules = (List<Schedule>)System.Web.HttpContext.Current.Application["schedules"];
            }
            catch (Exception)
            {

                schedules = new List<Schedule> { schedule };
            }
            schedules.Add(schedule);
            System.Web.HttpContext.Current.Application["schedules"] = schedules;
            Response.AppendHeader("Access-Control-Allow-Origin", "*");
            return Content("Success :0)");
        }

        public ActionResult List()
        {

            if (System.Web.HttpContext.Current.Application["schedules"] == null)
            {

                var schedules = new List<Schedule>
                {
                    new Schedule
                    {
                        Frequency = "weekly",
                        UrlToSchedule = "www.amazon.com"
                    },
                    new Schedule
                    {
                        Frequency = "daily",
                        UrlToSchedule = "www.rightmove.com"
                    }
                };
                System.Web.HttpContext.Current.Application["schedules"] = schedules;
            }
            Response.AppendHeader("Access-Control-Allow-Origin", "*");
            return new JsonNetResult(System.Web.HttpContext.Current.Application["schedules"]);
        }



    }
}
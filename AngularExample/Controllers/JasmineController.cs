using System;
using System.Web.Mvc;

namespace AngularExample.Controllers
{
    public class JasmineController : Controller
    {
        public ViewResult Run()
        {
            return View("SpecRunner");
        }
    }
}

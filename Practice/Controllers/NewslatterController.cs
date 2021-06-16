using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Practice.Controllers
{
    public class NewslatterController : Controller
    {
        // GET: Newslatter
        public ActionResult Index()
        {
            return View();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Practice.Controllers
{
    public class SocialFeedController : Controller
    {
        // GET: SocialFeed
        public ActionResult Index()
        {
            return View();
        }
    }
}
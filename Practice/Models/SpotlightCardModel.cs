using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sitecore.Shell.Applications.ContentEditor;

namespace Practice.Models
{
    public class SpotlightCardModel
    {
        public string CardImage { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Link { get; set; }
    }
}
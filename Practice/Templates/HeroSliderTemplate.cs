using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sitecore.Data;

namespace Practice.Templates
{
    public class HeroSliderTemplate
    {
        public struct HeroSlider
        {
            public struct Fields
            {

                public const string Title = "Title";
                public const string Description = "Description";
                public static readonly ID BackgroundVideo = new ID("{F7ED8A6C-2481-40F4-A56E-F7CF64279B96}");
                public const string BackgroundImage = "Background Image";
                public const string Button = "Button";
            }
        }
    }
}
﻿using System.Web;
using System.Web.Mvc;

namespace TurtlePay_Identity_Todo
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}

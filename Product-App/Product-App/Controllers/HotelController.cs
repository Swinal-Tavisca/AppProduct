using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ProductClass;
namespace Product_App.Controllers
{
    public class HotelController : ApiController
    {
        [HttpGet]
       // api/Activity
        public IEnumerable<HotelModel> getHotel()
        {
            using (ProductManagementEntities obj = new ProductManagementEntities())
            {
                return obj.HotelModels.ToList();
            }
        }

        [HttpPost]
        public void postHotel([FromBody]HotelModel HotelObject)
        {
            using (ProductManagementEntities obj = new ProductManagementEntities())
            {
                var productId = obj.HotelModels.Max(p => p.ID);
                int maxId = Int32.Parse(productId.ToString());
                maxId = maxId + 1;
                obj.HotelModels.Add(HotelObject);
                obj.SaveChanges();
            }
        }
        [HttpPut]
        public void putHotel([FromBody]ProductItem item)
        {
            using (ProductManagementEntities obj = new ProductManagementEntities())
            {
                if (item.ProductType == "book")
                {
                    var referneceobject = obj.HotelModels.Find(item.ProductID);
                    string IsBooked = obj.HotelModels.Find(item.ProductID).isBooked;
                    IsBooked = "true";
                    referneceobject.isBooked = IsBooked;
                    obj.SaveChanges();


                }
                if(item.ProductType=="save")
                {
                    var referneceobject = obj.HotelModels.Find(item.ProductID);
                    string IsSaved = obj.HotelModels.Find(item.ProductID).isSaved;
                    IsSaved = "true";
                    referneceobject.isSaved = IsSaved;
                    obj.SaveChanges();


                }
            }
        }
    }
}

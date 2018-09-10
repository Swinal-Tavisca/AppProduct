using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ProductClass;
namespace Product_App.Controllers
{
    public class AirController : ApiController
    {
        [HttpGet]
        // /api/Air
        public IEnumerable<AirModel> getAir()
        {
            using (ProductManagementEntities obj = new ProductManagementEntities())
            {
                return obj.AirModels.ToList();
            }
        }
        [HttpPost]
        public void postAir([FromBody]AirModel AirObject)
        {
            using (ProductManagementEntities obj = new ProductManagementEntities())
            {
                var productId = obj.AirModels.Max(p => p.ID);
                int maxId = Int32.Parse(productId.ToString());
                maxId = maxId + 1;
                obj.AirModels.Add(AirObject);
                obj.SaveChanges();
            }
        }
        [HttpPut]
        public void putAir([FromBody]ProductItem item)
        {
            using (ProductManagementEntities obj = new ProductManagementEntities())
            {
                if (item.ProductType == "book")
                {
                    var referneceobject = obj.AirModels.Find(item.ProductID);
                    string IsBooked = obj.AirModels.Find(item.ProductID).isBooked;
                    IsBooked = "true";
                    referneceobject.isBooked = IsBooked;
                    obj.SaveChanges();


                }
                if(item.ProductType=="save")
                {
                    var referneceobject = obj.AirModels.Find(item.ProductID);
                    string IsSaved = obj.AirModels.Find(item.ProductID).isSaved;
                    IsSaved = "true";
                    referneceobject.isSaved = IsSaved;
                    obj.SaveChanges();


                }
            }
        }

    }
}

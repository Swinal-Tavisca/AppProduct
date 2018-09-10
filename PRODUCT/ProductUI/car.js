function loadCar() {
    var xhttp = new XMLHttpRequest();
    var resultSection=document.getElementById("productListCar");
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        productListCarar=JSON.parse(this.responseText);
        productListCarar.forEach(product => {
                var content;
            content= 
                "<div class='card'>" +
                    "<div class='row card-body'>" +
                        "<div class='col'><h5 class='card-title'>" + product.CarName + "</h5></div>" +
                        "<div class='col'>" + " CAR NAME : " + product.CarName + "</div>" +
                        "<div class='col'>" + " CAR MODEL NO : " + product.CarModelNo + "</div>" +
                        "<div class='col'>" + " CAR PRICE : " + product.CarPrice + "</div>" +
                        "<div class='col'>" + " CAR ID : " + product.ID + "</div>" ;    
                        if(product.isBooked=="false") {
                                content += "<input style='margin:10px' class='col btn btn-primary' type='button' value='Book' onclick=\"bookProduct(\'Car\',"+ product.ID + ")\" >"; 
                        }
                        else {
                                content += "<input style='margin:10px;' class='col btn btn-primary' type='button' value='Booked' onclick=\"bookProduct(\'Car\',"+ product.ID+ ")\" disabled>"; 
                        }
                        if(product.isSaved=="false") {
                                content += "<input style='margin:10px' class='col btn btn-success' type='button' value='Save' onclick=\"saveProduct(\'Car\',"+ product.ID + ")\">";
                        }
                        else {
                                content += "<input style='margin:10px' class='col btn btn-success' type='button' value='Saved' onclick=\"saveProduct(\'Car\',"+ product.ID + ")\" disabled>";
                        }

                    "</div>"+
                "</div>"
                resultSection.innerHTML += content; 
            });
                            
        }
    };
    xhttp.open("GET", "http://localhost:64224/api/Car", true);
    xhttp.send();
 
}  
function postCar()
{
    json = {
        "CarName": document.getElementsByClassName("carpost")[0].value,
        "ID": document.getElementsByClassName("carpost")[1].value,
        "CarModelNo":document.getElementsByClassName("carpost")[2].value,
        "CarPrice":document.getElementsByClassName("carpost")[3].value,
        "isSaved": "1",
        "isBooked": "1"
        }
         json = JSON.stringify(json);
         var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
             console.log(this.responseText)
            }
        };
        xmlhttp.open("POST", "http://localhost:64224/api/Car", true);

        xmlhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xmlhttp.send(json);
}
function bookProduct(product,id)
{
        var url="http://localhost:64224/api/"+product;
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT",url,true);
        xhttp.onload = function()
        {
            if(xhttp.readyState==4 && xhttp.status == "200")
            {
                alert(xhttp.responseText);
            }
            else
            {
                alert(xhttp.readyState);
            }
        }
        xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
        var selectedProduct = {
            ProductId : id,
            OperationType : "book"
        }
        xhttp.send(JSON.stringify(selectedProduct));
}

function saveProduct(product,id)
{
        var url="http://localhost:64224/api/"+product;
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT",url,true);
        xhttp.onload = function()
        {
            if(xhttp.readyState==4 && xhttp.status == "200")
            {
                alert(xhttp.responseText);
            }
            else{
                alert(xhttp.readyState);
            }
        }
        xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
        var selectedProduct = {
        ProductID : id,
        ProductType : "save"
        }
        xhttp.send(JSON.stringify(selectedProduct));
}
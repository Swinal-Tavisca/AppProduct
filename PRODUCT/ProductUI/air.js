function loadAir() {
    var xhttp = new XMLHttpRequest();
    var resultSection=document.getElementById("productListAir");
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        productListAir=JSON.parse(this.responseText);
        productListAir.forEach(product => {
                var content;
            content=
                "<div class='card'>" +
                    "<div class='row card-body'>" +
                        "<div class='col'><h5 class='card-title'>" + product.AirName + "</h5>" +
                        "<div class='col'>" + " AIR NAME : " + product.AirName + "</div>" +
                        "<div class='col'>" + " AIR ID : " + product.ID + "</div>" +
                        "<div class='col'>" + " AIR PRICE : " + product.AirPrice + "</div>" +
                        "<div class='col'>" + " AIR SOURCE : " + product.AirSource + "</div>" +
                        "<div class='col'>" + " AIR DESTINATION : " + product.AirDestination + "</div>" +
                        "<div class='col'>" + " AIR ARRIVAL DATE : " + product.AirArrivalDate + "</div>" +
                        "<div class='col'>" + " AIR DEPARTURE DATE : " + product.AirDepartureDate + "</div>" +
                        "<div class='col'>" + " AIR ARRIVAL TIME : " + product.AirArrivalTime + "</div>" +
                        "<div class='col'>" + " AIR DEPARTURE TIME : " + product.AirDepartureTime + "</div>" ;
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
                    "</div>" +
                "</div>"
                   resultSection.innerHTML += content;      
        });
                            
        }
    };
    xhttp.open("GET", "http://localhost:64224/api/Air", true);
    xhttp.send();
    
}  
function postAir()
{
    json = {
        "AirName": document.getElementsByClassName("airpost")[0].value,
        "ID": document.getElementsByClassName("airpost")[1].value,
        "AirPrice":document.getElementsByClassName("airpost")[2].value,
        "AirSource":document.getElementsByClassName("airpost")[3].value,
        "AirDestination":document.getElementsByClassName("airpost")[4].value,
        "AirArrivalDate":document.getElementsByClassName("airpost")[5].value,
        "AirDepartureDate":document.getElementsByClassName("airpost")[6].value,
        "AirArrivalTime":document.getElementsByClassName("airpost")[7].value,
        "AirDepartureTime":document.getElementsByClassName("airpost")[8].value,
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
        xmlhttp.open("POST", "http://localhost:64224/api/Air", true);

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
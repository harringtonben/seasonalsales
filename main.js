console.log('in main js');

var productArray = [];





function productsJSONConvert() {
	// console.log("this", this.responseText);
	var data = JSON.parse(this.responseText);
	productArray = data.products;
	// console.log(productArray);
	printProducts(productArray);
}

function executeThisCodeIfFileErrors() {
	console.log("shit broke");
}

function printProducts(products) {
	// console.log(products);
	var domString = ``;
	for (var i = 0; i < products.length; i++) {
		
		domString += `<div class="productCard">
					   <h1>${products[i].name}</h1>
					   <h3>${products[i].price}</h3>
					  </div>`;
	}
	printToPage(domString);
}

function printToPage(strang){
	document.getElementById('products').innerHTML += strang;
}

//call products
var productsRequest = new XMLHttpRequest();
productsRequest.addEventListener("load", productsJSONConvert);
productsRequest.addEventListener("error", executeThisCodeIfFileErrors);
productsRequest.open("GET", "products.json");
productsRequest.send();

// console.log(myRequest);
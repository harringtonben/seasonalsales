console.log('in main js');

var productArray = [];
var categoryArray = [];
var dropDown = document.getElementById('dropdown');
var slectedDiscount;
var newProductArray = [];

function categoriesJSONConvert() {
	var data = JSON.parse(this.responseText);
	categoryArray = data.categories;
}

function productsJSONConvert() {
	var data = JSON.parse(this.responseText);
	productArray = data.products;
	createNewProduct(productArray);
	printProducts(newProductArray);	
}

function executeThisCodeIfFileErrors() {
	console.log("shit broke");
}

function createNewProduct(products) {
products.forEach(function(object) {
	newProductArray.push(object);
});
}

function printProducts(products) {
	var domString = ``;
	for (var i = 0; i < products.length; i++) {
		
		domString += `<div class="productCard">
					   <img class="pics" src="${products[i].image}">
					   <h1>${products[i].name}</h1>
					   <h3>${products[i].price}</h3>
					  </div>`;
	}
	printToPage(domString);
}

function printToPage(strang){
	document.getElementById('products').innerHTML = strang;
}

dropDown.addEventListener('change', function(event) {
	if (event.target.options[1].selected === true) {
		addDiscount(1, newProductArray);
	} else if (event.target.options[2].selected === true) {
		addDiscount(2, newProductArray);
	} else if (event.target.options[3].selected === true) {
		addDiscount(3, newProductArray);
	}
});

function addDiscount(category, product ) {
	for (var i = 0; i < product.length; i++) {
		if (product[i].category_id === category) {
			var newPrice = product[i].price-(product[i].price*categoryArray[category-1].discount);
			newPrice = newPrice.toFixed(2);
			product[i].price = newPrice;
		} 
	}
	newProductArray = product;
	console.log(productArray);
	printProducts(newProductArray);
}

//call products
var productsRequest = new XMLHttpRequest();
productsRequest.addEventListener("load", productsJSONConvert);
productsRequest.addEventListener("error", executeThisCodeIfFileErrors);
productsRequest.open("GET", "products.json");
productsRequest.send();

//call categories
var categoryRequest = new XMLHttpRequest();
categoryRequest.addEventListener("load", categoriesJSONConvert);
categoryRequest.addEventListener("error", executeThisCodeIfFileErrors);
categoryRequest.open("GET", "categories.json");
categoryRequest.send();

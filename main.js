console.log('in main js');

var productArray = [];
var categoryArray = [];
var dropDown = document.getElementById('dropdown');
var slectedDiscount;

function productsJSONConvert() {
	var data = JSON.parse(this.responseText);
	productArray = data.products;
	printProducts(productArray);	
}

function categoriesJSONConvert() {
	var data = JSON.parse(this.responseText);
	categoryArray = data.categories;
}

function executeThisCodeIfFileErrors() {
	console.log("shit broke");
}

function printProducts(products) {
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
	document.getElementById('products').innerHTML = strang;
}


dropDown.addEventListener('change', function(event) {
	if (event.target.options[1].selected === true) {
		console.log(event);
		selectedDiscount = event.target.value;
		addDiscount(1, productArray);
		console.log(selectedDiscount);
	} else if (event.target.options[2].selected === true) {
		selectedDiscount = event.target.value;
		addDiscount(2, productArray);
		console.log(selectedDiscount);
	} else if (event.target.options[3].selected === true) {
		addDiscount(3, productArray);
		selectedDiscount = event.target.value;
		console.log(selectedDiscount);
	}

});

function addDiscount(category, product ) {
	for (var i = 0; i < product.length; i++) {
		if (product[i].category_id === category) {
			// debugger;
			// console.log(product[i]);
			var newPrice = product[i].price-(product[i].price*categoryArray[category-1].discount);
			product[i].price = newPrice;
			productArray = product;
		} 
	}

	printProducts(product);
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

var productArray = [];
var categoryArray = [];
var dropDown = document.getElementById('dropdown');

function productsJSONConvert() {
	var productData = JSON.parse(this.responseText).products;
	callCategories(productData);			
}

function executeThisCodeIfFileErrors() {
	console.log("shit broke");
}

//call products
var productsRequest = new XMLHttpRequest();
productsRequest.addEventListener("load", productsJSONConvert);
productsRequest.addEventListener("error", executeThisCodeIfFileErrors);
productsRequest.open("GET", "products.json");
productsRequest.send();

//call categories
function callCategories(products) {
var categoryRequest = new XMLHttpRequest();
categoryRequest.addEventListener("load", categoriesJSONConvert);
categoryRequest.addEventListener("error", executeThisCodeIfFileErrors);
categoryRequest.open("GET", "categories.json");
categoryRequest.send();

	function categoriesJSONConvert() {
	var categoryData = JSON.parse(this.responseText).categories;
	productArray = products;
	categoryArray = categoryData;
	addCategory(products,categoryData);
	}
}

function addCategory(products,categories){
	products.forEach(function(products){
		for (var i = 0; i < categories.length; i++) {
			if (categories[i].id === products.category_id){
				products.categoryName = categories[i].name;
			}
		}
	});
	addNewProduct(products);
	printProducts(products);
}

function addNewProduct(products) {
	for (var i = 0; i < products.length; i++) {
		products[i].displayPrice = products[i].price;
	}
}

function printProducts(products) {
	var domString = ``;
	for (var i = 0; i < products.length; i++) {
		
		domString += `<div class="productCard">
					   <img class="pics" src="${products[i].image}">
					   <h1>${products[i].name}</h1>
					   <h3>${products[i].categoryName}</h3>
					   <h3>${products[i].displayPrice}</h3>
					  </div>`;
	}
	printToPage(domString);
}

function printToPage(strang){
	document.getElementById('products').innerHTML = strang;
}

dropDown.addEventListener('change', function(event) {
	if (event.target.options[1].selected === true) {
		addDiscount(1, productArray);
	} else if (event.target.options[2].selected === true) {
		addDiscount(2, productArray);
	} else if (event.target.options[3].selected === true) {
		addDiscount(3, productArray);
	}
});

function addDiscount(category, product ) {
	// console.log(product);
	for (var i = 0; i < product.length; i++) {
		product[i].displayPrice = product[i].price;
		if (product[i].category_id === category) {
			var newPrice = product[i].price-(product[i].price*categoryArray[category-1].discount);
			newPrice = newPrice.toFixed(2);
			product[i].displayPrice = newPrice;
			// console.log(product[i]);
		} 
	}
	productArray = product;
	// console.log(productArray);
	printProducts(productArray);
}

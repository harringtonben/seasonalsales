console.log('in main js');

var productArray = [];
var categoryArray = [];
var dropDown = document.getElementById('dropdown');
var slectedDiscount;

function productsJSONConvert() {
	// console.log("this", this.responseText);
	var data = JSON.parse(this.responseText);
	productArray = data.products;
	// console.log(productArray);
	printProducts(productArray);	
}

function categoriesJSONConvert() {
	// console.log("this", this.responseText);
	var data = JSON.parse(this.responseText);
	categoryArray = data.categories;
	// console.log(productArray);
	// console.log(categoryArray);
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


dropDown.addEventListener('change', function(event) {
	if (event.target.options[1].selected === true) {
		selectedDiscount = event.target.value;
		addDiscount(1);
	} else if (event.target.options[2].selected === true) {
		addDiscount(2);
		selectedDiscount = event.target.value;
	} else if (event.target.options[3].selected === true) {
		addDiscount(3);
		selectedDiscount = event.target.value;
	}
	// addDiscount();
});




function addDiscount(season) {
	for (var i = 0; i < productArray.length; i++) {
		if (season === 1 && productArray[i].category_id === 1) {
			
		} else if (season === 2 && productArray[i].category_id === 2) {
			console.log('discount 2!!');
		}
	}
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
// console.log(myRequest);
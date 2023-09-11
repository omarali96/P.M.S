let title = document.getElementById("title");
let tax = document.getElementById("tax");
let cpl = document.getElementById("cpl");
let discount = document.getElementById("discount");
let price = document.getElementById("price");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mode = "create";
let globalIndex;

// get total price  (create)
function getTotal() {
  if (price.value != "") {
    let totalPrice =
      +price.value +
      (+tax.value * price.value) / 100 +
      +cpl.value -
      (+discount.value * price.value) / 100;
    total.innerHTML = Math.round(totalPrice);
    total.style.background = "green";
  } else {
    total.style.background = "red";
  }
}

//create product  (create)
function checkAndDeclare() {
  if (localStorage.products != null) {
    products = JSON.parse(localStorage.getItem("products"));
  } else {
    products = [];
  }
}
checkAndDeclare();
const addProduct = function () {
  let product = {
    title: title.value.toLowerCase(),
    price: price.value,
    tax: tax.value,
    cpl: cpl.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != "" &&
    tax.value != "" &&
    cpl.value != "" &&
    discount.value != "" &&
    count.value != "" &&
    category.value != ""
  ) {
    if (mode == "create") {
      products.push(product);
    } else {
      products[globalIndex] = product;
      mode = "create";
      submit.innerHTML = "Create Product";
    }
    clearData();
  } else {
    alert("Please fill all fields");
  }

  //save into localStorage  (create)
  localStorage.setItem("products", JSON.stringify(products));
  console.log(products);

  dataRender();
};

//clear after creation  (create)

function clearData() {
  title.value = "";
  price.value = "";
  tax.value = "";
  cpl.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//Read

function dataRender() {
  getTotal();
  let table = "";
  for (let i = 0; i < products.length; i++) {
    table += `
        <tr>
            <td>${i + 1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].tax}</td>
            <td>${products[i].cpl}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].count}</td>
            <td>${products[i].category}</td>
            <td>
            <button onclick="updateProduct(${i})" id ="update">Update</button>
            
        </td>
        <td><button onclick="deleteProduct(${i})" id ="delete">Delete</button></td>

        </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = table;
  let deleteAll = document.getElementById("deleteAll");
  if (products.length > 0) {
    deleteAll.innerHTML = `<button onclick="deleteAllProducts()">Delete All(${products.length})</button>`;
  } else {
    deleteAll.innerHTML = "";
  }
}
dataRender();

//delete

function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  dataRender();
}

// delete all

function deleteAllProducts() {
  products = [];
  localStorage.setItem("products", JSON.stringify(products));
  dataRender();
}

//update

function updateProduct(index) {
  title.value = products[index].title;
  price.value = products[index].price;
  tax.value = products[index].tax;
  cpl.value = products[index].cpl;
  discount.value = products[index].discount;
  total.innerHTML = products[index].total;
  count.value = products[index].count;
  category.value = products[index].category;

  mode = "update";
  submit.innerHTML = mode;
  globalIndex = index;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//search

let searchMode = "title";

function searchProductBy(id) {
  let search = document.getElementById("search");

  if (id == "searchTitle") {
    searchMode = "title";
    search.placeholder = "search by title";
  } else {
    searchMode = "category";
    search.placeholder = "search by category";
  }
  search.focus();
  search.value = "";
  dataRender();
}

function searchData(value) {
  let search = value;
  let table = "";
  for (let i = 0; i < products.length; i++) {
    if (searchMode == "title") {
      // console.log(products[i]);
      //    || products[i].category.includes(search)
      if (products[i].title.toLowerCase().includes(search)) {
        console.log(products[i]);
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].tax}</td>
                <td>${products[i].cpl}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].count}</td>
                <td>${products[i].category}</td>
                <td>
                <button onclick="updateProduct(${i})" id ="update">Update</button>
                
            </td>
            <td><button onclick="deleteProduct(${i})" id ="delete">Delete</button></td>`;
      }
    } else {
      if (products[i].category.toLowerCase().includes(search)) {
        table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].tax}</td>
                    <td>${products[i].cpl}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].count}</td>
                    <td>${products[i].category}</td>
                    <td>
                    <button onclick="updateProduct(${i})" id ="update">Update</button>
                    
                </td>
                <td><button onclick="deleteProduct(${i})" id ="delete">Delete</button></td>`;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}

//validating data

// //Função para buscar as categorias e criar um option dentro do select com o nome da categoria.
// function renderCategories() {
//     fetch("http://localhost/routes/categories.php?action=get",).then(response => response.json()).then((data) => {
//         var select = document.getElementById('categories-select');
//         data.forEach(category => {
//             var option = document.createElement("option");
//             option.value = JSON.stringify(category.code);
//             option.innerText = JSON.stringify(category.name).replace(/"/g, "");
//             select.append(option);
//         })
//     })
// }

// // Função para renderizar os produtos
// function renderProducts() {
//     fetch("http://localhost/routes/products.php?action=get",).then(response => response.json()).then((data) => {
//         console.log(data)
//         data.forEach(product => {
//             var specialCharsRegex = /[!@#$%^&*()_{}[\]:;<>,.?~]/;
//             if (specialCharsRegex.test(product.name)) {
//                 return;
//             }
//             let tbody = document.getElementById("products-tbody");
//             let trow = document.createElement("tr");
//             trow.innerHTML =
//                 `
//                 <td id="first-collun">${product.productcode}</td>
//                 <td id="other-collun">${product.productname}</td>
//                 <td id="other-collun">${product.amount}</td>
//                 <td id="other-collun"><input type="number" min="0" class="edit-p"><button class="edit-btn" onclick="Edit()">Edit</button> </td>
//                 <td id="other-collun">${product.price}</td>
//                 <td id="other-collun">${product.categoryname}</td>
//                 <td id="other-collun"><button class="del-btn" onClick="location.href='http://localhost/routes/products.php?action=delete&code=${product.productcode}'">Delete</button></td>
//             `;
//             tbody.append(trow)
//         })
//     })
// }

// renderCategories()
// renderProducts()
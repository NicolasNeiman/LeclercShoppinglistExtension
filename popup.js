const productTableHeader = `                
<form>
  <table> 
    <thead>
      <tr>
        <th>Image</th>
        <th>Produit</th>
        <th>Quantite</th>
        <th>Prix</th>
        <th>Manquant ?</th>
      </tr>
    </thead>
    <tbody id="table-body">
    </tbody>
  </table>
`;

const productRowHtml = (title, quantity, totalPrice, img) => {
    return `<tr>
              <td><img src=${img} style="height:40px;width:40px;border-width:0px;" alt='blabla'></td>
              <td>${title}</td>
              <td class="text-center">${quantity}</td>
              <td>${totalPrice}</td>
              <td class="center"><input type="checkbox" id="${title}" name="${title}"></td>
            </tr>`;
};

const insertTableBody = (products, emptyTableBody) => {
    products.forEach((product) => {
        emptyTableBody.insertAdjacentHTML(
            'beforeend',
            productRowHtml(product.title, product.quantity, product.totalPrice, product.img)
        );
    });
};

const addProductTableIntoElement = (products, elementId) => {
    const productDiv = document.getElementById(elementId);
    productDiv.innerHTML = productTableHeader;
    const productTableBody = document.getElementById("table-body");
    insertTableBody(products, productTableBody)
    productDiv.innerHTML += `</form>`
};

function listenGetShoppingListClick() {
    const button = document.getElementById('get-shopping-list');
    button.addEventListener('click', () => {
        chrome.storage.local.get(["products"], (value) => {
            const products = value.products;
            const productsJson = JSON.parse(products);
            addProductTableIntoElement(productsJson, 'shopping-list');
        })
    })
}


function listenReceiveMissingProducts() {
    const missingProdButton = document.getElementById('missing-prod-btn');
    missingProdButton.addEventListener('click', () => {
        const checkboxs = document.querySelectorAll('input');
        checkboxs.forEach((checkbox) => {
            if (checkbox.checked) {
                console.log(checkbox.value);
            }
        });

    })
}

listenGetShoppingListClick();
listenReceiveMissingProducts();
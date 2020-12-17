const fetchData = () => {
    const allItems = document.querySelectorAll("[class$='LigneArticle']")

    if (allItems.length === 0) {
        //alert("Wrong Page");
    } else {
        //alert("Correct Page");
        const shoppingList = document.getElementById("shopping-list");
        const products = []
        allItems.forEach((item) => {
            const title = item.querySelector("[class$='Titre']").innerText;
            const quantity = item.querySelector("[class$='Quantite']").innerText;
            const totalPrice = item.querySelector("[class$='Prix']").innerText;
            console.log(totalPrice);
            const img = item.querySelector('img').src;
            console.log(img);
            const product = {
                title: title,
                quantity: quantity,
                totalPrice: totalPrice,
                img: img
            }
            products.push(product);
        });
        chrome.storage.local.set({ 'products': JSON.stringify(products) }, () => {
            console.log("products info stored");
        });
    }
}
setTimeout(() => {
    fetchData();
}, 500);

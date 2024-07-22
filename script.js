const menu__cardapio = document.getElementById("menu__cardapio")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-itens")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];

/* Abrir o cart modal */
cartBtn.addEventListener("click", function () {
    updateCartModal();
    cartModal.style.display = "flex"
    
});

/* Fechar o cart modal ao clicar fora dele */
window.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
});

/* Fechar o cart modal ao clicar no botão de fechar */
closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none";
});

/* Função para adicionar itens ao carrinho */
menu__cardapio.addEventListener("click", function (event) {
    let parentButton = event.target.closest(".add-to-cart-btn")

    if (parentButton) {
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        //Adicionar no carrinho
        addCart(name, price)
    }

})
/*Funçao par adaicionar no carrinho */
function addCart(name, price) {
    const existingItem = cart.find(item => item.name === name)
    if (existingItem) {
        /*Se o item exestir aumentar +1 */
        existingItem.quantity += 1;
    }
    else {
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }
    updateCartModal()
}
/*Função para atualizar o carrinho */
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex","justyfy-between","mb-4","flex-col");
        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between" >
            <div>
            <p class="font-medium">${item.name}</p>
            <p>Qtd: ${item.quantity}</p>
            <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>
        </div>
            <button class="remove-from-cart-btn" data-name="${item.name}">
                Remover
            </button>
        `
        total  += item.price * item.quantity;
        
        cartItemsContainer.appendChild(cartItemElement)
    })
    cartTotal.textContent = total.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL",
    })
    cartCounter.innerHTML =cart.length;
}
/*Funçao para remover itens do modal */
cartItemsContainer.addEventListener("click",function(event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")
        removeItemCart(name);
    }
})
/*Funçao para remover o item */
function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);
    if(index !== -1){
        const item = cart[index]
        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }
        cart.splice(index, 1);
        updateCartModal();
    }
}
/* Funçao addressInput */
addressInput.addEventListener("input",function(event){
    let inputValue = event.target.value;
    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})

/* Funçao Finalizar */
checkoutBtn.addEventListener("click", function() {
    const isOpen = checkoutlanchoneteOpen();
    if (!isOpen) {
        Toastify({
            text: "Lanchonete fechada!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(135deg, #ff0066, #ffcc00)"
            },
        }).showToast();
        return;
    }

    if(cart.length === 0) return;
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }
    /*Enviar pedido para api whats */
    const cartItems = cart.map((item) => {
        return (
            ` ${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} |`
        )    
    }).join("")
    const message = encodeURIComponent(`Pedido:\n${cartItems}\n\nEndereço: ${addressInput.value}`);
    const phone = "+5537991707610";
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

    cart = [];
    updateCartModal();
});
/*Funçao Open Serviçe */
function checkoutlanchoneteOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22;
}
/*Manipulando a hora na tag span no html  */
const spanItem = document.getElementById("data-span")
const isOpen = checkoutlanchoneteOpen();
if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
}else{
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}





function renderCartItem(item) {
    return `
    <li data-item-id="${item.id}" data-item-qty="1" data-item-price="${item.price}" data-item-total="${item.price}">
        <h5 class="item-name">${item.name}</h5>
        <div class="item-info-wrapper">
            <div class="qty-wrapper">Qty: <span class="item-qty">1</span></div>
            <div class="price-wrapper"> Price: $<span class="item-price">${item.price}</span></div>
            <button class="btn btn-sm btn-outline-danger remove" data-item-id="${item.id}">Remove</button>
        </div>
    </li>
    `;
}

export default class ShoppingCart {
    constructor(rootEl) {
        this.cartEl = rootEl.querySelector(".shopping-cart-list");
        this.totalEl = rootEl.querySelector(".total");
        this.emptyCartEl = rootEl.querySelector(".empty-cart-message");
        this.removeAllEl = rootEl.querySelector(".remove-all");

        this.addEventListeners();
    }

    /**
     * Adds initial event listeners
     * @returns {undefined}
     */
    addEventListeners() {
        this.removeAllEl.addEventListener("click", () => {
            this.removeAll();
        })
        this.cartEl.addEventListener("click", e => {
            if (e.target.tagName !== "BUTTON") {
                return;
            }
            this.removeItem(e.  target.closest("li").dataset.itemId);
        });
    }

    /**
     * Adds new item to the cart
     * or increments its quantity if item is already present.
     * @param {Object} item - item description object
     * @returns {undefined}
     */
    addItem(item) {
        if (!this.isItemInCart(item.id)) {
            this.addNewItem(item);
        } else {
            this.incrementItem(item);
        }
        this.updateCartState();
    }

    /**
     * Renders new item in the cart
     * @param {Object} item - item description object
     * @returns {undefined}
     */
    addNewItem(item) {
        this.cartEl.innerHTML += renderCartItem(item);
    }

    /**
     * Increments quantity and total price for existing cart item
     * @param {Object} item - item description object
     * @returns {undefined}
     */
    incrementItem(item) {
        const itemLi = this.cartEl.querySelector(`[data-item-id="${item.id}"]`);
        const currentQty = parseInt(itemLi.dataset.itemQty, 10);
        itemLi.dataset.itemTotal = parseInt(itemLi.dataset.itemTotal, 10) + item.price;
        itemLi.dataset.itemQty = `${currentQty + 1}`;
        itemLi.querySelector("span.item-qty").innerHTML = itemLi.dataset.itemQty;
        itemLi.querySelector("span.item-price").innerHTML = itemLi.dataset.itemTotal;
    }

    /**
     * Checks existence of item in shopping cart by its id
     * @param {string} id - ID of an item
     * @returns {boolean} - true if item is present in shopping cart, false otherwise
     */
    isItemInCart(id) {
        return [...this.cartEl.children].some((val, i) => val.dataset.itemId === id);
    }

    /**
     * Checks if shopping cart is empty
     * @returns {boolean} true if there's no items in cart, false otherwise
     */
    isCartEmpty() {
        return (this.cartEl.children.length === 0);
    }

    /**
     * Removes all items from the cart
     * @returns {undefined}
     */
    removeAll() {
        this.cartEl.innerHTML = "";
        this.updateCartState();
    }

    /**
     * Removes item from a list
     * @param {string} id - ID of and item to remove
     * @returns {undefined}
     */
    removeItem(id) {
        const item = this.cartEl.querySelector(`[data-item-id="${id}"]`);
        this.cartEl.removeChild(item);
        this.updateCartState();
    }

    /**
     * Updates total sum and visibility of "no items" message / "remove all" button
     * @returns {undefined}
     */
    updateCartState() {
        this.updateTotal();
        this.updateNoItemsMessage();
        this.updateRemoveAllButton();
    }

    /**
     * Update total sum in cart
     * @returns {undefined}
     */
    updateTotal() {
        this.totalEl.innerHTML = this.getTotalSum();
        this.totalEl.innerHTML += " quantity: " + this.getTotalQty();
    }

    /**
     * Get total sum of all items in list
     * @returns {number} Total sum
     */
    getTotalQty() {
        let Qty = 0;
        const items = this.cartEl.children;
        for (let i = 0; i < items.length; i++) {
            Qty += parseInt(items[i].dataset.itemQty, 10);
        }
        return Qty;
    }
    getTotalSum() {
        let total = 0;
        const items = this.cartEl.children;
        for (let i = 0; i < items.length; i++) {
            total += parseInt(items[i].dataset.itemTotal, 10);
        }
        return total;
    }

    /**
     * Updates visibility of cart "no items" message depending on state of the cart
     * @returns {undefined}
     */
    updateNoItemsMessage() {
        (this.isCartEmpty()) && this.emptyCartEl.classList.remove("d-none") || this.emptyCartEl.classList.add("d-none");    
    }

    /**
     * Updates visibility of cart /"remove all" button depending on state of the cart
     * @returns {undefined}
     */
    updateRemoveAllButton() {
        (this.isCartEmpty()) && this.removeAllEl.classList.add("d-none") || this.removeAllEl.classList.remove("d-none");
    }
}
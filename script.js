const categoriesContainer = document.getElementById("categoriesContainer");
const treesContainer = document.getElementById("treesContainer");
const loadingSpinner = document.getElementById("loadingSpinner");
const allTrees = document.getElementById("allTreesBtn");
const treeDetails = document.getElementById("my_modal_1");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const modalTitle = document.getElementById("modalTitle");
let totalPrice = document.getElementById("totalPrice");
const emptyCart = document.getElementById("emptyCartMessage");
let cart = [];

// 5 -> Show spinner
const showSpinner = () => {
    loadingSpinner.classList.remove("hidden");
    treesContainer.innerHTML = "";
};

// 6 -> hide spinner
const hideSpinner = () => {
    loadingSpinner.classList.add("hidden");
};

// 1 -> Load Categories
const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/categories`;
    // async await
    const res = await fetch(url);
    const datas = await res.json();
    displayCategories(datas.categories);
};

// 2 -> Display Trees
const displayCategories = async (categories) => {
    // console.log(categories);
    categoriesContainer.innerHTML = "";

    categories.forEach((category) => {
        const btnDiv = document.createElement("button");
        btnDiv.className = "btn btn-outline w-full";
        btnDiv.textContent = category.category_name;
        // 7 -> select category function
        btnDiv.onclick = () => selectCategory(category.id, btnDiv);
        categoriesContainer.appendChild(btnDiv);
    });
};

// 7 -> Select category function
const selectCategory = async (id, btn) => {
    // console.log(id, btn);
    showSpinner();
    const allBtns = document.querySelectorAll(
        "#categoriesContainer button, #allTreesBtn",
    );
    // console.log(allBtns);
    allBtns.forEach((btn) => {
        btn.classList.remove("btn-success");
        btn.classList.add("btn-outline");
    });
    btn.classList.add("btn-success");
    btn.classList.remove("btn-outline");

    // 8 -> show category wise data
    const res = await fetch(
        `https://openapi.programming-hero.com/api/category/${id}`,
    );
    const datas = await res.json();
    // console.log(datas);
    displayTrees(datas.plants);
    hideSpinner();
};

// 9 -> All trees button
allTrees.addEventListener("click", () => {
    const allBtns = document.querySelectorAll(
        "#categoriesContainer button, #allTreesBtn",
    );
    // console.log(allBtns);
    allBtns.forEach((btn) => {
        btn.classList.remove("btn-success");
        btn.classList.add("btn-outline");
    });
    allTrees.classList.add("btn-success");
    allTrees.classList.remove("btn-outline");

    loadTrees();
});

// 3 -> LoadTrees
const loadTrees = async () => {
    showSpinner();
    const url = `https://openapi.programming-hero.com/api/plants`;
    const res = await fetch(url);
    const datas = await res.json();
    hideSpinner();
    displayTrees(datas.plants);
};

// 4 -> Display Trees
const displayTrees = async (trees) => {
    // console.log(trees);
    trees.forEach((tree) => {
        // console.log(tree);
        const card = document.createElement("div");
        card.className = `card bg-base-100 shadow-sm border-b-4 ${tree.price > 500 ? "border-red-500" : "border-green-500"}`
        card.innerHTML = `
            <div class="">
                <figure>
                    <img class = "h-48 w-full object-cover" src="${tree.image}}" alt="${tree.name}" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title cursor-pointer hover:text-green-500" onclick = "openTreeModal(${tree.id})">${tree.name}</h2>
                    <p class="line-clamp-2">${tree.description}</p>
                    <div class="badge badge-outline badge-success">${tree.category}</div>

                    <div class="card-actions justify-between items-center">
                        <h2 class="font-bold ${tree.price > 500 ? "text-red-500" : "text-[#4ade80]"}">$${tree.price}</h2>
                        <button class="btn btn-success text-white" onclick = "addToCart(${tree.id}, '${tree.name}', ${tree.price})">🛒 Cart </button>
                    </div>
                </div>
            </div>
        `;
        treesContainer.appendChild(card);
    });
};

// 10 -> Open Tree Modal
const openTreeModal = async (treeId) => {
    console.log(treeId);
    const res = await fetch(
        `https://openapi.programming-hero.com/api/plant/${treeId}`,
    );
    const datas = await res.json();
    const plantInfos = datas.plants;
    // console.log(plantInfos);
    modalTitle.textContent = plantInfos.name;
    modalImage.src = plantInfos.image;
    modalCategory.textContent = plantInfos.category;
    modalPrice.textContent = plantInfos.price;
    modalDescription.textContent = plantInfos.description;
    treeDetails.showModal();
};

// 11 -> Add to cart functionalities
function addToCart(id, name, price) {
    // console.log(id, name, price);
    // checking if that product is already in the cart or not
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id,
            name,
            price,
            quantity: 1,
        });
    }

    updateCart();
}

// 12 -> update cart functionalities
function updateCart() {
    const cartContainer = document.getElementById("cartContainer");
    cartContainer.innerHTML = "";
    // console.log(cart);

    // 15 -> empty emptyCartMessage
    if (cart.length === 0) {
        emptyCart.classList.remove('hidden');
        totalPrice.textContent = `${0}`;
        return;
    }

    emptyCart.classList.add('hidden');
    // 14 ->  for total price count 
    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;
        const cartItem = document.createElement("div");
        cartItem.className = "card card-body bg-slate-100";
        cartItem.innerHTML = `
        <div class="card card-body shadow-xl">
            <div class="flex justify-between items-center">
                <div>
                    <h2>${item.name}</h2>
                    <p>${item.price} x ${item.quantity}</p>
                </div>
                <button class="btn btn-ghost" onclick = "removeFromCart(${item.id})">❌</button>
            </div>
                <p class="text-right font-semibold text-xl">${item.price * item.quantity}</p>
        </div>
        `;
        cartContainer.appendChild(cartItem);
    });
    totalPrice.innerText = `$`+total;
}

// 13 -> Remove from cart
function removeFromCart(treeId){
    console.log(treeId);
    const updatedCartElements = cart.filter(item => item.id != treeId);
    // console.log(updatedCartElements, "updatedCartElements");
    cart = updatedCartElements;
    updateCart();
}

loadCategories();
loadTrees();

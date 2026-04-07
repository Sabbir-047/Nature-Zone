const categoriesContainer = document.getElementById("categoriesContainer");
const treesContainer = document.getElementById("treesContainer");
const loadingSpinner = document.getElementById("loadingSpinner");

// 5 -> Show spinner
const showSpinner = () => {
    loadingSpinner.classList.remove("hidden");
    treesContainer.innerHTML = "";
};

const hideSpinner = () => {
    loadingSpinner.classList.add("hidden");
}

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
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button class="btn btn-outline w-full">${category.category_name}</button>
        `;
        categoriesContainer.appendChild(btnDiv);
    });
};

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
        console.log(tree);
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="card bg-base-100 shadow-sm">
                <figure>
                    <img class = "h-48 w-full object-cover" src="${tree.image}}" alt="${tree.name}" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${tree.name}</h2>
                    <p class="line-clamp-2">${tree.description}</p>
                    <div class="badge badge-outline badge-success">${tree.category}</div>

                    <div class="card-actions justify-between items-center">
                        <h2 class="font-bold">${tree.price} BDT</h2>
                        <button class="btn btn-success text-white">🛒 Cart </button>
                    </div>
                </div>
            </div>
        `;
        treesContainer.appendChild(card);
    });
};

loadCategories();
loadTrees();

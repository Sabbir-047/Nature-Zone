const categoriesContainer = document.getElementById("categoriesContainer");
const treesContainer = document.getElementById("treesContainer");
const loadingSpinner = document.getElementById("loadingSpinner");

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
    console.log(datas);
    displayTrees(datas.plants);
    hideSpinner();
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
        // console.log(tree);
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

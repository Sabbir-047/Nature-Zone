const categoriesContainer = document.getElementById("categoriesContainer");

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
    const url = `https://openapi.programming-hero.com/api/plants`;
    const res = await fetch(url);
    const datas = await res.json();
    displayTrees(datas.plants);
};


/*

{
    "id": 23,
    "image": "https://i.ibb.co.com/BKZ52h3q/black-bamboo-min.jpg",
    "name": "Black Bamboo",
    "description": "An exotic bamboo variety with striking black stems. Often used for ornamental purposes and furniture making.",
    "category": "Bamboo",
    "price": 900
}

*/


// 4 -> Display Trees
const displayTrees = async (trees) => {
    // console.log(trees);
    const treesContainer = document.getElementById("treesContainer");

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

// 1 -> Load Categories
const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/categories`;
    // async await
    const res = await fetch(url);
    const datas = await res.json();
    displayCategories(datas.categories);
};
loadCategories();

const displayCategories = (categories) => {
    console.log(categories);

    const categoriesContainer = document.getElementById("categoriesContainer");
    categoriesContainer.innerHTML = "";

    categories.forEach((category) => {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button class="btn btn-outline w-full">${category.category_name}</button>
        `;
        categoriesContainer.appendChild(btnDiv);
    });
};

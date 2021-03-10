//------------------------------------Pizza Constructor
const inputsCheckbox = document.querySelectorAll('.container-custom-checkbox input'),
    ingredients = document.querySelectorAll('.current-pizza-item'),
    totalAmount = document.querySelector('.total-amount>.summa'),
    orderBtn = document.querySelector('.typical-btn'),
    modalWindow = document.querySelector('.modal-window');

/* Additing ingredients to pizza*/

const addIngredients = checkboxes => {
    const nodesArray = Array.from(checkboxes);
    const ingredientsArray = Array.from(ingredients);
    ingredientsArray.splice(0, 2);

    for (let node of checkboxes) {
        node.addEventListener('click', event => {
            event.target.parentNode.classList.toggle('active');
            const index = nodesArray.indexOf(event.target);
            ingredientsArray[index].classList.toggle('active');
            calculateOrder();
        })
    }
}

addIngredients(inputsCheckbox);

/* Calculate order */

const calculateOrder = () => {
    const ingredients = document.querySelectorAll('.container-custom-checkbox.active'),
        drinks = document.querySelectorAll('.select-drink-item.active');

    const startPrice = 300,
        ingredientsPrice = ingredients.length * 25;

    totalAmount.innerHTML = `${startPrice + ingredientsPrice}₽`;
};

/* Alert for order */

const prepareAlertContent = () => {

    const addedIngredients = document.querySelectorAll('.container-custom-checkbox.active');

    let ingredientsList = [];
    if (addedIngredients) {
        for (let ingredient of addedIngredients) {
            ingredientsList.push(ingredient.innerText);
        }
    };

    const totalIngredients = ingredientsList.join(', ') || 'нет ингредиентов';
    const totalText = `Вы заказали пиццу, с ингредиентами: '${totalIngredients}', с Вас ${totalAmount.innerHTML}`;

    alert(totalText);
}


orderBtn.addEventListener('click', () => {
    prepareAlertContent();
});
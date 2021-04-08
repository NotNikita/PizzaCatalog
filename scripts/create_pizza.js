//------------------------------------Pizza Constructor
const inputsCheckbox = document.querySelectorAll('.container-custom-checkbox input'),
    ingredients = document.querySelectorAll('.current-pizza-item'),
    pizzaName = document.querySelector('#pizza-title'),
    pizzaAuthor = document.querySelector('#pizza-author'),
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

    totalAmount.innerHTML = `€${startPrice + ingredientsPrice}`;
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

const addPizzaToDb = (image) => {
    // Getting all ingredients and price
    const addedIngredients = document.querySelectorAll('.container-custom-checkbox.active');
    let ingredientsList = [];
    if (addedIngredients) {
        for (let ingredient of addedIngredients) {
            ingredientsList.push(ingredient.innerText);
        }
    };
    let price = totalAmount.innerHTML;
    let title = pizzaName.value;
    let author = pizzaAuthor.value;
    pizzaStorage.addPizza(title, author, price, ingredientsList, image);
}

orderBtn.addEventListener('click', () => {
    const activeIngredients = document.querySelectorAll('.current-pizza-item.active');

    var canvas = document.createElement('canvas');
    canvas.style.display = "block"
    canvas.id = "canvasPhoto";
    canvas.width = 400;
    canvas.height = 400;
    var ctx = canvas.getContext('2d');
    activeIngredients.forEach(el => {
        ctx.drawImage(el, 0, 0, el.width, el.height);
    })
    canvas.toBlob(blob => {
        addPizzaToDb(blob);
    })
    // FOR DOWNLOADING YOUR CUSTOM PIZZA
    // var link = document.createElement('a');
    // link.download = 'PizzaPhoto.png';
    // link.href = canvas.toDataURL();
    // link.click();
    // link.delete;
});
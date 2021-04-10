var firebaseConfig = {
    apiKey: "AIzaSyDosIYB0O-MRqMxEp8bEyyzWCowY41afn0",
    authDomain: "pizzadb-66739.firebaseapp.com",
    projectId: "pizzadb-66739",
    storageBucket: "pizzadb-66739.appspot.com",
    messagingSenderId: "532660940502",
    appId: "1:532660940502:web:13706d4e164037f3222377",
    databaseURL: "https://pizzadb-66739-default-rtdb.europe-west1.firebasedatabase.app/"
};

function fillCatalog() {
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();

    var ref = database.ref('Pizza/');
    ref.on('value', snapshot => {
        let catalogJSONarray = snapshot.val();
        let catalogDiv = document.querySelector('.main-catalog');

        for (pizza in catalogJSONarray) {
            let pizzaWrapperDiv = document.createElement("div");
            pizzaWrapperDiv.classList.add('product-wrapper');

            let pizzaArticle = document.createElement("article");
            pizzaArticle.classList.add('product-article');
            //image and labels
            let pizzaLabelsContainer = document.createElement("a");
            pizzaLabelsContainer.setAttribute('href', '#');
            pizzaLabelsContainer.classList.add('product-link');

            let pizzaImageDiv = document.createElement("div");
            pizzaImageDiv.classList.add('product-image');
            let img = document.createElement("img");
            img.classList.add('product-image');
            img.src = catalogJSONarray[pizza].ImageLink;
            pizzaImageDiv.appendChild(img);

            let pizzaLineDiv = document.createElement("div");
            pizzaLineDiv.classList.add('line');
            pizzaLineDiv.classList.add('bg-white');

            let pizzaTitleH2 = document.createElement("h2");
            pizzaTitleH2.classList.add('product-title');
            pizzaTitleH2.textContent = catalogJSONarray[pizza].Title;

            let pizzaLabelsDiv = document.createElement("div");
            pizzaLabelsDiv.classList.add('product-labels');

            let pizzaAuthorSpan = document.createElement("span");
            pizzaAuthorSpan.textContent = 'By ' + catalogJSONarray[pizza].Author;
            pizzaAuthorSpan.classList.add('pizza-size');
            let pizzaPriceSpan = document.createElement("span");
            pizzaPriceSpan.textContent = catalogJSONarray[pizza].Price;
            pizzaPriceSpan.classList.add('pizza-price');

            // buttons and ingredients
            let pizzaMoreInfoBtn = document.createElement("a");
            pizzaMoreInfoBtn.setAttribute('href', '#');
            pizzaMoreInfoBtn.classList.add('button');
            pizzaMoreInfoBtn.classList.add('button-white');
            pizzaMoreInfoBtn.textContent = 'More info';

            let pizzaChgLabelBtn = document.createElement("button");
            pizzaChgLabelBtn.classList.add('button');
            pizzaChgLabelBtn.classList.add('button-green');
            pizzaChgLabelBtn.textContent = 'Change label';

            let pizzaIngredientsDiv = document.createElement("div");
            pizzaIngredientsDiv.classList.add('product-ingredients');

            let pizzaIngredH3 = document.createElement("h3");
            pizzaIngredH3.classList.add('ingedients-title');
            pizzaIngredH3.textContent = 'Ingredients';

            var pizzaIngredList = document.createElement("ul");
            pizzaIngredList.classList.add('ingredients-list');

            let ingreds = catalogJSONarray[pizza].Ingredients;
            for (var i = 0; i < ingreds.length; i++) {
                var li = document.createElement("li");
                li.classList.add('ingredient');
                li.textContent = ingreds[i];
                pizzaIngredList.appendChild(li);
            }

            //Appending children
            pizzaLabelsDiv.appendChild(pizzaAuthorSpan);
            pizzaLabelsDiv.appendChild(pizzaPriceSpan);
            //Setting product-link
            pizzaLabelsContainer.appendChild(pizzaImageDiv);
            pizzaLabelsContainer.appendChild(pizzaLineDiv);
            pizzaLabelsContainer.appendChild(pizzaTitleH2);
            pizzaLabelsContainer.appendChild(pizzaLabelsDiv);
            //Setting ingredients div
            pizzaIngredientsDiv.appendChild(pizzaIngredH3);
            pizzaIngredientsDiv.appendChild(pizzaIngredList);
            //Setting product-article article
            pizzaArticle.appendChild(pizzaLabelsContainer);
            pizzaArticle.appendChild(pizzaMoreInfoBtn);
            pizzaArticle.appendChild(pizzaChgLabelBtn);
            pizzaArticle.appendChild(pizzaIngredientsDiv);
            //Setting wrapper for article
            pizzaWrapperDiv.appendChild(pizzaArticle);
            catalogDiv.append(pizzaWrapperDiv);
        }
    });

}

fillCatalog();
var firebaseConfig = {
    apiKey: "AIzaSyDosIYB0O-MRqMxEp8bEyyzWCowY41afn0",
    authDomain: "pizzadb-66739.firebaseapp.com",
    projectId: "pizzadb-66739",
    storageBucket: "pizzadb-66739.appspot.com",
    messagingSenderId: "532660940502",
    appId: "1:532660940502:web:13706d4e164037f3222377",
    databaseURL: "https://pizzadb-66739-default-rtdb.europe-west1.firebasedatabase.app/"
};
// Initialize Firebase
class Storage {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        this.database = firebase.database();
    }

    addPizza(title, author, price, ingredients, image) {
        // Connecting to storage and uploading pizza's image
        let uploadTask = firebase.storage().ref('Images/' + title + author + '.png').put(image);
        let ImgUrl;

        let loadingModel = document.querySelector('.loader-wrapper');
        uploadTask.on('state_changed', function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Make loading model appear
            loadingModel.style.display = 'block';

        }, function (error) {
            alert('error on saving the image');
        }, function () {
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                ImgUrl = url;

                firebase.database().ref('Pizza/').push({
                    Title: title || 'Noname',
                    Author: author || 'Anonym',
                    Price: price,
                    Ingredients: ingredients,
                    ImageLink: ImgUrl
                })
            })
            loadingModel.style.display = 'none';
        });
    }
}

let pizzaStorage = new Storage();
console.log('Database connected')
import firebase from "firebase";
import { IRecipe } from "../interfaces";
import("firebase/firestore");

firebase.initializeApp({
    apiKey: "AIzaSyAgcE7pWnIwveXRbDEQRFCnpMxR67fzvGs",
    authDomain: "food-tracker-65cf6.firebaseapp.com",
    databaseURL: "https://food-tracker-65cf6.firebaseio.com",
    projectId: "food-tracker-65cf6",
    storageBucket: "food-tracker-65cf6.appspot.com",
    messagingSenderId: "963792470335",
    appId: "1:963792470335:web:c41337333b1505474d938a",
    measurementId: "G-VP3B0G8MN7"
});

firebase.analytics();

var db = firebase.firestore();

export async function getRecipesFromFirebase(startAfter) {
    let recipesData = [];
    var recipesRef = db.collection("recipes");
    let query: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;
    if (startAfter) {
        query = await recipesRef.orderBy('name').startAfter(startAfter).limit(20).get();
    } else {
        query = await recipesRef.orderBy('name').limit(20).get();
    }
    query.forEach(recipe => recipesData.push(recipe.data()));
    return recipesData as unknown as IRecipe[];
}

export async function searchRecipeInFirebase(term) {
    let recipesData = [];
    var recipesRef = db.collection("recipes");
    const query = await recipesRef.orderBy('name').startAt(term).endAt(term + "\uf8ff").get();
    query.forEach(recipe => recipesData.push(recipe.data()));
    return recipesData as unknown as IRecipe[];
}

export async function searchRecipeInfoInFirebase(name) {
    var recipesRef = db.collection("recipes");
    const query = await recipesRef.where('name', '==', name).get();
    return query.docs[0].data() as unknown as IRecipe;
}

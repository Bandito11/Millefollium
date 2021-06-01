import firebase from "firebase";
import { IRecipe } from "../interfaces";
import { calculateRatings } from "./calculate-ratings.worker";
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

const user = getFirebaseCurrentUser();

const db = firebase.firestore();

export async function getRecipesFromFirebase(startAfter) {
    let recipesData = [];
    if(!user){
        throw `User doesn't have permissions to access Firebase.`;
    }
    const recipesRef = db.collection('recipes');
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
    if(!user){
        throw `User doesn't have permissions to access Firebase.`;
    }
    const recipesRef = db.collection('recipes');
    const query = await recipesRef.orderBy('name').startAt(term).endAt(term + "\uf8ff").get();
    query.forEach(recipe => recipesData.push(recipe.data()));
    return recipesData as unknown as IRecipe[];
}

export async function searchRecipeInfoInFirebase(name) {
    if(!user){
        throw `User doesn't have permissions to access Firebase.`;
    }
    const recipesRef = db.collection('recipes');
    const query = await recipesRef.where('name', '==', name).get();
    return query.docs[0].data() as unknown as IRecipe;
}

export async function postRatingsInFirebase(recipe: IRecipe) {
    if(!user){
        throw `User doesn't have permissions to access Firebase.`;
    }
    const recipesRef = db.collection('recipes');
    try {
        const res = await Promise.all([await calculateRatings(recipe), await recipesRef.where('name', '==', recipe.name).get()]);
        const recipeCalculated = res[0];
        const found = res[1];
        await recipesRef.doc(found.docs[0].id).set(recipeCalculated);
        return recipeCalculated;
    } catch (error) {
        throw error;
    }
}

export async function getFirebaseCurrentUser() {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
        return currentUser.uid;
    } else {
        try {
            const anon = await firebase.auth().signInAnonymously();
            return anon.user.uid;
        } catch (error) {
            throw error;
        };
    }
}

export async function getPictureFromFirebaseStorage(imagePath) {
    const storageRef = firebase.storage().ref();
    try {
        const url = await storageRef.child(imagePath).getDownloadURL();
        return url;
    } catch (error) {
        throw error;
    }
}
import firebase from "firebase";
import { IRecipe } from "../interfaces";

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

export async function loginFirebase({ email, password }) {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
        throw `${error.message}`;
    }
}

export async function logoutFirebase() {
    try {
        await firebase.auth().signOut();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function postRecipeToFirebase(recipe: IRecipe) {
    if (!firebase.auth().currentUser) {
        throw 'User is not signed.';
    }
    const db = firebase.firestore();
    const recipesRef = db.collection("recipes");
    try {
        if (!recipe['id']) {
            const found = await recipesRef.where('name', '==', recipe.name).get();
            if (found) {
                throw `Recipe ${recipe.name} already exists`;
            }
        }
    } catch (error) {
        throw error;
    }
    const storageRef = firebase.storage().ref();
    const imagesPath: any = `images/${recipe.name}.png`;
    const imageRef = storageRef.child(imagesPath);
    //Upload image
    const metadata = {
        contentType: 'image/png'
    }
    const uploadTask = imageRef.put(recipe.image, metadata);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {
            console.error(error);
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            // switch (error.code) {
            //   case 'storage/unauthorized':
            //     // User doesn't have permission to access the object
            //     break;

            //   case 'storage/canceled':
            //     // User canceled the upload
            //     break;

            //   ...

            //   case 'storage/unknown':
            //     // Unknown error occurred, inspect error.serverResponse
            //     break;
            // }
        }, async function () {
            try {
                const id = recipe.id;
                delete recipe.id;
                recipe.image = imagesPath;
                await recipesRef.doc(id).set(recipe);
            } catch (error) {
                throw error;
            }
        });
}

export async function searchRecipeInFirebase(name: string) {
    const db = firebase.firestore();
    const recipesRef = db.collection("recipes");
    try {
        const found = await recipesRef.where('name', '==', name).get();
        return found;
    } catch (error) {
        throw error;
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

export function checkIfLoggedInFirebase() {
    const logged = firebase.auth().currentUser;
    return logged;
}
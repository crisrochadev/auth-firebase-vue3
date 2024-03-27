import { initializeApp } from "firebase/app";
import {
  getAuth, createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";
import viewConfirmation from "./view-confirmation.js"

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey:process.env.VUE_APP_APIkEY,
  authDomain:process.env.VUE_APP_AUTHDOMAIN,
  projectId:process.env.VUE_APP_PROJECTID,
  storageBucket:process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId:process.env.VUE_APP_MESSAGINGSENDERID,
  appId:process.env.VUE_APP_APPID,
  measurementId:process.env.VUE_APP_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const gprovider = new GoogleAuthProvider();
const fprovider = new FacebookAuthProvider();
const giprovider = new GithubAuthProvider();
const tprovider = new TwitterAuthProvider();
const mprovider = new OAuthProvider('microsoft.com');

export async function confirmation(query,data) {
  return await viewConfirmation(auth, query, data)
}
export async function authUser() {
  return await new Promise(resolve => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve({
          success: true,
          uid: user.uid
        })
      } else {
        resolve({
          success: false
        })
      }
    });
  })
}
async function updateUser(displayName, photoURL) {
  return await updateProfile(auth.currentUser, {
    displayName: displayName, photoURL
  }).then(() => {
    return true
  }).catch((error) => {
    console.error(error)
    return false
  });
}
export async function registerEmail(email, passsword) {
  return await createUserWithEmailAndPassword(auth, email, passsword)
    .then(async (userCredential) => {
      const updatedUser = await updateUser(userCredential.user.displayName, userCredential.user.photoURL ? userCredential.user.photoURL : '')
      if (updatedUser) {
        return {
          success: true,
          user: userCredential.user
        };
      } else {
        return {
          success: true,
          user: userCredential.user,
          message: "displayName e photoUrl não foram salvos"
        };
      }
    })
    .catch((error) => {
      return {
        success: false,
        error
      }
    });
}
export async function login(email, passsword) {
  return await signInWithEmailAndPassword(auth, email, passsword)
    .then((userCredential) => {
      return {
        success: true,
        user: userCredential.user
      };
    })
    .catch((error) => {
      return {
        success: false,
        error
      }
    });
}
export async function google() {
  return await signInWithPopup(auth, fprovider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      const updatedUser = await updateUser(user.displayName, user.photoURL ? user.photoURL : '')
      if (updatedUser) {
        return {
          success: true,
          credential,
          token,
          user
        }
      } else {
        return {
          success: true,
          user: userCredential.user,
          message: "displayName e photoUrl não foram salvos"
        };
      }

    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      return {
        success: false,
        errorCode,
        errorMessage,
        email,
        credential
      }
    });
}
export async function facebook() {
  return await signInWithPopup(auth, fprovider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      const updatedUser = await updateUser(user.displayName, user.photoURL ? user.photoURL : '')
      if (updatedUser) {
        return {
          success: true,
          credential,
          token,
          user
        }
      } else {
        return {
          success: true,
          user: userCredential.user,
          message: "displayName e photoUrl não foram salvos"
        };
      }
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      return {
        success: false,
        errorCode,
        errorMessage,
        email,
        credential
      }
    });
}
export async function twitter() {
  return await signInWithPopup(auth, tprovider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = TwitterAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      const updatedUser = await updateUser(user.displayName, user.photoURL ? user.photoURL : '')
      if (updatedUser) {
        return {
          success: true,
          credential,
          token,
          user
        }
      } else {
        return {
          success: true,
          user: userCredential.user,
          message: "displayName e photoUrl não foram salvos"
        };
      }
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      return {
        success: false,
        errorCode,
        errorMessage,
        email,
        credential
      }
    });
}
export async function github() {
  return await signInWithPopup(auth, giprovider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      const updatedUser = await updateUser(user.displayName, user.photoURL ? user.photoURL : '')
      if (updatedUser) {
        return {
          success: true,
          credential,
          token,
          user
        }
      } else {
        return {
          success: true,
          user: userCredential.user,
          message: "displayName e photoUrl não foram salvos"
        };
      }
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      return {
        success: false,
        errorCode,
        errorMessage,
        email,
        credential
      }
    });
}
export async function microsoft() {
  return await signInWithPopup(auth, mprovider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = credentialFromResult.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      const updatedUser = await updateUser(user.displayName, user.photoURL ? user.photoURL : '')
      if (updatedUser) {
        return {
          success: true,
          credential,
          token,
          user
        }
      } else {
        return {
          success: true,
          user: userCredential.user,
          message: "displayName e photoUrl não foram salvos"
        };
      }
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      return {
        success: false,
        errorCode,
        errorMessage,
        email,
        credential
      }
    });
}
export async function logout() {
  return await signOut(auth).then(() => {
    return {
      success: true
    }
  }).catch((error) => {
    return {
      success: false
    }
  });
}
export async function resetPassword(email) {
  return await sendPasswordResetEmail(auth, email, {
    url: process.env.VUE_APP_URL + email,
  })
    .then(() => {
      return { success: true, message: "Enviamos um link de recuperação para seu email." }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(error)
      return { success: false, error }
    });
}
import { auth, usersRef } from '../firebase.js';
import loadHeader from '../shared/header-component.js';
import loadFooter from '../shared/footer-component.js';

const options = { skipAuth: true };

loadHeader(options);
loadFooter();

const ui = new firebaseui.auth.AuthUI(auth);

ui.start('#firebaseui-auth-container', {
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: './' + window.location.hash,
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    callbacks: {
        signInSuccessWithAuthResult(authResult) {
            const user = authResult.user;
            usersRef.child(user.uid)
                .set({ 
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                });
            return true;
        }
    }
});
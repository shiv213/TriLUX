var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            updateLoggedIn();
            return true;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    // signInSuccessUrl: 'login.js', // TODO update this
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

let name, email, photoUrl, uid, emailVerified;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            ui.start('#firebaseui-auth-container', uiConfig);
        }else{
            waitCall();
        }
            // user.providerData.forEach(function (profile) {
            //     console.log("Sign-in provider: " + profile.providerId);
            //     console.log("Provider-specific UID: " + profile.uid);
            //     console.log("Name: " + profile.displayName);
            //     console.log("Email: " + profile.email);
            //     console.log("Photo URL: " + profile.photoURL);
            //     window.name = profile.displayName;
            //     window.email = profile.email;
            //     window.photoUrl = profile.photoURL;
            //     if (profile.photoURL != null) {
            //         document.getElementById("profileImg").src = profile.photoURL;
            //         document.getElementById("profileImg").height = document.querySelector(".fa-user").offsetHeight * 1.75;
            //         document.getElementById("profileImg").alt = profile.displayName;
            //         document.querySelector(".fa-user").hidden = true;
            //     }
            //     window.emailVerified = profile.email;
            //     window.uid = user.uid;
            //     database.ref('users/').child(user.uid).update({
            //         username: user.displayName,
            //         email: user.email,
            //         profile_picture: window.photoUrl
            //     });
            // });
            // document.getElementById("logoutNav").hidden = false;
            // database.ref('users/' + window.user.uid).child('cart').once("value", function (data) {
            //     if (!(data.val() == null || (window.one === 0 && window.two === 0 && window.three === 0))) {
            //         let childObject = data.val();
            //         Object.keys(childObject).forEach(e => {
            //             window[e + '_count'] = childObject[e].quantity;
            //             // console.log(`item : ${e}`);
            //             // console.log(`value = ${childObject[e].quantity}`);
            //         });
            //     } else {
            //         if (window.location.href.includes("cart.html")) {
            //             document.getElementById("emptyCart").hidden = false;
            //             document.getElementById("rightColumn").hidden = true;
            //         }
            //     }
            //     window.one = window['1_count'] || 0;
            //     window.two = window['2_count'] || 0;
            //     window.three = window['3_count'] || 0;

            // });
            // if (window.location.href.includes("login.html")) {
            //     updateLoggedIn();
            // }
        // } else {
        //     console.log('no user signed in');
        // }
    });
    function updateLoggedIn() {

            document.getElementById('loader').style.display = 'none';
            // document.getElementById('name').innerText = window.name;
            // document.getElementById('email').innerText = window.email;
            if (window.photoUrl != null) {
                document.getElementById('profilePicture').src = window.photoUrl;
                document.getElementById("profilePicture").height = window.innerHeight * .2;
                document.getElementById("profilePicture").alt = window.name;
            } else {
                document.getElementById("profilePicture").className = "fas fa-user fa-7x";
            }
            document.getElementById('profile').hidden = false;
            document.getElementById('login').hidden = true;
            window.location.href = "login.html";
        }
        
        function waitCall() {
            $(window).on('load', function () {
                updateLoggedIn();
            });
        }
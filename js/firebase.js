window.database = firebase.database();

window.addEventListener('DOMContentLoaded', (event) => {
    document.addEventListener('touchmove', function (event) {
        if (event.scale !== 1) { event.preventDefault(); }
    }, { passive: false });
    firebase.auth().onAuthStateChanged(function (user) {
        window.user = user;
        if (user) {
            const navigator = document.querySelector('#appNavigator');
            navigator.resetToPage('main.html').then(function () {
                user.providerData.forEach(function (profile) {
                    console.log("Sign-in provider: " + profile.providerId);
                    console.log("Provider-specific UID: " + profile.uid);
                    console.log("Name: " + profile.displayName);
                    console.log("Email: " + profile.email);
                    console.log("Photo URL: " + profile.photoURL);
                    window.name = profile.displayName;
                    window.email = profile.email;
                    window.photoUrl = profile.photoURL;
                    window.emailVerified = profile.email;
                    window.uid = user.uid;
                    database.ref('users/').child(user.uid).update({
                        username: user.displayName,
                        email: user.email,
                        profile_picture: window.photoUrl
                    });
                    setTimeout(function() {
                        document.getElementById('name').innerText = window.name;
                        document.getElementById('email').innerText = window.email;
                        if (window.photoUrl != null) {
                            document.getElementById('profilePicture').src = window.photoUrl;
                            document.getElementById("profilePicture").height = window.innerHeight * .2;
                            document.getElementById("profilePicture").alt = window.name;
                        } else {
                            document.getElementById("profilePicture").className = "fas fa-user fa-7x";
                        }
                    }, 250);
                });

            });
        } else {
            console.log('no user signed in');
        }
    });
});

function logOut() {
    firebase.auth().signOut().catch(function (err) {
        console.log(err);
    });
    window.location.href = "index.html";
}

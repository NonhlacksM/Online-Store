const firebaseConfig = {
  //   copy your firebase config informations
  apiKey: "AIzaSyBiQr7aHxdYxk8sCkHxMebkVyBEgXCnknU",
  authDomain: "online-store-b90ca.firebaseapp.com",
  databaseURL: "https://online-store-b90ca-default-rtdb.firebaseio.com",
  projectId: "online-store-b90ca",
  storageBucket: "online-store-b90ca.appspot.com",
  messagingSenderId: "160581372978",
  appId: "1:160581372978:web:b507d7ac5f14c9e4ff002b",
  measurementId: "G-PH4QNCPP2J"

};
// initialize firebase
// initialize Firebase using the provided configuration
firebase.initializeApp(firebaseConfig);
// reference your database
var contactFormDB = firebase.database().ref("Users");


document.querySelector("#validate").addEventListener("click", e => {
e.preventDefault(); // prevent default form submission behavior
// get user input values
var name = document.getElementById("name").value;
var surname = document.getElementById("surname").value;
var email = document.getElementById("email").value;
var password = document.getElementById("password").value;
var c_password = document.getElementById("confirmpassword").value;
var regexp = /^(([^<>()\.,;:\s@"]+(.[^<>()\.,;:\s@"]+)*)|(".+"))@(([0−9]1,3[˙0−9]1,3[˙0−9]1,3[˙0−9]1,3[0−9]1,3 [˙​ 0−9]1,3 [˙​ 0−9]1,3 [˙​ 0−9]1,3)|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

// validate user input
if (name==""){
alert("enter name");
}
else if (surname==""){
alert("enter surname");
}
else if (!regexp.test(String(email).toLowerCase())){
alert("invalide email");
}
else if (password.length<6){
alert("Password must be at least 6 characters in length");
}
else if (password!=c_password){
alert("Password does not match");
}
else {
// check if user already exists in the database
var state = "Account created";
contactFormDB.once("value", function (snapshot) {
snapshot.forEach(function(childSnapshot) {
if (email==childSnapshot.val().email){
state = "User Already Exists";
}
});
// if user does not already exist, save user data to the database
if(state=="Account created"){
saveMessages(name, email, surname,password);
alert(state);
}
else{
alert(state);
}
}); 
}
});

// function to save user data to the database
const saveMessages = (name, email, surname,password) => {
var newContactForm = contactFormDB.push();
// set data to be saved
newContactForm.set({
name: name,
email: email,
surname: surname,
password:password
});


// redirect to login page
window.location.assign("login.html");
};

const goBackButton = document.querySelector('.go-back');
goBackButton.addEventListener('click', () => {
    window.location.assign("login.html");
});
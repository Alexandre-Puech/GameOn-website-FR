function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Launch closing event
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

//Form validation rules
const balisePrenom = document.getElementById("first");
let prenomParent = balisePrenom.closest(".formData");
const baliseNom = document.getElementById("last");
let nomParent = baliseNom.closest(".formData");
const baliseEmail = document.getElementById("email");
let emailParent = baliseEmail.closest(".formData");
const baliseNaissance = document.getElementById("birthdate");
let naissanceParent = baliseNaissance.closest(".formData");
const baliseQuantite = document.getElementById("quantity");
let quantiteParent = baliseQuantite.closest(".formData");
const baliseLocation = document.getElementsByName("location");
// let locationParent = baliseLocation.closest(".formData");
const baliseConditions = document.getElementById("checkbox1");
let conditionsParent = baliseConditions.closest(".formData");

function validerPrenom() {
  const prenom = balisePrenom.value;
  if (prenom.length >= 2) {
    prenomParent.setAttribute("data-error-visible", "false");
    return true;
  }
  prenomParent.setAttribute("data-error-visible", "true");
  return false;
}

function validerNom() {
  const nom = baliseNom.value;
  if (nom.length < 2) {
    nomParent.setAttribute("data-error-visible", "true");
    return false;
  }
  nomParent.setAttribute("data-error-visible", "false");
  return true;
}

function validerEmail() {
  const email = baliseEmail.value;
  const mailRegExp = new RegExp("^[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (!mailRegExp.test(email)) {
    emailParent.setAttribute("data-error-visible", "true");
    return false;
  }
  emailParent.setAttribute("data-error-visible", "false");
  return true;
}

function validerDate() {
  const naissance = baliseNaissance.value;
  if (naissance === "") {
    naissanceParent.setAttribute("data-error-visible", "true");
    return false;
  }
  naissanceParent.setAttribute("data-error-visible", "false");
  return true;
}

function validerQuantite() {
  const quantite = baliseQuantite.value;
  const quantiteRegExp = new RegExp("^[0-9]+");
  if (!quantiteRegExp.test(quantite)) {
    quantiteParent.setAttribute("data-error-visible", "true");
    return false;
  }
  quantiteParent.setAttribute("data-error-visible", "false");
  return true;
}

function validerLocation() {
  for (let i = 0; i < baliseLocation.length; i++)
    if (!baliseLocation[i].checked) {
      let locationParent = baliseLocation[i].closest(".formData");
      locationParent.setAttribute("data-error-visible", "true");
      return false;
    }
  let locationParent = baliseLocation[i].closest(".formData");
  locationParent.setAttribute("data-error-visible", "false");
  return true;
}

function validerConditions() {
  if (!baliseConditions.checked) {
    conditionsParent.setAttribute("data-error-visible", "true");
    return false;
  }
  conditionsParent.setAttribute("data-error-visible", "false");
  return true;
}

function validate() {
  const isValidPrenom = validerPrenom();
  const isValidNom = validerNom();
  const isValidEmail = validerEmail();
  const isValidDate = validerDate();
  const isValidQuantite = validerQuantite();
  const isValidLocation = validerLocation();
  const isValidConditions = validerConditions();
  if (
    isValidPrenom &&
    isValidNom &&
    isValidEmail &&
    isValidQuantite &&
    isValidDate &&
    isValidLocation &&
    isValidConditions
  ) {
    //alert("Formulaire envoyé");
    return true;
  }
  // alert("Erreur formulaire");
  return false;
}

//Form submit event
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const isValid = validate();
  if (isValid) {
    form.reset();
    console.log("formulaire envoyé et réinitialisé");
  } else {
    console.log("erreur");
  }
});

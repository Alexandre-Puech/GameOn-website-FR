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
const modalBody = document.querySelector(".modal-body");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close");
const btnSubmit = document.getElementById("btnSubmit");
const balisePrenom = document.getElementById("first");
const prenomParent = balisePrenom.closest(".formData");
const baliseNom = document.getElementById("last");
const nomParent = baliseNom.closest(".formData");
const baliseEmail = document.getElementById("email");
const emailParent = baliseEmail.closest(".formData");
const baliseNaissance = document.getElementById("birthdate");
const naissanceParent = baliseNaissance.closest(".formData");
const baliseQuantite = document.getElementById("quantity");
const quantiteParent = baliseQuantite.closest(".formData");
const baliseLocation = document.getElementsByName("location");
const baliseConditions = document.getElementById("checkbox1");
const conditionsParent = baliseConditions.closest(".formData");

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
  let isChecked = false; // Variable pour suivre si un radio est coché
  baliseLocation.forEach((radio) => {
    if (radio.checked) {
      isChecked = true; // Un bouton radio est sélectionné
    }
  });
  if (!isChecked) {
    // Aucun bouton n'est sélectionné
    baliseLocation.forEach((radio) => {
      const locationParent = radio.closest(".formData");
      locationParent.setAttribute("data-error-visible", "true");
    });
    return false;
  }
  // Si un bouton est sélectionné, on enlève l'erreur (si présente)
  baliseLocation.forEach((radio) => {
    const locationParent = radio.closest(".formData");
    locationParent.setAttribute("data-error-visible", "false");
  });
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

//Function validate on submit
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
    return true;
  }
  return false;
}

function formValide() {
  formData.forEach((formData) => {
    formData.style.opacity = "0";
  });
  const validation = document.createElement("div");
  const messageValidation = document.createElement("h2");
  const contenuValidation = "Merci pour<br>votre inscription";
  validation.appendChild(messageValidation);
  modalBody.appendChild(validation);
  messageValidation.innerHTML = contenuValidation;
  messageValidation.style.width = "100%";
  messageValidation.style.position = "absolute";
  messageValidation.style.top = "50%";
  messageValidation.style.left = "50%";
  messageValidation.style.transform = "translate(-50%, -50%)";
  messageValidation.style.fontSize = "36px";
  messageValidation.style.fontWeight = "400";
  messageValidation.style.textAlign = "center";
  messageValidation.style.color = "white";
}

//Form submit event
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const isValid = validate();
  if (isValid) {
    form.reset();
    formValide();
    btnSubmit.value = "Fermer";
    btnSubmit.addEventListener("click", closeModal);
  }
});

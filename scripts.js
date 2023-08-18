/*
    Name    : Ayush Santoshkumar Patel
    StudID  : 115585226
    File    : scripts.js
    WEB222 FINAL ASSESSMENT
*/

window.addEventListener('DOMContentLoaded', pageSetUp);

 function pageSetUp() 
 {
   currentDate();
   formHideWork();
   radioBtnsSetUp();
   validateForm();
 }
 
 // Current date function for About Me Section:
 function currentDate()
 {
   const dateNow = new Date(Date.now());
   const day =
     dateNow.getDate() < 10 ? (dateNow.getDate() + '').padStart(2, '0') : dateNow.getDate();
 
  var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec");
  var month = dateNow.getMonth();
 
   const dateStr = `${m_names[month]} ${day}, ${dateNow.getFullYear()}`; 
 
   const time = document.querySelectorAll('.curr-date'); 
 
   for (let i = 0; i < time.length; ++i) {
     time[i].setAttribute('datetime', dateStr);
     time[i].innerText = '';
     time[i].innerText = dateStr;
   }
 }
 
 // hides the 'work' <div> holding the pay rate and company website field.
 function formHideWork() {
   const workDiv = document.querySelector('#work');
   workDiv.setAttribute('hidden', '');
 
   const payRate = document.querySelector('#pay-rate');
   payRate.removeAttribute('required');
 }
 
 // reveals the 'work' <div> holding the pay rate and company website field.
 function formShowWork() {
   const workDiv = document.querySelector('#work');
   workDiv.removeAttribute('hidden');
 
   const payRate = document.querySelector('#pay-rate');
   payRate.setAttribute('required', '');
 }
 
 function radioBtnsSetUp() {
   const radioBtns = document.querySelectorAll('.radio-btn');
 
   for (let i = 0; i < radioBtns.length; ++i) {
     if (radioBtns[i].value === 'hiring') {
       radioBtns[i].addEventListener('click', function (event) {
         formShowWork();
         event.stopPropagation();
       });
     } else {
       radioBtns[i].addEventListener('click', function (event) {
         formHideWork();
         event.stopPropagation();
       });
     }
   }
 }
 
 // validates a canadian postal code.
 function validPostalCode(postalCode) {
   const regex = /^[a-zA-Z]\d[a-zA-Z][ -]\d[a-zA-Z]\d$/; // postal code pattern.
   try {
     new String(postalCode);
     return regex.test(postalCode);
   } catch (err) {
     console.error(err);
     return false;
   }
 }
 
 // validates entered pay rate.
 function validPay(pay) {
   try {
     parseInt(pay);
     return pay >= 0;
   } catch (err) {
     console.error(err);
     return false;
   }
 }
 
 function validateForm() {
   const form = document.querySelector('#contact-form');
 
   form.onsubmit = function (event) {
     const workDiv = document
       .querySelector('#contact-form')
       .getAttribute('hidden'); 
 
 
     if (!form.checkValidity()) {
       form.classList.add('was-validated');
 
       event.preventDefault();
       return false;
     }
 
     if (!validPostalCode(form.postcode.value)) {
       form.postcode.setCustomValidity('Enter a valid Canadian postal code.');
       form.classList.add('was-validated');
 
       form.postcode.oninput = function () {
         if (!validPostalCode(form.postcode.value)) {
           form.postcode.setCustomValidity(
             'Enter a valid Canadian postal code.'
           );
         } else {
           form.postcode.setCustomValidity('');
           form.postcode.oninput = null;
         }
       };
 
       event.preventDefault();
     }
 
     if (!workDiv && !validPay(form.pay.value)) {
       form.pay.setCustomValidity('$0 or greater.');
       form.classList.add('was-validated');
 
       form.pay.oninput = function () {
         if (!validPay(form.pay.value)) {
           form.pay.setCustomValidity('$0 or greater.');
         } else {
           form.pay.setCustomValidity('');
           form.pay.oninput = null;
         }
       };
       event.preventDefault();
     }
   };
 }
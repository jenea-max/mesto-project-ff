(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-17",headers:{authorization:"d883e4b3-b30c-45e6-8f43-80388fd03caf","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ${res.status}")},n=function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)},r=function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)};function o(e,t,o,a,c,u){var i=document.querySelector("#card-template").content.cloneNode(!0),l=i.querySelector(".card__delete-button"),s=i.querySelector(".card__image"),d=i.querySelector(".card__title"),p=i.querySelector(".card__like-button"),f=i.querySelector(".like-counter");return s.src=e.link,s.alt=e.name,d.textContent=e.name,f.textContent=e.likes.length,u!==e.owner._id?(l.disabled=!0,l.classList.add("visually-hidden")):l.addEventListener("click",(function(){return o(e._id,i)})),s.addEventListener("click",(function(){t(e.name,e.link)})),p.addEventListener("click",(function(){(p.classList.contains("card__like-button_is-active")?r:n)(e._id).then((function(e){a(p),f.textContent=e.likes.length})).catch((function(e){return console.log(e)}))})),s.addEventListener("click",c),i}function a(n,r){(function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)})(n).then((function(){r.remove()})).catch((function(e){console.log(e)}))}function c(e){e.classList.toggle("card__like-button_is-active")}function u(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",l)}function i(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",l)}function l(e){"Escape"===e.key&&u(document.querySelector(".popup_is-opened"))}var s=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},d=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))},p=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){s(e,n,t)})),d(n,r,t)};function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function _(e){var t=document.querySelector(".popup_is-opened");t&&(t.querySelector(".popup__button").textContent=e?"Сохранение...":"Сохранить")}document.querySelectorAll(".popup__close").forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return u(t)})),t.addEventListener("mousedown",(function(e){e.target.classList.contains("popup")&&u(t)}))}));var m=document.querySelector(".profile"),y=m.querySelector(".profile__title"),v=m.querySelector(".profile__description"),h=m.querySelector(".profile__image"),S=document.querySelector(".popup_type_edit"),b=S.querySelector(".popup__form"),q=b.querySelector(".popup__input_type_name"),g=b.querySelector(".popup__input_type_description");S.classList.add("popup_is-animated");var E=document.querySelector(".profile__edit-button"),L=document.forms["edit-profile"];E.addEventListener("click",(function(){q.value=y.textContent,g.value=v.textContent,p(L,D),i(S)})),b.addEventListener("submit",(function(n){var r,o,a;n.preventDefault(),_(!0),(r={name:q.value,about:g.value},o=r.name,a=r.about,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:o,about:a})}).then(t)).then((function(e){y.textContent=e.name,v.textContent=e.about})).catch((function(e){console.log(e)})).finally((function(){_(!1),u(S)}))}));var C=document.querySelector(".places__list"),k=document.querySelector(".popup_type_image"),A=k.querySelector(".popup__caption");function x(e,t){k.src=t,A.textContent=e,k.alt=e,i(k)}function w(e){var t=e.target.getAttribute("src"),n=e.target.getAttribute("alt"),r=document.querySelector(".popup_type_image"),o=r.querySelector(".popup__content"),a=o.querySelector(".popup__image"),c=o.querySelector(".popup__caption");a.src=t,a.alt=n,c.textContent=n,i(r)}Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a,c,u=[],i=!0,l=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=a.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=r[0],i=r[1];u._id,y.textContent=u.name,v.textContent=u.about,h.style="background-image: url('".concat(u.avatar,"')"),i.forEach((function(e){C.append(o(e,x,a,c,w,u._id))}))})).catch((function(e){console.log(e)}));var U=document.querySelector(".popup_type_new-card"),j=U.querySelector(".popup__form"),O=j.querySelector(".popup__input_type_card-name"),T=j.querySelector(".popup__input_type_url"),B=document.querySelector(".profile__add-button");U.classList.add("popup_is-animated");var P=document.forms["new-place"];B.addEventListener("click",(function(){i(U),p(P,D)})),j.addEventListener("submit",(function(n){var r,i,l;n.preventDefault(),_(!0),(r={name:O.value,link:T.value},i=r.name,l=r.link,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:i,link:l})}).then(t)).then((function(e){C.prepend(o(e,x,a,c,w,e.owner._id)),j.reset()})).catch((function(e){console.log(e)})).finally((function(){_(!1),u(U)}))}));var D={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);d(n,r,e),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.classList.add(r.errorClass),o.textContent=n}(e,t,t.validationMessage,n)}(t,o,e),d(n,r,e)}))}))}))}(D);var M=document.querySelector(".popup__input_type_avatar_edit"),N=document.querySelector(".avatar-button"),I=document.forms["edit-avatar"],J=I.avatar;N.addEventListener("click",(function(){i(M),J.value="",p(I,D)})),I.addEventListener("submit",(function(n){var r;n.preventDefault(),_(!0),(r=J.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then(t)).then((function(e){h.style="background-image: url('".concat(e.avatar,"')")})).finally((function(){_(!1),u(M)}))}))})();
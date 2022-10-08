//Stops the form from submitting and reloading the page//
//grabs value in the search fielt//

const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
/*PUT YOUR OWN KEY HERE - THIS MIGHT NOT WORK
SUBSCRIBE HERE: https://home.openweathermap.org/users/sign_up*/
const apiKey = "aaa928d1b15a7fc8c1f242d4b2d72cdc";

form.addEventListener("submit", e =>{
  e.preventDefault();
  const listItems = list.querySelectorAll(".ajax-section .city");
  const inputVal = input.value;

  //ajax here
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `https://openweathermap.org/img/wn/${
        weather[0]["icon"]
      }@2x.png`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city‼️";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});

//Again during the submit handler, before making an AJAX request, we check to see whether the unordered list is empty or not. If it isn’t empty, that means at least one successful AJAX request has already been executed. 
//Next, we check to see if there’s a list item who’s the city name or the value of its data-name attribute are equal to the search field’s value.
//If so, that means the user already knows the weather for this city, so there’s no need to perform another AJAX request. As the following actions, we’ll show them a related message, clear the value of the search field and give it focus
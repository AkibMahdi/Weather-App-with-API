//Stops the form from submitting and reloading the page//
//grabs value in the search fielt//

const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");

const apiKey = "aaa928d1b15a7fc8c1f242d4b2d72cdc";
form.addEventListener("submit", e => {  //addeventlistener
    e.preventDefault();
    const inputVal = input.value;

//ajax request//

const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

        fetch(url) //conversion
        .then(response => response.json())
        .then(data => {

const { main, name, sys, weathers } = data;
const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

const li = document.createElement("li");
li.classList.add("city");
const markup = `
  <h2 class="city-name" data-name="${name},${sys.country}">
    <span>${name}</span>
    <sup>${sys.country}</sup>
  </h2>
  <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup>
  </div>
  <figure>
    <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
    <figcaption>${weathers[0]["description"]}</figcaption>
  </figure>
`;
li.innerHTML = markup;
list.appendChild(li);
})
.catch(() => {
    msg.textContent = "Please search for a valid city 🙃";
});
//reset field//
msg.textContent = "";
form.requestFullscreen();
input.focus();

//potentially change icon pathway here//

// here you will check if there is already a city//
const listItems = list.querySelectorAll(".ajax-section .city");
const listItemsArray = Array.from(listItems);

if (listItemsArray.length > 0) {
  //2
  const filteredArray = listItemsArray.filter(el => {
    let content = "";
    //athens,gr
    if (inputVal.includes(",")) {
      //athens,grrrrrr->invalid country code, so we keep only the first part of inputVal
      if (inputVal.split(",")[1].length > 2) {
        inputVal = inputVal.split(",")[0];
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      } else {
        content = el.querySelector(".city-name").dataset.name.toLowerCase();
      }
    } else {
      //athens
      content = el.querySelector(".city-name span").textContent.toLowerCase();
    }
    return content == inputVal.toLowerCase();
  });

  //3
  if (filteredArray.length > 0) {
    msg.textContent = `You already know the weather for ${
      filteredArray[0].querySelector(".city-name span").textContent
    } ...otherwise be more specific by providing the country code as well 😉`;
    form.reset();
    input.focus();
    return;
  }
}
});

//Again during the submit handler, before making an AJAX request, we check to see whether the unordered list is empty or not. If it isn’t empty, that means at least one successful AJAX request has already been executed. 
//Next, we check to see if there’s a list item who’s the city name or the value of its data-name attribute are equal to the search field’s value.
//If so, that means the user already knows the weather for this city, so there’s no need to perform another AJAX request. As the following actions, we’ll show them a related message, clear the value of the search field and give it focus
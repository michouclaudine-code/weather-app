function search(event) {
  event.preventDefault();
  const searchInput = document.getElementById("input-search");
  const inputValue = searchInput.value;
  alert(inputValue);
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

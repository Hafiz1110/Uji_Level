
let seachInput = document.getElementById("search");
seachInput.addEventListener("input", function() {
    let searchTerm = seachInput.value.toLowerCase();
    let items = document.querySelectorAll(".item");
    items.forEach(function(item) {        let itemName = item.querySelector(".item-name").textContent.toLowerCase();
        if (itemName.includes(searchTerm)) {
            item.style.display = "block";     } else {
            item.style.display = "none";      }
    });});
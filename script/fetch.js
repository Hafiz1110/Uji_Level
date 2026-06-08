const api = "item.json";

fetch(api)
  .then((respon) => respon.json())
  .then((data) => {
    console.log(data);
    let hasil = "";
    data.forEach((element) => {
        hasil += `  
        
         <div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
            
              <a href="src/detail.html?id=${element.id}" class="hover:grow hover:shadow-lg">
                <img class="hover:grow hover:shadow-lg" src="${element.image}" alt="${element.name}">
              </a>
              <div class="pt-3 flex items-center justify-between">
                <p class="">${element.name}</p>
                  <p class="">${element.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>

              </div>
                
          </div>




        `;
    document.getElementById("container").innerHTML = hasil;
  });
  });

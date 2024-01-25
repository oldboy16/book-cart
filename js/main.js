//CRUD -> create read update delete
//https://65b12ae9d16d31d11bde3e69.mockapi.io/bookcarts -> url_api
let elBookList = document.querySelector(".book__list");
let elImg = document.querySelector(".img");
let elTitle = document.querySelector(".title");
let elPrice = document.querySelector(".price");

function fnPost(e) {
  e.preventDefault();
  let book = {
    title: e.target.title.value,
    img: e.target.img.value,
    price: e.target.price.value,
  };

  fetch("https://65b12ae9d16d31d11bde3e69.mockapi.io/bookcarts", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(book),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .then(()=> fnGet())
}
fnGet();
function fnGet() {
  fetch("https://65b12ae9d16d31d11bde3e69.mockapi.io/bookcarts")
    .then((res) => res.json())
    .then((data) => {
      window.localStorage.setItem("data", JSON.stringify(data));
      fnRender(data);
    });
}

function fnRender(data) {
  elBookList.innerHTML = "";
  data.map((item) => {
    let newLi = document.createElement("li");
    newLi.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img src=${item.img} class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${item.title}</h5>
    <p class="card-text"></p>
    <div class="d-flex">
    <a href="#" class="btn btn-primary">${item.price}</a>
    <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fnSetId(${item.id})" class="btn btn-info"><i class="bi bi-pen"></i></button>
    <button onclick="fnDelete(${item.id})" class="btn btn-danger">
    <i class="bi bi-trash"></i>
    </button>
    <div class="spinner-border${item.id}" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>
    </div>
    </div>
    </div>
            `
    elBookList.appendChild(newLi);
  });
}



function fnDelete(id){
    let elSpinner = document.querySelector(`.spinner-border${id}`)
    elSpinner.style.display = 'block'
    fetch(`https://65b12ae9d16d31d11bde3e69.mockapi.io/bookcarts/${id}`,{
        method:'DELETE',
        headers:{'content-type':'application/json'}
    })
    .then(res=> res.json())
    .then(data=> console.log(data))
    .then(()=>{
        elSpinner.style.display = 'none'
        fnGet()
    })
}

function fnSetId(id) {
  console.log(id);
  window.localStorage.setItem("id", id);
  let locData = JSON.parse(window.localStorage.getItem("data"));
  let item = locData.find((i) => i.id == id);
  elImg.value = item.img;
  elTitle.value = item.title;
  elPrice.value = item.price;
}

function fnUpdate(e) {
  e.preventDefault();
  let book = {
    title: e.target.title.value,
    img: e.target.img.value,
    price: e.target.price.value,
  };
  fetch(
    `https://65b12ae9d16d31d11bde3e69.mockapi.io/bookcarts/${window.localStorage.getItem(
      "id"
    )}`,
    {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(book),
    }
  )
    .then((res) => res.json())
    .then((data) => console.log(data))
    .then(() => fnGet());
}

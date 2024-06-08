import data from "./data.json" assert {type: "json"};
console.log(data);

const arrowsRight = document.querySelectorAll(".arrow-right");
const movieLists = document.querySelectorAll(".list-film");


arrowsRight.forEach((arrow, i) =>{
    const itemNumber = movieLists[i].querySelectorAll("img").length;
    let clickCounter = 0;
    arrow.addEventListener("click", ()=>{
        clickCounter++;
        if (itemNumber - (6 + clickCounter) >= 0){
            movieLists[i].style.transform = `translateX(${
                movieLists[i].computedStyleMap().get("transform")[0].x.value
            -320}px)`;  
        } else {
            movieLists[i].style.transform = "translateX(0)";
            clickCounter = 0;
        }
        
    });
    console.log(movieLists[i].querySelectorAll("img").length)
});

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card-phim');
    
    cards.forEach(card => {
        const cardId = card.getAttribute('id');
        
        card.addEventListener('click', function() {
            window.location.href = `đặt vé.html?id=${cardId}`;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    function getQueryParams() {
        const params = {};
        window.location.search.substring(1).split("&").forEach(pair => {
            const [key, value] = pair.split("=");
            params[decodeURIComponent(key)] = decodeURIComponent(value);
        });
        return params;
    }

    const params = getQueryParams();
    const movieId = params['id'];

    if (movieId) {
        const detailDiv = document.getElementById('detail-' + movieId);
        if (detailDiv) {
            detailDiv.classList.remove('hidden');
            detailDiv.classList.add('active');
        }
    }
});

// const renderFilm = () => {
//     const card_list_date = document.getElementById("card_list_date");
//     const card_list_time = document.getElementById("card_list_time");
//     const card_index = document.getElementById("card_index");
//     const card_gia = document.getElementById("card_gia");
//     let pay = [];

//     data[0].ngay_chieu.forEach(item => {
//         const date = document.createElement("div");
//         date.id = item.id;
//         date.innerHTML = `<div>Ngày: ${item.ngay}</div>`;

//         card_list_date.appendChild(date);

//         date.addEventListener("click", () => {
//             card_list_time.innerHTML = "";
//             // reset
//             pay = [];
//             card_gia.innerHTML = "";
//             card_index.innerHTML = "";

//             item.gio_chieu.forEach(gio => {
//                 const gio_chieu = document.createElement("div");
//                 gio_chieu.id = gio.id;
//                 gio_chieu.innerHTML = `<h1 class="time">Giờ: ${gio.time}</h1>`;

//                 card_list_time.appendChild(gio_chieu);

//                 gio_chieu.addEventListener("click", () => {
//                     card_index.innerHTML = "";
//                     // reset
//                     pay = [];
//                     card_gia.innerHTML = "";

//                     gio.ghe.forEach(ghe => {
//                         const new_ghe = document.createElement("div");
//                         new_ghe.id = ghe.id;
//                         new_ghe.innerHTML = `Ghế: ${ghe.name}`;

//                         card_index.appendChild(new_ghe);

//                         new_ghe.addEventListener("click", () => {
//                             card_gia.innerHTML = "";

//                             const isSelect = pay.find(g => g.id === new_ghe.id);
//                             if (isSelect) {
//                                 const newPay = pay.filter(g => g.id !== new_ghe.id);
//                                 pay = newPay;
//                             } else {
//                                 pay.push(ghe);
//                             }

//                             let tong = 0;
//                             pay.forEach(p => tong += p.gia);

//                             card_gia.innerHTML = `<h1>Tổng tiền: ${tong}</h1>`;
//                         })
//                     })
//                 })
//             });

//         })
//     });
// }

// renderFilm();



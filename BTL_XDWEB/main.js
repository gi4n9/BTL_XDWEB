import data from "./data.json" with { type: "json" };

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card-phim');
    
    cards.forEach(card => {
        const cardId = card.getAttribute('id');
        
        card.addEventListener('click', function() {
            window.location.href = `đặt vé.html?id=${cardId}`;
        });
        return cardId;
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
const renderFilm = (phim) => {
        // const card_list_phim = document.getElementById("card_list_phim");
        const card_list_date = document.getElementById("card_list_date");
        const card_list_time = document.getElementById("card_list_time");
        const card_index = document.getElementById("card_index");
        const card_gia = document.getElementById("card_gia");
        card_list_date.innerHTML = "";
        
        let pay = [];

            phim.ngay_chieu.forEach(item => {
                const date = document.createElement("div");
                date.id = item.id;
                date.innerHTML = 
                `
                <div class="date">
                    <p>Th.${`${item.ngay}`.split("/")[1]}</p>
                    <p style="font-size: 20px; font-weight: 700;">${`${item.ngay}`.split("/")[0]}</p>
                    <p>${item.thu}</p>
                </div>
                `;
        
                card_list_date.appendChild(date);
        
                date.addEventListener("click", () => {
                    card_list_time.innerHTML = "";
                    // reset
                    pay = [];
                    card_gia.innerHTML = "";
                    card_index.innerHTML = "";
                    descriptions.innerHTML = "";
                    screens.innerHTML = "";
                    purchase.innerHTML = "";
        
                    item.gio_chieu.forEach(gio => {
                        const gio_chieu = document.createElement("div");
                        gio_chieu.id = gio.id;
                        gio_chieu.innerHTML = 
                        `<button>
                            ${gio.time}
                        </button>
                        `;
                        card_list_time.appendChild(gio_chieu);
                        gio_chieu.addEventListener("click", () => {
                            descriptions.innerHTML = "";
                            screens.innerHTML = "";
                            purchase.innerHTML = "";
                            const screen = document.createElement("div");
                            screen.innerHTML = 
                            `
                                <div style="color: white;" class="screen">Screen</div>
                            `
                            screens.appendChild(screen);

                            const description = document.createElement("div");
                            description.innerHTML = 
                            `
                            <div class="descriptions">
                                <div class="description-booked">
                                    <div class="choosen"><i class='bx bx-x'></i></div>
                                    <p>Ghế đã đặt</p>
                                </div>
                                <div class="description-choosen">
                                    <div></div>
                                    <p>Ghế bạn chọn</p>
                                </div>
                                <div class="description-normal">
                                    <div></div>
                                    <p>Ghế Thường</p>
                                </div>
                                <div class="description-vip">
                                    <div></div>
                                    <p>Ghế VIP</p>
                                </div>
                                <div class="description-couple">
                                    <div></div>
                                    <p>Ghế đôi</p>
                                </div>
                            </div>
                            `
                            descriptions.appendChild(description);
                            card_index.innerHTML = "";
                            // reset
                            pay = [];
                            card_gia.innerHTML = "";
        
                            const ghes = [];
                            let childGhes = [];
                            gio.ghe.forEach((g, i) => {
                                childGhes.push(g);
                                if(childGhes.length === 10 || i === gio.ghe.length - 1) {
                                    ghes.push(childGhes);
                                    childGhes = [];
                                }
                            });
        
                            
                            ghes.forEach(mang_ghe => {
                                const new_ghe = document.createElement("div");
                                let template = "";
        
                                mang_ghe.forEach(g => {
                                    template += `<li id="${g.id}" class="seat">${g.name}</li>`
                                })
        
                                new_ghe.innerHTML = `<div class="row">${template}</div>`;
        
                                card_index.appendChild(new_ghe);
        
                                mang_ghe.forEach(g => {
                                    const ghe = document.getElementById(g.id);
        
                                    switch (g.type) {
                                        case "thuong":
                                            ghe.style.backgroundColor = "gray";
                                            break;
                                        case "vip":
                                            ghe.style.backgroundColor = "orange";
                                            ghe.style.color = "white";
                                            break;
                                        case "doi":
                                            ghe.style.backgroundColor = "red";
                                            break;
                                    }
        
                                    ghe.addEventListener("click", () => {
                                        card_gia.innerHTML = "";
                                        purchase.innerHTML = "";

                                        const isSelect = pay.find(g => g.id === ghe.id);
                                        if (isSelect) {
                                            let newPay = pay.filter(g => g.id !== ghe.id);
                                            switch (g.type) {
                                                case "thuong":
                                                    ghe.style.backgroundColor = "gray";
                                                    break;
                                                case "vip":
                                                    ghe.style.backgroundColor = "orange";
                                                    break;
                                                case "doi":
                                                    newPay = newPay.filter(g => g.link_id !== ghe.id);
                                                    const ghe_nam_canh = document.getElementById(g.link_id);
                                                    ghe.style.backgroundColor = "red";
                                                    ghe_nam_canh.style.backgroundColor = "red";
                                                    break;
                                            }
                                            pay = newPay;
                                        } else {
                                            pay.push(g);
                                            if(g.link_id) {
                                                const item_ghe_nam_canh = mang_ghe.find(mg => mg.id === g.link_id);
                                                const ghe_nam_canh = document.getElementById(item_ghe_nam_canh.id);
                                                ghe_nam_canh.style.backgroundColor = "blue";
                                                pay.push(item_ghe_nam_canh);
                                            }
                                            ghe.style.backgroundColor = "blue";
                                        }
                
                                        let tong = 0;
                                        pay.forEach(p => tong += p.gia);
                                        card_gia.innerHTML = `<h1 class="pay">Tổng tiền: ${tong}đ</h1>`;
                                        purchase.innerHTML = 
                                        `
                                        <button id="paid" class="purchase_btn"> 
                                            Thanh toán
                                        </button>
                                        `;
                                    })
                                })
                            })
                        })
                    })
                })
            })
}

data.forEach(phim =>{
    renderFilm(phim);
})
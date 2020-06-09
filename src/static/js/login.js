function FETCH(url, type, data, callback) {
    return fetch(url, {
        method: type,
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then((data) => {
        if (typeof(callback) == 'function') {
            callback(data);
        }
    }).catch((e)=> {
        console.log("Error: ", e);
    });
}

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
$("#login_btn").on({
    'click': ()=> {
        login_FetchAPI_v1();
    }
})

function login_FetchAPI_v1() {
    let text = $("#login_btn").val();
    if (text == "") {
        console.log("Empty Input!");
    } else {
        let send_data = {
            'keyword' : text,
            'start': 0,
            'end': 9,
            'order':"signup_cnt"
        };
        $.when(FETCH("/api/v1/class/search", "POST", send_data, function(data) {
            console.log(data);
            let target = $(".panel-body");
            let an_div = `<div class="analysistics">"${$("#login_btn").val()}"(총 ${data.data.total_length}개) : ${data.process_time} sec</div>`;
            target.append(an_div);
            target = $("div.search_list");
            target.empty();
           for (let post of data.data.list) {
                let div =   `<div class="content_box">
                                <div class="panel panel-success">
                                    <div class="panel-heading">${post['class_name']}</div>
                                    <div class="panel-body">
                                        <div class="coach_name">score: ${post['score']}</div>
                                    <div class="panel-body">
                                        <div class="coach_name">class_id: ${post['class_id']}</div>
                                        <div class="coach_name">class_name: ${post['class_name']}</div>
                                        <div class="coach_name">class_short_name: ${post['class_short_name']}</div>
                                        <div class="coach_name">class_photo: ${post['class_photo']}</div>
                                        <div class="coach_name">coach_id: ${post['coach_id']}</div>
                                        <div class="coach_name">coach_name: ${post['coach_name']}</div>
                                        <div class="coach_name">coach_photo: ${post['coach_photo']}</div>
                                        <div class="coach_name">class_star_avg: ${post['class_star_avg']}</div>
                                        <div class="coach_name">class_star_cnt: ${post['class_star_cnt']}</div>
                                        <div class="coach_name">price_sale: ${post['price_sale']}</div>
                                        <div class="coach_name">original_price: ${post['original_price']}</div>
                                        <div class="coach_name">payment_price: ${post['payment_price']}</div>
                                        <div class="coach_name">signup_cnt: ${post['signup_cnt']}</div>
                                        <div class="coach_name">mission_cnt: ${post['mission_cnt']}</div>
                                        <div class="coach_name">review_cnt: ${post['review_cnt']}</div>
                                        <div class="coach_name">mission_cnt: ${post['mission_cnt']}</div>
                                        <div class="coach_name">review_list: ${post['review_list'].substr(0,80)}...</div>
                                        <div class="coach_name">member_data: ${post['member_data'].substr(0,80)}...</div>
                                    </div>
                                </div>
                            </div>`;
                target.append(div);
            }
        }))
    }
}
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

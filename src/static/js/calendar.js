// --------------------------------캘린더 생성부분---------------------------------------
// ================================
// START YOUR APP HERE
// ================================
const init = {
    monList: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayList: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    today: new Date(),
    monForChange: new Date().getMonth(),
    activeDate: new Date(),
    getFirstDay: (yy, mm) => new Date(yy, mm, 1),
    getLastDay: (yy, mm) => new Date(yy, mm + 1, 0),
    nextMonth: function () {
        let d = new Date();
        d.setDate(1);
        d.setMonth(++this.monForChange);
        this.activeDate = d;
        return d;
    },
    prevMonth: function () {
        let d = new Date();
        d.setDate(1);
        d.setMonth(--this.monForChange);
        this.activeDate = d;
        return d;
    },
    addZero: (num) => (num < 10) ? '0' + num : num,
    activeDTag: null,
    getIndex: function (node) {
        let index = 0;
        while (node = node.previousElementSibling) {
            index++;
        }
        return index;
    }
};

const $calBody = document.querySelector('.cal-body');
const $btnNext = document.querySelector('.btn-cal.next');
const $btnPrev = document.querySelector('.btn-cal.prev');

/**
 * @param {number} date
 * @param {number} dayIn
 */
function loadDate(date, dayIn) {
    document.querySelector('.cal-date').textContent = date;
    document.querySelector('.cal-day').textContent = init.dayList[dayIn];
}

/**
 * @param {date} fullDate
 */
function loadYYMM(fullDate) {
    let yy = fullDate.getFullYear();
    let mm = fullDate.getMonth();
    let firstDay = init.getFirstDay(yy, mm);
    let lastDay = init.getLastDay(yy, mm);
    let markToday; // for marking today date

    if (mm === init.today.getMonth() && yy === init.today.getFullYear()) {
        markToday = init.today.getDate();
    }

    document.querySelector('.cal-month').textContent = init.monList[mm];
    document.querySelector('.cal-year').textContent = yy;

    let trtd = '';
    let startCount;
    let countDay = 0;
    for (let i = 0; i < 6; i++) {
        trtd += '<tr>';
        for (let j = 0; j < 7; j++) {
            if (i === 0 && !startCount && j === firstDay.getDay()) {
                startCount = 1;
            }
            if (!startCount) {
                trtd += '<td>'
                trtd += '<div>'
            } else {
                let fullDate = yy + '-' + init.addZero(mm + 1) + '-' + init.addZero(countDay + 1);
                trtd += '<div>'
                trtd += '<td class="day';
                trtd += (markToday && markToday === countDay + 1) ? ' today" ' : '"';
                trtd += ` data-date="${countDay + 1}" data-fdate="${fullDate}">`;
                trtd += (startCount) ? ++countDay : '';
                trtd += '<button class="calendar_plus_button">+</button>';
            }

            if (countDay === lastDay.getDate()) {
                startCount = 0;
            }
            trtd += '</td>';

            trtd += '</div>';
        }
        trtd += '</tr>';
    }
    $calBody.innerHTML = trtd;
    if(document.querySelector(".checkbox").checked == false) get_calendar_FetchAPI();
    else get_look_FetchAPI();
    modal_plus_calendar();
    //////////////////////// plus button 플러스 버튼 호버링 /////////////////////
    var date_all2 = document.querySelectorAll(".day");
    for (let item of date_all2) {
        item.addEventListener('mouseenter', function () {
            item.childNodes[item.childNodes.length - 1].style.display = "block";
        })
        item.addEventListener('mouseleave', function () {
            item.childNodes[item.childNodes.length - 1].style.display = "none";
        })
    }

}

/**
 * @param {string} val
 */
function createNewList(val) {
    let id = new Date().getTime() + '';
    let yy = init.activeDate.getFullYear();
    let mm = init.activeDate.getMonth() + 1;
    let dd = init.activeDate.getDate();
    const $target = $calBody.querySelector(`.day[data-date="${dd}"]`);

    let date = yy + '-' + init.addZero(mm) + '-' + init.addZero(dd);

    let eventData = {};
    eventData['date'] = date;
    eventData['memo'] = val;
    eventData['complete'] = false;
    eventData['id'] = id;
    init.event.push(eventData);
    $todoList.appendChild(createLi(id, val, date));
}


loadYYMM(init.today);
loadDate(init.today.getDate(), init.today.getDay());

document.querySelector(".cal_today_btn").addEventListener('click', function () {
    loadYYMM(init.today);
    init.monForChange = init.today.getMonth();
})

document.querySelector("#logout").addEventListener("click", function () {
    loadYYMM(init.today);
    init.monForChange = init.today.getMonth();
})

$btnNext.addEventListener('click', () => loadYYMM(init.nextMonth()));
$btnPrev.addEventListener('click', () => loadYYMM(init.prevMonth()));

$calBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('day')) {
        if (init.activeDTag) {
            init.activeDTag.classList.remove('day-active');
        }
        let day = Number(e.target.attributes[1].nodeValue);
        loadDate(day, e.target.cellIndex);
        e.target.classList.add('day-active');
        init.activeDTag = e.target;
        init.activeDate.setDate(day);
        document.querySelector(".cal_modal_background").style.display = "block";
        get_calendar_modal_FetchAPI(e.target);

        // ------------------ 캘린더 일정 수정 --------------------- //
        setTimeout(() => {
            modal_events = document.querySelectorAll(".cal_modal_event");
            for (var event of modal_events) {
                event.childNodes[3].addEventListener("click", function (ee) {
                    var e = ee.path[1];
                    document.querySelector(".modal_background").style.display = "block";
                    document.querySelector(".modal_title").value = e.childNodes[0].attributes[0].nodeValue;
                    document.querySelector(".modal_num").value = e.childNodes[0].attributes[2].nodeValue;
                    var ecolor = e.childNodes[0].attributes[1].nodeValue;
                    var mcolor = document.querySelector(".modal_color");
                    mcolor.value = e.childNodes[0].attributes[1].nodeValue;
                    if (ecolor == "#d64b4b") mcolor.value = "red";
                    else if (ecolor == "#ff9f43") mcolor.value = "orange";
                    else if (ecolor == "#ffeaa7") mcolor.value = "yellow";
                    else if (ecolor == "#3ed34b") mcolor.value = "green";
                    else if (ecolor == "#2969e0") mcolor.value = "blue";
                    else if (ecolor == "#a29bfe") mcolor.value = "purple";
                    else if (ecolor == "#636e72") mcolor.value = "gray";
                    document.querySelector(".modal_color").style.background = ecolor;
                    document.querySelector(".modal_start_time").value = e.childNodes[1].attributes[0].nodeValue;
                    document.querySelector(".modal_place").value = e.childNodes[2].attributes[0].nodeValue;
                    var modal_select = document.querySelector("#modal_select");
                    modal_select.value = "modal_select_calendar";
                    modal_change(modal_select);
                    cal_modal_clean();
                })
            }
        }, 200);

    }
});

function cal_modal_clean() {
    document.querySelector(".cal_modal_background").style.display = "none";
    var event_box = document.querySelector(".cal_modal_event_box");
    while (event_box.hasChildNodes()) {
        event_box.removeChild(event_box.firstChild);
    }
}

document.querySelector(".cal_modal_exit").addEventListener("click", function () {
    document.querySelector(".cal_modal_background").style.display = "none";
    var event_box = document.querySelector(".cal_modal_event_box");
    while (event_box.hasChildNodes()) {
        event_box.removeChild(event_box.firstChild);
    }
});

// -------------------- 달력 만들때(loadYYMM)마다 호출해서 일정 입력함 ---------------------- //

// --------------------------- 일정 불러오기 ----------------------- //
function get_calendar_FetchAPI() {
    // 토큰값이 0이거나 없을때 fetch 실행x
    if (sessionStorage.length == 0) return;
    else if (sessionStorage.length == 1)
        if (sessionStorage.getItem("access_token") == 0) return;

    const token = sessionStorage.getItem('access_token');
    fetch('/event/main', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        })
        .then(res => res.json())
        .then((res) => {
            var all_day = document.querySelectorAll(".day");
            for (event of res["RESULT"]) {
                let append_calendar = document.createElement('div');
                append_calendar.appendChild(document.createTextNode(event['event_title']));
                append_calendar.classList.add("cal_calendar");
                append_calendar.style.background = event["event_color"];

                for (let i = 0; i < all_day.length; i++) {
                    if (all_day[i].attributes[2].nodeValue == event["event_date"]) {
                        all_day[i].insertBefore(append_calendar, all_day[i].lastChild);
                    }
                }
            }
        })
}

// -------------------- 데일리룩 불러오기 ------------------- //
function get_look_FetchAPI(){
    // 토큰값이 0이거나 없을때 fetch 실행x
    if (sessionStorage.length == 0) return;
    else if (sessionStorage.length == 1)
        if (sessionStorage.getItem("access_token") == 0) return;

    const token = sessionStorage.getItem('access_token');
    fetch('/look/main', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        })
        .then(res => res.json())
        .then((res) => {
            console.log(res);
            var all_day = document.querySelectorAll(".day");
            for (event of res["RESULT"]) {
                let append_calendar = document.createElement('div');
                append_calendar.appendChild(document.createTextNode(event['event_title']));
                
                const image = new Image();
                //image객체가 생성되어 속성들을 추가할수 있음
                image.src = '../files/' + event.imagename;
                append_calendar.appendChild(image);

                append_calendar.classList.add("cal_calendar");
                append_calendar.style.background = event["event_color"];

                for (let i = 0; i < all_day.length; i++) {
                    if (all_day[i].attributes[2].nodeValue == event["event_date"]) {
                        all_day[i].insertBefore(append_calendar, all_day[i].lastChild);
                    }
                }
            }
        })
}

// ------------------- 누른 날짜에 해당하는 일정들 불러와서 캘린더 모달창에 띄우기 -------------------------
function get_calendar_modal_FetchAPI(e) {
    // 토큰값이 0이거나 없을때 fetch 실행x
    if (sessionStorage.length == 0) return;
    else if (sessionStorage.length == 1)
        if (sessionStorage.getItem("access_token") == 0) return;

    const token = sessionStorage.getItem('access_token');
    fetch('/event/main', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        })
        .then(res => res.json())
        .then((res) => {
            for (event of res["RESULT"]) {
                if (e.attributes[2].nodeValue == event['event_date']) {
                    let append_node = document.createElement("div");
                    let append_calendar_modal = '';
                    append_calendar_modal += '<div title="'
                    append_calendar_modal += event['event_title'];
                    append_calendar_modal += '" ecolor="'
                    append_calendar_modal += event['event_color'];
                    append_calendar_modal += '" num="';
                    append_calendar_modal += event['event_num'];
                    append_calendar_modal += '">제목 : '
                    append_calendar_modal += event['event_title'];
                    append_calendar_modal += '</div>'
                    append_calendar_modal += '<div date="'
                    append_calendar_modal += event['event_date'];
                    append_calendar_modal += '">'
                    append_calendar_modal += event['event_date'];
                    append_calendar_modal += '</div>'
                    append_calendar_modal += '<div place="'
                    append_calendar_modal += event['event_place'];
                    append_calendar_modal += '">장소 : ';
                    append_calendar_modal += event['event_place'];
                    append_calendar_modal += '</div>'
                    
                    // if(event['event_select'] == "modal_select_look"){
                    //     append_calendar_modal += '<div outer="'
                    //     append_calendar_modal += event['event_outer'];
                    //     append_calendar_modal += '">아우터 : ';
                    //     append_calendar_modal += event['event_outer'];
                    //     append_calendar_modal += '</div>'
                    //     append_calendar_modal += '<div top="'
                    //     append_calendar_modal += event['event_top'];
                    //     append_calendar_modal += '">상의 : ';
                    //     append_calendar_modal += event['event_top'];
                    //     append_calendar_modal += '</div>'
                    //     append_calendar_modal += '<div bot="'
                    //     append_calendar_modal += event['event_bot'];
                    //     append_calendar_modal += '">하의 : ';
                    //     append_calendar_modal += event['event_bot'];
                    //     append_calendar_modal += '</div>'
                    //     append_calendar_modal += '<div shoes="'
                    //     append_calendar_modal += event['event_shoes'];
                    //     append_calendar_modal += '">신발 : ';
                    //     append_calendar_modal += event['event_shoes'];
                    //     append_calendar_modal += '</div>'
                    //     append_calendar_modal += '<div acc="'
                    //     append_calendar_modal += event['event_acc'];
                    //     append_calendar_modal += '">악세서리 : ';
                    //     append_calendar_modal += event['event_acc'];
                    //     append_calendar_modal += '</div>'
                    //     append_calendar_modal += '<img src="../static/file/look_default.png" id="event_image">'
                    // }

                    append_calendar_modal += '<img src="../static/image/cal_pen.png" width="50px" height="50px">'
                    append_node.innerHTML = append_calendar_modal;
                    append_node.classList.add("cal_modal_event");
                    append_node.style.background = event['event_color'];
                    
                    // document.querySelector("#event_image").src = "../static/files/"+ res['event_image'];
                    
                    document.querySelector(".cal_modal_event_box").appendChild(append_node);
                }
            }
        })
}

///-------------------------- 일정 입력하기 -------------------------///

$("#modal_submit").on({
    'click': () => {
        calendar_FetchAPI_v1();
    }
})

function calendar_FetchAPI_v1() {

    if (sessionStorage.length == 0) return;
    else if (sessionStorage.length == 1)
        if (sessionStorage.getItem("access_token") == 0) return;

    const token = sessionStorage.getItem('access_token');
    var mcolor = $(".modal_color option:selected").val();
    if (mcolor == 'red') mcolor = "#d64b4b";
    else if (mcolor == 'orange') mcolor = "#ff9f43";
    else if (mcolor == 'yellow') mcolor = "#feca57";
    else if (mcolor == 'green') mcolor = "#3ed34b";
    else if (mcolor == 'blue') mcolor = "#2969e0";
    else if (mcolor == 'purple') mcolor = "#a29bfe";
    else if (mcolor == 'gray') mcolor = "#636e72";

    var title = document.querySelector(".modal_title").value;
    var place = document.querySelector(".modal_place").value;
    var start_time = document.querySelector(".modal_start_time").value;
    var num = document.querySelector(".modal_num").value;
    var modal_select = document.querySelector("#modal_select").value;
    
    var outer = document.querySelector(".modal_outer").value;
    var top = document.querySelector(".modal_top").value;
    var bot = document.querySelector(".modal_bot").value;
    var shoes = document.querySelector(".modal_shoes").value;
    var acc = document.querySelector(".modal_acc").value;
    
    // ------ 캘린더 일정 ------ //
    if (modal_select == "modal_select_calendar") {
        if (num == "-1") {
            let send_data = {
                'color': mcolor,
                'title': title,
                'place': place,
                'date': start_time
            };
            fetch('/event/upload', {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                    body: JSON.stringify(send_data)
                })
                .then(res => res.json())
                .then((res) => {
                    console.log("일정 삽입 완료!");
                    var split_date = send_data['date'].split("-");
                    var start_date = split_date[0] + "," + split_date[1] + "," + split_date[2];
                    loadYYMM(new Date(start_date));
                    document.querySelector(".modal_background").style.display = "none";
                })
        }
        // ----------- select_calendar & num 값이 -1이 아니면 수정 ------------- //
        else {
            let send_data = {
                'color': mcolor,
                'title': title,
                'place': place,
                'date': start_time,
                'num': num
            };

            fetch('/event/modify', {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                    body: JSON.stringify(send_data)
                })
                .then(res => res.json())
                .then((res) => {
                    console.log("일정 수정 완료!");
                    var split_date = send_data['date'].split("-");
                    var start_date = split_date[0] + "," + split_date[1] + "," + split_date[2];
                    loadYYMM(new Date(start_date));
                    document.querySelector(".modal_background").style.display = "none";
                })
        }
    // ------- 캘린더 데일리룩 ------- //
    } else if (modal_select == "modal_select_look") {

        if(document.querySelector(".modal_image").files.length == 0){
            file = new File(["look_default"],"look_default.png", {type : "image/png"});
        }
        else file = document.querySelector(".modal_image").files[0];
        
        var send_data = new FormData();
        
        send_data.append('color', mcolor);
        send_data.append('title', title);
        send_data.append('place', place);
        send_data.append('date', start_time);
        send_data.append('outer', outer);
        send_data.append('top', top);
        send_data.append('bot', bot);
        send_data.append('shoes', shoes);
        send_data.append('acc', acc);
        send_data.append('file', file);

        // ------- 데일리룩 등록 ------- //
        if (num == "-1") {

            fetch('/look/upload', {
                    method: "POST",
                    headers: {
                        // 'Accept': 'application/json',
                        // 'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: send_data
                })
                .then(res => res.json())
                .then((res) => {
                    console.log("데일리룩 삽입 완료!");
                    var split_date = send_data['date'].split("-");
                    var start_date = split_date[0] + "," + split_date[1] + "," + split_date[2];
                    loadYYMM(new Date(start_date));
                    document.querySelector(".modal_background").style.display = "none";
                })
        }
        // ---------- 데일리룩 수정 --------- //
        else {
            send_data.append('num',num);

            fetch('/look/modify', {
                method: "POST",
                headers: {
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: send_data
                })
                .then(res => res.json())
                .then((res) => {
                    console.log("데일리룩 수정 완료!");
                    var split_date = send_data['date'].split("-");
                    var start_date = split_date[0] + "," + split_date[1] + "," + split_date[2];
                    loadYYMM(new Date(start_date));
                    document.querySelector(".modal_background").style.display = "none";
                })
        }
    }

}

///---------------  일정 입력 모달 창 --------------///
function modal_plus_calendar() {
    var modal = document.querySelector(".modal_background");
    var plus_button = document.querySelectorAll(".calendar_plus_button");

    document.querySelector(".modal_exit").addEventListener('click', function () {
        modal.style.display = "none";
    })
    for (let plus of plus_button) {
        plus.addEventListener('click', function () {
            modal.style.display = "block";
            // plus 버튼 누를때 마다 모든 input의 value 초기화 시키기
            var form = document.querySelector(".modal_form");
            for (var i = 0; i < form.children.length; i++) {
                if (form.children[i].tagName == 'INPUT') {
                    form.children[i].value = '';
                }
            }
            var modal_select = document.querySelector("#modal_select");
            modal_select.value = "modal_select_calendar";
            modal_change(modal_select);
            document.querySelector(".modal_num").value = '-1';
            // 날짜 입력란에 현재 날짜 기본 세팅하기
            var plus_date = plus.parentNode.attributes[2].nodeValue;
            document.querySelector('.modal_start_time').value = plus_date;
            var image_container = document.querySelector("#modal_image_container");
            while (image_container.hasChildNodes()) {
                image_container.removeChild(image_container.firstChild);
            }
        })
    }
}

// -------- 모달창 일정/데일리룩 체인지 함수 ------- //
function modal_change(selected) {

    var image_button = document.querySelector(".modal_image");
    var outer = document.querySelector(".modal_outer");
    var top = document.querySelector(".modal_top");
    var bottom = document.querySelector(".modal_bot");
    var shoes = document.querySelector(".modal_shoes");
    var acc = document.querySelector(".modal_acc");
    var image_container = document.querySelector("#modal_image_container");

    if (selected.options[selected.selectedIndex].value == "modal_select_look") {
        image_button.style.display = "block";
        image_container.style.display = "block";
        outer.style.display = "block";
        top.style.display = "block";
        bottom.style.display = "block";
        shoes.style.display = "block";
        acc.style.display = "block";
    } else {
        image_button.style.display = "none";
        image_container.style.display = "none";
        outer.style.display = "none";
        top.style.display = "none";
        bottom.style.display = "none";
        shoes.style.display = "none";
        acc.style.display = "none";
    }
}


// -------- 모달창 컬러 체인지 함수 -------- //
function select_change(e) {
    var modal_c = document.querySelector(".modal_color");

    if (e.value == "red") modal_c.style.background = "#d64b4b";
    else if (e.value == "orange") modal_c.style.background = "#ff9f43";
    else if (e.value == "yellow") modal_c.style.background = "#feca57";
    else if (e.value == "green") modal_c.style.background = "#3ed34b";
    else if (e.value == "blue") modal_c.style.background = "#2969e0";
    else if (e.value == "purple") modal_c.style.background = "#a29bfe";
    else if (e.value == "gray") modal_c.style.background = "#636e72";
}

// ------- 이미지 업로드 함수 -------- //
function image_load(event) {
    for (var image of event.target.files) {
        var reader = new FileReader();
        var container = document.querySelector("#modal_image_container");
        reader.onload = function (event) {
            var img = document.createElement("img");
            img.setAttribute("src", event.target.result);
            img.style.width = "200px";
            img.style.height = "200px";
            img.style.margin = "10px";

            // 이미지 업로드 할때마다 이미 업로드되어있던 이미지는 삭제
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            container.appendChild(img);
        };
        reader.readAsDataURL(image);
    }
}

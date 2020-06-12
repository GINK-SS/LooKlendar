
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
                let fullDate = yy + '.' + init.addZero(mm + 1) + '.' + init.addZero(countDay + 1);
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

    let date = yy + '.' + init.addZero(mm) + '.' + init.addZero(dd);

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

document.querySelector(".cal-todaybtn").addEventListener('click', () => loadYYMM(init.today));
$btnNext.addEventListener('click', () => loadYYMM(init.nextMonth()));
$btnPrev.addEventListener('click', () => loadYYMM(init.prevMonth()));

$calBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('day')) {
        if (init.activeDTag) {
            init.activeDTag.classList.remove('day-active');
        }
        let day = Number(e.target.textContent);
        loadDate(day, e.target.cellIndex);
        e.target.classList.add('day-active');
        init.activeDTag = e.target;
        init.activeDate.setDate(day);
        //   reloadTodo();
    }
});


////////////////////////// 일정 입력 모달 창 /////////////////////////

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

        var image_container = document.querySelector("#modal_image_container");
        while (image_container.hasChildNodes()) {
            image_container.removeChild(image_container.firstChild);
        }
    })
}

// 날짜 입력란에 현재 날짜 기본 세팅하기
document.querySelector('.modal_start_time').value = new Date().toISOString().substring(0, 10);
document.querySelector('.modal_end_time').value = new Date().toISOString().substring(0, 10);

var modal_selected = document.querySelector("#modal_select");

var modal_change = (function (selected) {
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
})

function select_change(e) {
    var modal_c = document.querySelector(".modal_color");

    if (e.value == "red") modal_c.style.background = "#d64b4b";
    else if (e.value == "orange") modal_c.style.background = "#fdcb6e";
    else if (e.value == "yellow") modal_c.style.background = "#ffeaa7";
    else if (e.value == "green") modal_c.style.background = "#00b894";
    else if (e.value == "blue") modal_c.style.background = "#0652DD";
    else if (e.value == "purple") modal_c.style.background = "#a29bfe";
    else if (e.value == "gray") modal_c.style.background = "#636e72";
}


// 이미지 업로드 코드
function setThumbnail(event) {
    for (var image of event.target.files) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var img = document.createElement("img");
            img.setAttribute("src", event.target.result);
            img.style.width = "200px";
            img.style.height = "200px";
            document.querySelector("#modal_image_container").appendChild(img);
        };
        reader.readAsDataURL(image);
    }
}



//////////////////////// plus button 플러스 버튼 호버링 /////////////////////
setTimeout(() => {

    var date_all2 = document.querySelectorAll(".day");
    for (let item of date_all2) {
        item.addEventListener('mouseenter', function () {
            item.childNodes[item.childNodes.length-1].style.display = "block";
        })
        item.addEventListener('mouseleave', function () {
            item.childNodes[item.childNodes.length-1].style.display = "none";
        })
    }
}, 500)


/////////////////////////// 일정 입력하기 ////////////////////

$("#modal_submit").on({
    'click': ()=> {
        calendar_FetchAPI_v1();
    }
})

function calendar_FetchAPI_v1() {
    
    let mcolor = $(".modal_color option:selected").val();
    if(mcolor == 'red') mcolor="#d64b4b";
    else if(mcolor == 'orange') mcolor="#fdcb6e";
    else if(mcolor == 'yellow') mcolor="#ffeaa7";
    else if(mcolor == 'green') mcolor="#00b894";
    else if(mcolor == 'blue') mcolor="#0652DD";
    else if(mcolor == 'purple') mcolor="#a29bfe";
    else if(mcolor == 'gray') mcolor="#a29bfe";

    let title = document.querySelector(".modal_title").value;
    let place = document.querySelector(".modal_place").value;
    let start_time = document.querySelector(".modal_start_time").value;
    let end_time = document.querySelector(".modal_end_time").value;


    let send_data ={
        'event_color' : mcolor,
        'event_id' : title,
        'event_place' : place,
        'event_date1' : start_time,
        'event_date2' : end_time
    };
    console.log(send_data);
    const token = sessionStorage.getItem('access_token');
    console.log(token);

    fetch('/event/upload', {
        method : "POST",
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body : JSON.stringify(send_data)
    })
    .then(res => res.json())
    .then((res) => {
        console.log(res);
        console.log("일정 삽입 완료!");
    })
}

//////////////////////// 일정 불러와서 띄우기 ///////////////////

let event_color = "#d53031";
let event_date1 = "Fri, 12 Jun 2020 00:00:00 GMT";
let event_date2 = "Fri, 12 Jun 2020 00:00:00 GMT";
let event_id = "오늘은 희원이랑 데베 하는 날!";
let event_num = 2;
let event_place = "파리바게트";
let user_id = "testtest";

let get_calendar = {
    'event_color' : "#d64b4b",
    'event_date1' : "2020.06.12",
    'event_date2' : "Fri, 12 Jun 2020 00:00:00 GMT",
    'event_id' : "오늘은 희원이랑 데베 하는 날!",
    'event_num' : 2,
    'event_place' : "파리바게트",
    'user_id' : "testtest"
}

let append_calendar = document.createElement('div');
get_id = document.createTextNode(get_calendar["event_id"]);
append_calendar.appendChild(get_id);
append_calendar.classList.add("cal_calendar");
append_calendar.style.background= get_calendar["event_color"];

let append_calendar2 = document.createElement('div');
get_id2 = document.createTextNode("오늘은 상민이랑 탐탐");
append_calendar2.appendChild(get_id2);
append_calendar2.classList.add("cal_calendar");
append_calendar2.style.background="#0652DD";

let append_calendar3 = document.createElement('div');
get_id2 = document.createTextNode("오늘은 상민이랑 탐탐");
append_calendar3.appendChild(get_id2);
append_calendar3.classList.add("cal_calendar");
append_calendar3.style.background="#a29bfe";

var all_day = document.querySelectorAll(".day");

for(let i=0; i<all_day.length; i++){
    if(all_day[i].attributes[2].nodeValue == get_calendar["event_date1"]){
        all_day[i].insertBefore(append_calendar, all_day[i].lastChild);
        all_day[i].insertBefore(append_calendar2, all_day[i].lastChild);
        all_day[i].insertBefore(append_calendar3, all_day[i].lastChild);        
        // document.querySelector(".cal_calendar").style.background = get_calendar["event_color"];
    }
}
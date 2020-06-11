
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
        var click_day = plus.previousSibling.previousSibling.innerHTML; // 누른 날짜의 day값
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
document.querySelector('.modal_time').value = new Date().toISOString().substring(0, 10);

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

    if (e.value == "red") modal_c.style.background = "#d63031";
    else if (e.value == "orange") modal_c.style.background = "#e17055";
    else if (e.value == "yellow") modal_c.style.background = "#fdcb6e";
    else if (e.value == "green") modal_c.style.background = "#00b894";
    else if (e.value == "blue") modal_c.style.background = "#0984e3";
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



//////////////////////// 플러스 버튼 호버링 /////////////////////
setTimeout(() => {
    var date_all = document.querySelectorAll("div.date-day");
    for (let item of date_all) {
        item.addEventListener('mouseenter', function () {
            item.childNodes[item.childNodes.length - 2].style.display = "block";
        })
        item.addEventListener('mouseleave', function () {
            item.childNodes[item.childNodes.length - 2].style.display = "none";
        })
    }

    var date_all2 = document.querySelectorAll(".day");
    console.log(document.querySelector(".day") + "왜 없는데 대체");
    for (let item of date_all2) {
        item.addEventListener('mouseenter', function () {
            item.lastChild.style.display = "block";
            console.log(item.childNodes[1]);
        })
        item.addEventListener('mouseleave', function () {
            item.lastChild.style.display = "none";
        })
    }
}, 500)
var today = new Date();
var day = today.getDate();
var month = today.getMonth()+1;
var year = today.getYear();
var parent = document.querySelector(".date-grid");
var date_day = document.querySelector(".date-grid").querySelector(".date-day");

// var plus = document.createElement("button");
// plus.classList.add("calendar_plus_button");
// plus.innerHTML= "+";

var date_all = document.querySelectorAll("div.date-day");

for(let item of date_all){
   item.addEventListener('mouseenter',function(){
        // this.appendChild(plus);
        item.childNodes[item.childNodes.length-2].style.display="block";
    })
    item.addEventListener('mouseleave',function(){
        // this.removeChild(this.lastChild);
        item.childNodes[item.childNodes.length-2].style.display="none";
    })
}

// for(var i=0; i<date_all.length; i++){
//     date_all[i].addEventListener('mouseenter',function(){
//         // this.appendChild(plus);
//         console.log(i);
//         plus_button[0].style.display="block";
        
//     })
//     date_all[i].addEventListener('mouseleave',function(){
//         // this.removeChild(this.lastChild);
//         plus_button[0].style.display="none";
//     })
// }


////////////////////////// 일정 입력 모달 창 /////////////////////////

var modal = document.querySelector(".modal_background");
var plus_button = document.querySelectorAll(".calendar_plus_button");

document.querySelector(".modal_exit").addEventListener('click',function(){
    modal.style.display="none";
})
for(let plus of plus_button){
    plus.addEventListener('click',function(){
        modal.style.display="block";
        var click_day = plus.previousSibling.previousSibling.innerHTML; // 누른 날짜의 day값
        // plus 버튼 누를때 마다 모든 input의 value 초기화 시키기
        var form = document.querySelector(".modal_form");
        for(var i=0; i< form.children.length; i++){
            if(form.children[i].tagName == 'INPUT'){
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

var modal_change = (function(selected){
    var image_button = document.querySelector(".modal_image");
    var outer = document.querySelector(".modal_outer");
    var top = document.querySelector(".modal_top");
    var bottom = document.querySelector(".modal_bot");
    var shoes = document.querySelector(".modal_shoes");
    var acc = document.querySelector(".modal_acc");
    var image_container = document.querySelector("#modal_image_container");

    if(selected.options[selected.selectedIndex].value == "modal_select_look"){
        image_button.style.display="block";
        image_container.style.display="block";
        outer.style.display="block";
        top.style.display="block";
        bottom.style.display="block";
        shoes.style.display="block";
        acc.style.display="block";
    }
    else{
        image_button.style.display="none";
        image_container.style.display="none";
        outer.style.display="none";
        top.style.display="none";
        bottom.style.display="none";
        shoes.style.display="none";
        acc.style.display="none";
    }
})

function select_change(e){
    var modal_c = document.querySelector(".modal_color");

    if(e.value =="red") modal_c.style.background="#d63031";
    else if(e.value =="orange") modal_c.style.background="#e17055";
    else if(e.value =="yellow") modal_c.style.background="#fdcb6e";
    else if(e.value =="green") modal_c.style.background="#00b894";
    else if(e.value =="blue") modal_c.style.background="#0984e3";
    else if(e.value =="purple") modal_c.style.background="#a29bfe";
    else if(e.value =="gray") modal_c.style.background="#636e72";
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


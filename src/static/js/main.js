function menu_open() {
    var button1 = document.querySelector(".menu_button");
    var menu1 = document.querySelector(".side_menu");
    button1.style.display = "none";
    menu1.style.left = "0px";
}

function menu_exit() {
    var button2 = document.querySelector(".menu_button");
    var menu2 = document.querySelector(".side_menu");
    button2.style.display = "block";
    menu2.style.left = "-250px";
}

document.querySelector(".js-menu_toggle").addEventListener("click", function () {
    var side = document.querySelector('.side_menu');
    // class명이 포함되어 있나 확인 할 때 => contains
    if (document.querySelector('.js-menu_toggle').classList.contains('closed')) {
        side.style.left = '0px';
        this.classList.remove('closed');
        this.classList.add('opened');
    } else {
        side.style.left = '-250px';
        this.classList.remove('opened');
        this.classList.add('closed');
    }
});


// ------------------------------------로그인 유저 불러오기------------------------------
function get_userinfo_FetchAPI() {
    if (sessionStorage.length == 0) return;
    else if (sessionStorage.length == 1)
        if (sessionStorage.getItem("access_token") == 0) return;

    const token = sessionStorage.getItem('access_token');

    fetch('/auth/get_userinfo', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        })
        .then(res => res.json())
        .then((res) => {
            if (res['result'] == "success") {
                let user_name = res['user_name'];
                let user_photo = res['user_photo'];
                document.querySelector(".before_login").style.display = "none";
                document.querySelector(".success_login").style.display = "block";
                document.querySelector("#user_image").src = "../static/files/" + user_photo;
                document.querySelector("#user_info").innerHTML = user_name + "님";
            }
        })
}

setTimeout(() => {
    get_userinfo_FetchAPI();
}, 200)

document.querySelector("#logout").addEventListener('click', function () {
    sessionStorage.setItem("access_token", "0");
    document.querySelector(".before_login").style.display = "block";
    document.querySelector(".success_login").style.display = "none";
})

function calendar_mode() {
    // checked true -> look 상태
    if (document.querySelector(".checkbox").checked) {
        document.querySelector("#m_s_c").disabled = true;
        document.querySelector("#m_s_l").disabled = false;
        
        var split_date = document.querySelector(".day").attributes[2].nodeValue.split("-");
        var start_date = split_date[0] + "," + split_date[1] + "," + split_date[2];
        loadYYMM(new Date(start_date));

        var main_days = document.querySelectorAll(".day");
        for(day of main_days){
            day.style.background= "rgba(0, 0, 0, 0.1)";
        }
    }
    else{
        document.querySelector("#m_s_c").disabled = false;
        document.querySelector("#m_s_l").disabled = true;
        var split_date = document.querySelector(".day").attributes[2].nodeValue.split("-");
        var start_date = split_date[0] + "," + split_date[1] + "," + split_date[2];
        loadYYMM(new Date(start_date));
    }
}

document.querySelector("#user_info").addEventListener("click",function(){
    var udiv = document.querySelector(".user_div");
    if(udiv.style.display == "block"){
        udiv.style.display = "none";
    }
    else{
        udiv.style.display = "block";
    }
})

function go_mypage(){
    window.location.href ="/mypage";
}
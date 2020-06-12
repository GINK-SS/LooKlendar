function menu_open(){
    var button1 = document.querySelector(".menu_button");
    var menu1 = document.querySelector(".side_menu");
    button1.style.display="none";
    menu1.style.left = "0px";
}

function menu_exit(){
    var button2 = document.querySelector(".menu_button");
    var menu2 = document.querySelector(".side_menu");
    button2.style.display="block";
    menu2.style.left = "-250px";
}

document.querySelector(".js-menu_toggle").addEventListener("click", function(){
    var side = document.querySelector('.side_menu');
    // class명이 포함되어 있나 확인 할 때 => contains
    if(document.querySelector('.js-menu_toggle').classList.contains('closed')){
        side.style.left = '0px';
        this.classList.remove('closed');
        this.classList.add('opened');
    }
    else{
        side.style.left = '-250px';
        this.classList.remove('opened');
        this.classList.add('closed');
    }
});


// ------------------------------------로그인 유저 불러오기------------------------------
function get_userinfo_FetchAPI(){
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
        if( res['result'] == "success"){
            let user_id = res['user_id'];
            let user_name = res['user_name'];
            document.querySelector(".before_login").style.display="none";
            document.querySelector(".success_login").style.display="block";
            document.querySelector("#user_info").innerHTML = user_name+"님";
        }
    })
}

setTimeout(() => {
    get_userinfo_FetchAPI();
}, 500)

document.querySelector("#logout").addEventListener('click',function(){
    sessionStorage.setItem("access_token","0");
    document.querySelector(".before_login").style.display="block";
    document.querySelector(".success_login").style.display="none";
})

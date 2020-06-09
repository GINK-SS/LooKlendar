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
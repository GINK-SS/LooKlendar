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
                document.querySelector("#user_image").src = "../static/files/"+ res['user_photo'];
                document.querySelector("#user_modal_image").src = "../static/files/"+ res['user_photo'];
                document.querySelector("#mypage_id").innerHTML = res['user_id'];
                document.querySelector("#mypage_email").innerHTML = res['user_email'];
                document.querySelector("#mypage_name").innerHTML = res['user_name'];
                document.querySelector("#mypage_nickname").innerHTML = res['user_nick'];
                
                var gender;
                if(res['user_gender']==1) gender = "남";
                else gender = "여"
                document.querySelector("#mypage_gender").innerHTML = gender;
                
                var birth = document.querySelector("#mypage_birth");
                if(res['user_birth'] == "None"){
                    birth.innerHTML = "None"
                    birth.value = "";
                }
                else{
                    birth.innerHTML = res['user_birth'].split(" ")[0];
                    var split = birth.innerText.split(" ")[0].split("-");
                    var split2 = split[0]+split[1]+split[2];
                    document.querySelector("#modify_birth").value = split2;
                }
                // 수정 폼 기본 값 입력
                
                document.querySelector("#modify_email").value = res['user_email'];
                document.querySelector("#modify_nickname").value = res['user_nick'];
                $('input[name="gender"]').val(res['user_gender']);
                
            }
        })
}

setTimeout(() => {
    get_userinfo_FetchAPI();
}, 100)

document.querySelector(".home").addEventListener("click",function(){
    window.location.href="/";
})


function userinfo_modify_FetchAPI() {
    if (sessionStorage.length == 0) return;
    else if (sessionStorage.length == 1)
        if (sessionStorage.getItem("access_token") == 0) return;

    const token = sessionStorage.getItem('access_token');

    var email = document.querySelector("#modify_email").value;
    var nick = document.querySelector("#modify_nickname").value;
    var birth = document.querySelector("#modify_birth").value;
    var gender = $("input[type=radio][name=gender]:checked").val();
    
    var file;
    if(document.querySelector("#modify_photo").files.length == 0) file = '';
    else file = document.querySelector("#modify_photo").files[0];
    var remove;
    if(document.querySelector("#checkbox").checked) remove = '1';
    else remove = '0';

    var send_data = new FormData();
    
    send_data.append('email', email);
    send_data.append('nick', nick);
    send_data.append('birth', birth);
    send_data.append('gender', gender);
    send_data.append('remove',remove);
    send_data.append('file', file);

    fetch('/auth/modify', {
            method: "POST",
            headers: {
                'Authorization': token
            },
            body : send_data
        })
        .then(res => res.json())
        .then((res) => {
            if(res['STATUS'] == "SUCCESS"){
                alert("회원정보 수정 완료");
            }
            else if(res['STATUS'] == "NICK EXIST"){
                alert("이미 존재하는 닉네임입니다.");
            }
            else if(res['STATUS'] == "Wrong EMAIL or NOT EMAIL FORMAT"){
                alert("사용할 수 없는 EMAIL입니다.");
            }
            else if(res['STATUS'] == "EMAIL EXIST"){
                alert("이미 존재하는 EMAIL입니다.");
            }
            else if(res['STATUS'] == "fail"){
                alert("알 수 없는 오류가 발생하였습니다. 다시 시도 해주세요.");
            }
        })
}

function userinfo_pw_modify_FetchAPI() {
    if (sessionStorage.length == 0) return;
    else if (sessionStorage.length == 1)
        if (sessionStorage.getItem("access_token") == 0) return;

    const token = sessionStorage.getItem('access_token');

    var pw = document.querySelector("#modify_pw").value;
    var pw2 = document.querySelector("#modify_pw2").value;
    
    let send_data ={
        'pw' : pw,
        'pw2' : pw2
    };

    fetch('/auth/modify_pw', {
            method: "POST",
            headers: {
                'Content-Type' : "application/json",
                'Authorization': token
            },
            body : JSON.stringify(send_data)
        })
        .then(res => res.json())
        .then((res) => {
            if(res['STATUS'] == "SUCCESS"){
                alert("비밀번호 수정 완료");
            }
            else if(res['STATUS'] == "fail"){
                alert("알 수 없는 오류가 발생하였습니다. 다시 시도 해주세요.");
            }
        })
}

// ----------------- 회원 탈퇴 API ---------------
function authout_FetchAPI() {
    if (sessionStorage.length == 0) return;
    else if (sessionStorage.length == 1)
        if (sessionStorage.getItem("access_token") == 0) return;

    const token = sessionStorage.getItem('access_token');

    var pw = document.querySelector("#authout_pw").value;
    
    let send_data ={
        'pw' : pw
    };

    fetch('/auth/authout', {
            method: "POST",
            headers: {
                'Content-Type' : "application/json",
                'Authorization': token
            },
            body : JSON.stringify(send_data)
        })
        .then(res => res.json())
        .then((res) => {
            if(res['STATUS'] == "SUCCESS"){
                alert("회원 탈퇴 완료");
                sessionStorage.setItem("access_token", "0");
                window.location.href ="/";
            }
            else if(res['STATUS'] == "fail"){
                alert("다시 시도 해주세요.");
            }
        })
}

// --------------------- 회원정보 변경 모달 -------------------- //
document.querySelector("#userinfo_modify").addEventListener("click",function(){
    document.querySelector("#userinfo_modify_modal_background").style.display = "block";
    document.querySelector("#modify_photo").value = '';
    document.querySelector("#checkbox").checked = false;
})
document.querySelector("#user_modal_exit").addEventListener('click', function () {
    document.querySelector("#userinfo_modify_modal_background").style.display = "none";
})
document.querySelector("#modify_button").addEventListener("click",function(){
    var email = document.querySelector("#modify_email").value;
    var nick = document.querySelector("#modify_nickname").value;
    if(email.length == 0){
        alert("EMAIL을 입력하세요.");
        return;
    }
    else if(nick.length == 0){
        alert("NICKNAME을 입력하세요.");
        return;
    }
    else if(email.length >= 100){
        alert("EMAIL을 확인하세요.");
        return;
    }
    else if(nick.length >= 100){
        alert("NICKNAME을 확인하세요.");
        return;
    }
    userinfo_modify_FetchAPI();
    document.querySelector("#userinfo_modify_modal_background").style.display = "none";
    setTimeout(() => {
        get_userinfo_FetchAPI();
    }, 500);
    cal_modal_clean();
})

function cal_modal_clean() {
    var event_box = document.querySelector("#modal_image_container");
    while (event_box.hasChildNodes()) {
        event_box.removeChild(event_box.firstChild);
    }
}
// ---------------------- 비밀번호 변경 모달 ------------------- //
document.querySelector("#password_modify").addEventListener("click",function(){
    document.querySelector("#pw_modify_modal_background").style.display = "block";
})
document.querySelector("#pw_modal_exit").addEventListener('click', function () {
    document.querySelector("#pw_modify_modal_background").style.display = "none";
})
document.querySelector("#pw_modify_button").addEventListener("click",function(){
    var pw = document.querySelector("#modify_pw").value;
    var pw2 = document.querySelector("#modify_pw2").value;
    if(pw.length == 0){
        alert("비밀번호를 확인해주세요!");
        return;
    }
    else if(pw != pw2){
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }
    else if(pw.length >= 100){
        alert("비밀번호를 확인하세요.");
        return;
    }
    userinfo_pw_modify_FetchAPI();
    document.querySelector("#pw_modify_modal_background").style.display = "none";
    get_userinfo_FetchAPI();
})


// ------------------ 회원 탈퇴 모달 -----------------------
document.querySelector("#authout").addEventListener("click",function(){
    document.querySelector("#authout_modal_background").style.display="block";
})
document.querySelector("#authout_modal_exit").addEventListener('click', function () {
    document.querySelector("#authout_modal_background").style.display = "none";
})
document.querySelector("#authout_button").addEventListener("click",function(){
    var pw = document.querySelector("#authout_pw").value;
    if(pw.length == 0){
        alert("비밀번호를 확인해주세요!");
        return;
    }
    if (confirm("정말로 탈퇴하시겠습니까?")) {
        authout_FetchAPI();
    } else {
        return;
    }
})



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

function checkbox(){
    if(document.querySelector("#checkbox").checked == true){
        save = document.querySelector("#user_modal_image").src;
        document.querySelector("#user_modal_image").src = "../static/files/user_image1.jpg";
    }
    else{
        document.querySelector("#user_modal_image").src = save;
    }
}
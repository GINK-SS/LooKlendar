$("#login_btn").on({
    'click': ()=> {
        login_FetchAPI_v1();
    }
})

function login_FetchAPI_v1() {
    
    let id = document.querySelector("#login_id").value;
    let pw = document.querySelector("#login_pw").value;

    let send_data ={
        'id' : id,
        'pw' : pw
    };

    fetch('/auth/login', {
        method : "POST",
        headers : {
            'Content-Type': "application/json"
        },
        body : JSON.stringify(send_data)
    })
    .then(res => res.json())
    .then((res) => {
        if(res['STATUS']=="SUCCESS"){        
            sessionStorage.setItem('access_token', "Bearer "+res['access_token']);
            window.location.href="/";
        }
        else if(res['STATUS'] == "INCORRECT ID"){
            alert("존재하지 않는 ID입니다.");
        }
        else if(res['STATUS'] == "INCORRECT PW"){
            alert("비밀번호를 확인해주세요.");
        }
    })
}

document.querySelector(".home").addEventListener("click",function(){
    window.location.href="/";
})


// ----------------- 아이디 찾기 API ---------------
function find_id_FetchAPI() {

    var name = document.querySelector("#find_name").value;
    var email = document.querySelector("#find_email").value;

    let send_data ={
        'name' : name,
        'email' : email
    };

    fetch('/auth/find_id', {
            method: "POST",
            headers: {
                'Content-Type' : "application/json",
            },
            body : JSON.stringify(send_data)
        })
        .then(res => res.json())
        .then((res) => {
            if(res['RESULT']=="NOT FOUND") alert("다시 시도해주세요. 아이디를 찾을 수 없습니다.")
            else alert("찾으신 아이디는 " + res['RESULT']['user_id']+ " 입니다.");
        })
}
// ---------------------- 아이디 찾기 모달 ------------------- //
document.querySelector("#find_id_btn").addEventListener("click",function(){
    document.querySelector("#find_modal_background").style.display = "block";
})
document.querySelector("#find_modal_exit").addEventListener('click', function () {
    document.querySelector("#find_modal_background").style.display = "none";
})
document.querySelector("#find_button").addEventListener("click",function(){
    var name = document.querySelector("#find_name").value;
    var email = document.querySelector("#find_email").value;
    if(name.length == 0){
        alert("이름을 입력해주세요.");
        return;
    }
    else if(email.length == 0){
        alert("이메일을 입력해주세요.");
        return;
    }
    find_id_FetchAPI();
    document.querySelector("#find_modal_background").style.display = "none";
})
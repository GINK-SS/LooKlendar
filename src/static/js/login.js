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
        console.log(res);
        if(res['STATUS']=="SUCCESS"){        
            sessionStorage.setItem('access_token', "Bearer "+res['access_token']);
            window.location.href="http://localhost:5000/";
        }
        else if(res['STATUS'] == "INCORRECT ID"){
            alert("존재하지 않는 ID입니다.");
        }
        else if(res['STATUS'] == "INCORRECT PW"){
            alert("비밀번호를 확인해주세요.");
        }
    })
}
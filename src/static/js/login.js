$("#login_btn").on({
    'click': ()=> {
        login_FetchAPI_v1();
    }
})

function login_FetchAPI_v1() {
    
    let id = document.querySelector("#login_id").value;
    let pw = document.querySelector("#login_pw").value;
    // const sl = document.querySelector(".success_login");
    // const tl = document.querySelector(".login-form");
    // console.log(sl);
    // console.log(tl);

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
        console.log(send_data);
        if(res['STATUS']=="SUCCESS"){
            console.log("로그인됨");
            sessionStorage.setItem('access_token', res['access_token']);
            window.location.href="http://localhost:5000/";
        }
    })
    
}
$("#signup_button").on({
    'click': ()=> {
        signup_FetchAPI_v1();
    }
})

function signup_FetchAPI_v1() {

    let id = document.querySelector("#signup_id").value;
    let pw = document.querySelector("#signup_pw").value;
    let pw2 = document.querySelector("#signup_pw2").value;
    let email = document.querySelector("#signup_email").value;
    let name = document.querySelector("#signup_name").value;
    let nick = document.querySelector("#signup_nickname").value;
    let birth = document.querySelector("#signup_birth").value;
    let gender = document.querySelector("#signup_gender").value;
    let photo = document.querySelector("#signup_photo").value;

    // let formdata = new FormData();
    // formdata.append('id',id);
    // formdata.append('pw',pw);
    // formdata.append('pw2',pw2);
    // formdata.append('email',email);
    // formdata.append('name',name);
    // formdata.append('nick',nick);
    // formdata.append('birth',birth);
    // formdata.append('gender',gender);
    // formdata.append('photo',photo);
    // console.log(formdata);

    let send_data ={
        'id' : id,
        'pw' : pw,
        'pw2' : pw2,
        'email' : email,
        'name' : name,
        'nick' : nick,
        'birth':birth,
        'gender' : gender,
        'photo' : photo
    };
    fetch('/auth/sign_up', {
        method : "POST",
        headers : {
            'Content-Type': "application/json"
        },
        body : JSON.stringify(send_data)
    })
    .then((res) => {
        console.log(res);
        console.log(send_data);
        if(res.ok){
            alert("회원가입 완료! 환영합니다. "+ send_data['name'] + "님!");
        }
    })
    // .then(res => res.json())
    // .then((res)=> {
    //     console.log("Why!!");
    //     // console.log(res);
    //     console.log(send_data);
    //     // 여기 코딩
    // });

}
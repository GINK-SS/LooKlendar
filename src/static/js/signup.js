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
    let gender = $("input[type=radio][name=gender]:checked").val();
    let photo = document.querySelector("#signup_photo").value;

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
    console.log(send_data);
    fetch('/auth/sign_up', {
        method : "POST",
        headers : {
            'Content-Type': "application/json"
        },
        body : JSON.stringify(send_data)
    })
    .then(res => res.json())
    .then((res) => {
        console.log(res);
        if(res['STATUS'] == "SUCCESS"){
            alert("회원가입 완료! 환영합니다. "+ send_data['name'] + "님!");
            window.location.href="http://localhost:5000/login";
        }
        else if(res['STATUS'] == "ID EXIST"){
            alert("이미 존재하는 ID입니다.");
        }
        else if(res['STATUS'] == "Wrong ID"){
            alert("사용할 수 없는 ID입니다.");
        }
        else if(res['STATUS'] == "BLANK ID"){
            alert("사용할 수 없는 ID입니다.");
        }
        else if(res['STATUS'] == "NICK EXIST"){
            alert("이미 존재하는 닉네임입니다.");
        }
        else if(res['STATUS'] == "Wrong EMAIL or NOT EMAIL FORMAT"){
            alert("사용할 수 없는 EMAIL입니다.");
        }
        else if(res['STATUS'] == "PW MATCH FAIL"){
            alert("패스워드가 일치하지 않습니다.");
        }
        else if(res['STATUS'] == "EMAIL EXIST"){
            alert("이미 존재하는 EMAIL입니다.");
        }
        else if(res['STATUS'] == "Wrong NAME"){
            alert("사용할 수 없는 NAME입니다.");
        }
        else if(res['STATUS'] == "INSERT ID"){
            alert("ID를 입력하세요.");
        }
        else if(res['STATUS'] == "INSERT PW"){
            alert("PW를 입력하세요.");
        }
        else if(res['STATUS'] == "INSERT EMAIL"){
            alert("EMAIL을 입력하세요.");
        }
        else if(res['STATUS'] == "INSERT NAME"){
            alert("NAME을 입력하세요.");
        }
        else if(res['STATUS'] == "INSERT NICK"){
            alert("NICKNAME을 입력하세요.");
        }
        else if(res['STATUS'] == "INSERT ID"){
            alert("ID를 입력하세요.");
        }
        else if(res['STATUS'] == "LONG ID"){
            alert("ID를 확인하세요.");
        }
        else if(res['STATUS'] == "SHORT ID"){
            alert("ID를 확인하세요.");
        }
        else if(res['STATUS'] == "LONG PW"){
            alert("PW를 확인하세요.");
        }
        else if(res['STATUS'] == "LONG EMAIL"){
            alert("EMAIL을 확인하세요.");
        }
        else if(res['STATUS'] == "LONG NAME"){
            alert("NAME을 확인하세요.");
        }
        else if(res['STATUS'] == "LONG NICK"){
            alert("NICKNAME을 확인하세요.");
        }
        else if(res['STATUS'] == "fail"){
            alert("알 수 없는 오류가 발생하였습니다. 다시 시도 해주세요.");
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
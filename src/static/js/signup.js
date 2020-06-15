$("#signup_button").on({
    'click': ()=> {
        signup_FetchAPI_v1();
    }
})

function signup_FetchAPI_v1(){
    
    let id = document.querySelector("#signup_id").value;
    let pw = document.querySelector("#signup_pw").value;
    let pw2 = document.querySelector("#signup_pw2").value;
    let email = document.querySelector("#signup_email").value;
    let name = document.querySelector("#signup_name").value;
    var nick = document.querySelector("#signup_nickname").value;
    var birth = document.querySelector("#signup_birth").value;
    var gender = $("input[type=radio][name=gender]:checked").val();
    
    if(document.querySelector("#signup_photo").files.length == 0){
        file = new File(["user_image1"],"user_image1.jpg", {type : "image/jpeg"});
    }
    else file = document.querySelector("#signup_photo").files[0];
    console.log(file);
    
    var send_data = new FormData();
    
    send_data.append('id', id);
    send_data.append('pw', pw);
    send_data.append('pw2', pw2);
    send_data.append('email', email);
    send_data.append('name', name);
    send_data.append('nick', nick);
    send_data.append('birth', birth);
    send_data.append('gender', gender);
    send_data.append('file', file);
    
    fetch("/auth/sign_up",{
        method:"POST",
        headers:{},
        body : send_data
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        if(res['STATUS'] == "SUCCESS"){
            alert("회원가입 완료! 환영합니다. "+ name + "님!");
            window.location.href="/login";
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
    .catch(err => console.log(err))

}

function image_load(event) {
    for (var image of event.target.files) {
        var reader = new FileReader();
        var container = document.querySelector("#modal_image_container");
        reader.onload = function (event) {
            var img = document.createElement("img");
            img.setAttribute("src", event.target.result);
            img.style.width = "200px";
            img.style.height = "200px";
            img.style.margin ="10px";

            // 이미지 업로드 할때마다 이미 업로드되어있던 이미지는 삭제
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            container.appendChild(img);
        };
        reader.readAsDataURL(image);
    }
}

document.querySelector(".home").addEventListener("click",function(){
    window.location.href="/";
})
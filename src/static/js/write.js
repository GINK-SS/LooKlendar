function write_FetchAPI_v1(){
    
    if (sessionStorage.length == 0) return;
    else if (sessionStorage.length == 1)
        if (sessionStorage.getItem("access_token") == 0) return;

    var token = sessionStorage.getItem('access_token');

    let title = document.querySelector("#write_title").value;
    let text = document.querySelector("#write_text").value;
    let outer = document.querySelector("#write_outer").value;
    let top = document.querySelector("#write_top").value;
    let bot = document.querySelector("#write_bot").value;
    var shoes = document.querySelector("#write_shoes").value;
    var acc = document.querySelector("#write_acc").value;

    var file;
    if (document.querySelector(".modal_image").files.length == 0) file = '';
    else file = document.querySelector(".modal_image").files[0];
    
    var send_data = new FormData();
    
    send_data.append('title', title);
    send_data.append('text', text);
    send_data.append('outer', outer);
    send_data.append('top', top);
    send_data.append('bot', bot);
    send_data.append('shoes', shoes);
    send_data.append('acc', acc);

    send_data.append('file', file);

    fetch('/board/upload',{
        method: "POST",
        headers: {
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json',
            'Authorization': token
        },
        body: send_data
    })
    .then(res => res.json())
    .then(res => {
        if(res['STATUS'] == "SUCCESS"){
            alert("글쓰기 완료!");
            window.location.href="/dailylook";
        }
        else if(res['STATUS'] == "fail"){
            alert("알 수 없는 오류가 발생하였습니다. 다시 시도 해주세요.");
        }
    })
    .catch(err => console.log(err))
}

document.querySelector("#write_botton").addEventListener("click",function(){
    if(document.querySelector("#write_title").value.length == 0){
        alert("제목을 입력해주세요!");
        return;
    } 
    else if(document.querySelector("#write_text").value.length == 0){
        alert("내용을 입력해주세요!");
        return;
    }
    else if(document.querySelector("#write_top").value.length ==0){
        alert("상의를 입력해주세요!");
        return;
    }
    else if(document.querySelector("#write_bot").value.length ==0){
        alert("하의를 입력해주세요!");
        return;
    } 
    else if(document.querySelector("#write_shoes").value.length ==0){
        alert("신발을 입력해주세요!");
        return;
    } 
    write_FetchAPI_v1();
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
    window.location.href="/dailylook";
})
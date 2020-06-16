

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
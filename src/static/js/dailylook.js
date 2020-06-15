function image_load(event) {
    for (var image of event.target.files) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var img = document.createElement("img");
            img.setAttribute("src", event.target.result);
            img.style.width = "200px";
            img.style.height = "200px";
            img.style.margin ="10px";
            document.querySelector("#modal_image_container").appendChild(img);
        };
        reader.readAsDataURL(image);
    }
}
var totalPage = 11;
var eachPages = 10;
var nowpage = 1;

function pageChk() {
  $('.pagination li').on('click', 'a', function () {
    var id = $(this).parent().attr('id');

    switch (id) {
      case 'pre_item':
        nowpage = nowpage - eachPages;
        break;
      case 'next_item':
        nowpage = nowpage + eachPages;
        break;
      case 'pre_page':
        nowpage = nowpage - 1;
        break;
      case 'next_page':
        nowpage = nowpage + 1;
        break;
      default:
        nowpage = parseInt($(this).text());
        break;
    }
    p_container_clear();
    get_board_FetchAPI();
    setPagenation();
  });
};

pageChk();

function setPagenation() {
  if (nowpage <= 0) {
    nowpage = 1;
  } else if (totalPage < nowpage) {
    nowpage = totalPage;
  }
  var startPage = Math.floor((nowpage - 1) / eachPages);
  startPage = startPage * 10 + 1;
  // console.log(nowpage, startPage);


  var html = '';
  html += '<li id="pre_item"><a href="#">&laquo;</a></li>';
  html += '<li id="pre_page"><a href="#"><</a></li>';

  if (nowpage + (totalPage % eachPages) > totalPage) {

    for (var i = startPage; i < startPage + (totalPage % eachPages); i++) {
      html += '<li><a href="#">' + i + '</a></li>';
    }
  } else {
    //  console.log('totalPage > nowpage');
    for (var i = startPage; i < startPage + eachPages; i++) {
      html += '<li><a href="#">' + i + '</a></li>';
    }
  }
  html += '<li id="next_page"><a href="#">></a></li>';
  html += '<li id="next_item"><a href="#">&raquo;</a></li>';
  $('.pagination').html(html);

  $('.pagination li').each(function (i) {
    if ($(this).text() == nowpage) {
      $(this).addClass('active');
    }
  });
  pageChk();
  $('b').html(nowpage);
}


function get_board_FetchAPI() {

  var send_data = {
    'page': nowpage
  }
  fetch('/board/main', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(send_data)
    })
    .then(res => res.json())
    .then((res) => {
      console.log(res);
      // 사진 날짜 제목 아이디 아래는 좋아요, 조회, 댓글 수
      var cnt = 0
      for (event of res["BOARD"]) {

        var post = document.createElement('div');

        var c_post = '';

        c_post += "<img src='../static/files/";
        c_post += event['dailylook_photo'];
        c_post += "'class='p_image'>";

        c_post += "<div date='";
        c_post += event['dailylook_date'];
        c_post += "' class='p_date'>"
        c_post += event['dailylook_date'];
        c_post += "'</div>";

        c_post += "<div title='";
        c_post += event['dailylook_title'];
        c_post += "' class='p_title'>";
        c_post += event['dailylook_title'];
        c_post += "</div>"

        c_post += "<div NICK='";
        c_post += event['NICK'];
        c_post += "' class='p_usernick'>";
        c_post += event['NICK'];
        c_post += "</div>"

        c_post += "<div view='";
        c_post += event['dailylook_view'];
        c_post += "' class='p_view'>";
        c_post += event['dailylook_view'];
        c_post += "</div>";

        post.innerHTML = c_post;
        post.classList.add("post");

        if (cnt < 4) {
          document.querySelector(".post_container_1").appendChild(post);
        } else if (cnt >= 4 && cnt < 8) {
          document.querySelector(".post_container_2").appendChild(post);
        } else if (cnt >= 8 && cnt < 12) {
          document.querySelector(".post_container_3").appendChild(post);
        }
        cnt++;
      }
    })
}

setTimeout(() => {
  get_board_FetchAPI();
}, 300);

function p_container_clear() {
  var container = document.querySelectorAll(".p_container");
  for (c of container) {
    while (c.hasChildNodes()) {
      c.removeChild(c.firstChild);
    }
  }
}
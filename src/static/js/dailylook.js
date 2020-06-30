var totalPage = 20;
var eachPages = 10;
var nowpage = 1;
var mode = 1;

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
    setPagenation();
    get_modepage_and_clear();
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

  var html = '';
  html += '<li id="pre_item"><a href="#">&laquo;</a></li>';
  html += '<li id="pre_page"><a href="#"><</a></li>';

  if (nowpage + (totalPage % eachPages) > totalPage) {

    for (var i = startPage; i < startPage + (totalPage % eachPages); i++) {
      html += '<li><a href="#">' + i + '</a></li>';
    }
  } else {
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

// --------------------- 페이지 새로 불러올때마다 모드에 따른 API 호출 함수 --------------------
function get_modepage_and_clear() {
  p_container_clear();
  if (mode == 1) get_board_FetchAPI();
  else if (mode == 2) get_search_board_FetchAPI();
  else if (mode == 3) get_array_board_FetchAPI();
  setTimeout(() => {
    click_post();
  }, 600);
}


// -------------- 페이지에 따른 전체 게시글 반환하는 API -----------------
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
      // 사진 날짜 제목 아이디 아래는 좋아요, 조회
      var cnt = 0
      for (event of res["BOARD"]) {

        var post = document.createElement('div');

        var c_post = '';

        c_post += "<img src='../static/files/";
        c_post += event['dailylook_photo'];
        c_post += "'class='p_image'>";


        c_post += "<div date='";
        c_post += event['dailylook_date'];
        c_post += "' class='p_date' dailylook_num='"
        c_post += event['dailylook_num'];
        c_post += "'>"
        c_post += getFormDate(event['dailylook_date']);
        c_post += "</div>";


        c_post += "<div title='";
        c_post += event['dailylook_title'];
        c_post += "' class='p_title'>";
        // 제목이 10글자를 넘어가게 되면 ... 으로 뒷부분 대체한다.
        c_post += textLengthOverCut(event['dailylook_title'], '10', '...');
        c_post += "</div>"

        c_post += "<div NICK='";
        c_post += event['user_nickname'];
        c_post += "' class='p_usernick'>";
        c_post += event['user_nickname'];
        c_post += "</div>"

        c_post += "<div view='";
        c_post += event['dailylook_view'];
        c_post += "' class='p_view'>👁‍ ";
        c_post += event['dailylook_view'];
        c_post += " ❤ ";
        c_post += event['LIKEE'];
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

// ----------------------- 검색한 게시글 반환 --------------------
function get_search_board_FetchAPI() {

  var send_data = {
    'page': nowpage,
    'text': document.querySelector("#search_title").value,
    'option': document.querySelector("#search_select").value
  }
  fetch('/board/search', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(send_data)
    })
    .then(res => res.json())
    .then((res) => {
      // 사진 날짜 제목 아이디 아래는 좋아요, 조회
      var cnt = 0
      for (event of res["BOARD"]) {

        var post = document.createElement('div');

        var c_post = '';

        c_post += "<img src='../static/files/";
        c_post += event['dailylook_photo'];
        c_post += "'class='p_image'>";


        c_post += "<div date='";
        c_post += event['dailylook_date'];
        c_post += "' class='p_date' dailylook_num='"
        c_post += event['dailylook_num'];
        c_post += "'>"
        c_post += getFormDate(event['dailylook_date']);
        c_post += "</div>";


        c_post += "<div title='";
        c_post += event['dailylook_title'];
        c_post += "' class='p_title'>";
        // 제목이 10글자를 넘어가게 되면 ... 으로 뒷부분 대체한다.
        c_post += textLengthOverCut(event['dailylook_title'], '10', '...');
        c_post += "</div>"

        c_post += "<div NICK='";
        c_post += event['user_nickname'];
        c_post += "' class='p_usernick'>";
        c_post += event['user_nickname'];
        c_post += "</div>"

        c_post += "<div view='";
        c_post += event['dailylook_view'];
        c_post += "' class='p_view'>👁‍ ";
        c_post += event['dailylook_view'];
        c_post += " ❤ ";
        c_post += event['LIKEE'];
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

// ----------------------- 정렬한 게시글 반환 --------------------
function get_array_board_FetchAPI() {

  var send_data = {
    'page': nowpage,
    'option': document.querySelector("#array_select").value
  }
  fetch('/board/array', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(send_data)
    })
    .then(res => res.json())
    .then((res) => {
      // 사진 날짜 제목 아이디 아래는 좋아요, 조회
      var cnt = 0
      for (event of res["BOARD"]) {

        var post = document.createElement('div');

        var c_post = '';

        c_post += "<img src='../static/files/";
        c_post += event['dailylook_photo'];
        c_post += "'class='p_image'>";


        c_post += "<div date='";
        c_post += event['dailylook_date'];
        c_post += "' class='p_date' dailylook_num='"
        c_post += event['dailylook_num'];
        c_post += "'>"
        c_post += getFormDate(event['dailylook_date']);
        c_post += "</div>";


        c_post += "<div title='";
        c_post += event['dailylook_title'];
        c_post += "' class='p_title'>";
        // 제목이 10글자를 넘어가게 되면 ... 으로 뒷부분 대체한다.
        c_post += textLengthOverCut(event['dailylook_title'], '10', '...');
        c_post += "</div>"

        c_post += "<div NICK='";
        c_post += event['user_nickname'];
        c_post += "' class='p_usernick'>";
        c_post += event['user_nickname'];
        c_post += "</div>"

        c_post += "<div view='";
        c_post += event['dailylook_view'];
        c_post += "' class='p_view'>👁‍ ";
        c_post += event['dailylook_view'];
        c_post += " ❤ ";
        c_post += event['LIKEE'];
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

// -------------클릭한 게시글 post 가져오는 API --------------
function get_post_FetchAPI(post_num) {
  fetch('/board/' + post_num, {

    })
    .then(res => res.json())
    .then((res) => {
      document.querySelector(".post_modal_background").style.display = "block";
      var click_post = '';
      var click_post_comment = '';
      var comment = document.createElement('div');
      var post = document.createElement('div');


      click_post += '<div class="orange">착샷</div>'

      click_post += "<div title='";
      click_post += res['BOARD']['dailylook_title'];
      click_post += "' class='p_title'>";
      click_post += res['BOARD']['dailylook_title'];
      click_post += "</div>"

      click_post += "<div NICK='";
      click_post += res['BOARD']['NICK'];
      click_post += "' class='p_usernick getdata'>";
      click_post += res['BOARD']['NICK'];
      click_post += "</div>"

      click_post += "<div date='";
      click_post += getFormDate(res['BOARD']['dailylook_date']);
      click_post += "' class='p_date getdata' dailylook_num='"
      click_post += res['BOARD']['dailylook_num'];
      click_post += "'>"
      click_post += getFormDate(res['BOARD']['dailylook_date']);
      click_post += "</div>";

      click_post += "<div view='";
      click_post += res['BOARD']['dailylook_view'];
      click_post += "' class='p_view getdata'>조회 수 : ";
      click_post += res['BOARD']['dailylook_view'];
      click_post += "</div>";

      click_post += "<div outer='";
      click_post += res['BOARD']['dailylook_outer'];
      click_post += "' class='p_cloth'>아우터 : ";
      click_post += res['BOARD']['dailylook_outer'];
      click_post += "</div>";

      click_post += "<div top='";
      click_post += res['BOARD']['dailylook_top'];
      click_post += "' class='p_cloth'>상의 : ";
      click_post += res['BOARD']['dailylook_top'];
      click_post += "</div>";

      click_post += "<div bot='";
      click_post += res['BOARD']['dailylook_bot'];
      click_post += "' class='p_cloth'>하의 : ";
      click_post += res['BOARD']['dailylook_bot'];
      click_post += "</div>";

      click_post += "<div shoes='";
      click_post += res['BOARD']['dailylook_shoes'];
      click_post += "' class='p_cloth'>신발 : ";
      click_post += res['BOARD']['dailylook_shoes'];
      click_post += "</div>";

      click_post += "<div acc='";
      click_post += res['BOARD']['dailylook_acc'];
      click_post += "' class='p_cloth'>악세서리 : ";
      click_post += res['BOARD']['dailylook_acc'];
      click_post += "</div>";

      click_post += "<img src='../static/files/";
      click_post += res['BOARD']['dailylook_photo'];
      click_post += "' class='p_image2'>";

      click_post += "<div text='";
      click_post += res['BOARD']['dailylook_text'];
      click_post += "' class='p_text getdata'>";
      click_post += res['BOARD']['dailylook_text'];
      click_post += "</div>";

      click_post += '<button class="like_btn">좋아요 수 : ';
      click_post += res['BOARD']['LIKEE'];
      click_post += '</button></br>';

      post.innerHTML = click_post;
      post.classList.add("click_post");
      document.querySelector(".post_modal_event_box").prepend(post);

      for (c of res['COMMENT']) {
        // 코멘트번호, 닉네임, 어떤글에 있는지, 텍스트, 시간
        click_post_comment += '<div class="comment" c_num="';
        click_post_comment += c['comment_num'];
        click_post_comment += '">'

        click_post_comment += '<span class="c_nickname">닉네임 : '
        click_post_comment += c['user_nickname'];
        click_post_comment += ' / </span>'

        click_post_comment += '<span class="c_time"> '
        click_post_comment += getFormDate(c['comment_date']);
        click_post_comment += '</span>'

        click_post_comment += '<img src="../static/image/cal_pen.png" width="25px" height="25px" id="img_mod" class="c_image">';
        click_post_comment += '<img src="../static/image/trash2.png" width="25px" height="25px" id="img_del" class="c_image">';

        click_post_comment += '<div class="c_text">'
        click_post_comment += c['comment_text'];
        click_post_comment += '</div>'

        // comment 닫는 div
        click_post_comment += '</div>'
        comment.innerHTML = click_post_comment;
        comment.classList.add("post_comment_box");
        document.querySelector(".post_modal_event_box").appendChild(comment);

      }
      // -----------------좋아요 버튼---------------
      document.querySelector(".like_btn").addEventListener("click", function () {
        var post_num = document.querySelector(".click_post").childNodes[3].attributes[2].nodeValue;
        like_FetchAPI(post_num);
        setTimeout(() => {
          document.querySelector("#comment_text").value = '';
          post_box_clear();
          get_post_FetchAPI(post_num);
        }, 500);
      })
      // --------------------------- 댓글 수정 이미지 -----------------------------
      var img_mod_all = document.querySelectorAll("#img_mod");
      for (var mod of img_mod_all) {
        mod.addEventListener("click", function (ee) {
          if (sessionStorage.length == 0){
            alert("로그인이 필요합니다.");
            return;
          } 
          else if (sessionStorage.length == 1){
            if (sessionStorage.getItem("access_token") == 0){
              alert("로그인이 필요합니다.");
              return;
            }
          }
          var e = ee.path[1];
          document.querySelector(".comment_modal_background").style.display = "block";
          document.querySelector("#comment_modify_text").value = e.childNodes[4].innerText;
          // ---------------------- 댓글 수정 제출 버튼 -----------------------
          document.querySelector("#comment_modify_button").addEventListener("click", function () {
            var comment_num = e.attributes[1].nodeValue;
            var post_num = mod.parentNode.parentNode.previousElementSibling.childNodes[3].attributes[2].nodeValue;
            comment_modify_FetchAPI(comment_num, post_num);
            document.querySelector(".comment_modal_background").style.display = "none";
          })
        })
      }
      // --------------------------- 댓글 삭제 이미지 -----------------------------
      var img_del_all = document.querySelectorAll("#img_del");
      for (var del of img_del_all) {
        del.addEventListener("click", function (eee) {
          if (sessionStorage.length == 0){
            alert("로그인이 필요합니다.");
            return;
          } 
          else if (sessionStorage.length == 1){
            if (sessionStorage.getItem("access_token") == 0){
              alert("로그인이 필요합니다.");
              return;
            }
          }
          var e2 = eee.path[1];
          var comment_num = e2.attributes[1].nodeValue;
          var post_num = mod.parentNode.parentNode.previousElementSibling.childNodes[3].attributes[2].nodeValue;
          if (confirm("정말로 삭제하시겠습니까?")) {
            comment_delete_FetchAPI(comment_num, post_num);
          } else {
            return;
          }
        })
      }
    })
}

// ----------------댓글 달기 API----------------- //
function comment_upload_FetchAPI(post_num) {

  if (sessionStorage.length == 0) {
    alert("로그인이 필요합니다.");
    return;
  } else if (sessionStorage.length == 1)
    if (sessionStorage.getItem("access_token") == 0) {
      alert("로그인이 필요합니다.");
      return;
    }

  var text = document.querySelector("#comment_text").value;
  var send_data = {
    'text': text,
    'daily_num': post_num
  }
  const token = sessionStorage.getItem('access_token');
  fetch('/comment/upload', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify(send_data)
    })
    .then(res => res.json())
    .then((res) => {
      alert("댓글 달기 완료.");
    })
}

// ------------------- 댓글 수정 API ---------------------
function comment_modify_FetchAPI(comment_num, post_num) {

  if (sessionStorage.length == 0) return;
  else if (sessionStorage.length == 1)
    if (sessionStorage.getItem("access_token") == 0) return;

  const token = sessionStorage.getItem('access_token');

  var num = comment_num;
  var text = document.querySelector("#comment_modify_text").value;

  var send_data = {
    'num': num,
    'text': text
  }

  fetch('/comment/modify', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(send_data)
    })
    .then(res => res.json())
    .then((res) => {
      if (res['STATUS'] == "success") {
        alert("댓글 수정 완료!");
        post_box_clear();
        get_post_FetchAPI(post_num);
      } else alert("댓글 수정 권한이 없습니다.");
    })

}

// -------------------- 댓글 삭제 API ----------------------
function comment_delete_FetchAPI(comment_num, post_num) {
  if (sessionStorage.length == 0) return;
  else if (sessionStorage.length == 1)
    if (sessionStorage.getItem("access_token") == 0) return;

  const token = sessionStorage.getItem('access_token');

  fetch('/comment/delete/' + comment_num, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    .then(res => res.json())
    .then((res) => {
      if (res['STATUS'] == "success") {
        alert("댓글 삭제 완료!");
        post_box_clear();
        get_post_FetchAPI(post_num);
      } else alert("댓글 삭제 권한이 없습니다.");
    })
}


// ------------조회수 증가 API--------------
function post_view_up_FetchAPI(post_num) {

  fetch('/board/view/' + post_num, {

    })
    .then(res => res.json())
    .then((res) => {})
}

// ---------------좋아요 버튼 API------------------
function like_FetchAPI(post_num) {
  if (sessionStorage.length == 0) {
    alert("로그인이 필요합니다.");
    return;
  } else if (sessionStorage.length == 1)
    if (sessionStorage.getItem("access_token") == 0) {
      alert("로그인이 필요합니다.");
      return;
    }
  const token = sessionStorage.getItem('access_token');
  fetch('/board/like/' + post_num, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    })
    .then(res => res.json())
    .then((res) => {
      if (res['SUCCESS'] == "up") alert("좋아요 완료.");
      else alert("좋아요 취소.");
    })
}

// ---------------------- 게시글 삭제 API ------------------------
function post_delete_FetchAPI(post_num) {

  if (sessionStorage.length == 0) {
    alert("로그인이 필요합니다.");
    return;
  } else if (sessionStorage.length == 1) {
    if (sessionStorage.getItem("access_token") == 0) {
      alert("로그인이 필요합니다.");
      return;
    }
  }
  const token = sessionStorage.getItem('access_token');

  var send_data = {
    'num': post_num
  }

  fetch('/board/delete', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify(send_data)
    })
    .then(res => res.json())
    .then((res) => {
      if (res['STATUS'] == "success") alert("삭제 완료!");
      else alert("삭제 불가능한 게시물입니다.");
    })
}


// --------------------- 게시글 수정 API ----------------------
function post_modify_FetchAPI(post_num) {
  if (sessionStorage.length == 0) return;
  else if (sessionStorage.length == 1)
    if (sessionStorage.getItem("access_token") == 0) return;

  const token = sessionStorage.getItem('access_token');

  var title = document.querySelector("#write_title").value;
  var text = document.querySelector("#write_text").value;
  var outer = document.querySelector("#write_outer").value;
  var top = document.querySelector("#write_top").value;
  var bot = document.querySelector("#write_bot").value;
  var shoes = document.querySelector("#write_shoes").value;
  var acc = document.querySelector("#write_acc").value;

  var file;
  if (document.querySelector("#modify_photo").files.length == 0) file = '';
  else file = document.querySelector("#modify_photo").files[0];
  var remove;
  if (document.querySelector("#checkbox").checked) remove = '1';
  else remove = '0';

  var send_data = new FormData();

  send_data.append('num', post_num);
  send_data.append('title', title);
  send_data.append('text', text);
  send_data.append('outer', outer);
  send_data.append('top', top);
  send_data.append('bot', bot);
  send_data.append('shoes', shoes);
  send_data.append('acc', acc);
  send_data.append('file', file);
  send_data.append('remove', remove);

  fetch('/board/modify', {
      method: "POST",
      headers: {
        'Authorization': token
      },
      body: send_data
    })
    .then(res => res.json())
    .then((res) => {
      if (res['STATUS'] == "SUCCESS") alert("수정완료!");
      else alert("수정 불가능한 게시물입니다.");
    })
}

//  -------------------- 글 상자 초기화 ---------------------
function post_box_clear() {
  var event_box = document.querySelector(".post_modal_event_box");
  while (event_box.hasChildNodes()) {
    event_box.removeChild(event_box.firstChild);
  }
}

// ------------------------- 전체 글 보기 버튼 ------------------------
document.querySelector("#board_all").addEventListener("click", function () {
  mode = 1;
  get_modepage_and_clear();
  document.querySelector("#")
})

// ------------------------- 검색 버튼 ------------------------
document.querySelector("#board_search").addEventListener("click", function () {
  mode = 2;
  get_modepage_and_clear();
})

// ------------------------- 정렬 버튼 ------------------------
document.querySelector("#board_array").addEventListener("click", function () {
  mode = 3;
  p_container_clear();
  if (document.querySelector("#array_select").value == 0) get_board_FetchAPI();
  else get_array_board_FetchAPI();
  setTimeout(() => {
    click_post();
  }, 500);
})

// ------------------ 게시글 exit 버튼 ----------------------
document.querySelector(".post_modal_exit").addEventListener("click", function () {
  document.querySelector(".post_modal_background").style.display = "none";
  post_box_clear();
  get_modepage_and_clear();
});

// ------------------ 댓글 수정 exit 버튼 ---------------------
document.querySelector("#comment_modal_exit").addEventListener("click", function () {
  document.querySelector(".comment_modal_background").style.display = "none";
});

// -------------------- 댓글 달기 버튼 -----------------------
document.querySelector(".comment_btn").addEventListener("click", function () {
  if (sessionStorage.length == 0){
    alert("로그인이 필요합니다.");
    return;
  } 
  else if (sessionStorage.length == 1){
    if (sessionStorage.getItem("access_token") == 0){
      alert("로그인이 필요합니다.");
      return;
    }
  }
  var post_num = document.querySelector(".click_post").childNodes[3].attributes[2].nodeValue;
  comment_upload_FetchAPI(post_num);
  setTimeout(() => {
    document.querySelector("#comment_text").value = '';
    post_box_clear();
    get_post_FetchAPI(post_num);
  }, 500);
})

// -------------------- 게시글 수정 모달의 최종 수정 버튼 ---------------------
document.querySelector("#modify_button").addEventListener("click", function () {
  var post_num = document.querySelector(".click_post").childNodes[3].attributes[2].nodeValue;
  post_modify_FetchAPI(post_num);
  document.querySelector(".modal_background").style.display = "none";
  setTimeout(() => {
    document.querySelector("#comment_text").value = '';
    post_box_clear();
    get_post_FetchAPI(post_num);
    get_modepage_and_clear();
  }, 500);
})

// ---------------- 게시글 수정 버튼 누르면 수정 모달 뜨게 하기-------------------
document.querySelector(".post_modify").addEventListener("click", function () {
  
  if (sessionStorage.length == 0){
    alert("로그인이 필요합니다.");
    return;
  } 
  else if (sessionStorage.length == 1){
    if (sessionStorage.getItem("access_token") == 0){
      alert("로그인이 필요합니다.");
      return;
    }
  }

  document.querySelector("#post_image").src = document.querySelector(".p_image2").src;

  document.querySelector(".post_modal_background").style.display = "none";
  document.querySelector(".modal_background").style.display = "block";

  document.querySelector(".modal_exit").addEventListener("click", function () {
    document.querySelector(".modal_background").style.display = "none";
    document.querySelector(".post_modal_background").style.display = "block";
  })

  document.querySelector("#write_title").value = document.querySelector(".p_title").attributes[0].nodeValue;
  document.querySelector("#write_text").value = document.querySelector(".click_post").childNodes[11].attributes[0].nodeValue
  document.querySelector("#write_outer").value = document.querySelector(".click_post").childNodes[5].attributes[0].nodeValue;
  document.querySelector("#write_top").value = document.querySelector(".click_post").childNodes[6].attributes[0].nodeValue;
  document.querySelector("#write_bot").value = document.querySelector(".click_post").childNodes[7].attributes[0].nodeValue
  document.querySelector("#write_shoes").value = document.querySelector(".click_post").childNodes[8].attributes[0].nodeValue
  document.querySelector("#write_acc").value = document.querySelector(".click_post").childNodes[9].attributes[0].nodeValue

})

// ---------------------------- 게시글 삭제 버튼 -------------------------------
document.querySelector(".post_delete").addEventListener("click", function () {

  if (sessionStorage.length == 0){
    alert("로그인이 필요합니다.");
    return;
  } 
  else if (sessionStorage.length == 1){
    if (sessionStorage.getItem("access_token") == 0){
      alert("로그인이 필요합니다.");
      return;
    }
  }

  var post_num = document.querySelector(".click_post").childNodes[3].attributes[2].nodeValue;
  if (confirm("정말로 삭제하시겠습니까?")) {
    post_delete_FetchAPI(post_num);
  } else {
    return;
  }
})

function checkbox() {
  if (document.querySelector("#checkbox").checked == true) {
    save = document.querySelector("#post_image").src;
    document.querySelector("#post_image").src = "../static/files/look_default.png";
  } else {
    document.querySelector("#post_image").src = save;
  }
}

// ------- 이미지 업로드 함수 -------- //
function image_load(event) {
  for (var image of event.target.files) {
    var reader = new FileReader();
    var container = document.querySelector("#modal_image_container");
    reader.onload = function (event) {
      var img = document.createElement("img");
      img.setAttribute("src", event.target.result);
      img.style.width = "200px";
      img.style.height = "200px";
      img.style.margin = "10px";

      // 이미지 업로드 할때마다 이미 업로드되어있던 이미지는 삭제
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(img);
    };
    reader.readAsDataURL(image);
  }
}

// ------------- 포스트 누르면 --------------
setTimeout(() => {
  click_post();
}, 1000);

function click_post() {
  const post = document.querySelectorAll(".post");
  for (const p of post) {
    p.addEventListener("click", function () {
      var post_num = p.childNodes[1].attributes[2].nodeValue;
      get_post_FetchAPI(post_num);
      post_view_up_FetchAPI(post_num);
    })
  }
}

function p_container_clear() {
  var container = document.querySelectorAll(".p_container");
  for (c of container) {
    while (c.hasChildNodes()) {
      c.removeChild(c.firstChild);
    }
  }
}

function textLengthOverCut(txt, len, lastTxt) {
  if (len == "" || len == null) { // 기본값
    len = 20;
  }
  if (lastTxt == "" || lastTxt == null) { // 기본값
    lastTxt = "...";
  }
  if (txt.length > len) {
    txt = txt.substr(0, len) + lastTxt;
  }
  return txt;
}

function getFormDate(date0) {
  var date = new Date(date0);
  date.setHours(date.getHours() - 9);
  var date_format_str = date.getFullYear().toString() + "-" + ((date.getMonth() + 1).toString().length == 2 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1).toString()) + "-" + (date.getDate().toString().length == 2 ? date.getDate().toString() : "0" + date.getDate().toString()) + " " + (date.getHours().toString().length == 2 ? date.getHours().toString() : "0" + date.getHours().toString()) + ":" + (date.getMinutes().toString().length == 2 ? date.getMinutes().toString() : "0" + date.getMinutes().toString()) + ':' + (date.getSeconds().toString().length == 2 ? date.getSeconds().toString() : "0" + date.getSeconds().toString());
  return date_format_str;
  // var year = date.getFullYear();
  // var month = (date.getMonth()+1);
  // month = month >= 10 ? month : '0' + month;
  // var day  = date.getDate();
  // day = day >= 10 ? day : '0' + day;
  // return year + '-' + month + '-' + day;
}

function gomain() {
  window.location.href = "/";
}


// ------------------------------------로그인 유저 불러오기------------------------------
function get_userinfo_FetchAPI() {
  if (sessionStorage.length == 0) return;
  else if (sessionStorage.length == 1)
    if (sessionStorage.getItem("access_token") == 0) return;

  const token = sessionStorage.getItem('access_token');

  fetch('/auth/get_userinfo', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    })
    .then(res => res.json())
    .then((res) => {
      if (res['result'] == "success") {
        let user_name = res['user_name'];
        let user_photo = res['user_photo'];
        document.querySelector(".before_login").style.display = "none";
        document.querySelector(".success_login").style.display = "block";
        document.querySelector("#user_image").src = "../static/files/" + user_photo;
        document.querySelector("#user_info").innerHTML = user_name + "님";
      }
    })
}

setTimeout(() => {
  get_userinfo_FetchAPI();
}, 200)

document.querySelector("#logout").addEventListener('click', function () {
  sessionStorage.setItem("access_token", "0");
  document.querySelector(".before_login").style.display = "block";
  document.querySelector(".success_login").style.display = "none";
})


document.querySelector("#user_info").addEventListener("click", function () {
  var udiv = document.querySelector(".user_div");
  if (udiv.style.display == "block") {
    udiv.style.display = "none";
  } else {
    udiv.style.display = "block";
  }
})

function go_mypage() {

  if (sessionStorage.length == 0){
    alert("로그인이 필요합니다.");
    window.location.href = "/login";
    return;
  } 
  else if (sessionStorage.length == 1){
    if (sessionStorage.getItem("access_token") == 0){
      alert("로그인이 필요합니다.");
      window.location.href = "/login";
      return;
    }
  }
  window.location.href = "/mypage";
}

// -------------------------- 메뉴 토글 -----------------------------
function menu_open() {
  var menu1 = document.querySelector(".side_menu");
  menu1.style.left = "0px";
}

function menu_exit() {
  var menu2 = document.querySelector(".side_menu");
  menu2.style.left = "-250px";
}

document.querySelector(".js-menu_toggle").addEventListener("click", function () {
  var side = document.querySelector('.side_menu');
  // class명이 포함되어 있나 확인 할 때 => contains
  if (document.querySelector('.js-menu_toggle').classList.contains('closed')) {
    side.style.left = '0px';
    this.classList.remove('closed');
    this.classList.add('opened');
  } else {
    side.style.left = '-250px';
    this.classList.remove('opened');
    this.classList.add('closed');
  }
});

document.querySelector(".search_btn").addEventListener("click", function () {
  var st = document.querySelector("#search_title");

})

document.querySelector("#board_write").addEventListener("click", function () {
  if (sessionStorage.length == 0){
    alert("로그인이 필요합니다.");
    return;
  } 
  else if (sessionStorage.length == 1){
    if (sessionStorage.getItem("access_token") == 0){
      alert("로그인이 필요합니다.");
      return;
    }
  }
  window.location.href="/write";
})
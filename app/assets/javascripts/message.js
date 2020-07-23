$(function(){
  function buildHTML(message){
    if (message.image){
      let html = 
      `<div class="Message-list__items">
          <div class="Message-list__items__message-info">
            <div class="Message-list__items__message-info__name">
              ${message.user_name}
            </div>
            <div class="Message-list__items__message-info__day-and-time">
              ${message.created_at}
             </div>
          </div>
          <div class="Message-list__items__text">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
        </div>
      </div>`
    return html;
  } else {
      let html =
      `<div class="Message-list__items">
        <div class="Message-list__items__message-info">
          <div class="Message-list__items__message-info__name">
            ${message.user_name}
          </div>
          <div class="Message-list__items__message-info__day-and-time">
            ${message.created_at}
          </div>
        </div>
        <div class="Message-list__items__text">
          <p class="Message__content">
            ${message.content}
          </p>
      </div>`
    return html;
    };
  }

  $('.Message-form__contents').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Message-list').append(html);
      $('.Message-list').animate({ scrollTop: $('.Message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.Message-form__contents__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  });
})

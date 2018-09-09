$(document).on('turbolinks:load', () => {
  scrollToConversationBottom();
  $('input#conversation_next_page').val(2)
  $('#conversation-messages').mouseenter(() => {
    readNewMessages();
  });
  $('#conversation-messages').scroll(() => {
    loadNextPageMessages();
  });
})

scrollToConversationBottom = () => {
  messages = $('#conversation-messages')[0];
  if (messages) {
    messages.scrollTop = messages.scrollHeight;
  }
}

readNewMessages = () => {
  messageIds = $('*#new_message_id').map((i, el) => {
    return el.value
  }).get()
  if (messageIds.length > 0) {
    $.ajax({
      method: 'GET',
      url: '/conversations/' + conversationId + '/read_messages',
      data: {
        message_ids: messageIds
      }
    }).done(() => {
      $('*#new_message_id').remove()
    })
  }
}

loadNextPageMessages = () => {
  conversationId = $('#conversation_id').attr('value')
  profileId = $('#conversation_current_profile_id').attr('value')
  messagesCount = $('.message').length
  topOfCoversationContent = $('#conversation-messages').scrollTop() == 0
  nextPage = $('#conversation_next_page').attr('value')

  if (topOfCoversationContent && nextPage) {
    firstMsg = $('.message:first')
    curOffset = firstMsg.offset().top - $('#conversation-messages').scrollTop()
    $.ajax({
      method: 'GET',
      url: '/conversations/' + conversationId + '/load_messages',
      data: {
        profile_id: profileId,
        page: nextPage,
        offset: messagesCount
      }
    }).done(() => {
      $('#conversation-messages').scrollTop(firstMsg.offset().top - curOffset)
    })
  }
}

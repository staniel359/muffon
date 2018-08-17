$(document).on('ready turbolinks:load', function() {
  goToConversationBottom();
});

function goToConversationBottom() {
  messages = $('#conversation_messages')[0];
  if (messages) {
    messages.scrollTop = messages.scrollHeight;
  }
};

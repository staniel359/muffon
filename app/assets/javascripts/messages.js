$(document).on('ready turbolinks:load', function() {
  goToConversationBottom();
});

function goToConversationBottom() {
  messages = $('#conversation_messages')[0];
  messages.scrollTop = messages.scrollHeight;
};

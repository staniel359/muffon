App.messaging = App.cable.subscriptions.create("MessagingChannel", {
  connected: function() {
    // Called when the subscription is ready for use on the server
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(data) {
    if (data['m']) {
      $('#conversation_' + data['c'] + ' #conversation-messages').append(data['m'])
      scrollToConversationBottom()
    } else if (data['s']) {
      $('#conversation_' + data['c'] + ' .message-status').html(data['s'])
    }
  }
});

import axios from 'axios'
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'

export default {
  data () {
    return {
      socket: null,
      isSocketOpen: false,
      isSubscribed: false,
      retryTimeout: 1000
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileToken: 'token'
      }
    ),
    socketUrl () {
      return `${this.socketBaseUrl}?token=${this.profileToken}`
    },
    socketBaseUrl () {
      return axios
        .defaults
        .baseURL
        .replace(
          'http',
          'ws'
        ).replace(
          '/api/',
          '/cable'
        )
    },
    subscribeMessage () {
      return JSON.stringify(
        {
          command: 'subscribe',
          identifier: this.identifier
        }
      )
    },
    identifier () {
      return JSON.stringify(
        {
          channel: this.channel
        }
      )
    },
    unsubscribeMessage () {
      return JSON.stringify(
        {
          command: 'unsubscribe',
          identifier: this.identifier
        }
      )
    }
  },
  watch: {
    isSocketOpen:
      'handleIsSocketOpenChange'
  },
  mounted () {
    this.initialize()
  },
  beforeUnmount () {
    if (this.isSocketOpen) {
      this.unsubscribe()
    }
  },
  methods: {
    handleSocketOpen () {
      this.isSocketOpen = true
    },
    handleSocketError () {
      setTimeout(
        this.initialize,
        this.retryTimeout
      )
    },
    handleIsSocketOpenChange (
      value
    ) {
      if (value) {
        this.subscribe()
      }
    },
    handleSocketMessage (
      value
    ) {
      const {
        type,
        identifier
      } = JSON.parse(
        value.data
      )

      if (identifier) {
        const {
          channel
        } = JSON.parse(
          identifier
        )

        const isSubscriptionConfirmType = (
          type === 'confirm_subscription'
        )

        const isMatchedChannel = (
          channel === this.channel
        )

        const isSubscribed = (
          isSubscriptionConfirmType &&
            isMatchedChannel
        )

        if (isSubscribed) {
          this.isSubscribed = true
        }
      }
    },
    initialize () {
      this.socket =
        new WebSocket(
          this.socketUrl
        )

      this.socket.onopen =
        this.handleSocketOpen

      this.socket.onerror =
        this.handleSocketError

      this.socket.onmessage =
        this.handleSocketMessage
    },
    subscribe () {
      this.socket.send(
        this.subscribeMessage
      )
    },
    unsubscribe () {
      this.socket.send(
        this.unsubscribeMessage
      )
    }
  }
}

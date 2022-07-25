<template>
  <div
    class="item"
    @click="handleClick"
  >
    <BaseIcon
      icon="share"
    />

    {{ shareText }}
  </div>
</template>

<script>
import {
  AES
} from 'crypto-js'
import BaseIcon from '*/components/BaseIcon.vue'
import {
  setToast
} from '*/helpers/actions/plugins/semantic'

export default {
  name: 'BaseShareOption',
  components: {
    BaseIcon
  },
  props: {
    shareData: {
      type: Object,
      required: true
    }
  },
  computed: {
    shareText () {
      return this.$t(
        'actions.share'
      )
    },
    shareDataFormatted () {
      return [
        '[link]',
        this.shareDataStringEncrypted,
        '[/link]'
      ].join(
        ''
      )
    },
    shareDataStringEncrypted () {
      return AES.encrypt(
        this.shareDataString,
        'secret'
      ).toString()
    },
    shareDataString () {
      return JSON.stringify(
        this.shareData
      )
    },
    copiedMessage () {
      return this.$t(
        'notifications.copied'
      )
    }
  },
  methods: {
    handleClick () {
      this.copyToClipboard()

      this.notify()
    },
    copyToClipboard () {
      navigator
        .clipboard
        .writeText(
          this.shareDataFormatted
        )
    },
    notify () {
      setToast(
        {
          message: this.copiedMessage,
          icon: 'green check'
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

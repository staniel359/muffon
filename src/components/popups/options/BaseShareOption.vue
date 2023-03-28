<template>
  <BaseOption
    icon="share"
    :text="shareText"
    @click="handleClick"
  />
</template>

<script>
import {
  AES
} from 'crypto-js'
import BaseOption from './BaseOption.vue'
import {
  shareEncryptionKey
} from '@/helpers/data/env'
import notificationMixin from '@/mixins/notificationMixin'

export default {
  name: 'BaseShareOption',
  components: {
    BaseOption
  },
  mixins: [
    notificationMixin
  ],
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
        shareEncryptionKey
      ).toString()
    },
    shareDataString () {
      return JSON.stringify(
        this.shareData
      )
    },
    notificationSuccessMessage () {
      return this.$t(
        'notifications.copied'
      )
    }
  },
  methods: {
    handleClick () {
      this.copyToClipboard()

      this.notifySuccess()
    },
    copyToClipboard () {
      navigator
        .clipboard
        .writeText(
          this.shareDataFormatted
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>

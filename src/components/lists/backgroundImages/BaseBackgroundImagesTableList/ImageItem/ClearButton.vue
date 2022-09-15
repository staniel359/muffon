<template>
  <BaseClearButton
    class="main-image-clear-button"
    @click="handleClick"
  />
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import BaseClearButton from '*/components/buttons/BaseClearButton.vue'
import deleteBackgroundImage
  from '*/helpers/actions/api/backgroundImage/delete'

export default {
  name: 'ClearButton',
  components: {
    BaseClearButton
  },
  props: {
    imageId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isSuccess: false
    }
  },
  computed: {
    deleteArgs () {
      return {
        imageId: this.imageId
      }
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    deleteBackgroundImage,
    handleClick () {
      this.deleteBackgroundImage(
        this.deleteArgs
      )
    },
    handleIsSuccessChange (
      value
    ) {
      if (value) {
        ipcRenderer.send(
          'delete-background-image',
          {
            imageId: this.imageId
          }
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>

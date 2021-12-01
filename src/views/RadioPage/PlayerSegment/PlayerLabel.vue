<template>
  <BaseLabel
    class="large"
    :icon="icon"
    :text="text"
  />
</template>

<script>
import BaseLabel from '@/BaseLabel.vue'

export default {
  name: 'PlayerLabel',
  components: {
    BaseLabel
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    modelName: {
      type: String,
      required: true
    },
    modelScope: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      icons: {
        tag: 'tag',
        artist: 'microphone alternate'
      }
    }
  },
  computed: {
    icon () {
      return this.icons[
        this.scope
      ]
    },
    text () {
      return this.$t(
        `layout.navigation.model.${this.modelScope}`,
        { modelName: this.modelName }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

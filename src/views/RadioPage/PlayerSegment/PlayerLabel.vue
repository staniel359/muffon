<template>
  <BaseLabel
    class="large"
    :icon="icon"
    :text="text"
  />
</template>

<script>
import BaseLabel from '*/components/BaseLabel.vue'

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
    modelScope: {
      type: String,
      required: true
    },
    modelName: String
  },
  data () {
    return {
      icons: {
        top: 'arrow alternate circle up',
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
      if (this.scope === 'top') {
        return this.$t(
          `navigation.topCollection.${this.modelScope}`
        )
      } else {
        return this.$t(
          `navigation.model.${this.modelScope}`,
          {
            modelName: this.modelName
          }
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>

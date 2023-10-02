<template>
  <div class="middle-aligned">
    <Component
      :is="inputComponent"
      ref="input"
      :[scope]="collection"
    />

    <BaseClearButton
      v-if="collection.length"
      @click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import ArtistsInput from './SearchBlock/ArtistsInput.vue'
import TagsInput from './SearchBlock/TagsInput.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'

export default {
  name: 'SearchBlock',
  components: {
    ArtistsInput,
    TagsInput,
    BaseClearButton
  },
  inject: [
    'clearCollection'
  ],
  props: {
    scope: {
      type: String,
      required: true
    },
    collection: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      inputComponents: {
        artists: 'ArtistsInput',
        tags: 'TagsInput'
      }
    }
  },
  computed: {
    inputComponent () {
      return this.inputComponents[
        this.scope
      ]
    }
  },
  methods: {
    handleClearButtonClick () {
      this.clearCollection()

      this.clearInput()

      this.focusInput()
    },
    clearInput () {
      this.$refs
        .input
        .clear()
    },
    focusInput () {
      this.$refs
        .input
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>

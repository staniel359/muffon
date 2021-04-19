<template>
  <div class="ui large labels">
    <TagItem
      v-for="(tagName, index) in tags"
      :key="index"
      :tagName="tagName"
    />

    <a
      v-if="isRenderMore"
      class="ui label"
      @click="handleViewMoreClick"
    >
      ...
    </a>
  </div>
</template>

<script>
import TagItem from './BaseTagsList/TagItem.vue'

export default {
  name: 'BaseTagsList',
  components: {
    TagItem
  },
  props: {
    tags: {
      type: Array,
      default () {
        return []
      }
    },
    isMore: Boolean
  },
  emits: [
    'viewMore'
  ],
  computed: {
    isRenderMore () {
      return this.isMore && this.tags.length
    }
  },
  methods: {
    handleViewMoreClick () {
      this.$emit('viewMore')
    }
  }
}
</script>

<style lang="sass" scoped></style>

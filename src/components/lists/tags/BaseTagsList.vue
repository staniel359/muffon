<template>
  <div class="ui large labels tags-list">
    <TagItem
      v-for="(tagData, index) in tags"
      :key="index"
      :tagName="tagData.name"
    />

    <BaseLabelLinkContainer
      v-if="isRenderMore"
      @click="handleViewMoreClick"
    >
      <span class="link">
        ...
      </span>
    </BaseLabelLinkContainer>
  </div>
</template>

<script>
import TagItem from './BaseTagsList/TagItem.vue'
import BaseLabelLinkContainer from '@/containers/BaseLabelLinkContainer.vue'

export default {
  name: 'BaseTagsList',
  components: {
    TagItem,
    BaseLabelLinkContainer
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

<style lang="sass" scoped>
.tags-list
  @extend .d-inline
</style>

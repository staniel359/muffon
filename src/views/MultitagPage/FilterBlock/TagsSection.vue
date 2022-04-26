<template>
  <div class="tags-section">
    <div class="ui labels">
      <TagItem
        v-for="tagData in tags"
        :key="tagData.uuid"
        :tag-data="tagData"
        @delete-icon-click="handleDeleteIconClick"
      />
    </div>
  </div>
</template>

<script>
import TagItem from './TagsSection/TagItem.vue'

export default {
  name: 'TagsSection',
  components: {
    TagItem
  },
  inject: [
    'setTags'
  ],
  props: {
    tags: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    handleDeleteIconClick (
      {
        uuid
      }
    ) {
      function isMatchedTag (
        tagData
      ) {
        return (
          tagData.uuid !==
            uuid
        )
      }

      const tags = [
        ...this.tags.filter(
          isMatchedTag
        )
      ]

      this.setTags(
        tags
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.tags-section
  margin-top: 1em
</style>

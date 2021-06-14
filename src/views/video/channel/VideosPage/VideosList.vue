<template>
  <BaseVideosSimpleList
    class="videos-list"
    :videos="videos"
  />

  <template v-if="isPageable">
    <BaseDivider />

    <BaseSimplePagination
      :isWithPrevPage="!!prevPage"
      :isWithNextPage="!!nextPage"
      @prevPageButtonClick="handlePrevPageButtonClick"
      @nextPageButtonClick="handleNextPageButtonClick"
    />
  </template>
</template>

<script>
import BaseVideosSimpleList from '@/lists/videos/BaseVideosSimpleList.vue'
import BaseDivider from '@/BaseDivider.vue'
import BaseSimplePagination from '@/BaseSimplePagination.vue'

export default {
  name: 'VideosList',
  components: {
    BaseVideosSimpleList,
    BaseDivider,
    BaseSimplePagination
  },
  props: {
    channelData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'prevPageButtonClick',
    'nextPageButtonClick'
  ],
  computed: {
    videos () {
      return this.channelData.videos
    },
    isPageable () {
      return this.prevPage || this.nextPage
    },
    prevPage () {
      return this.channelData.prev_page
    },
    nextPage () {
      return this.channelData.next_page
    }
  },
  methods: {
    handlePrevPageButtonClick () {
      this.$emit(
        'prevPageButtonClick',
        this.prevPage
      )
    },
    handleNextPageButtonClick () {
      this.$emit(
        'nextPageButtonClick',
        this.nextPage
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.videos-list
  @extend .flex-full, .no-margin
</style>

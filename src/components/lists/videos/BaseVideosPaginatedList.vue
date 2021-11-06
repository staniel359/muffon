<template>
  <BaseError
    v-if="error"
    :error="error"
    @refresh="handleRefresh"
  />
  <template v-else>
    <BaseVideosSimpleList
      class="videos-list"
      :videos="videos"
      @linkClick="handleLinkClick"
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
</template>

<script>
import BaseError from '@/BaseError.vue'
import BaseVideosSimpleList from './BaseVideosSimpleList.vue'
import BaseDivider from '@/BaseDivider.vue'
import BaseSimplePagination from '@/BaseSimplePagination.vue'

export default {
  name: 'BaseVideosPaginatedList',
  components: {
    BaseError,
    BaseVideosSimpleList,
    BaseDivider,
    BaseSimplePagination
  },
  props: {
    videosData: {
      type: Object,
      required: true
    },
    error: Error,
    page: String
  },
  emits: [
    'prevPageButtonClick',
    'nextPageButtonClick',
    'focus',
    'linkClick',
    'refresh'
  ],
  data () {
    return {
      currentPage: null
    }
  },
  computed: {
    videos () {
      return this.videosData.videos
    },
    isPageable () {
      return (
        this.prevPage ||
          this.nextPage
      )
    },
    prevPage () {
      return this.videosData.prev_page
    },
    nextPage () {
      return this.videosData.next_page
    }
  },
  watch: {
    videos: 'handleVideosChange'
  },
  mounted () {
    this.currentPage = this.nextPage
  },
  methods: {
    handlePrevPageButtonClick () {
      this.currentPage = this.prevPage

      this.$emit(
        'prevPageButtonClick',
        this.prevPage
      )
    },
    handleNextPageButtonClick () {
      this.currentPage = this.nextPage

      this.$emit(
        'nextPageButtonClick',
        this.nextPage
      )
    },
    handleVideosChange () {
      this.$emit('focus')
    },
    handleLinkClick () {
      this.$emit('linkClick')
    },
    handleRefresh () {
      this.$emit(
        'refresh',
        this.currentPage
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.videos-list
  @extend .flex-full, .no-margin
</style>

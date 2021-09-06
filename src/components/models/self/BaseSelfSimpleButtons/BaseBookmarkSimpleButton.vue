<template>
  <div
    v-if="bookmarkId"
    ref="button"
    :data-content="popupTextFormatted"
  >
    <BaseLinkContainer :link="{}">
      <BaseButton
        class="basic circular compact tiny bookmark-simple-button"
        icon="bookmark primary"
        :class="{
          loading: isLoading,
          disabled: isLoading
        }"
        @click="handleClick"
      />
    </BaseLinkContainer>
  </div>
</template>

<script>
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseButton from '@/BaseButton.vue'
import deleteBookmarkData
  from '#/actions/api/profile/bookmarks/model/deleteData'
import { setPopup } from '#/actions/plugins/semantic'
import { popupOptions } from '#/data/plugins/semantic'

export default {
  name: 'BaseBookmarkSimpleButton',
  components: {
    BaseLinkContainer,
    BaseButton
  },
  props: {
    model: {
      type: String,
      required: true
    },
    modelId: String
  },
  data () {
    return {
      bookmarkId: null,
      isLoading: false
    }
  },
  computed: {
    popupTextFormatted () {
      return this.$t(
        'shared.bookmarks.delete'
      )
    }
  },
  mounted () {
    this.bookmarkId = this.modelId

    this.$nextTick(() => {
      setPopup(
        this.$refs.button,
        popupOptions()
      )
    })
  },
  methods: {
    handleClick () {
      return this.deleteBookmarkData({
        model: this.model,
        bookmarkId: this.bookmarkId
      }).then(this.handleSuccess)
    },
    handleSuccess () {
      this.bookmarkId = null
    },
    deleteBookmarkData
  }
}
</script>

<style lang="sass" scoped>
.bookmark-simple-button
  @extend .no-margin
</style>

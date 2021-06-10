<template>
  <div class="content">
    <BaseHeader
      class="link"
      tag="h4"
      :text="artistName"
    />

    <BaseArtistListenersCount
      v-if="isWithListenersCount"
      class="description"
      :artistName="artistName"
      :listenersCount="listenersCount"
      @loadEnd="handleListenersCountLoadEnd"
    />
  </div>
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'
import BaseArtistListenersCount
  from '@/models/artist/BaseArtistListenersCount.vue'

export default {
  name: 'InfoBlock',
  components: {
    BaseHeader,
    BaseArtistListenersCount
  },
  inject: [
    'findPaginationItem'
  ],
  props: {
    artistName: {
      type: String,
      required: true
    },
    listenersCount: Number,
    uuid: String,
    isWithListenersCount: Boolean
  },
  methods: {
    handleListenersCountLoadEnd (value) {
      this.findPaginationItem({
        uuid: this.uuid
      }).listeners_count = value
    }
  }
}
</script>

<style lang="sass" scoped>
.content
  @extend .no-padding
  margin-left: 10px
</style>

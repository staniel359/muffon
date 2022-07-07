<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="infiniteScrollText"
    />

    <BaseToggle
      :is-checked="isWithInfiniteScroll"
      @on="handleToggleOn"
      @off="handleToggleOff"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseToggle from '*/components/BaseToggle.vue'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export default {
  name: 'InfiniteScrollOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isWithInfiniteScroll'
      ]
    ),
    infiniteScrollText () {
      return this.$t(
        'settings.options.app.view.infiniteScroll'
      )
    }
  },
  methods: {
    handleToggleOn () {
      updateGlobalStore(
        {
          'layout.isWithInfiniteScroll': true
        }
      )
    },
    handleToggleOff () {
      updateGlobalStore(
        {
          'layout.isWithInfiniteScroll': false
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

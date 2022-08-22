<template>
  <div class="option">
    <BaseIcon
      icon="users"
    />

    <BaseHeader
      class="option-header"
      tag="h4"
      :text="communitiesText"
    />

    <BaseToggle
      store-key="sidebar.isWithCommunitiesItem"
      :is-checked="isWithCommunitiesItem"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseIcon from '*/components/BaseIcon.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseToggle from '*/components/BaseToggle.vue'

export default {
  name: 'CommunitiesOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'sidebar',
      [
        'isWithCommunitiesItem'
      ]
    ),
    communitiesText () {
      return this.$t(
        'navigation.communities'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

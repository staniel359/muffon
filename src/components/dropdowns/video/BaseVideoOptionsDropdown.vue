<template>
  <BaseOptionsDropdownContainer
    v-if="isRender"
  >
    <BaseShareOption
      v-if="isWithShareOption"
      :share-data="shareData"
    />
  </BaseOptionsDropdownContainer>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import BaseOptionsDropdownContainer
  from '@/components/containers/dropdowns/BaseOptionsDropdownContainer.vue'
import BaseShareOption
  from '@/components/dropdowns/options/BaseShareOption.vue'
import {
  video as formatVideoShareData
} from '@/helpers/formatters/share'

export default {
  name: 'BaseVideoOptionsDropdown',
  components: {
    BaseOptionsDropdownContainer,
    BaseShareOption
  },
  props: {
    videoData: Object,
    isWithShareOption: Boolean
  },
  computed: {
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
      }
    ),
    isRender () {
      return (
        this.profileId &&
          this.isWithProfileOptions
      )
    },
    isWithProfileOptions () {
      return (
        this.isWithShareOption
      )
    },
    shareData () {
      return formatVideoShareData(
        this.videoData
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

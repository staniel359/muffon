<template>
  <BaseListContainer
    class="user-info-section"
  >
    <div class="item main-simple-list-item">
      <BaseImage
        class="circular bordered"
        model="profile"
        :image="imageData?.small"
      />

      <div class="content">
        <BaseHeader
          tag="h4"
          :text="nickname"
        />

        <div class="description">
          <small
            v-text="playsTextFormatted"
          />
        </div>
      </div>
    </div>
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '@/components/containers/lists/BaseListContainer.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'UserInfoSection',
  components: {
    BaseListContainer,
    BaseImage,
    BaseHeader
  },
  props: {
    userData: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageData () {
      return this.userData.image
    },
    nickname () {
      return this.userData.nickname
    },
    playsTextFormatted () {
      return this.$tc(
        'counters.nominative.plays',
        this.playsCount,
        {
          count: this.playsCountFormatted
        }
      )
    },
    playsCount () {
      return this.userData.plays_count
    },
    playsCountFormatted () {
      return formatNumber(
        this.playsCount
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.user-info-section
  @extend .no-margin
  margin-top: 1em !important
</style>

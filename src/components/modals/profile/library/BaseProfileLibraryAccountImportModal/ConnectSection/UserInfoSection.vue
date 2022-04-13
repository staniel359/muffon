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

        <div class="description main-small-container">
          <small>
            <i class="play icon" />

            <span
              v-text="playsCountFomatted"
            />
          </small>
        </div>
      </div>
    </div>
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '*/components/containers/lists/BaseListContainer.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import {
  number as formatNumber
} from '*/helpers/formatters'

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
    playsCountFomatted () {
      return formatNumber(
        this.playsCount
      )
    },
    playsCount () {
      return this.userData.plays_count
    }
  }
}
</script>

<style lang="sass" scoped>
.user-info-section
  @extend .no-margin
  margin-top: 1em !important
</style>

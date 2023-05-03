<template>
  <BaseListContainer
    class="user-info-section"
  >
    <div class="item main-simple-list-item">
      <BaseImage
        class="circular"
        model="profile"
        :image="imageData?.small"
      />

      <div class="content">
        <BaseHeader
          tag="h4"
          :text="nickname"
        />

        <BaseListCounterSection
          class="description"
          icon="play"
          :count="playsCount"
        />
      </div>
    </div>
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '@/components/containers/lists/BaseListContainer.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseListCounterSection
  from '@/components/sections/BaseListCounterSection.vue'

export default {
  name: 'UserInfoSection',
  components: {
    BaseListContainer,
    BaseImage,
    BaseHeader,
    BaseListCounterSection
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

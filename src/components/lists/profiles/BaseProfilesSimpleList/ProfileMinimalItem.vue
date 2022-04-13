<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :link="profileMainLink"
  >
    <BaseImage
      class="small circular bordered"
      model="profile"
      :image="imageData?.extrasmall"
    />

    <div class="content">
      <div class="nickname-label-container">
        <BaseHeader
          tag="h4"
          class="link"
          :text="nickname"
        />
      </div>

      <div class="description">
        <small>
          <BaseProfileGenderAge
            :profile-data="profileData"
          />

          <BaseProfileCityCountry
            :profile-data="profileData"
          />
        </small>
      </div>
    </div>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseProfileGenderAge
  from '*/components/models/profile/BaseProfileGenderAge.vue'
import BaseProfileCityCountry
  from '*/components/models/profile/BaseProfileCityCountry.vue'
import {
  main as formatProfileMainLink
} from '*/helpers/formatters/links/profile'

export default {
  name: 'ProfileMinimalItem',
  components: {
    BaseLinkContainer,
    BaseImage,
    BaseHeader,
    BaseProfileGenderAge,
    BaseProfileCityCountry
  },
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  computed: {
    profileMainLink () {
      return formatProfileMainLink(
        {
          profileId: this.profileId
        }
      )
    },
    profileId () {
      return this.profileData.id.toString()
    },
    imageData () {
      return this.profileData.image
    },
    nickname () {
      return this.profileData.nickname
    }
  }
}
</script>

<style lang="sass" scoped>
.nickname-label-container
  @extend .d-flex, .align-items-center
</style>

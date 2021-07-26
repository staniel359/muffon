<template>
  <BaseProfilePageContainer
    :profileId="profileId"
  >
    <template #default="slotProps">
      <BaseSegmentContainer
        :class="[
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <InfoSection
          :profileData="slotProps.profileData"
        />

        <BaseDivider />
      </BaseSegmentContainer>
    </template>
  </BaseProfilePageContainer>
</template>

<script>
import BaseProfilePageContainer
  from '@/containers/profile/BaseProfilePageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import InfoSection from './MainPage/InfoSection.vue'
import BaseDivider from '@/BaseDivider.vue'

export default {
  name: 'MainPage',
  components: {
    BaseProfilePageContainer,
    BaseSegmentContainer,
    InfoSection,
    BaseDivider
  },
  props: {
    profileId: String
  },
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="sass" scoped></style>

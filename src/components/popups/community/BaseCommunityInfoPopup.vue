<template>
  <BaseSegmentContainer
    class="main-popup-content-container"
  >
    <div class="info-section">
      <div
        v-text="createdText"
      />

      <strong
        v-text="createdFormatted"
      />
    </div>

    <div class="info-section">
      <div
        v-text="creatorText"
      />

      <div class="main-bottom-extrasmall-section">
        <BaseProfilesSimpleList
          :profiles="profiles"
          is-minimal
        />
      </div>
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseProfilesSimpleList
  from '@/components/lists/profiles/BaseProfilesSimpleList.vue'
import {
  dateTime as formatDateTime
} from '@/helpers/formatters/dateTimeString'

export default {
  name: 'BaseCommunityInfoPopup',
  components: {
    BaseSegmentContainer,
    BaseProfilesSimpleList
  },
  props: {
    communityData: {
      type: Object,
      required: true
    }
  },
  computed: {
    createdText () {
      return this.$t(
        'created.community'
      )
    },
    createdFormatted () {
      return formatDateTime(
        this.created
      )
    },
    created () {
      return this.communityData.created
    },
    creatorText () {
      return this.$t(
        'roles.creator'
      )
    },
    profiles () {
      return [
        this.creatorData
      ]
    },
    creatorData () {
      return this.communityData.creator
    }
  }
}
</script>

<style lang="sass" scoped></style>

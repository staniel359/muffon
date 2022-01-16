<template>
  <BaseCommunityPageContainer
    :communityId="communityId"
  >
    <template #default="slotProps">
      <InfoSegment
        :communityData="slotProps.communityData"
      />
    </template>
  </BaseCommunityPageContainer>
</template>

<script>
import BaseCommunityPageContainer
  from '@/containers/pages/community/BaseCommunityPageContainer.vue'
import InfoSegment from './CommunityPage/InfoSegment.vue'

export default {
  name: 'CommunityPage',
  components: {
    BaseCommunityPageContainer,
    InfoSegment
  },
  props: {
    communityId: String
  },
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="sass" scoped></style>

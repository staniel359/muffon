<template>
  <BaseCommunityModalContainer
    ref="modal"
    :community-id="communityId"
    :scope="scope"
  >
    <template
      #default="slotProps"
    >
      <BaseDescriptionSection
        :description="slotProps[scope]"
      />
    </template>
  </BaseCommunityModalContainer>
</template>

<script>
import BaseCommunityModalContainer
  from '@/components/containers/modals/community/BaseCommunityModalContainer.vue'
import BaseDescriptionSection
  from '@/components/sections/BaseDescriptionSection.vue'

export default {
  name: 'BaseCommunityDescriptionModal',
  components: {
    BaseCommunityModalContainer,
    BaseDescriptionSection
  },
  props: {
    communityId: String
  },
  data () {
    return {
      scope: 'description'
    }
  },
  methods: {
    show () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>

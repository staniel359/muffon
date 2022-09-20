<template>
  <BaseSegmentContainer
    v-if="currentProfileId"
  >
    <BaseAccordionContainer
      :title="addPostText"
      @open="handleOpen"
    >
      <FormSection
        :key="key"
        :post-type="postType"
        :profile-id="profileId"
        :community-id="communityId"
        :is-with-as-community-option="isWithAsCommunityOption"
        @success="handleSuccess"
      />
    </BaseAccordionContainer>
  </BaseSegmentContainer>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseAccordionContainer
  from '@/components/containers/BaseAccordionContainer.vue'
import FormSection from './BasePostsFormSegment/FormSection.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BasePostsFormSegment',
  components: {
    BaseSegmentContainer,
    BaseAccordionContainer,
    FormSection
  },
  props: {
    postType: String,
    profileId: String,
    communityId: String,
    isWithAsCommunityOption: Boolean
  },
  emits: [
    'success'
  ],
  data () {
    return {
      key: null
    }
  },
  computed: {
    ...mapGetters(
      'profile',
      {
        currentProfileId: 'id'
      }
    ),
    addPostText () {
      return this.$t(
        'actions.addModel.post'
      )
    }
  },
  methods: {
    handleOpen () {
      this.key = generateKey()
    },
    handleSuccess () {
      this.$emit(
        'success'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

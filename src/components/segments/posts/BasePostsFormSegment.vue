<template>
  <BaseSegmentContainer
    v-if="currentProfileId"
    ref="segment"
    :is-change-transparency="false"
  >
    <BaseCreateButton
      model="post"
      :is-active="isShowForm"
      @click="handleCreateButtonClick"
    />

    <FormSection
      v-if="isShowForm"
      class="form-section"
      :post-type="postType"
      :profile-id="profileId"
      :community-id="communityId"
      :is-with-as-community-option="isWithAsCommunityOption"
      @success="handleSuccess"
    />
  </BaseSegmentContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseCreateButton from '@/components/buttons/BaseCreateButton.vue'
import FormSection from './BasePostsFormSegment/FormSection.vue'

export default {
  name: 'BasePostsFormSegment',
  components: {
    BaseSegmentContainer,
    BaseCreateButton,
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
      isShowForm: false
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        currentProfileId: 'id'
      }
    )
  },
  watch: {
    isShowForm: 'handleIsShowFormChange'
  },
  methods: {
    handleCreateButtonClick () {
      this.isShowForm = !this.isShowForm
    },
    handleIsShowFormChange (
      value
    ) {
      if (value) {
        this.focus()
      }
    },
    handleSuccess () {
      this.$emit(
        'success'
      )
    },
    focus () {
      this.$refs
        .segment
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped>
.form-section
  margin-top: 1em
</style>

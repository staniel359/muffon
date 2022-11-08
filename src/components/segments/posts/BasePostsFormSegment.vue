<template>
  <BaseSegmentContainer
    v-if="currentProfileId"
  >
    <BaseAddButton
      model="post"
      :is-active="isShowForm"
      @click="handleAddButtonClick"
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
  mapGetters
} from 'vuex'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseAddButton from '@/components/buttons/BaseAddButton.vue'
import FormSection from './BasePostsFormSegment/FormSection.vue'

export default {
  name: 'BasePostsFormSegment',
  components: {
    BaseSegmentContainer,
    BaseAddButton,
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
    ...mapGetters(
      'profile',
      {
        currentProfileId: 'id'
      }
    )
  },
  methods: {
    handleAddButtonClick () {
      this.isShowForm = !this.isShowForm
    },
    handleSuccess () {
      this.$emit(
        'success'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.form-section
  margin-top: 1em
</style>

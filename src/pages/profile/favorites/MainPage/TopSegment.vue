<template>
  <BaseSegmentContainer>
    <div class="main-page-top-section">
      <div class="section" />

      <div class="section">
        <div class="section-item">
          <BaseFavoritesOptionsPopup
            is-with-add-option
          />
        </div>
      </div>
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseFavoritesOptionsPopup
  from '@/components/popups/favorites/BaseFavoritesOptionsPopup.vue'

export default {
  name: 'TopSegment',
  components: {
    BaseSegmentContainer,
    BaseFavoritesOptionsPopup
  }
}
</script>

<style lang="sass" scoped></style>

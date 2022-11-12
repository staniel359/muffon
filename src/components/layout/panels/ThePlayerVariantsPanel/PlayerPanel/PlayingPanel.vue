<template>
  <div class="track-panel">
    <BaseListContainer
      class="track-container"
    >
      <PlayingBlock />
    </BaseListContainer>
  </div>
</template>

<script>
import BaseListContainer
  from '@/components/containers/lists/BaseListContainer.vue'
import PlayingBlock from './PlayingPanel/PlayingBlock.vue'

export default {
  name: 'PlayingPanel',
  components: {
    BaseListContainer,
    PlayingBlock
  }
}
</script>

<style lang="sass" scoped>
.track-panel
  @extend .d-flex, .align-items-center
  width: 230px

.track-container
  @extend .w-100
</style>

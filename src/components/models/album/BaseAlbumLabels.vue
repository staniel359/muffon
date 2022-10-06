<template>
  <div
    v-if="labels"
  >
    <div class="ui labels">
      <BaseIcon
        class="labels-icon"
        icon="record vinyl"
      />

      <BaseLabel
        v-for="(label, index) in labels"
        :key="index"
        class="basic large circular"
        :text="label"
      />
    </div>
  </div>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue'
import BaseLabel from '@/components/BaseLabel.vue'

export default {
  name: 'BaseAlbumLabels',
  components: {
    BaseIcon,
    BaseLabel
  },
  props: {
    albumData: {
      type: Object,
      required: true
    }
  },
  computed: {
    labels () {
      return this.albumData.labels
    }
  }
}
</script>

<style lang="sass" scoped>
.labels-icon
  margin-right: 0.5em
</style>

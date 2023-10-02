<template>
  <div
    v-if="labels"
  >
    <div class="ui labels">
      <BaseIcon
        class="main-left-small-icon"
        icon="label"
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
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseLabel from '@/components/labels/BaseLabel.vue'

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

<style lang="sass" scoped></style>

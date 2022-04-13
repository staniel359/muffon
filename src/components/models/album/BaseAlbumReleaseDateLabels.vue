<template>
  <div class="ui labels large">
    <BaseLabel
      v-if="releaseDate"
      icon="calendar outline"
      :text="releaseDate"
    />

    <template v-if="labels">
      <BaseLabel
        v-for="labelData in labelsCollection"
        :key="labelData.uuid"
        :text="labelData.name"
      />
    </template>
  </div>
</template>

<script>
import BaseLabel from '*/components/BaseLabel.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'

export default {
  name: 'BaseAlbumReleaseDateLabels',
  components: {
    BaseLabel
  },
  props: {
    releaseDate: String,
    labels: Array
  },
  computed: {
    labelsCollection () {
      return formatCollection(
        this.labels
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

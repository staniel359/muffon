<template>
  <BaseLibraryOption
    action="show"
    :link="link"
    @click="handleClick"
  />
</template>

<script>
import {
  mapGetters
} from 'vuex'
import BaseLibraryOption
  from '@/components/dropdowns/options/library/BaseLibraryOption.vue'
import {
  main as formatProfileLibraryTrackMainLink
} from '@/helpers/formatters/links/profile/library/track'

export default {
  name: 'LinkOption',
  components: {
    BaseLibraryOption
  },
  props: {
    libraryId: {
      type: String,
      required: true
    }
  },
  emits: [
    'click'
  ],
  computed: {
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
      }
    ),
    link () {
      return formatProfileLibraryTrackMainLink(
        {
          profileId: this.profileId,
          libraryTrackId: this.libraryId
        }
      )
    }
  },
  methods: {
    handleClick () {
      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

<template>
  <BaseIcon
    v-if="isLoading"
    is-loading
  />
  <BaseListCounterSection
    v-else-if="responseListenersCount"
    icon="listener"
    :count="responseListenersCount"
  />
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseListCounterSection
  from '@/components/sections/BaseListCounterSection.vue'
import getArtist from '@/helpers/actions/api/artist/get'

export default {
  name: 'BaseArtistListenersCount',
  components: {
    BaseIcon,
    BaseListCounterSection
  },
  props: {
    artistName: {
      type: String,
      required: true
    },
    listenersCount: Number
  },
  emits: [
    'loadEnd'
  ],
  data () {
    return {
      artistData: null,
      isLoading: false,
      scope: 'listeners_count'
    }
  },
  computed: {
    responseListenersCount () {
      return (
        this.listenersCount ||
          this.artistListenersCount ||
          0
      )
    },
    artistListenersCount () {
      return this.artistData?.listeners_count
    },
    artistArgs () {
      return {
        artistName: this.artistName,
        scope: this.scope
      }
    }
  },
  watch: {
    responseListenersCount:
      'handleResponseListenersCountChange'
  },
  mounted () {
    if (!this.listenersCount) {
      this.getData()
    }
  },
  methods: {
    getArtist,
    handleResponseListenersCountChange (
      value
    ) {
      this.$emit(
        'loadEnd',
        value
      )
    },
    getData () {
      this.getArtist(
        this.artistArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

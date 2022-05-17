import collectionMixin from './collectionMixin'

export default {
  mixins: [
    collectionMixin
  ],
  provide () {
    return {
      addEmoji: this.addEmoji
    }
  },
  data () {
    return {
      images: [],
      artists: [],
      albums: [],
      tracks: []
    }
  },
  methods: {
    addEmoji (
      value
    ) {
      this.updateContentValue(
        value
      )
    },
    updateContentValue (
      value
    ) {
      this.$refs
        .content
        .updateValue(
          value
        )
    }
  }
}

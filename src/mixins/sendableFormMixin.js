import {
  generateKey
} from '*/helpers/utils'

export default {
  provide () {
    return {
      addModel: this.addModel,
      deleteModel: this.deleteModel,
      resetCollection: this.resetCollection,
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
    addModel (
      {
        model,
        scope
      }
    ) {
      const modelFormatted = {
        uuid: generateKey(),
        ...model
      }

      this[scope] = [
        ...this[scope],
        modelFormatted
      ]
    },
    deleteModel (
      {
        uuid,
        scope
      }
    ) {
      function isMatchedModel (
        modelData
      ) {
        return modelData.uuid !== uuid
      }

      this[scope] = [
        ...this[scope].filter(
          isMatchedModel
        )
      ]
    },
    resetCollection (
      scope
    ) {
      this[scope] = []
    },
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

import {
  generateKey
} from '*/helpers/utils'

export default {
  provide () {
    return {
      addCollectionItem:
        this.addCollectionItem,
      deleteCollectionItem:
        this.deleteCollectionItem,
      resetCollection:
        this.resetCollection
    }
  },
  methods: {
    addCollectionItem (
      {
        collection,
        item
      }
    ) {
      const itemFormatted = {
        uuid: generateKey(),
        ...item
      }

      this[collection] = [
        ...this[collection],
        itemFormatted
      ]
    },
    deleteCollectionItem (
      {
        collection,
        uuid
      }
    ) {
      function isMatchedItem (
        itemData
      ) {
        return itemData.uuid !== uuid
      }

      this[collection] = [
        ...this[collection].filter(
          isMatchedItem
        )
      ]
    },
    resetCollection (
      collection
    ) {
      this[collection] = []
    }
  }
}

import {
  generateKey
} from '@/helpers/utils'

export default {
  provide () {
    return {
      addCollectionItem:
        this.addCollectionItem,
      updateCollectionItem:
        this.updateCollectionItem,
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
    updateCollectionItem (
      {
        collection,
        uuid,
        data
      }
    ) {
      function isMatchedItem (
        itemData
      ) {
        return itemData.uuid === uuid
      }

      const collectionItem =
        this[collection].find(
          isMatchedItem
        )

      if (!collectionItem) { return }

      Object.assign(
        collectionItem,
        data
      )
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

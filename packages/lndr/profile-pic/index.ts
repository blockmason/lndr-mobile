// import FetchUtil from 'lndr/fetch-util'

// const fetchUtil = new FetchUtil(fetch)

import RNFetchBlob from 'react-native-fetch-blob'

const fs = RNFetchBlob.fs

let imagePath = null

const tempStorage = {
  pics: {}
}

function isBlank(imageData: string) {
  return imageData.length === 324
}

declare const Buffer

export default {
  get: addr => {
    if (tempStorage.pics[addr] !== undefined) {
      return tempStorage.pics[addr]
    }
    
    return RNFetchBlob
    .config({
      fileCache : true 
    })
    .fetch('GET', `https://s3-us-west-2.amazonaws.com/lndr-avatars/${addr}.jpeg`)
    // the image is now dowloaded to device's storage
    .then((resp) => {
      imagePath = resp.path()
      return resp.readFile('base64')
    })
    .then((base64Data) => {
      fs.unlink(imagePath)
      if(isBlank(base64Data)) {
        throw new Error('Blank Image')
      }
      return `data:image/jpg;base64,${base64Data}`
    })

    // return tempStorage.pics[addr] = fetchUtil.fetch(`https://s3-us-west-2.amazonaws.com/lndr-avatars/${addr}.jpeg`).then( data => {
    //   console.log('2 GOT THE DATA', data)
    //   // const buffer = Buffer.from(data._bodyText, 'base64')
    //   // const base64ImageData = buffer.toString('base64')
    //   return 
    // })
  },

  clear: addr => {
    delete tempStorage.pics[addr]
  }
}

import AWS from 'aws-sdk'
import RNFetchBlog from 'react-native-fetch-blob'
import ImageResizer from 'react-native-image-resizer'

declare const Buffer

const region = 'us-east-2'

// AWS.config = new AWS.Config({
//   accessKeyId: Config.AWS_ACCESS_KEY_ID, 
//   secretAccessKey: 'tYa6gOwZ+WF9dGcz0m9kTXTOtouOzHb5rr3GR2fu', 
//   region
// })

const Bucket = 'lndr-profile-pics'
const s3 = new AWS.S3( { params: { Bucket } } )

export default {
  get: nickname => {
    return new Promise( (resolve, reject) => {
      s3.getObject( { Bucket, Key: `test/${nickname}.jpg` }, (err, data) => {
        if (err) {
          reject(err)
        } else {
          const buffer = Buffer.from(data.Body)
          const base64ImageData = buffer.toString('base64')
          resolve(`data:image/jpg;base64,${base64ImageData}`)
        }
      })
    })
  },

  set: async (nickname, imageURI) => {
    const IMAGE_TARGET_SIZE = 150
    const resizedImageResponse = await ImageResizer.createResizedImage(imageURI, IMAGE_TARGET_SIZE, IMAGE_TARGET_SIZE, "JPEG", 100, 0)
    const imageData = await RNFetchBlog.fs.readFile(resizedImageResponse.uri, 'base64')
    const base64buffer = new Buffer(imageData, 'base64')
    const data = { 
      Bucket, 
        Key: `test/${nickname}.jpg`, 
        Body: base64buffer
    }

    return new Promise( (resolve, reject) => {
      s3.upload(data, function(err, data){
        if (err) {
          console.log('ERROR UPLOADING PROFILE PIC: ', nickname, err)
          reject(err)
        } else {
          console.log('UPLOADED PROFILE PIC', data)
            resolve(`data:image/jpg;base64,${imageData}`)
        }
      })
    })
  }
}

export default class KYC {
  email: string
  externalUserId: string
  identitySignature: string
  info: any
  requiredIdDocs: any
  idDocs: any

  constructor(data) {
    const { firstName, lastName, dob, street, phone, city, state, postCode, country, governmentPhoto, selfiePhoto, addressPhoto, 
      governmentPhotoType, addressPhotoType, email, address } = data
    
    this.email = email
    this.externalUserId = address.replace('0x', '')
    this.identitySignature = ''

    this.info = {
      country, firstName, middleName: "", lastName, phone, dob, nationality: country,
      addresses: [
        { street, flatNumber: '', town: city, state, postCode, country }	
      ]
    }

    this.requiredIdDocs = {
      country,
      docSets: [ 
        {
          idDocSetType: "IDENTITY",
          types: [ "PASSPORT", "ID_CARD", "DRIVERS" ],
          subTypes: []
        }, {
          idDocSetType: "SELFIE",
          types: [ "SELFIE" ],
          subTypes: []
        },
        {
          idDocSetType: "PROOF_OF_RESIDENCE",
          types: ["UTILITY_BILL"],
          subTypes: []
        }
      ]
    },

    this.idDocs = [
      { country, idDocType: governmentPhotoType, file: governmentPhoto.slice(27) },
      { country, idDocType: "SELFIE", file: selfiePhoto.slice(27) },
      { country, idDocType: addressPhotoType, file: addressPhoto.slice(27) },
    ]
  }

  setIdentitySignature(signature) {
    this.identitySignature = signature
  }
}

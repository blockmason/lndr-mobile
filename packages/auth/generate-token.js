const jwt = require('jsonwebtoken');

const { Buffer } = require('buffer');
const crypto = require('crypto');
const SHA3 = require('sha3');

const PEM = {
  encodePrivateKey: (keyPair) => {
    return `-----BEGIN PRIVATE KEY-----
${Buffer.from(`308184020100301006072a8648ce3d020106052b8104000a046d306b0201010420${keyPair.getPrivateKey('hex')}a144034200${keyPair.getPublicKey('hex')}`, 'hex').toString('base64')}
-----END PRIVATE KEY-----`;
  },
  encodePublicKey: (keyPair) => {
    return `-----BEGIN PUBLIC KEY-----
${Buffer.from(`3056301006072a8648ce3d020106052b8104000a034200${keyPair.getPublicKey('hex')}`, 'hex').toString('base64')}
-----END PUBLIC KEY-----`;
  }
};

const keyPair = crypto.createECDH('secp256k1');

keyPair.generateKeys();

const publicKeyBuffer = Buffer.from(keyPair.getPublicKey('hex').substring(2), 'hex');
const publicKeyHash = new SHA3.SHA3Hash(256).update(publicKeyBuffer).digest('hex');
const address = `0x${publicKeyHash.substring(publicKeyHash.length - 40)}`;

const token = jwt.sign({
  pub: keyPair.getPublicKey('base64')
}, PEM.encodePrivateKey(keyPair), {
  algorithm: 'ES256',
  audience: 'https://friends.blockmason.app',
  issuer: keyPair.getPublicKey('base64'),
  subject: address
});

console.log(token, address);

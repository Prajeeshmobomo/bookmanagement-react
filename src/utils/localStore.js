import SimpleCryptoJS from 'simple-crypto-js';

const localStore = localStorage;
const encipher = '3rh-6nc!p4ER';
let simpleCrypto = new SimpleCryptoJS(encipher);

const setData = (key, value) => {
  if(value) localStore.setItem(key, simpleCrypto.encrypt(value));
};

const getData = (key) => {
  let cipherText = localStore.getItem(key);
  if(!cipherText) return null;
  return simpleCrypto.decrypt(cipherText);
};

const removeData = (key) => {
  localStore.removeItem(key)
};

const setDataObject = (key, object) => {
  localStore.setItem(key, simpleCrypto.encryptObject(object));
};

const getDataObject = (key) => {
  let cipherText = localStore.getItem(key);
  if(!cipherText) return null;
  return simpleCrypto.decryptObject(cipherText);
};

const getAllItem = () => {
  return localStore;
};

const removeAll = () => {
  localStore.clear();
};

export default {
  setData,
  getData,
  setDataObject,
  getDataObject,
  removeData,
  getAllItem,
  removeAll
};

import CryptoJS from 'crypto-js';

export default {
  encrypt(word: any, keyStr: string) {
    // 加密
    // aes加密需要的key值 默认值为'honghua123456789'，如果需要可以更改
    const key = CryptoJS.enc.Utf8.parse('honghua123456789');
    // 需要加密的字符串 注：对象转化为json字符串再加密} word
    // console.log(word);
    // console.log(JSON.stringify(word));
    const srcs = CryptoJS.enc.Utf8.parse(JSON.stringify(word));

    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }); // 加密模式为ECB，补码方式为PKCS5Padding（也就是PKCS7）

    return encrypted.toString();
  },

  decrypt(word: any, keyStr: string) {
    // 解密

    const key = CryptoJS.enc.Utf8.parse('honghua123456789');

    const decrypt = CryptoJS.AES.decrypt(word, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    return JSON.parse(CryptoJS.enc.Utf8.stringify(decrypt).toString()); // 将解密后的字符串转化为json对象返回
  },
};

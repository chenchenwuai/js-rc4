import _ from 'lodash';

class RC4 {
    constructor(key) {
        this.VERSION = '1.0.0';

        this._Sbox = []; // Sbox 状态盒子
        this._is_inited = false; // 是否已经初始化
        this._Sbox_index_i = 0;
        this._Sbox_index_j = 0;

        try {
            if (key === null || key === undefined) {
                throw 'Key is an illegal format.';
            }
            if (_.isString(key)) {
                let j = 0;
                for (let i = 0; i < 256; i++) {
                    this._Sbox[i] = i;
                    j = (j + i + key.charCodeAt(i % key.length)) % 256;
                    [this._Sbox[i], this._Sbox[j]] = [this._Sbox[j], this._Sbox[i]];
                }
                this._is_inited = true;
                console.log('Rc4 init end');
            } else if (_.isBuffer(key)) {
                throw 'Buffer type key is not supported at this time.';
            } else {
                throw 'Key is an illegal format.';
            }
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * 数据的加解密
     * 加密
     * @params type array (原始字符串对每个字符转换为 ascii码 组成的数组)
     * @return type array
     */
    crypt(crypt_data) {
        try {
            if (this._is_inited !== true) {
                throw 'Rc4 is not init.';
            }
            if (_.isArray(crypt_data)) {
                for (let k = 0; k < crypt_data.length; k++) {
                    this._Sbox_index_i = (this._Sbox_index_i + 1) % 256;
                    this._Sbox_index_j = (this._Sbox_index_j + this._Sbox[this._Sbox_index_i]) % 256;
                    [this._Sbox[this._Sbox_index_i], this._Sbox[this._Sbox_index_j]] = [this._Sbox[this._Sbox_index_j], this._Sbox[this._Sbox_index_i]];
                    let t = (this._Sbox[this._Sbox_index_i] + this._Sbox[this._Sbox_index_j]) % 256;
                    crypt_data[k] = crypt_data[k] ^ this._Sbox[t];
                    t = null;
                }
                return crypt_data;
            } else if (_.isBuffer(crypt_data)) {
                throw 'Buffer type is not supported at this time.';
            } else {
                throw 'Crypt data is an illegal format.';
            }
        } catch (e) {
            console.error(e);
        }
    }
}
export default RC4;
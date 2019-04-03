function RC4() {

    var Sbox = []; // Sbox 状态盒子
    var init_state = false; // 是否已经初始化
    var s_index_i = 0, s_index_j = 0;
    // 初始化 Sbox 每次实例化只执行一次init。
    this.init = function (key) {
        if (!key || typeof key !== 'string') {
            console.error('rc4 key is illegal');
            return false;
        }
        for (var i = 0; i < 256; i++) {
            Sbox[i] = i;
        }
        var j = 0;
        for (var i = 0; i < 256; i++) {
            j = (j + Sbox[i] + key.charCodeAt(i % key.length)) % 256;
            var tmp = Sbox[i]; Sbox[i] = Sbox[j]; Sbox[j] = tmp;  
        }
        init_state = true;
        console.log('rc4 init end');
        return true;
    }

    /**
     * 数据的加解密
     * 加密
     * @params type array (字符串，对每个字符转换为 ascii码 组成数组)
     * @return type array
     */
    this.crypt = function (crypt_data) {
        if (!init_state) {
            console.error('Not RC4 Init');
            return false;
        }
        for (var k = 0; k < crypt_data.length; k++) {
            s_index_i = (s_index_i + 1) % 256;
            s_index_j = (s_index_j + Sbox[s_index_i]) % 256;

            var tmp = Sbox[s_index_i];
            Sbox[s_index_i] = Sbox[s_index_j];      //交换s[i]和s[j]
            Sbox[s_index_j] = tmp;
            
            var t = (Sbox[s_index_i] + Sbox[s_index_j]) % 256;
            crypt_data[k] = crypt_data[k] ^ Sbox[t];
        }
        return crypt_data;
    }
}
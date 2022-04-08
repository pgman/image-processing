class Utility {
    static async loadImageAsync(path) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = path;            
            img.addEventListener('load', () => {
                resolve(img);
            });
        });        
    }    
    static copyImageData(src) {
        return new ImageData(new Uint8ClampedArray(src.data), src.width, src.height);
    }
    /**
     * ImageDataを作成する
     * @param {number} width ImageDataの幅
     * @param {number} height ImageDataの高さ
     * @returns {ImageData} 生成されたImageData
     */
    static createImageData(width = 150, height = 150) {
        return new ImageData(width, height);
    }
    /**
     * <img>オブジェクトからImageDataを作成する
     * @param {Image} img <img>オブジェクト 
     * @returns {ImageData} 生成されたImageData
     */
    static createImageDataByImage(img) {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    /**
     * 2つのImageDataを比較する
     * @param {ImageData} src 比較するImageData 
     * @param {ImageData} dst 比較するImageData
     * @return {number} 0:等しい, -1: 幅または長さが一致しない, -2: 色の一致しない画素が存在する
     */
    static compareImageDatas(src, dst) {
        if(src.width !== dst.width || src.height !== dst.height) {
            return -1;
        }
        for(let i = 0; i < src.data.length; i += 1) {
            if(src.data[i] !== dst.data[i]) { return -2; }
        }
        return 0;
    }
}
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
    static copyImageData(srcImgData) {
        const dstImgData = new ImageData(new Uint8ClampedArray(srcImgData.data), 
                   srcImgData.width, srcImgData.height);
        return dstImgData;
    }
}
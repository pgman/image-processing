// まだ修正していない
class Sepia {
    static convert(srcImgData) {
        const dstImgData = Utility.copyImageData(srcImgData);
        const data = dstImgData.data;
        for(let i = 0; i < data.length; i += 4) {
            const[r, g, b] = [ data[i], data[i + 1], data[i + 2] ];
            const gray = r *  0.3 + g * 0.59 + b * 0.11;
            [ data[i], data[i + 1], data[i + 2] ] = [ gray, gray, gray ];
        }  
        return dstImgData;
    }
}
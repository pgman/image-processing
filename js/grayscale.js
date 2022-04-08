/**
 * グレースケール化
 */
class Grayscale {
    /**
     * グレースケール化
     * @param {ImageData} src 変換前のImageData 
     * @returns {ImageData} 変換後のImageData
     */
    static convert(src) {
        const dst = new ImageData(src.width, src.height);
        for(let i = 0; i < dst.data.length; i += 4) {
            const[r, g, b] = [ src.data[i], src.data[i + 1], src.data[i + 2] ];
            const gray = r *  0.3 + g * 0.59 + b * 0.11;
            [ dst.data[i], dst.data[i + 1], dst.data[i + 2], dst.data[i + 3] ] = [ gray, gray, gray, src.data[i + 3] ];
        }  
        return dst;
    }
}
/**
 * 2値化(閾値指定)
 */
class Binarization {
    /**
     * 2値化(閾値指定)
     * @param {ImageData} src 変換前のImageData
     * @param {number} threshold 閾値(0～255)
     * @returns {ImageData} 変換後のImageData
     */
    static convert(src, threshold = 128) {
        const dst = new ImageData(src.width, src.height);
        for(let i = 0; i < dst.data.length; i += 4) {
            if(src.data[i] < threshold) {
                [ dst.data[i], dst.data[i + 1], dst.data[i + 2], dst.data[i + 3] ]
                = [ 0, 0, 0, src.data[i + 3] ];
            } else {
                [ dst.data[i], dst.data[i + 1], dst.data[i + 2], dst.data[i + 3] ]
                = [ 255, 255, 255, src.data[i + 3] ];
            }
        }
        return dst;
    }
}
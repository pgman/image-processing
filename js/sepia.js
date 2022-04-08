/**
 * セピア調に加工
 */
class Sepia {
    /**
     * セピア調に加工
     * @param {ImageData} src 変換前のImageData 
     * @returns {ImageData} 変換後の ImageData
     */
    static convert(src) {
        const dst = new ImageData(src.width, src.height);
        for(let i = 0; i < dst.data.length; i += 4) {
            const [r, g, b] = [ src.data[i], src.data[i + 1], src.data[i + 2] ];
            const color = r * 0.298912 + g * 0.586611 + b * 0.114478;
            [ dst.data[i], dst.data[i + 1], dst.data[i + 2], dst.data[i + 3] ] 
            = [ Math.round(color * 240 / 255), Math.round(color * 200 / 255), Math.round(color * 145 / 255), src.data[i + 3] ];
        }  
        return dst;
    }
}
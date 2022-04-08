/**
 * モザイク処理
 */
class Mosaic {
    /**
     * モザイク処理
     * @param {ImageData} src 変換前のImageData
     * @param {number} mosaicWidth モザイクの横幅(1以上の整数)
     * @param {number} mosaicHeight モザイクの縦幅(1以上の整数)
     * @returns {ImageData} 変換後のImageData
     */
    static convert(src, mosaicWidth = 8, mosaicHeight = 8) {
        const dst = new ImageData(src.width, src.height);
        const imgWidth = dst.width;
        const imgHeight = dst.height;
         
        // モザイクサイズが m×n の場合、m×n毎に処理する
        for(let x = 0; x < imgWidth; x += mosaicWidth) {
            let w;
            if(mosaicWidth <= imgWidth - x) { w = mosaicWidth; }
            else                            { w = imgWidth - x; }
        
            for(let y = 0; y < imgHeight; y += mosaicHeight) {
                let h;
                if(mosaicHeight <= imgHeight - y) { h = mosaicHeight; }
                else                              { h = imgHeight - y; }
                
                // モザイクの色を計算する
                let [r, g, b] = [0, 0, 0];
                for(let i = 0; i < w; i += 1) {
                    for(let j = 0; j < h; j += 1) {
                        const index = ((y + j) * imgWidth + (x + i)) * 4; // ピクセルのインデックスを取得
                        r += src.data[index];
                        g += src.data[index + 1];
                        b += src.data[index + 2];
                    }
                }
                    
                // 平均を取る
                const count = w * h; // モザイクのピクセル数            
                [r, g, b] = [Math.round(r / count), Math.round(g / count), Math.round(b / count)];
                
                // モザイクをかける            
                for(let i = 0; i < w ;i += 1) {
                    for(let j = 0; j < h; j += 1) {
                        const index = ((y + j) * imgWidth + (x + i)) * 4; // ピクセルのインデックスを取得
                        [ dst.data[index], dst.data[index + 1], dst.data[index + 2], dst.data[index + 3] ] 
                        = [ r, g, b, src.data[index + 3] ];
                    }
                }
            }
        }
        return dst;
    }
}
class Mosaic {
    static convert(srcImgData, mosaicWidth = 8, mosaicHeight = 8) {
        const dstImgData = Utility.copyImageData(srcImgData);     
        const srcData = srcImgData.data;
        const dstData = dstImgData.data;
        const imgWidth = srcImgData.width;
        const imgHeight = srcImgData.height;
         
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
                        const pixelIndex = ((y + j) * imgWidth + (x + i)) * 4; // ピクセルのインデックスを取得
                        r += srcData[pixelIndex];
                        g += srcData[pixelIndex + 1];
                        b += srcData[pixelIndex + 2];
                    }
                }
                    
                // 平均を取る
                const pixelCount = w * h; // モザイクのピクセル数            
                r = Math.round(r / pixelCount);
                g = Math.round(g / pixelCount);
                b = Math.round(b / pixelCount);
                
                // モザイクをかける            
                for(let i = 0; i < w ;i += 1) {
                    for(let j = 0; j < h; j += 1) {
                        const pixelIndex = ((y + j) * imgWidth + (x + i)) * 4; // ピクセルのインデックスを取得
                        dstData[pixelIndex] = r;
                        dstData[pixelIndex + 1] = g;
                        dstData[pixelIndex + 2] = b;
                        dstData[pixelIndex + 3] = srcData[pixelIndex + 3]; // アルファ値はそのままコピー
                    }
                }
            }
        }
        return dstImgData;
    }
}
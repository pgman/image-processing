/**
 * 細線化(2値化されていることが前提) - Zhang-Suenの細線化アルゴリズム
 */
class Thinning {
    /**
     * 細線化(2値化されていることが前提) - Zhang-Suenの細線化アルゴリズム
     * @param {ImageData} src 変換前のImageData 
     * @returns {ImageData} 変換後のImageData
     */
    static convert(src) {
        // ImageData -> Uint8ClampedArray
        const u8dst = new Uint8ClampedArray(src.width * src.height)
                      .map((e, i) => src.data[i * 4] ? 1 : 0);

        // prev
        let prev = new Uint8ClampedArray(u8dst.length)
                   .map((e, i) => u8dst[i]);
        let iteCnt = 0;
        do {
            if(++iteCnt > 1000) {
                break;
            };
            Thinning.thinningIte(u8dst, 0, src.width, src.height);
            Thinning.thinningIte(u8dst, 1, src.width, src.height);
            let sameFlag = true;
            for(let i = 0; i < prev.length; i += 1) {
                if(prev[i] !== u8dst[i]) {
                    sameFlag = false;
                    break;
                }
            }
            if(sameFlag) {
                break;
            }
            for(let i = 0; i < prev.length; i += 1) {
                prev[i] = u8dst[i];
            }
        } while (true);

        // Uint8ClampedArray -> ImageData
        const dst = Utility.createImageData(src.width, src.height);
        for(let i = 0; i < u8dst.length; i += 1) {
            const c = u8dst[i] ? 255 : 0;
            [ dst.data[i * 4], dst.data[i * 4 + 1], dst.data[i * 4 + 2], dst.data[i * 4 + 3]] = 
            [ c, c, c, 255 ];
        }

        return dst;
    }
    static thinningIte(u8ary, pattern, width, height) {       
        const u8marker = new Uint8ClampedArray(u8ary.length);
        for(let i = 0; i < u8ary.length; i += 1) {
            u8marker[i] = 1;
        }

        for(let y = 1; y < height - 1; y += 1) {
            for(let x = 1; x < width - 1; x += 1) {
                const v1 = u8ary[y * width + x];
                const v2 = u8ary[(y - 1) * width + x];
                const v3 = u8ary[(y - 1) * width + (x + 1)];
                const v4 = u8ary[y * width + (x + 1)];
                const v5 = u8ary[(y + 1) * width + (x + 1)];
                const v6 = u8ary[(y + 1) * width + x];
                const v7 = u8ary[(y + 1) * width + (x - 1)];
                const v8 = u8ary[y * width + (x - 1)];
                const v9 = u8ary[(y - 1) * width + (x - 1)];
                const S  = (!v2 && v3) + (!v3 && v4) + (!v4 && v5) + (!v5 && v6) +
                            (!v6 && v7) + (!v7 && v8) + (!v8 && v9) + (!v9 && v2);
                const N = v2 + v3 + v4 + v5 + v6 + v7 + v8 + v9;

                let m1 = 0, m2 = 0;
            
                if(pattern === 0) { m1 = (v2 * v4 * v6); }
                if(pattern === 1) { m1 = (v2 * v4 * v8); }
                
                if(pattern === 0) { m2 = (v4 * v6 * v8); }
                if(pattern === 1) { m2 = (v2 * v6 * v8); }

                if(S === 1 && (N >= 2 && N <= 6) && m1 === 0 && m2 === 0) {
                    u8marker[y * width + x] = 0;
                }                
            }
        }
        for(let i = 0; i < u8ary.length; i += 1) {
            u8ary[i] = u8ary[i] & u8marker[i];
        }
        return u8ary;
    }
}
/*
using namespace cv;


void thinningIte(Mat& img, int pattern){
    
    Mat del_marker = Mat::ones(img.size(), CV_8UC1);
    int x, y;
    
    for (y = 1; y < img.rows-1; ++y) {
        
        for (x = 1; x < img.cols-1; ++x) {
            
            int v9,v2,v3;
            int v8,v1,v4;
            int v7,v6,v5;
            
            v1=img.data[   y   * img.step +   x   * img.elemSize()];
            v2=img.data[ (y-1) * img.step +   x   * img.elemSize()];
            v3=img.data[ (y-1) * img.step + (x+1) * img.elemSize()];
            v4=img.data[   y   * img.step + (x+1) * img.elemSize()];
            v5=img.data[ (y+1) * img.step + (x+1) * img.elemSize()];
            v6=img.data[ (y+1) * img.step +   x   * img.elemSize()];
            v7=img.data[ (y+1) * img.step + (x-1) * img.elemSize()];
            v8=img.data[   y   * img.step + (x-1) * img.elemSize()];
            v9=img.data[ (y-1) * img.step + (x-1) * img.elemSize()];
            
            int S  = (v2 == 0 && v3 == 1) + (v3 == 0 && v4 == 1) +
            (v4 == 0 && v5 == 1) + (v5 == 0 && v6 == 1) +
            (v6 == 0 && v7 == 1) + (v7 == 0 && v8 == 1) +
            (v8 == 0 && v9 == 1) + (v9 == 0 && v2 == 1);
            
            int N  = v2 + v3 + v4 + v5 + v6 + v7 + v8 + v9;
            
            int m1=0, m2=0;
            
            if(pattern==0) m1 = (v2 * v4 * v6);
            if(pattern==1) m1 = (v2 * v4 * v8);
            
            if(pattern==0) m2 = (v4 * v6 * v8);
            if(pattern==1) m2 = (v2 * v6 * v8);
            
            if (S == 1 && (N >= 2 && N <= 6) && m1 == 0 && m2 == 0)
                del_marker.data[y * del_marker.step + x * del_marker.elemSize()]=0;
        }
    }
    
    img &= del_marker;
}
void thinning(const Mat& src, Mat& dst){
    dst = src.clone();
    dst /= 255;         // 0は0 , 1以上は1に変換される
    
    Mat prev = Mat::zeros(dst.size(), CV_8UC1);
    Mat diff;
    
    do {
        thinningIte(dst, 0);
        thinningIte(dst, 1);
        absdiff(dst, prev, diff);
        dst.copyTo(prev);
    }while (countNonZero(diff) > 0);
    
    dst *= 255;
}
*/

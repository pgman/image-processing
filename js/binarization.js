class Binarization {
    static convert(srcImgData, threshold = 128) {
        const dstImgData = Utility.copyImageData(srcImgData);
        const data = dstImgData.data;
        for(let i = 0; i < data.length; i += 4) {
            if(data[i] < threshold) {
                [ data[i], data[i + 1], data[i + 2] ] = [ 0, 0, 0 ];
            } else {
                [ data[i], data[i + 1], data[i + 2] ] = [ 255, 255, 255 ];
            }
        }
        return dstImgData;
    }
}
class Main {
    // 初期化
    static async init() {
        await Main._initModel();
        Main._initController();
        Main._updateView();
    }
    // モデルの初期化
    static async _initModel() {
        Main.srcCanvas = document.querySelector('#src-canvas');
        Main.srcCtx = Main.srcCanvas.getContext('2d');
        Main.dstCanvas = document.querySelector('#dst-canvas');
        Main.dstCtx = Main.dstCanvas.getContext('2d');
        Main.srcImgData = null;
        Main.dstImgData = null;
        await Main._onChangeImage();
    }
    // コントローラーの初期化(イベントハンドラ)
    static _initController() {
        document.querySelector('#image-select').addEventListener('change', Main._onChangeImage);
        document.querySelector('#reset-button').addEventListener('click', Main._onClickResetButton);
        document.querySelector('#grayscale-button').addEventListener('click', Main._onClickGrayscaleButton);
        document.querySelector('#binarization-button').addEventListener('click', Main._onClickBinarizationButton);
        document.querySelector('#mosaic-button').addEventListener('click', Main._onClickMosaicButton);
        document.querySelector('#sepia-button').addEventListener('click', Main._onClickSepiaButton);
        document.querySelector('#thinning-button').addEventListener('click', Main._onClickThinningButton);
    }
    // 画像更新時のモデル更新
    static async _onChangeImage() {
        const path = document.querySelector('#image-select').value;
        const srcImg = await Utility.loadImageAsync(path);
        Main.srcImgData = Utility.createImageDataByImage(srcImg);
        Main.dstImgData = null;
        Main._updateView();
    }    
    // リセット処理時のモデル更新
    static _onClickResetButton() {
        Main.dstImgData = null;
        Main._updateView();
    }
    // グレースケール処理時のモデル更新
    static _onClickGrayscaleButton() {
        const imgData = Main._getTargetImageData();
        Main.dstImgData = Grayscale.convert(imgData);
        Main._updateView();
    }
    // 2値化のモデル更新
    static _onClickBinarizationButton() {
        const imgData = Main._getTargetImageData();
        Main.dstImgData = Binarization.convert(imgData);
        Main._updateView();
    }   
    // モザイクボタン押下時の処理
    static _onClickMosaicButton() {
        const imgData = Main._getTargetImageData();
        Main.dstImgData = Mosaic.convert(imgData);
        Main._updateView();
    }   
    // セピアボタン押下時の処理
    static _onClickSepiaButton() {
        const imgData = Main._getTargetImageData();
        Main.dstImgData = Sepia.convert(imgData);
        Main._updateView();
    }   
    // 細線化
    static _onClickThinningButton() {
        const imgData = Main._getTargetImageData();
        Main.dstImgData = Thinning.convert(imgData);
        Main._updateView();
    }
    static _getTargetImageData() {
        if(!Main.dstImgData) {
            return Main.srcImgData;
        } else {
            Main.srcImgData = Main.dstImgData;
            return Main.dstImgData;
        }
    } 
    static _getImageData(img) {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    // ビューの更新
    static _updateView() {
        if(Main.srcCtx && Main.srcImgData) {
            Main.srcCtx.canvas.width = Main.srcImgData.width;
            Main.srcCtx.canvas.height = Main.srcImgData.height;
            Main.srcCtx.putImageData(Main.srcImgData, 0, 0);
        }
        if(Main.dstCtx && Main.dstImgData) {
            Main.dstCtx.canvas.width = Main.dstImgData.width;
            Main.dstCtx.canvas.height = Main.dstImgData.height;
            Main.dstCtx.putImageData(Main.dstImgData, 0, 0);
        } else if(Main.dstCtx && !Main.dstImgData) {
            Main.dstCtx.clearRect(0, 0, Main.dstCtx.canvas.width, Main.dstCtx.canvas.height);
        }
    }
}
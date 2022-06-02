
// attendant upload profile picture
const imgProduct = document.querySelector('#product-img');
const fileProduct = document.querySelector('#file-product');


// showing image functionality when uploaded an image
fileProduct.addEventListener('change', function () {
    // refers to file
    const choosedFileProductImage = this.files[0];

    if (choosedFileProductImage) {
        const readerProductImage = new FileReader();

        readerProductImage.addEventListener('load', function () {
            imgProduct.setAttribute('src', readerProductImage.result);
        });

        readerProductImage.readAsDataURL(choosedFileProductImage);
    }
})
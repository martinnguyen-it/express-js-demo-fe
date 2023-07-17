// eslint-disable-next-line
const createImage = (url: string): any =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
        image.src = url;
    });

function getRadianAngle(degreeValue: number) {
    return (degreeValue * Math.PI) / 180;
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */
export async function getCroppedImg(
    imageSrc: string,
    pixelCrop: { width: number; height: number; x: number; y: number },
    rotation = 0,
    // eslint-disable-next-line
): Promise<{ url: string; file: any }> {
    // eslint-disable-next-line
    const image: any = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    // eslint-disable-next-line
    const ctx: any = canvas.getContext('2d');

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    // set each dimensions to double largest dimension to allow for a safe area for the
    // image to rotate in without being clipped by canvas context
    canvas.width = safeArea;
    canvas.height = safeArea;

    // translate canvas context to a central location on image to allow rotating around the center.
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.translate(-safeArea / 2, -safeArea / 2);

    // draw rotated image and store data.
    ctx.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5);
    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // paste generated rotate image with correct offsets for x,y crop values.
    ctx.putImageData(
        data,
        Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
        Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y),
    );

    // As Base64 string
    // return canvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve) => {
        canvas.toBlob((file) => {
            resolve({ url: URL.createObjectURL(file as Blob), file });
        }, 'image/jpeg');
    });
}

export async function getRotatedImage(
    imageSrc: string,
    rotation = 0,
    // eslint-disable-next-line
): Promise<any> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    // eslint-disable-next-line
    const ctx: any = canvas.getContext('2d');

    const orientationChanged = rotation === 90 || rotation === -90 || rotation === 270 || rotation === -270;
    if (orientationChanged) {
        canvas.width = image.height;
        canvas.height = image.width;
    } else {
        canvas.width = image.width;
        canvas.height = image.height;
    }

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);

    return new Promise((resolve) => {
        canvas.toBlob((file) => {
            resolve(URL.createObjectURL(file as Blob));
        }, 'image/jpeg');
    });
}

export const rounderImageToBase64 = async (imageUrl: string, isRounded = true): Promise<string> => {
    const image = await createImage(imageUrl);
    const canvas = document.createElement('canvas');
    const width = 405;
    const height = 405;
    canvas.width = 405;
    canvas.height = 405;
    // eslint-disable-next-line
    const context: any = canvas.getContext('2d');
    context.imageSmoothingEnabled = false;
    context.drawImage(image, 0, 0, width, height);
    if (isRounded) {
        context.globalCompositeOperation = 'destination-in';
        context.beginPath();
        context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
        context.fill();
    }
    return canvas.toDataURL();
};

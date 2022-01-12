import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

const textureTypes = ["color", "ambientOcclusion", "normal", "roughness", "height", "metalness", "alpha"];

const textureMapper = function (objMaterial, texturePath, format) {
    format = format || "jpg";
    format = format.indexOf('.') > 0 ? format : '.'.concat(format)
    textureTypes.forEach(function (textureType) {
        switch (textureType) {
            case "color":
                objMaterial.map = textureLoader.load(texturePath + textureType + format);
                break;
            case "ambientOcclusion":
                objMaterial.aoMap = textureLoader.load(texturePath + textureType + format);
                break;
            case "alpha":
                objMaterial.alphaMap = textureLoader.load(texturePath + textureType + format);
                break;
            case "normal":
                objMaterial.normal = textureLoader.load(texturePath + textureType + format);
                break;
            case "roughness":
                objMaterial.roughnessMap = textureLoader.load(texturePath + textureType + format);
                break;
            case "metalness":
                objMaterial.metalnessMap = textureLoader.load(texturePath + textureType + format);
                break;
            case "height":
                objMaterial.displacementMap = textureLoader.load(texturePath + textureType + format);
                break;
        }
    });
}
export default textureMapper;
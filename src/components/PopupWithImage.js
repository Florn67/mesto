import Popup from './Popup.js';
import {popupImageSelf, popupImageDescription} from '../utils/constants.js'
class PopupWithImage extends Popup{
    open(link, name){
        popupImageSelf.setAttribute('src', link);
        popupImageSelf.setAttribute('alt', name);
        popupImageDescription.textContent = name;
        super.open()
    }
}

export default PopupWithImage
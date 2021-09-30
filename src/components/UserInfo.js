class UserInfo{
    constructor({ nameSelector, infoSelector}){
        this._nameElement = document.querySelector(nameSelector)
        this._infoElement = document.querySelector(infoSelector)
    }
    getUserInfo(){
        return { name: this._nameElement.textContent, info: this._infoElement.textContent}
    }
    setUserInfo({name, about}){
        this._nameElement.textContent = name;
        this._infoElement.textContent = about;
    }
}

export default UserInfo
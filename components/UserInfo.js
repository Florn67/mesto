class UserInfo{
    constructor({ nameSelector, infoSelector}){
        this._nameElement = document.querySelector(this.nameSelector)
        this._infoElement = document.querySelector(this.infoSelector)
    }
    getUserInfo(){
        return { name: this._nameElement.value, info: this._infoElement.value}
    }
    setUserInfo(name, info){
        this._nameElement.value = name;
        this._infoElement.value = info;
    }
}
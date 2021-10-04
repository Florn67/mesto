class UserInfo {
  constructor({ nameSelector, infoSelector }, profileSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
    this._profile = document.querySelector(profileSelector);
    this._profileAvatar = this._profile.querySelector(".profile__avatar");
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      info: this._infoElement.textContent,
    };
  }
  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._infoElement.textContent = about;
  }
  setAvatar(avatarUrl) {
    this._profileAvatar.setAttribute("src", avatarUrl);
  }
}

export default UserInfo;

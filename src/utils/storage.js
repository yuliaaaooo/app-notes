export class Storage {
    key = 'cms';

    setUserInfo(info) {
        localStorage.setItem(this.key, JSON.stringify(info));
    }

    get userInfo() {
        try {
            return JSON.parse(localStorage.getItem(this.key));
        } catch (error) {
            return null;
        }
    }

    get token() {
        return this.userInfo.token;
    }

    get role(){
        return this.userInfo.role;
    }

    get userId(){
        return +this.userInfo.userId;
    }

    deleteUserInfo() {
        localStorage.removeItem(this.key);
    }
}
export const storage = new Storage();

export default storage;

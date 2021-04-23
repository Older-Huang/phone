const locStorage = {
    set(key, data) {
        sessionStorage.setItem(key, JSON.stringify(data));
    },
    get(key) {
        return JSON.parse(sessionStorage.getItem(key));
    },
    remove(key) {
        sessionStorage.removeItem(key);
    }
}

export default locStorage
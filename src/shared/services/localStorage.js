export class LocalStorage {
  #storage;

  constructor() {
    this.#storage = localStorage;
  }

  createObject(key, data) {
    let mapObjects = this.getObjects(key);
    this.#storage.setItem(
      key,
      JSON.stringify([
        ...mapObjects,
        {
          ...data,
          createdAt: Date.now(),
          id: Date.now(),
        },
      ])
    );

    return true;
  }

  updateObject(key, data) {
    let mapObjects = this.getObjects(key);
    let index = mapObjects.findIndex((mapObj) => +mapObj.id === data.id);
    let mapObject = { ...mapObjects[index], ...data };
    mapObjects[index] = mapObject;

    this.#storage.setItem(key, JSON.stringify(mapObjects));

    return true;
  }

  deleteObject(key, id) {
    let mapObjects = this.getObjects(key);

    let index = mapObjects.findIndex((mapObj) => mapObj.id === id);
    mapObjects.splice(index, 1);
    this.#storage.setItem(key, JSON.stringify(mapObjects));

    return true;
  }

  getObjects(key) {
    return JSON.parse(this.#storage.getItem(key)) || [];
  }

  getObjectById(key, id) {
    return this.getObjects(key).find((mapObj) => +mapObj.id === id);
  }
}

let localStorageProvider = new LocalStorage();

export default localStorageProvider;

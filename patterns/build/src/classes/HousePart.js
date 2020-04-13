class HousePart {
    constructor(model) {
        this.model = model;
        this.width = this.model[0][0].length;
        this.height = this.model.length;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    getModel() {
        return this.model;
    }
}
export default HousePart;

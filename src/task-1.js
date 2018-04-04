
const NORTH = "NORTH",
    EAST = "EAST",
    SOUTH = "SOUTH",
    WEST = "WEST",
    directions = ["NORTH", "EAST", "SOUTH", "WEST"];

class Rover {
    constructor(x = 0, y = 0, direction = NORTH) {
        if (!Number.isInteger(x) || !Number.isInteger(y) || !(directions.includes(direction))) {
            throw new TypeError();
        }
        this.x = x;
        this.y = y;
        this.direction = direction.toUpperCase();
        this.directionIndex = directions.findIndex(dir => dir === this.direction);
    }
    
    left() {
        this.directionIndex -= 1;
        if (this.directionIndex < 0) { this.directionIndex = 3; }
        return this;
    }
    
    right() {
        this.directionIndex += 1;
        if (this.directionIndex > 3) { this.directionIndex = 0; }
        return this;
    }
    
    move(n) {
        if (!Number.isInteger(n)) {
            throw new TypeError("incorrent move() parameter");
        } else {
            switch (directions[this.directionIndex]) {
                case "NORTH":
                    this.y += n;
                    break;
                case "SOUTH":
                    this.y -= n;
                    break;
                case "WEST":
                    this.x -= n;
                    break;
                case "EAST":
                    this.x += n;
                    break;
                default:
            }
        }
        return this;
    }

    getPosition() {
        return { x: this.x, y: this.y };
    }

    getDirection() {
        return directions[this.directionIndex];
    }
}
export { NORTH, EAST, SOUTH, WEST, Rover };

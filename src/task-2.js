
export default class EnhancedSet extends Set {

    union(s) {
        return new EnhancedSet([...this, ...s]);
    }

    intersection(s) {
        return new EnhancedSet([...this].filter(elem => s.has(elem)));
    }

    difference(s) {
        return new EnhancedSet([...this].filter(elem => !(s.has(elem))));
    }

    symmetricDifference(s) {
        return this.difference(s).union(s.difference(this));
    }

    isSuperset(s) {
        return [...s.intersection(this)].length === [...s].length
    }

    isSubset(s) {
        return [...this.intersection(s)].length === [...this].length;
    }
}


export function sortById(list: Array<any>): Array<any> {
    return list.sort(function(a, b) {
        return a.id - b.id;
    });
}
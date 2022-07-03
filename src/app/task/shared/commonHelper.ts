export class CommonHelper {
    static convertEnumToArray(ENUM: any): any {
        let resultArray = [];
        let objectEnum = Object.keys(ENUM);
        const values = objectEnum.slice(0, objectEnum.length / 2);
        const keys = objectEnum.slice(objectEnum.length / 2);

        for (let i = 0; i < objectEnum.length / 2; i++) {
            resultArray.push({ key: keys[i], value: values[i] });
        }
        return resultArray;
    }
 }
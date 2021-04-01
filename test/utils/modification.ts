export interface ILanguage {
    iso639_1: String, 
    iso639_2: String, 
    name: String, 
    nativeName: String
}

export const addLanguage = (array: Array<any>, values: ILanguage): Array<any> => {
    array.push(values)
    return array
}
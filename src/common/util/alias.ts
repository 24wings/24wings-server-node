const enumAlias = Symbol('alias');


export function setAlias(obj: Object, mappers: { value: string, alias: string }[]) {
    Reflect.defineMetadata(enumAlias, mappers, obj)
}
export function getAlias(obj: Object): { value: string, alias: string } {
    return Reflect.getMetadata(enumAlias, obj) ? Reflect.getMetadata(enumAlias, obj) : []
}

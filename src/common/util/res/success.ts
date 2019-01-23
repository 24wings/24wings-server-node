import { Res } from './res';

export function success(data, msg: string = ''): Res {
    return new Res(200, data, true, msg);
} 
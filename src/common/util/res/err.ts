import { Res } from './res';

export function err(status: number, message: string = ''): Res {
    return new Res(status, null, false, message);
}
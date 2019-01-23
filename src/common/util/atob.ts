export function atob(a: string) {
    return new Buffer(a, 'base64').toString('binary');
};
export function btoa(b: string) {
    return new Buffer(b).toString('base64');
};
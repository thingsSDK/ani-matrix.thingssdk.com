export function isOn(x, value) {
    return (value & 1 << x) > 0;
}

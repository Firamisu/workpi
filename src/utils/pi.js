import Decimal from 'decimal.js/decimal';

Decimal.config({ precision: 300 });

function get(n = 200) {
    if (n < 0) {
        return '0';
    } // Return 0 if a valid value was not passed

    if (n === 0) {
        return '3';
    } // Skip calculations

    let p16 = new Decimal(1);
    let pi = new Decimal(0);

    // Check the precision needed
    const { precision } = Decimal.config({});
    const one = new Decimal(1);
    const two = new Decimal(2);
    const four = new Decimal(4);
    let k8 = new Decimal(0);

    for (let k = new Decimal(0); k.lte(precision); k = k.plus(one)) {
        const f = four
            .div(k8.plus(1))
            .minus(two.div(k8.plus(4)))
            .minus(one.div(k8.plus(5)))
            .minus(one.div(k8.plus(6)));

        pi = pi.plus(p16.times(f));
        p16 = p16.div(16);
        k8 = k8.plus(8);
    }


    // Validate number of places needed
    n = Math.min(n, 200);
    return pi.toPrecision(n + 2).slice(0, -1);
}

export default { get };

const BigNumber = require('bignumber.js');

BigNumber.config({
    DECIMAL_PLACES: 1000000,
});


// Implementation of the Gauss-Legendre algorithm
// https://docs.rs/compute-pi/1.0.0/src/compute_pi/lib.rs.html#1-92
function get(digits) {
    const precision = Math.ceil(digits * 3.3219280948874) + 10;
    
    BigNumber.config({ DECIMAL_PLACES: precision });
    
    const threshold = new BigNumber(10).pow(-digits);

    let a = new BigNumber(1);
    const two = new BigNumber(2);
    let b = new BigNumber(1).div(two.sqrt());
    let t = new BigNumber(0.25);
    let p = new BigNumber(1);
    let piOld = new BigNumber(0);

    while (true) {
        const sum = a.plus(b);
        const aNext = sum.div(2);
        const product = a.times(b);
        b = product.sqrt();
        
        const difference = a.minus(aNext);
        const differenceSquared = difference.pow(2);
        t = t.minus(p.times(differenceSquared));
        
        a = aNext;
        p = p.times(2);

        const numerator = sum.pow(2);
        const denominator = t.times(4);
        const pi = numerator.div(denominator);

        const piDiff = pi.minus(piOld).abs();
        if (piDiff.lt(threshold)) {
            return pi.toString().slice(0, digits + 2);
        }

        piOld = pi;
    }
}

export default { get };
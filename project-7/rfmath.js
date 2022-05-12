// f = 1 / (2*PI*sqrt(C*L))
// Resonant frequency (f) is the relationship between inductance (L) and capitance (C)
function frequency(L,C){
    L = Number(L);
    C = Number(C);
    if (isNaN(L) || isNaN(C)) return null;
    if (L <= 0 || C <= 0) return null;
    L /= 1000; // Assume L is in microHenries. Convert to nano.
    C /= 1000; // Assume C is in microFarads. Convert to nano.
    return 1 / (2 * Math.PI * Math.sqrt(C*L));
}

// Q is the quality factor, calculated as (1/R) * sqrt(L/C).
// A higher Q, usually around 100, means better filtering.
// R = resistance, L = inductance, C = capitance
function findQ(C, L, R){
    R = Number(R);
    L = Number(L)*10000; //unit conversion
    C = Number(C)/10000; //unit conversion
    if (isNaN(R) || isNaN(L) || isNaN(C)) return null;
    if (R == 0) return null;
    if (L <= 0 || C <= 0) return null;
    return (1/R) * Math.sqrt(L/C);
}

// Return a named array of L & C with the best values to hit the desired frequency and Q.
function findBestLC(f, Q, R){
    var rtn = {L:0, C:0, Q:0};
    f = Number(f);
    Q = Number(Q);
    R = Number(R);
    if (isNaN(f) || isNaN(Q) || isNaN(R)) return rtn;
    var bestQ = 0;
    f /= 1000;
    for (let c = 1; c <= 1000000; c++){
        // f = 1 / (2 * Math.PI * Math.sqrt(C*L))
        // 1 = f * (2 * Math.PI * Math.sqrt(C*L))
        // 1 / (f * 2 * Math.PI) = Math.sqrt(C*L))
        // C * L = Math.pow(1/(f * 2 * Math.PI), 2)
        // L = Math.pow(1/f * 2 * Math.PI), 2) / C
        let l = Math.pow(1/(f * 2 * Math.PI), 2) / c;
        let thisq = findQ(c, l, R);
        if (Math.abs(thisq - Q) < Math.abs(bestQ - Q)){
            rtn.L = Math.floor(l);
            rtn.C = c;
            rtn.Q = thisq;
            bestQ = thisq;
            if (Math.round(thisq)==Math.round(Q)){
                console.log("FindBestLC breaks at "+c);
                break;
            }
        }
    }
    return rtn;
}
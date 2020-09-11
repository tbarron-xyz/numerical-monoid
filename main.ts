import NumericalMonoid from './NumericalMonoid';
import { product } from './utils';
import fs from 'fs';
exports.NumericalMonoid = NumericalMonoid;

const logpath = "C:\\Users\\t\\Documents\\numerical-log.txt";
const wippath = "C:\\Users\\t\\Documents\\numerical-wip.txt";

for (let gen1 = 5; gen1 <= 30; gen1 ++) {
    for (let gen2 = gen1 + 1; gen2 <= 30; gen2++) {
        for (let gen3 = gen2 + 1; gen3 <= 30; gen3++) {
            // check if already done
            const alreadyDone = fs.readFileSync(logpath).toString();
const doneGens = alreadyDone.split('\n').map(x => { try { return JSON.parse(x); } catch { return null;}}).filter(x => x != null);
const wip = fs.readFileSync(wippath).toString();
const wipgens = wip.split('\n').map(x => { try { return JSON.parse(x); } catch { return null;}}).filter(x => x != null);
            const doneBefore = doneGens.concat(wipgens).some(x => x[0] == gen1 && x[1] == gen2 && x[2] == gen3);
            if (doneBefore) { continue; }
            //execute
            const generators = [gen1, gen2, gen3];
            console.info(generators);
            fs.appendFileSync(wippath, JSON.stringify(generators) + '\n');
            const num = new NumericalMonoid(generators);
            const start = num._catenaryBoundHypothesis();
            const lcm = product(generators);
            const end = start + 3 * lcm;
            for (let i = start; i <= end; i++) {
                const value = num.catenaryDegreeByMetric(i, NumericalMonoid.distanceForClassicCatenary);
                if (end - i <= lcm) {
                    if (num.catenaryDegreeByMetric(i - lcm, NumericalMonoid.distanceForClassicCatenary) != value) {
                        console.error('Fail:', generators, i);
                    }
                }
            }
            console.info('success', generators);
            fs.appendFileSync(logpath, JSON.stringify(generators) + '\n');
        }
    }
}

// for (let gens of [[11, 12, 14], [11, 13, 15], [11, 13, 16]]) {
//     const num = new NumericalMonoid(gens);
//     for (let i = 150; i < 1500; i++) {
//         console.log(i, num.percent_of_edges_that_are_minimal(i, NumericalMonoid.distanceForClassicCatenary));
//     }
//     // const mst100 = num.minimalSpanningTreeByMetric(100, NumericalMonoid.distanceForClassicCatenary);
//     // const mst1000 = num.minimalSpanningTreeByMetric(1000, NumericalMonoid.distanceForClassicCatenary);
//     // console.log(mst100);
//     // console.log(mst1000);
//     //     console.log(num.satisfiesCatenaryBoundHypothesis(NumericalMonoid.distanceForClassicCatenary));
//     //     console.log(num.satisfiesCatenaryBoundHypothesisEuclidean());
//     //     // console.log(num.bettiElements().map(x => num.maxnonreducibleEdges(x)));
//     //     // console.log(num.bettiElements().map(x => num.maxnonreducibleEdgesEuclidean(x)));
// }
// console.log(`Betti elements: ${num.bettiElements()}`);

// console.log(num.catenaryDegreeEuclidean(115));
// console.log(num.catenaryDegreeEuclidean(2117));
// console.log(num.maxnonreducibleEdgesEuclidean(2117));

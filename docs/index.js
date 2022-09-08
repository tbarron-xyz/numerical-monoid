System.register("Hash", [], function (exports_1, context_1) {
    "use strict";
    var HashSet, JSONHashSet;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            HashSet = class HashSet {
                constructor(hashFunction, reverseHash, initialArray) {
                    this.hashFunction = hashFunction;
                    this.reverseHashFunction = reverseHash;
                    if (initialArray) {
                        this.valueSet = new Set(initialArray);
                    }
                    else {
                        this.valueSet = new Set();
                    }
                }
                add(newEl) {
                    this.valueSet.add(this.hashFunction(newEl));
                }
                has(el) {
                    return this.valueSet.has(this.hashFunction(el));
                }
                forEach(fn) {
                    this.valueSet.forEach(x => fn(this.reverseHashFunction(x)));
                }
                toArray() {
                    const returnArray = [];
                    this.forEach(x => returnArray.push(x));
                    return returnArray;
                }
            };
            exports_1("HashSet", HashSet);
            JSONHashSet = class JSONHashSet extends HashSet {
                constructor() {
                    super(JSON.stringify, JSON.parse);
                }
            };
            exports_1("JSONHashSet", JSONHashSet);
        }
    };
});
System.register("utils", [], function (exports_2, context_2) {
    "use strict";
    var zeroThroughN, addOneAtIndex, tupleGCD, tupleMinus, sum, product, numberArrayEqualityCheck, euclideanDistance, flattenArray;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            exports_2("zeroThroughN", zeroThroughN = (n) => Array.from(Array(n).keys()));
            exports_2("addOneAtIndex", addOneAtIndex = (array, index) => {
                const array2 = array.slice();
                array2[index] += 1;
                return array2;
            });
            exports_2("tupleGCD", tupleGCD = (fac1, fac2) => zeroThroughN(fac1.length).map(x => Math.min(fac1[x], fac2[x])));
            exports_2("tupleMinus", tupleMinus = (fac1, fac2) => zeroThroughN(fac1.length).map(x => fac1[x] - fac2[x]));
            exports_2("sum", sum = (fac) => fac.reduce((a, b) => a + b, 0));
            exports_2("product", product = (numbers) => numbers.reduce((a, b) => a * b, 1));
            exports_2("numberArrayEqualityCheck", numberArrayEqualityCheck = (a, b) => zeroThroughN(a.length).every(x => a[x] === b[x]));
            exports_2("euclideanDistance", euclideanDistance = (fac1, fac2) => Math.pow(sum(fac1.map((el, i) => Math.pow(fac2[i] - fac1[i], 2))), 0.5));
            exports_2("flattenArray", flattenArray = (arrOfArrs) => arrOfArrs.reduce((a, b) => a.concat(b), []));
        }
    };
});
System.register("lib/tsm/src/constants", [], function (exports_3, context_3) {
    "use strict";
    var epsilon;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            exports_3("epsilon", epsilon = 0.00001);
        }
    };
});
System.register("lib/tsm/src/quat", ["lib/tsm/src/mat3", "lib/tsm/src/mat4", "lib/tsm/src/vec3", "lib/tsm/src/constants"], function (exports_4, context_4) {
    "use strict";
    var mat3_1, mat4_1, vec3_1, constants_1, quat;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (mat3_1_1) {
                mat3_1 = mat3_1_1;
            },
            function (mat4_1_1) {
                mat4_1 = mat4_1_1;
            },
            function (vec3_1_1) {
                vec3_1 = vec3_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            }
        ],
        execute: function () {
            quat = class quat {
                constructor(values) {
                    this.values = new Float32Array(4);
                    if (values !== undefined) {
                        this.xyzw = values;
                    }
                }
                get x() {
                    return this.values[0];
                }
                get y() {
                    return this.values[1];
                }
                get z() {
                    return this.values[2];
                }
                get w() {
                    return this.values[3];
                }
                get xy() {
                    return [
                        this.values[0],
                        this.values[1],
                    ];
                }
                get xyz() {
                    return [
                        this.values[0],
                        this.values[1],
                        this.values[2],
                    ];
                }
                get xyzw() {
                    return [
                        this.values[0],
                        this.values[1],
                        this.values[2],
                        this.values[3],
                    ];
                }
                set x(value) {
                    this.values[0] = value;
                }
                set y(value) {
                    this.values[1] = value;
                }
                set z(value) {
                    this.values[2] = value;
                }
                set w(value) {
                    this.values[3] = value;
                }
                set xy(values) {
                    this.values[0] = values[0];
                    this.values[1] = values[1];
                }
                set xyz(values) {
                    this.values[0] = values[0];
                    this.values[1] = values[1];
                    this.values[2] = values[2];
                }
                set xyzw(values) {
                    this.values[0] = values[0];
                    this.values[1] = values[1];
                    this.values[2] = values[2];
                    this.values[3] = values[3];
                }
                at(index) {
                    return this.values[index];
                }
                reset() {
                    for (let i = 0; i < 4; i++) {
                        this.values[i] = 0;
                    }
                }
                copy(dest) {
                    if (!dest) {
                        dest = new quat();
                    }
                    for (let i = 0; i < 4; i++) {
                        dest.values[i] = this.values[i];
                    }
                    return dest;
                }
                roll() {
                    const x = this.x;
                    const y = this.y;
                    const z = this.z;
                    const w = this.w;
                    return Math.atan2(2.0 * (x * y + w * z), w * w + x * x - y * y - z * z);
                }
                pitch() {
                    const x = this.x;
                    const y = this.y;
                    const z = this.z;
                    const w = this.w;
                    return Math.atan2(2.0 * (y * z + w * x), w * w - x * x - y * y + z * z);
                }
                yaw() {
                    return Math.asin(2.0 * (this.x * this.z - this.w * this.y));
                }
                equals(vector, threshold = constants_1.epsilon) {
                    for (let i = 0; i < 4; i++) {
                        if (Math.abs(this.values[i] - vector.at(i)) > threshold) {
                            return false;
                        }
                    }
                    return true;
                }
                setIdentity() {
                    this.x = 0;
                    this.y = 0;
                    this.z = 0;
                    this.w = 1;
                    return this;
                }
                calculateW() {
                    const x = this.x;
                    const y = this.y;
                    const z = this.z;
                    this.w = -(Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z)));
                    return this;
                }
                inverse() {
                    const dot = quat.dot(this, this);
                    if (!dot) {
                        this.xyzw = [0, 0, 0, 0];
                        return this;
                    }
                    const invDot = dot ? 1.0 / dot : 0;
                    this.x *= -invDot;
                    this.y *= -invDot;
                    this.z *= -invDot;
                    this.w *= invDot;
                    return this;
                }
                conjugate() {
                    this.values[0] *= -1;
                    this.values[1] *= -1;
                    this.values[2] *= -1;
                    return this;
                }
                length() {
                    const x = this.x;
                    const y = this.y;
                    const z = this.z;
                    const w = this.w;
                    return Math.sqrt(x * x + y * y + z * z + w * w);
                }
                normalize(dest) {
                    if (!dest) {
                        dest = this;
                    }
                    const x = this.x;
                    const y = this.y;
                    const z = this.z;
                    const w = this.w;
                    let length = Math.sqrt(x * x + y * y + z * z + w * w);
                    if (!length) {
                        dest.x = 0;
                        dest.y = 0;
                        dest.z = 0;
                        dest.w = 0;
                        return dest;
                    }
                    length = 1 / length;
                    dest.x = x * length;
                    dest.y = y * length;
                    dest.z = z * length;
                    dest.w = w * length;
                    return dest;
                }
                add(other) {
                    for (let i = 0; i < 4; i++) {
                        this.values[i] += other.at(i);
                    }
                    return this;
                }
                multiply(other) {
                    const q1x = this.values[0];
                    const q1y = this.values[1];
                    const q1z = this.values[2];
                    const q1w = this.values[3];
                    const q2x = other.x;
                    const q2y = other.y;
                    const q2z = other.z;
                    const q2w = other.w;
                    this.x = q1x * q2w + q1w * q2x + q1y * q2z - q1z * q2y;
                    this.y = q1y * q2w + q1w * q2y + q1z * q2x - q1x * q2z;
                    this.z = q1z * q2w + q1w * q2z + q1x * q2y - q1y * q2x;
                    this.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;
                    return this;
                }
                multiplyVec3(vector, dest) {
                    if (!dest) {
                        dest = new vec3_1.default();
                    }
                    const x = vector.x;
                    const y = vector.y;
                    const z = vector.z;
                    const qx = this.x;
                    const qy = this.y;
                    const qz = this.z;
                    const qw = this.w;
                    const ix = qw * x + qy * z - qz * y;
                    const iy = qw * y + qz * x - qx * z;
                    const iz = qw * z + qx * y - qy * x;
                    const iw = -qx * x - qy * y - qz * z;
                    dest.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
                    dest.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
                    dest.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
                    return dest;
                }
                toMat3(dest) {
                    if (!dest) {
                        dest = new mat3_1.default();
                    }
                    const x = this.x;
                    const y = this.y;
                    const z = this.z;
                    const w = this.w;
                    const x2 = x + x;
                    const y2 = y + y;
                    const z2 = z + z;
                    const xx = x * x2;
                    const xy = x * y2;
                    const xz = x * z2;
                    const yy = y * y2;
                    const yz = y * z2;
                    const zz = z * z2;
                    const wx = w * x2;
                    const wy = w * y2;
                    const wz = w * z2;
                    dest.init([
                        1 - (yy + zz),
                        xy + wz,
                        xz - wy,
                        xy - wz,
                        1 - (xx + zz),
                        yz + wx,
                        xz + wy,
                        yz - wx,
                        1 - (xx + yy),
                    ]);
                    return dest;
                }
                toMat4(dest) {
                    if (!dest) {
                        dest = new mat4_1.default();
                    }
                    const x = this.x;
                    const y = this.y;
                    const z = this.z;
                    const w = this.w;
                    const x2 = x + x;
                    const y2 = y + y;
                    const z2 = z + z;
                    const xx = x * x2;
                    const xy = x * y2;
                    const xz = x * z2;
                    const yy = y * y2;
                    const yz = y * z2;
                    const zz = z * z2;
                    const wx = w * x2;
                    const wy = w * y2;
                    const wz = w * z2;
                    dest.init([
                        1 - (yy + zz),
                        xy + wz,
                        xz - wy,
                        0,
                        xy - wz,
                        1 - (xx + zz),
                        yz + wx,
                        0,
                        xz + wy,
                        yz - wx,
                        1 - (xx + yy),
                        0,
                        0,
                        0,
                        0,
                        1,
                    ]);
                    return dest;
                }
                static dot(q1, q2) {
                    return q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;
                }
                static sum(q1, q2, dest) {
                    if (!dest) {
                        dest = new quat();
                    }
                    dest.x = q1.x + q2.x;
                    dest.y = q1.y + q2.y;
                    dest.z = q1.z + q2.z;
                    dest.w = q1.w + q2.w;
                    return dest;
                }
                static product(q1, q2, dest) {
                    if (!dest) {
                        dest = new quat();
                    }
                    const q1x = q1.x;
                    const q1y = q1.y;
                    const q1z = q1.z;
                    const q1w = q1.w;
                    const q2x = q2.x;
                    const q2y = q2.y;
                    const q2z = q2.z;
                    const q2w = q2.w;
                    dest.x = q1x * q2w + q1w * q2x + q1y * q2z - q1z * q2y;
                    dest.y = q1y * q2w + q1w * q2y + q1z * q2x - q1x * q2z;
                    dest.z = q1z * q2w + q1w * q2z + q1x * q2y - q1y * q2x;
                    dest.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;
                    return dest;
                }
                static cross(q1, q2, dest) {
                    if (!dest) {
                        dest = new quat();
                    }
                    const q1x = q1.x;
                    const q1y = q1.y;
                    const q1z = q1.z;
                    const q1w = q1.w;
                    const q2x = q2.x;
                    const q2y = q2.y;
                    const q2z = q2.z;
                    const q2w = q2.w;
                    dest.x = q1w * q2z + q1z * q2w + q1x * q2y - q1y * q2x;
                    dest.y = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;
                    dest.z = q1w * q2x + q1x * q2w + q1y * q2z - q1z * q2y;
                    dest.w = q1w * q2y + q1y * q2w + q1z * q2x - q1x * q2z;
                    return dest;
                }
                static shortMix(q1, q2, time, dest) {
                    if (!dest) {
                        dest = new quat();
                    }
                    if (time <= 0.0) {
                        dest.xyzw = q1.xyzw;
                        return dest;
                    }
                    else if (time >= 1.0) {
                        dest.xyzw = q2.xyzw;
                        return dest;
                    }
                    let cos = quat.dot(q1, q2);
                    const q2a = q2.copy();
                    if (cos < 0.0) {
                        q2a.inverse();
                        cos = -cos;
                    }
                    let k0;
                    let k1;
                    if (cos > 0.9999) {
                        k0 = 1 - time;
                        k1 = 0 + time;
                    }
                    else {
                        const sin = Math.sqrt(1 - cos * cos);
                        const angle = Math.atan2(sin, cos);
                        const oneOverSin = 1 / sin;
                        k0 = Math.sin((1 - time) * angle) * oneOverSin;
                        k1 = Math.sin((0 + time) * angle) * oneOverSin;
                    }
                    dest.x = k0 * q1.x + k1 * q2a.x;
                    dest.y = k0 * q1.y + k1 * q2a.y;
                    dest.z = k0 * q1.z + k1 * q2a.z;
                    dest.w = k0 * q1.w + k1 * q2a.w;
                    return dest;
                }
                static mix(q1, q2, time, dest) {
                    if (!dest) {
                        dest = new quat();
                    }
                    const cosHalfTheta = q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;
                    if (Math.abs(cosHalfTheta) >= 1.0) {
                        dest.xyzw = q1.xyzw;
                        return dest;
                    }
                    const halfTheta = Math.acos(cosHalfTheta);
                    const sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);
                    if (Math.abs(sinHalfTheta) < 0.001) {
                        dest.x = q1.x * 0.5 + q2.x * 0.5;
                        dest.y = q1.y * 0.5 + q2.y * 0.5;
                        dest.z = q1.z * 0.5 + q2.z * 0.5;
                        dest.w = q1.w * 0.5 + q2.w * 0.5;
                        return dest;
                    }
                    const ratioA = Math.sin((1 - time) * halfTheta) / sinHalfTheta;
                    const ratioB = Math.sin(time * halfTheta) / sinHalfTheta;
                    dest.x = q1.x * ratioA + q2.x * ratioB;
                    dest.y = q1.y * ratioA + q2.y * ratioB;
                    dest.z = q1.z * ratioA + q2.z * ratioB;
                    dest.w = q1.w * ratioA + q2.w * ratioB;
                    return dest;
                }
                static fromAxisAngle(axis, angle, dest) {
                    if (!dest) {
                        dest = new quat();
                    }
                    angle *= 0.5;
                    const sin = Math.sin(angle);
                    dest.x = axis.x * sin;
                    dest.y = axis.y * sin;
                    dest.z = axis.z * sin;
                    dest.w = Math.cos(angle);
                    return dest;
                }
            };
            exports_4("default", quat);
            quat.identity = new quat().setIdentity();
        }
    };
});
System.register("lib/tsm/src/vec3", ["lib/tsm/src/quat", "lib/tsm/src/constants"], function (exports_5, context_5) {
    "use strict";
    var quat_1, constants_2, vec3;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (quat_1_1) {
                quat_1 = quat_1_1;
            },
            function (constants_2_1) {
                constants_2 = constants_2_1;
            }
        ],
        execute: function () {
            vec3 = class vec3 {
                constructor(values) {
                    this.values = new Float32Array(3);
                    if (values !== undefined) {
                        this.xyz = values;
                    }
                }
                get x() {
                    return this.values[0];
                }
                get y() {
                    return this.values[1];
                }
                get z() {
                    return this.values[2];
                }
                get xy() {
                    return [
                        this.values[0],
                        this.values[1],
                    ];
                }
                get xyz() {
                    return [
                        this.values[0],
                        this.values[1],
                        this.values[2],
                    ];
                }
                set x(value) {
                    this.values[0] = value;
                }
                set y(value) {
                    this.values[1] = value;
                }
                set z(value) {
                    this.values[2] = value;
                }
                set xy(values) {
                    this.values[0] = values[0];
                    this.values[1] = values[1];
                }
                set xyz(values) {
                    this.values[0] = values[0];
                    this.values[1] = values[1];
                    this.values[2] = values[2];
                }
                at(index) {
                    return this.values[index];
                }
                reset() {
                    this.x = 0;
                    this.y = 0;
                    this.z = 0;
                }
                copy(dest) {
                    if (!dest) {
                        dest = new vec3();
                    }
                    dest.x = this.x;
                    dest.y = this.y;
                    dest.z = this.z;
                    return dest;
                }
                negate(dest) {
                    if (!dest) {
                        dest = this;
                    }
                    dest.x = -this.x;
                    dest.y = -this.y;
                    dest.z = -this.z;
                    return dest;
                }
                equals(vector, threshold = constants_2.epsilon) {
                    if (Math.abs(this.x - vector.x) > threshold) {
                        return false;
                    }
                    if (Math.abs(this.y - vector.y) > threshold) {
                        return false;
                    }
                    if (Math.abs(this.z - vector.z) > threshold) {
                        return false;
                    }
                    return true;
                }
                length() {
                    return Math.sqrt(this.squaredLength());
                }
                squaredLength() {
                    const x = this.x;
                    const y = this.y;
                    const z = this.z;
                    return (x * x + y * y + z * z);
                }
                add(vector) {
                    this.x += vector.x;
                    this.y += vector.y;
                    this.z += vector.z;
                    return this;
                }
                subtract(vector) {
                    this.x -= vector.x;
                    this.y -= vector.y;
                    this.z -= vector.z;
                    return this;
                }
                multiply(vector) {
                    this.x *= vector.x;
                    this.y *= vector.y;
                    this.z *= vector.z;
                    return this;
                }
                divide(vector) {
                    this.x /= vector.x;
                    this.y /= vector.y;
                    this.z /= vector.z;
                    return this;
                }
                scale(value, dest) {
                    if (!dest) {
                        dest = this;
                    }
                    dest.x *= value;
                    dest.y *= value;
                    dest.z *= value;
                    return dest;
                }
                normalize(dest) {
                    if (!dest) {
                        dest = this;
                    }
                    let length = this.length();
                    if (length === 1) {
                        return this;
                    }
                    if (length === 0) {
                        dest.x = 0;
                        dest.y = 0;
                        dest.z = 0;
                        return dest;
                    }
                    length = 1.0 / length;
                    dest.x *= length;
                    dest.y *= length;
                    dest.z *= length;
                    return dest;
                }
                multiplyByMat3(matrix, dest) {
                    if (!dest) {
                        dest = this;
                    }
                    return matrix.multiplyVec3(this, dest);
                }
                multiplyByQuat(quaternion, dest) {
                    if (!dest) {
                        dest = this;
                    }
                    return quaternion.multiplyVec3(this, dest);
                }
                toQuat(dest) {
                    if (!dest) {
                        dest = new quat_1.default();
                    }
                    const c = new vec3();
                    const s = new vec3();
                    c.x = Math.cos(this.x * 0.5);
                    s.x = Math.sin(this.x * 0.5);
                    c.y = Math.cos(this.y * 0.5);
                    s.y = Math.sin(this.y * 0.5);
                    c.z = Math.cos(this.z * 0.5);
                    s.z = Math.sin(this.z * 0.5);
                    dest.x = s.x * c.y * c.z - c.x * s.y * s.z;
                    dest.y = c.x * s.y * c.z + s.x * c.y * s.z;
                    dest.z = c.x * c.y * s.z - s.x * s.y * c.z;
                    dest.w = c.x * c.y * c.z + s.x * s.y * s.z;
                    return dest;
                }
                static cross(vector, vector2, dest) {
                    if (!dest) {
                        dest = new vec3();
                    }
                    const x = vector.x;
                    const y = vector.y;
                    const z = vector.z;
                    const x2 = vector2.x;
                    const y2 = vector2.y;
                    const z2 = vector2.z;
                    dest.x = y * z2 - z * y2;
                    dest.y = z * x2 - x * z2;
                    dest.z = x * y2 - y * x2;
                    return dest;
                }
                static dot(vector, vector2) {
                    const x = vector.x;
                    const y = vector.y;
                    const z = vector.z;
                    const x2 = vector2.x;
                    const y2 = vector2.y;
                    const z2 = vector2.z;
                    return (x * x2 + y * y2 + z * z2);
                }
                static distance(vector, vector2) {
                    const x = vector2.x - vector.x;
                    const y = vector2.y - vector.y;
                    const z = vector2.z - vector.z;
                    return Math.sqrt(this.squaredDistance(vector, vector2));
                }
                static squaredDistance(vector, vector2) {
                    const x = vector2.x - vector.x;
                    const y = vector2.y - vector.y;
                    const z = vector2.z - vector.z;
                    return (x * x + y * y + z * z);
                }
                static direction(vector, vector2, dest) {
                    if (!dest) {
                        dest = new vec3();
                    }
                    const x = vector.x - vector2.x;
                    const y = vector.y - vector2.y;
                    const z = vector.z - vector2.z;
                    let length = Math.sqrt(x * x + y * y + z * z);
                    if (length === 0) {
                        dest.x = 0;
                        dest.y = 0;
                        dest.z = 0;
                        return dest;
                    }
                    length = 1 / length;
                    dest.x = x * length;
                    dest.y = y * length;
                    dest.z = z * length;
                    return dest;
                }
                static mix(vector, vector2, time, dest) {
                    if (!dest) {
                        dest = new vec3();
                    }
                    dest.x = vector.x + time * (vector2.x - vector.x);
                    dest.y = vector.y + time * (vector2.y - vector.y);
                    dest.z = vector.z + time * (vector2.z - vector.z);
                    return dest;
                }
                static sum(vector, vector2, dest) {
                    if (!dest) {
                        dest = new vec3();
                    }
                    dest.x = vector.x + vector2.x;
                    dest.y = vector.y + vector2.y;
                    dest.z = vector.z + vector2.z;
                    return dest;
                }
                static difference(vector, vector2, dest) {
                    if (!dest) {
                        dest = new vec3();
                    }
                    dest.x = vector.x - vector2.x;
                    dest.y = vector.y - vector2.y;
                    dest.z = vector.z - vector2.z;
                    return dest;
                }
                static product(vector, vector2, dest) {
                    if (!dest) {
                        dest = new vec3();
                    }
                    dest.x = vector.x * vector2.x;
                    dest.y = vector.y * vector2.y;
                    dest.z = vector.z * vector2.z;
                    return dest;
                }
                static quotient(vector, vector2, dest) {
                    if (!dest) {
                        dest = new vec3();
                    }
                    dest.x = vector.x / vector2.x;
                    dest.y = vector.y / vector2.y;
                    dest.z = vector.z / vector2.z;
                    return dest;
                }
            };
            exports_5("default", vec3);
            vec3.zero = new vec3([0, 0, 0]);
            vec3.one = new vec3([1, 1, 1]);
            vec3.up = new vec3([0, 1, 0]);
            vec3.right = new vec3([1, 0, 0]);
            vec3.forward = new vec3([0, 0, 1]);
        }
    };
});
System.register("lib/tsm/src/vec4", ["lib/tsm/src/constants"], function (exports_6, context_6) {
    "use strict";
    var constants_3, vec4;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (constants_3_1) {
                constants_3 = constants_3_1;
            }
        ],
        execute: function () {
            vec4 = class vec4 {
                constructor(values) {
                    this.values = new Float32Array(4);
                    if (values !== undefined) {
                        this.xyzw = values;
                    }
                }
                get x() {
                    return this.values[0];
                }
                get y() {
                    return this.values[1];
                }
                get z() {
                    return this.values[2];
                }
                get w() {
                    return this.values[3];
                }
                get xy() {
                    return [
                        this.values[0],
                        this.values[1],
                    ];
                }
                get xyz() {
                    return [
                        this.values[0],
                        this.values[1],
                        this.values[2],
                    ];
                }
                get xyzw() {
                    return [
                        this.values[0],
                        this.values[1],
                        this.values[2],
                        this.values[3],
                    ];
                }
                set x(value) {
                    this.values[0] = value;
                }
                set y(value) {
                    this.values[1] = value;
                }
                set z(value) {
                    this.values[2] = value;
                }
                set w(value) {
                    this.values[3] = value;
                }
                set xy(values) {
                    this.values[0] = values[0];
                    this.values[1] = values[1];
                }
                set xyz(values) {
                    this.values[0] = values[0];
                    this.values[1] = values[1];
                    this.values[2] = values[2];
                }
                set xyzw(values) {
                    this.values[0] = values[0];
                    this.values[1] = values[1];
                    this.values[2] = values[2];
                    this.values[3] = values[3];
                }
                get r() {
                    return this.values[0];
                }
                get g() {
                    return this.values[1];
                }
                get b() {
                    return this.values[2];
                }
                get a() {
                    return this.values[3];
                }
                get rg() {
                    return [
                        this.values[0],
                        this.values[1],
                    ];
                }
                get rgb() {
                    return [
                        this.values[0],
                        this.values[1],
                        this.values[2],
                    ];
                }
                get rgba() {
                    return [
                        this.values[0],
                        this.values[1],
                        this.values[2],
                        this.values[3],
                    ];
                }
                set r(value) {
                    this.values[0] = value;
                }
                set g(value) {
                    this.values[1] = value;
                }
                set b(value) {
                    this.values[2] = value;
                }
                set a(value) {
                    this.values[3] = value;
                }
                set rg(values) {
                    this.values[0] = values[0];
                    this.values[1] = values[1];
                }
                set rgb(values) {
                    this.values[0] = values[0];
                    this.values[1] = values[1];
                    this.values[2] = values[2];
                }
                set rgba(values) {
                    this.values[0] = values[0];
                    this.values[1] = values[1];
                    this.values[2] = values[2];
                    this.values[3] = values[3];
                }
                at(index) {
                    return this.values[index];
                }
                reset() {
                    this.x = 0;
                    this.y = 0;
                    this.z = 0;
                    this.w = 0;
                }
                copy(dest) {
                    if (!dest) {
                        dest = new vec4();
                    }
                    dest.x = this.x;
                    dest.y = this.y;
                    dest.z = this.z;
                    dest.w = this.w;
                    return dest;
                }
                negate(dest) {
                    if (!dest) {
                        dest = this;
                    }
                    dest.x = -this.x;
                    dest.y = -this.y;
                    dest.z = -this.z;
                    dest.w = -this.w;
                    return dest;
                }
                equals(vector, threshold = constants_3.epsilon) {
                    if (Math.abs(this.x - vector.x) > threshold) {
                        return false;
                    }
                    if (Math.abs(this.y - vector.y) > threshold) {
                        return false;
                    }
                    if (Math.abs(this.z - vector.z) > threshold) {
                        return false;
                    }
                    if (Math.abs(this.w - vector.w) > threshold) {
                        return false;
                    }
                    return true;
                }
                length() {
                    return Math.sqrt(this.squaredLength());
                }
                squaredLength() {
                    const x = this.x;
                    const y = this.y;
                    const z = this.z;
                    const w = this.w;
                    return (x * x + y * y + z * z + w * w);
                }
                add(vector) {
                    this.x += vector.x;
                    this.y += vector.y;
                    this.z += vector.z;
                    this.w += vector.w;
                    return this;
                }
                subtract(vector) {
                    this.x -= vector.x;
                    this.y -= vector.y;
                    this.z -= vector.z;
                    this.w -= vector.w;
                    return this;
                }
                multiply(vector) {
                    this.x *= vector.x;
                    this.y *= vector.y;
                    this.z *= vector.z;
                    this.w *= vector.w;
                    return this;
                }
                divide(vector) {
                    this.x /= vector.x;
                    this.y /= vector.y;
                    this.z /= vector.z;
                    this.w /= vector.w;
                    return this;
                }
                scale(value, dest) {
                    if (!dest) {
                        dest = this;
                    }
                    dest.x *= value;
                    dest.y *= value;
                    dest.z *= value;
                    dest.w *= value;
                    return dest;
                }
                normalize(dest) {
                    if (!dest) {
                        dest = this;
                    }
                    let length = this.length();
                    if (length === 1) {
                        return this;
                    }
                    if (length === 0) {
                        dest.x *= 0;
                        dest.y *= 0;
                        dest.z *= 0;
                        dest.w *= 0;
                        return dest;
                    }
                    length = 1.0 / length;
                    dest.x *= length;
                    dest.y *= length;
                    dest.z *= length;
                    dest.w *= length;
                    return dest;
                }
                multiplyMat4(matrix, dest) {
                    if (!dest) {
                        dest = this;
                    }
                    return matrix.multiplyVec4(this, dest);
                }
                static mix(vector, vector2, time, dest) {
                    if (!dest) {
                        dest = new vec4();
                    }
                    dest.x = vector.x + time * (vector2.x - vector.x);
                    dest.y = vector.y + time * (vector2.y - vector.y);
                    dest.z = vector.z + time * (vector2.z - vector.z);
                    dest.w = vector.w + time * (vector2.w - vector.w);
                    return dest;
                }
                static sum(vector, vector2, dest) {
                    if (!dest) {
                        dest = new vec4();
                    }
                    dest.x = vector.x + vector2.x;
                    dest.y = vector.y + vector2.y;
                    dest.z = vector.z + vector2.z;
                    dest.w = vector.w + vector2.w;
                    return dest;
                }
                static difference(vector, vector2, dest) {
                    if (!dest) {
                        dest = new vec4();
                    }
                    dest.x = vector.x - vector2.x;
                    dest.y = vector.y - vector2.y;
                    dest.z = vector.z - vector2.z;
                    dest.w = vector.w - vector2.w;
                    return dest;
                }
                static product(vector, vector2, dest) {
                    if (!dest) {
                        dest = new vec4();
                    }
                    dest.x = vector.x * vector2.x;
                    dest.y = vector.y * vector2.y;
                    dest.z = vector.z * vector2.z;
                    dest.w = vector.w * vector2.w;
                    return dest;
                }
                static quotient(vector, vector2, dest) {
                    if (!dest) {
                        dest = new vec4();
                    }
                    dest.x = vector.x / vector2.x;
                    dest.y = vector.y / vector2.y;
                    dest.z = vector.z / vector2.z;
                    dest.w = vector.w / vector2.w;
                    return dest;
                }
            };
            exports_6("default", vec4);
            vec4.zero = new vec4([0, 0, 0, 1]);
            vec4.one = new vec4([1, 1, 1, 1]);
        }
    };
});
System.register("lib/tsm/src/mat4", ["lib/tsm/src/mat3", "lib/tsm/src/vec3", "lib/tsm/src/vec4", "lib/tsm/src/constants"], function (exports_7, context_7) {
    "use strict";
    var mat3_2, vec3_2, vec4_1, constants_4, mat4;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (mat3_2_1) {
                mat3_2 = mat3_2_1;
            },
            function (vec3_2_1) {
                vec3_2 = vec3_2_1;
            },
            function (vec4_1_1) {
                vec4_1 = vec4_1_1;
            },
            function (constants_4_1) {
                constants_4 = constants_4_1;
            }
        ],
        execute: function () {
            mat4 = class mat4 {
                constructor(values) {
                    this.values = new Float32Array(16);
                    if (values !== undefined) {
                        this.init(values);
                    }
                }
                at(index) {
                    return this.values[index];
                }
                init(values) {
                    for (let i = 0; i < 16; i++) {
                        this.values[i] = values[i];
                    }
                    return this;
                }
                reset() {
                    for (let i = 0; i < 16; i++) {
                        this.values[i] = 0;
                    }
                }
                copy(dest) {
                    if (!dest) {
                        dest = new mat4();
                    }
                    for (let i = 0; i < 16; i++) {
                        dest.values[i] = this.values[i];
                    }
                    return dest;
                }
                all() {
                    const data = [];
                    for (let i = 0; i < 16; i++) {
                        data[i] = this.values[i];
                    }
                    return data;
                }
                row(index) {
                    return [
                        this.values[index * 4 + 0],
                        this.values[index * 4 + 1],
                        this.values[index * 4 + 2],
                        this.values[index * 4 + 3],
                    ];
                }
                col(index) {
                    return [
                        this.values[index],
                        this.values[index + 4],
                        this.values[index + 8],
                        this.values[index + 12],
                    ];
                }
                equals(matrix, threshold = constants_4.epsilon) {
                    for (let i = 0; i < 16; i++) {
                        if (Math.abs(this.values[i] - matrix.at(i)) > threshold) {
                            return false;
                        }
                    }
                    return true;
                }
                determinant() {
                    const a00 = this.values[0];
                    const a01 = this.values[1];
                    const a02 = this.values[2];
                    const a03 = this.values[3];
                    const a10 = this.values[4];
                    const a11 = this.values[5];
                    const a12 = this.values[6];
                    const a13 = this.values[7];
                    const a20 = this.values[8];
                    const a21 = this.values[9];
                    const a22 = this.values[10];
                    const a23 = this.values[11];
                    const a30 = this.values[12];
                    const a31 = this.values[13];
                    const a32 = this.values[14];
                    const a33 = this.values[15];
                    const det00 = a00 * a11 - a01 * a10;
                    const det01 = a00 * a12 - a02 * a10;
                    const det02 = a00 * a13 - a03 * a10;
                    const det03 = a01 * a12 - a02 * a11;
                    const det04 = a01 * a13 - a03 * a11;
                    const det05 = a02 * a13 - a03 * a12;
                    const det06 = a20 * a31 - a21 * a30;
                    const det07 = a20 * a32 - a22 * a30;
                    const det08 = a20 * a33 - a23 * a30;
                    const det09 = a21 * a32 - a22 * a31;
                    const det10 = a21 * a33 - a23 * a31;
                    const det11 = a22 * a33 - a23 * a32;
                    return (det00 * det11 - det01 * det10 + det02 * det09 + det03 * det08 - det04 * det07 + det05 * det06);
                }
                setIdentity() {
                    this.values[0] = 1;
                    this.values[1] = 0;
                    this.values[2] = 0;
                    this.values[3] = 0;
                    this.values[4] = 0;
                    this.values[5] = 1;
                    this.values[6] = 0;
                    this.values[7] = 0;
                    this.values[8] = 0;
                    this.values[9] = 0;
                    this.values[10] = 1;
                    this.values[11] = 0;
                    this.values[12] = 0;
                    this.values[13] = 0;
                    this.values[14] = 0;
                    this.values[15] = 1;
                    return this;
                }
                transpose() {
                    const temp01 = this.values[1];
                    const temp02 = this.values[2];
                    const temp03 = this.values[3];
                    const temp12 = this.values[6];
                    const temp13 = this.values[7];
                    const temp23 = this.values[11];
                    this.values[1] = this.values[4];
                    this.values[2] = this.values[8];
                    this.values[3] = this.values[12];
                    this.values[4] = temp01;
                    this.values[6] = this.values[9];
                    this.values[7] = this.values[13];
                    this.values[8] = temp02;
                    this.values[9] = temp12;
                    this.values[11] = this.values[14];
                    this.values[12] = temp03;
                    this.values[13] = temp13;
                    this.values[14] = temp23;
                    return this;
                }
                inverse() {
                    const a00 = this.values[0];
                    const a01 = this.values[1];
                    const a02 = this.values[2];
                    const a03 = this.values[3];
                    const a10 = this.values[4];
                    const a11 = this.values[5];
                    const a12 = this.values[6];
                    const a13 = this.values[7];
                    const a20 = this.values[8];
                    const a21 = this.values[9];
                    const a22 = this.values[10];
                    const a23 = this.values[11];
                    const a30 = this.values[12];
                    const a31 = this.values[13];
                    const a32 = this.values[14];
                    const a33 = this.values[15];
                    const det00 = a00 * a11 - a01 * a10;
                    const det01 = a00 * a12 - a02 * a10;
                    const det02 = a00 * a13 - a03 * a10;
                    const det03 = a01 * a12 - a02 * a11;
                    const det04 = a01 * a13 - a03 * a11;
                    const det05 = a02 * a13 - a03 * a12;
                    const det06 = a20 * a31 - a21 * a30;
                    const det07 = a20 * a32 - a22 * a30;
                    const det08 = a20 * a33 - a23 * a30;
                    const det09 = a21 * a32 - a22 * a31;
                    const det10 = a21 * a33 - a23 * a31;
                    const det11 = a22 * a33 - a23 * a32;
                    let det = (det00 * det11 - det01 * det10 + det02 * det09 + det03 * det08 - det04 * det07 + det05 * det06);
                    if (!det) {
                        return null;
                    }
                    det = 1.0 / det;
                    this.values[0] = (a11 * det11 - a12 * det10 + a13 * det09) * det;
                    this.values[1] = (-a01 * det11 + a02 * det10 - a03 * det09) * det;
                    this.values[2] = (a31 * det05 - a32 * det04 + a33 * det03) * det;
                    this.values[3] = (-a21 * det05 + a22 * det04 - a23 * det03) * det;
                    this.values[4] = (-a10 * det11 + a12 * det08 - a13 * det07) * det;
                    this.values[5] = (a00 * det11 - a02 * det08 + a03 * det07) * det;
                    this.values[6] = (-a30 * det05 + a32 * det02 - a33 * det01) * det;
                    this.values[7] = (a20 * det05 - a22 * det02 + a23 * det01) * det;
                    this.values[8] = (a10 * det10 - a11 * det08 + a13 * det06) * det;
                    this.values[9] = (-a00 * det10 + a01 * det08 - a03 * det06) * det;
                    this.values[10] = (a30 * det04 - a31 * det02 + a33 * det00) * det;
                    this.values[11] = (-a20 * det04 + a21 * det02 - a23 * det00) * det;
                    this.values[12] = (-a10 * det09 + a11 * det07 - a12 * det06) * det;
                    this.values[13] = (a00 * det09 - a01 * det07 + a02 * det06) * det;
                    this.values[14] = (-a30 * det03 + a31 * det01 - a32 * det00) * det;
                    this.values[15] = (a20 * det03 - a21 * det01 + a22 * det00) * det;
                    return this;
                }
                multiply(matrix) {
                    const a00 = this.values[0];
                    const a01 = this.values[1];
                    const a02 = this.values[2];
                    const a03 = this.values[3];
                    const a10 = this.values[4];
                    const a11 = this.values[5];
                    const a12 = this.values[6];
                    const a13 = this.values[7];
                    const a20 = this.values[8];
                    const a21 = this.values[9];
                    const a22 = this.values[10];
                    const a23 = this.values[11];
                    const a30 = this.values[12];
                    const a31 = this.values[13];
                    const a32 = this.values[14];
                    const a33 = this.values[15];
                    let b0 = matrix.at(0);
                    let b1 = matrix.at(1);
                    let b2 = matrix.at(2);
                    let b3 = matrix.at(3);
                    this.values[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
                    this.values[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
                    this.values[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
                    this.values[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
                    b0 = matrix.at(4);
                    b1 = matrix.at(5);
                    b2 = matrix.at(6);
                    b3 = matrix.at(7);
                    this.values[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
                    this.values[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
                    this.values[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
                    this.values[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
                    b0 = matrix.at(8);
                    b1 = matrix.at(9);
                    b2 = matrix.at(10);
                    b3 = matrix.at(11);
                    this.values[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
                    this.values[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
                    this.values[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
                    this.values[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
                    b0 = matrix.at(12);
                    b1 = matrix.at(13);
                    b2 = matrix.at(14);
                    b3 = matrix.at(15);
                    this.values[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
                    this.values[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
                    this.values[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
                    this.values[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
                    return this;
                }
                multiplyVec3(vector) {
                    const x = vector.x;
                    const y = vector.y;
                    const z = vector.z;
                    return new vec3_2.default([
                        this.values[0] * x + this.values[4] * y + this.values[8] * z + this.values[12],
                        this.values[1] * x + this.values[5] * y + this.values[9] * z + this.values[13],
                        this.values[2] * x + this.values[6] * y + this.values[10] * z + this.values[14],
                    ]);
                }
                multiplyVec4(vector, dest) {
                    if (!dest) {
                        dest = new vec4_1.default();
                    }
                    const x = vector.x;
                    const y = vector.y;
                    const z = vector.z;
                    const w = vector.w;
                    dest.x = this.values[0] * x + this.values[4] * y + this.values[8] * z + this.values[12] * w;
                    dest.y = this.values[1] * x + this.values[5] * y + this.values[9] * z + this.values[13] * w;
                    dest.z = this.values[2] * x + this.values[6] * y + this.values[10] * z + this.values[14] * w;
                    dest.w = this.values[3] * x + this.values[7] * y + this.values[11] * z + this.values[15] * w;
                    return dest;
                }
                toMat3() {
                    return new mat3_2.default([
                        this.values[0],
                        this.values[1],
                        this.values[2],
                        this.values[4],
                        this.values[5],
                        this.values[6],
                        this.values[8],
                        this.values[9],
                        this.values[10],
                    ]);
                }
                toInverseMat3() {
                    const a00 = this.values[0];
                    const a01 = this.values[1];
                    const a02 = this.values[2];
                    const a10 = this.values[4];
                    const a11 = this.values[5];
                    const a12 = this.values[6];
                    const a20 = this.values[8];
                    const a21 = this.values[9];
                    const a22 = this.values[10];
                    const det01 = a22 * a11 - a12 * a21;
                    const det11 = -a22 * a10 + a12 * a20;
                    const det21 = a21 * a10 - a11 * a20;
                    let det = a00 * det01 + a01 * det11 + a02 * det21;
                    if (!det) {
                        return null;
                    }
                    det = 1.0 / det;
                    return new mat3_2.default([
                        det01 * det,
                        (-a22 * a01 + a02 * a21) * det,
                        (a12 * a01 - a02 * a11) * det,
                        det11 * det,
                        (a22 * a00 - a02 * a20) * det,
                        (-a12 * a00 + a02 * a10) * det,
                        det21 * det,
                        (-a21 * a00 + a01 * a20) * det,
                        (a11 * a00 - a01 * a10) * det,
                    ]);
                }
                translate(vector) {
                    const x = vector.x;
                    const y = vector.y;
                    const z = vector.z;
                    this.values[12] += this.values[0] * x + this.values[4] * y + this.values[8] * z;
                    this.values[13] += this.values[1] * x + this.values[5] * y + this.values[9] * z;
                    this.values[14] += this.values[2] * x + this.values[6] * y + this.values[10] * z;
                    this.values[15] += this.values[3] * x + this.values[7] * y + this.values[11] * z;
                    return this;
                }
                scale(vector) {
                    const x = vector.x;
                    const y = vector.y;
                    const z = vector.z;
                    this.values[0] *= x;
                    this.values[1] *= x;
                    this.values[2] *= x;
                    this.values[3] *= x;
                    this.values[4] *= y;
                    this.values[5] *= y;
                    this.values[6] *= y;
                    this.values[7] *= y;
                    this.values[8] *= z;
                    this.values[9] *= z;
                    this.values[10] *= z;
                    this.values[11] *= z;
                    return this;
                }
                rotate(angle, axis) {
                    let x = axis.x;
                    let y = axis.y;
                    let z = axis.z;
                    let length = Math.sqrt(x * x + y * y + z * z);
                    if (!length) {
                        return null;
                    }
                    if (length !== 1) {
                        length = 1 / length;
                        x *= length;
                        y *= length;
                        z *= length;
                    }
                    const s = Math.sin(angle);
                    const c = Math.cos(angle);
                    const t = 1.0 - c;
                    const a00 = this.values[0];
                    const a01 = this.values[1];
                    const a02 = this.values[2];
                    const a03 = this.values[3];
                    const a10 = this.values[4];
                    const a11 = this.values[5];
                    const a12 = this.values[6];
                    const a13 = this.values[7];
                    const a20 = this.values[8];
                    const a21 = this.values[9];
                    const a22 = this.values[10];
                    const a23 = this.values[11];
                    const b00 = x * x * t + c;
                    const b01 = y * x * t + z * s;
                    const b02 = z * x * t - y * s;
                    const b10 = x * y * t - z * s;
                    const b11 = y * y * t + c;
                    const b12 = z * y * t + x * s;
                    const b20 = x * z * t + y * s;
                    const b21 = y * z * t - x * s;
                    const b22 = z * z * t + c;
                    this.values[0] = a00 * b00 + a10 * b01 + a20 * b02;
                    this.values[1] = a01 * b00 + a11 * b01 + a21 * b02;
                    this.values[2] = a02 * b00 + a12 * b01 + a22 * b02;
                    this.values[3] = a03 * b00 + a13 * b01 + a23 * b02;
                    this.values[4] = a00 * b10 + a10 * b11 + a20 * b12;
                    this.values[5] = a01 * b10 + a11 * b11 + a21 * b12;
                    this.values[6] = a02 * b10 + a12 * b11 + a22 * b12;
                    this.values[7] = a03 * b10 + a13 * b11 + a23 * b12;
                    this.values[8] = a00 * b20 + a10 * b21 + a20 * b22;
                    this.values[9] = a01 * b20 + a11 * b21 + a21 * b22;
                    this.values[10] = a02 * b20 + a12 * b21 + a22 * b22;
                    this.values[11] = a03 * b20 + a13 * b21 + a23 * b22;
                    return this;
                }
                static frustum(left, right, bottom, top, near, far) {
                    const rl = (right - left);
                    const tb = (top - bottom);
                    const fn = (far - near);
                    return new mat4([
                        (near * 2) / rl,
                        0,
                        0,
                        0,
                        0,
                        (near * 2) / tb,
                        0,
                        0,
                        (right + left) / rl,
                        (top + bottom) / tb,
                        -(far + near) / fn,
                        -1,
                        0,
                        0,
                        -(far * near * 2) / fn,
                        0,
                    ]);
                }
                static perspective(fov, aspect, near, far) {
                    const top = near * Math.tan(fov * Math.PI / 360.0);
                    const right = top * aspect;
                    return mat4.frustum(-right, right, -top, top, near, far);
                }
                static orthographic(left, right, bottom, top, near, far) {
                    const rl = (right - left);
                    const tb = (top - bottom);
                    const fn = (far - near);
                    return new mat4([
                        2 / rl,
                        0,
                        0,
                        0,
                        0,
                        2 / tb,
                        0,
                        0,
                        0,
                        0,
                        -2 / fn,
                        0,
                        -(left + right) / rl,
                        -(top + bottom) / tb,
                        -(far + near) / fn,
                        1,
                    ]);
                }
                static lookAt(position, target, up = vec3_2.default.up) {
                    if (position.equals(target)) {
                        return this.identity;
                    }
                    const z = vec3_2.default.difference(position, target).normalize();
                    const x = vec3_2.default.cross(up, z).normalize();
                    const y = vec3_2.default.cross(z, x).normalize();
                    return new mat4([
                        x.x,
                        y.x,
                        z.x,
                        0,
                        x.y,
                        y.y,
                        z.y,
                        0,
                        x.z,
                        y.z,
                        z.z,
                        0,
                        -vec3_2.default.dot(x, position),
                        -vec3_2.default.dot(y, position),
                        -vec3_2.default.dot(z, position),
                        1,
                    ]);
                }
                static product(m1, m2, result) {
                    const a00 = m1.at(0);
                    const a01 = m1.at(1);
                    const a02 = m1.at(2);
                    const a03 = m1.at(3);
                    const a10 = m1.at(4);
                    const a11 = m1.at(5);
                    const a12 = m1.at(6);
                    const a13 = m1.at(7);
                    const a20 = m1.at(8);
                    const a21 = m1.at(9);
                    const a22 = m1.at(10);
                    const a23 = m1.at(11);
                    const a30 = m1.at(12);
                    const a31 = m1.at(13);
                    const a32 = m1.at(14);
                    const a33 = m1.at(15);
                    const b00 = m2.at(0);
                    const b01 = m2.at(1);
                    const b02 = m2.at(2);
                    const b03 = m2.at(3);
                    const b10 = m2.at(4);
                    const b11 = m2.at(5);
                    const b12 = m2.at(6);
                    const b13 = m2.at(7);
                    const b20 = m2.at(8);
                    const b21 = m2.at(9);
                    const b22 = m2.at(10);
                    const b23 = m2.at(11);
                    const b30 = m2.at(12);
                    const b31 = m2.at(13);
                    const b32 = m2.at(14);
                    const b33 = m2.at(15);
                    if (result) {
                        result.init([
                            b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
                            b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
                            b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
                            b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
                            b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
                            b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
                            b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
                            b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
                            b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
                            b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
                            b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
                            b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
                            b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
                            b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
                            b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
                            b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
                        ]);
                        return result;
                    }
                    else {
                        return new mat4([
                            b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
                            b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
                            b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
                            b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
                            b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
                            b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
                            b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
                            b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
                            b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
                            b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
                            b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
                            b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
                            b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
                            b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
                            b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
                            b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
                        ]);
                    }
                }
            };
            exports_7("default", mat4);
            mat4.identity = new mat4().setIdentity();
        }
    };
});
System.register("lib/tsm/src/mat2", ["lib/tsm/src/vec2", "lib/tsm/src/constants"], function (exports_8, context_8) {
    "use strict";
    var vec2_1, constants_5, mat2;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (vec2_1_1) {
                vec2_1 = vec2_1_1;
            },
            function (constants_5_1) {
                constants_5 = constants_5_1;
            }
        ],
        execute: function () {
            mat2 = class mat2 {
                constructor(values) {
                    this.values = new Float32Array(4);
                    if (values !== undefined) {
                        this.init(values);
                    }
                }
                at(index) {
                    return this.values[index];
                }
                init(values) {
                    for (let i = 0; i < 4; i++) {
                        this.values[i] = values[i];
                    }
                    return this;
                }
                reset() {
                    for (let i = 0; i < 4; i++) {
                        this.values[i] = 0;
                    }
                }
                copy(dest) {
                    if (!dest) {
                        dest = new mat2();
                    }
                    for (let i = 0; i < 4; i++) {
                        dest.values[i] = this.values[i];
                    }
                    return dest;
                }
                all() {
                    const data = [];
                    for (let i = 0; i < 4; i++) {
                        data[i] = this.values[i];
                    }
                    return data;
                }
                row(index) {
                    return [
                        this.values[index * 2 + 0],
                        this.values[index * 2 + 1],
                    ];
                }
                col(index) {
                    return [
                        this.values[index],
                        this.values[index + 2],
                    ];
                }
                equals(matrix, threshold = constants_5.epsilon) {
                    for (let i = 0; i < 4; i++) {
                        if (Math.abs(this.values[i] - matrix.at(i)) > threshold) {
                            return false;
                        }
                    }
                    return true;
                }
                determinant() {
                    return this.values[0] * this.values[3] - this.values[2] * this.values[1];
                }
                setIdentity() {
                    this.values[0] = 1;
                    this.values[1] = 0;
                    this.values[2] = 0;
                    this.values[3] = 1;
                    return this;
                }
                transpose() {
                    const temp = this.values[1];
                    this.values[1] = this.values[2];
                    this.values[2] = temp;
                    return this;
                }
                inverse() {
                    let det = this.determinant();
                    if (!det) {
                        return null;
                    }
                    det = 1.0 / det;
                    const a11 = this.values[0];
                    this.values[0] = det * (this.values[3]);
                    this.values[1] = det * (-this.values[1]);
                    this.values[2] = det * (-this.values[2]);
                    this.values[3] = det * a11;
                    return this;
                }
                multiply(matrix) {
                    const a11 = this.values[0];
                    const a12 = this.values[1];
                    const a21 = this.values[2];
                    const a22 = this.values[3];
                    this.values[0] = a11 * matrix.at(0) + a12 * matrix.at(2);
                    this.values[1] = a11 * matrix.at(1) + a12 * matrix.at(3);
                    this.values[2] = a21 * matrix.at(0) + a22 * matrix.at(2);
                    this.values[3] = a21 * matrix.at(1) + a22 * matrix.at(3);
                    return this;
                }
                rotate(angle) {
                    const a11 = this.values[0];
                    const a12 = this.values[1];
                    const a21 = this.values[2];
                    const a22 = this.values[3];
                    const sin = Math.sin(angle);
                    const cos = Math.cos(angle);
                    this.values[0] = a11 * cos + a12 * sin;
                    this.values[1] = a11 * -sin + a12 * cos;
                    this.values[2] = a21 * cos + a22 * sin;
                    this.values[3] = a21 * -sin + a22 * cos;
                    return this;
                }
                multiplyVec2(vector, result) {
                    const x = vector.x;
                    const y = vector.y;
                    if (result) {
                        result.xy = [
                            x * this.values[0] + y * this.values[1],
                            x * this.values[2] + y * this.values[3],
                        ];
                        return result;
                    }
                    else {
                        return new vec2_1.default([
                            x * this.values[0] + y * this.values[1],
                            x * this.values[2] + y * this.values[3],
                        ]);
                    }
                }
                scale(vector) {
                    const a11 = this.values[0];
                    const a12 = this.values[1];
                    const a21 = this.values[2];
                    const a22 = this.values[3];
                    const x = vector.x;
                    const y = vector.y;
                    this.values[0] = a11 * x;
                    this.values[1] = a12 * y;
                    this.values[2] = a21 * x;
                    this.values[3] = a22 * y;
                    return this;
                }
                static product(m1, m2, result) {
                    const a11 = m1.at(0);
                    const a12 = m1.at(1);
                    const a21 = m1.at(2);
                    const a22 = m1.at(3);
                    if (result) {
                        result.init([
                            a11 * m2.at(0) + a12 * m2.at(2),
                            a11 * m2.at(1) + a12 * m2.at(3),
                            a21 * m2.at(0) + a22 * m2.at(2),
                            a21 * m2.at(1) + a22 * m2.at(3),
                        ]);
                        return result;
                    }
                    else {
                        return new mat2([
                            a11 * m2.at(0) + a12 * m2.at(2),
                            a11 * m2.at(1) + a12 * m2.at(3),
                            a21 * m2.at(0) + a22 * m2.at(2),
                            a21 * m2.at(1) + a22 * m2.at(3),
                        ]);
                    }
                }
            };
            exports_8("default", mat2);
            mat2.identity = new mat2().setIdentity();
        }
    };
});
System.register("lib/tsm/src/vec2", ["lib/tsm/src/vec3", "lib/tsm/src/constants"], function (exports_9, context_9) {
    "use strict";
    var vec3_3, constants_6, vec2;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (vec3_3_1) {
                vec3_3 = vec3_3_1;
            },
            function (constants_6_1) {
                constants_6 = constants_6_1;
            }
        ],
        execute: function () {
            vec2 = class vec2 {
                constructor(values) {
                    this.values = new Float32Array(2);
                    if (values !== undefined) {
                        this.xy = values;
                    }
                }
                get x() {
                    return this.values[0];
                }
                get y() {
                    return this.values[1];
                }
                get xy() {
                    return [
                        this.values[0],
                        this.values[1],
                    ];
                }
                set x(value) {
                    this.values[0] = value;
                }
                set y(value) {
                    this.values[1] = value;
                }
                set xy(values) {
                    this.values[0] = values[0];
                    this.values[1] = values[1];
                }
                at(index) {
                    return this.values[index];
                }
                reset() {
                    this.x = 0;
                    this.y = 0;
                }
                copy(dest) {
                    if (!dest) {
                        dest = new vec2();
                    }
                    dest.x = this.x;
                    dest.y = this.y;
                    return dest;
                }
                negate(dest) {
                    if (!dest) {
                        dest = this;
                    }
                    dest.x = -this.x;
                    dest.y = -this.y;
                    return dest;
                }
                equals(vector, threshold = constants_6.epsilon) {
                    if (Math.abs(this.x - vector.x) > threshold) {
                        return false;
                    }
                    if (Math.abs(this.y - vector.y) > threshold) {
                        return false;
                    }
                    return true;
                }
                length() {
                    return Math.sqrt(this.squaredLength());
                }
                squaredLength() {
                    const x = this.x;
                    const y = this.y;
                    return (x * x + y * y);
                }
                add(vector) {
                    this.x += vector.x;
                    this.y += vector.y;
                    return this;
                }
                subtract(vector) {
                    this.x -= vector.x;
                    this.y -= vector.y;
                    return this;
                }
                multiply(vector) {
                    this.x *= vector.x;
                    this.y *= vector.y;
                    return this;
                }
                divide(vector) {
                    this.x /= vector.x;
                    this.y /= vector.y;
                    return this;
                }
                scale(value, dest) {
                    if (!dest) {
                        dest = this;
                    }
                    dest.x *= value;
                    dest.y *= value;
                    return dest;
                }
                normalize(dest) {
                    if (!dest) {
                        dest = this;
                    }
                    let length = this.length();
                    if (length === 1) {
                        return this;
                    }
                    if (length === 0) {
                        dest.x = 0;
                        dest.y = 0;
                        return dest;
                    }
                    length = 1.0 / length;
                    dest.x *= length;
                    dest.y *= length;
                    return dest;
                }
                multiplyMat2(matrix, dest) {
                    if (!dest) {
                        dest = this;
                    }
                    return matrix.multiplyVec2(this, dest);
                }
                multiplyMat3(matrix, dest) {
                    if (!dest) {
                        dest = this;
                    }
                    return matrix.multiplyVec2(this, dest);
                }
                static cross(vector, vector2, dest) {
                    if (!dest) {
                        dest = new vec3_3.default();
                    }
                    const x = vector.x;
                    const y = vector.y;
                    const x2 = vector2.x;
                    const y2 = vector2.y;
                    const z = x * y2 - y * x2;
                    dest.x = 0;
                    dest.y = 0;
                    dest.z = z;
                    return dest;
                }
                static dot(vector, vector2) {
                    return (vector.x * vector2.x + vector.y * vector2.y);
                }
                static distance(vector, vector2) {
                    return Math.sqrt(this.squaredDistance(vector, vector2));
                }
                static squaredDistance(vector, vector2) {
                    const x = vector2.x - vector.x;
                    const y = vector2.y - vector.y;
                    return (x * x + y * y);
                }
                static direction(vector, vector2, dest) {
                    if (!dest) {
                        dest = new vec2();
                    }
                    const x = vector.x - vector2.x;
                    const y = vector.y - vector2.y;
                    let length = Math.sqrt(x * x + y * y);
                    if (length === 0) {
                        dest.x = 0;
                        dest.y = 0;
                        return dest;
                    }
                    length = 1 / length;
                    dest.x = x * length;
                    dest.y = y * length;
                    return dest;
                }
                static mix(vector, vector2, time, dest) {
                    if (!dest) {
                        dest = new vec2();
                    }
                    const x = vector.x;
                    const y = vector.y;
                    const x2 = vector2.x;
                    const y2 = vector2.y;
                    dest.x = x + time * (x2 - x);
                    dest.y = y + time * (y2 - y);
                    return dest;
                }
                static sum(vector, vector2, dest) {
                    if (!dest) {
                        dest = new vec2();
                    }
                    dest.x = vector.x + vector2.x;
                    dest.y = vector.y + vector2.y;
                    return dest;
                }
                static difference(vector, vector2, dest) {
                    if (!dest) {
                        dest = new vec2();
                    }
                    dest.x = vector.x - vector2.x;
                    dest.y = vector.y - vector2.y;
                    return dest;
                }
                static product(vector, vector2, dest) {
                    if (!dest) {
                        dest = new vec2();
                    }
                    dest.x = vector.x * vector2.x;
                    dest.y = vector.y * vector2.y;
                    return dest;
                }
                static quotient(vector, vector2, dest) {
                    if (!dest) {
                        dest = new vec2();
                    }
                    dest.x = vector.x / vector2.x;
                    dest.y = vector.y / vector2.y;
                    return dest;
                }
            };
            exports_9("default", vec2);
            vec2.zero = new vec2([0, 0]);
            vec2.one = new vec2([1, 1]);
        }
    };
});
System.register("lib/tsm/src/mat3", ["lib/tsm/src/mat4", "lib/tsm/src/quat", "lib/tsm/src/vec2", "lib/tsm/src/vec3", "lib/tsm/src/constants"], function (exports_10, context_10) {
    "use strict";
    var mat4_2, quat_2, vec2_2, vec3_4, constants_7, mat3;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (mat4_2_1) {
                mat4_2 = mat4_2_1;
            },
            function (quat_2_1) {
                quat_2 = quat_2_1;
            },
            function (vec2_2_1) {
                vec2_2 = vec2_2_1;
            },
            function (vec3_4_1) {
                vec3_4 = vec3_4_1;
            },
            function (constants_7_1) {
                constants_7 = constants_7_1;
            }
        ],
        execute: function () {
            mat3 = class mat3 {
                constructor(values) {
                    this.values = new Float32Array(9);
                    if (values !== undefined) {
                        this.init(values);
                    }
                }
                at(index) {
                    return this.values[index];
                }
                init(values) {
                    for (let i = 0; i < 9; i++) {
                        this.values[i] = values[i];
                    }
                    return this;
                }
                reset() {
                    for (let i = 0; i < 9; i++) {
                        this.values[i] = 0;
                    }
                }
                copy(dest) {
                    if (!dest) {
                        dest = new mat3();
                    }
                    for (let i = 0; i < 9; i++) {
                        dest.values[i] = this.values[i];
                    }
                    return dest;
                }
                all() {
                    const data = [];
                    for (let i = 0; i < 9; i++) {
                        data[i] = this.values[i];
                    }
                    return data;
                }
                row(index) {
                    return [
                        this.values[index * 3 + 0],
                        this.values[index * 3 + 1],
                        this.values[index * 3 + 2],
                    ];
                }
                col(index) {
                    return [
                        this.values[index],
                        this.values[index + 3],
                        this.values[index + 6],
                    ];
                }
                equals(matrix, threshold = constants_7.epsilon) {
                    for (let i = 0; i < 9; i++) {
                        if (Math.abs(this.values[i] - matrix.at(i)) > threshold) {
                            return false;
                        }
                    }
                    return true;
                }
                determinant() {
                    const a00 = this.values[0];
                    const a01 = this.values[1];
                    const a02 = this.values[2];
                    const a10 = this.values[3];
                    const a11 = this.values[4];
                    const a12 = this.values[5];
                    const a20 = this.values[6];
                    const a21 = this.values[7];
                    const a22 = this.values[8];
                    const det01 = a22 * a11 - a12 * a21;
                    const det11 = -a22 * a10 + a12 * a20;
                    const det21 = a21 * a10 - a11 * a20;
                    return a00 * det01 + a01 * det11 + a02 * det21;
                }
                setIdentity() {
                    this.values[0] = 1;
                    this.values[1] = 0;
                    this.values[2] = 0;
                    this.values[3] = 0;
                    this.values[4] = 1;
                    this.values[5] = 0;
                    this.values[6] = 0;
                    this.values[7] = 0;
                    this.values[8] = 1;
                    return this;
                }
                transpose() {
                    const temp01 = this.values[1];
                    const temp02 = this.values[2];
                    const temp12 = this.values[5];
                    this.values[1] = this.values[3];
                    this.values[2] = this.values[6];
                    this.values[3] = temp01;
                    this.values[5] = this.values[7];
                    this.values[6] = temp02;
                    this.values[7] = temp12;
                    return this;
                }
                inverse() {
                    const a00 = this.values[0];
                    const a01 = this.values[1];
                    const a02 = this.values[2];
                    const a10 = this.values[3];
                    const a11 = this.values[4];
                    const a12 = this.values[5];
                    const a20 = this.values[6];
                    const a21 = this.values[7];
                    const a22 = this.values[8];
                    const det01 = a22 * a11 - a12 * a21;
                    const det11 = -a22 * a10 + a12 * a20;
                    const det21 = a21 * a10 - a11 * a20;
                    let det = a00 * det01 + a01 * det11 + a02 * det21;
                    if (!det) {
                        return null;
                    }
                    det = 1.0 / det;
                    this.values[0] = det01 * det;
                    this.values[1] = (-a22 * a01 + a02 * a21) * det;
                    this.values[2] = (a12 * a01 - a02 * a11) * det;
                    this.values[3] = det11 * det;
                    this.values[4] = (a22 * a00 - a02 * a20) * det;
                    this.values[5] = (-a12 * a00 + a02 * a10) * det;
                    this.values[6] = det21 * det;
                    this.values[7] = (-a21 * a00 + a01 * a20) * det;
                    this.values[8] = (a11 * a00 - a01 * a10) * det;
                    return this;
                }
                multiply(matrix) {
                    const a00 = this.values[0];
                    const a01 = this.values[1];
                    const a02 = this.values[2];
                    const a10 = this.values[3];
                    const a11 = this.values[4];
                    const a12 = this.values[5];
                    const a20 = this.values[6];
                    const a21 = this.values[7];
                    const a22 = this.values[8];
                    const b00 = matrix.at(0);
                    const b01 = matrix.at(1);
                    const b02 = matrix.at(2);
                    const b10 = matrix.at(3);
                    const b11 = matrix.at(4);
                    const b12 = matrix.at(5);
                    const b20 = matrix.at(6);
                    const b21 = matrix.at(7);
                    const b22 = matrix.at(8);
                    this.values[0] = b00 * a00 + b01 * a10 + b02 * a20;
                    this.values[1] = b00 * a01 + b01 * a11 + b02 * a21;
                    this.values[2] = b00 * a02 + b01 * a12 + b02 * a22;
                    this.values[3] = b10 * a00 + b11 * a10 + b12 * a20;
                    this.values[4] = b10 * a01 + b11 * a11 + b12 * a21;
                    this.values[5] = b10 * a02 + b11 * a12 + b12 * a22;
                    this.values[6] = b20 * a00 + b21 * a10 + b22 * a20;
                    this.values[7] = b20 * a01 + b21 * a11 + b22 * a21;
                    this.values[8] = b20 * a02 + b21 * a12 + b22 * a22;
                    return this;
                }
                multiplyVec2(vector, result) {
                    const x = vector.x;
                    const y = vector.y;
                    if (result) {
                        result.xy = [
                            x * this.values[0] + y * this.values[3] + this.values[6],
                            x * this.values[1] + y * this.values[4] + this.values[7],
                        ];
                        return result;
                    }
                    else {
                        return new vec2_2.default([
                            x * this.values[0] + y * this.values[3] + this.values[6],
                            x * this.values[1] + y * this.values[4] + this.values[7],
                        ]);
                    }
                }
                multiplyVec3(vector, result) {
                    const x = vector.x;
                    const y = vector.y;
                    const z = vector.z;
                    if (result) {
                        result.xyz = [
                            x * this.values[0] + y * this.values[3] + z * this.values[6],
                            x * this.values[1] + y * this.values[4] + z * this.values[7],
                            x * this.values[2] + y * this.values[5] + z * this.values[8],
                        ];
                        return result;
                    }
                    else {
                        return new vec3_4.default([
                            x * this.values[0] + y * this.values[3] + z * this.values[6],
                            x * this.values[1] + y * this.values[4] + z * this.values[7],
                            x * this.values[2] + y * this.values[5] + z * this.values[8],
                        ]);
                    }
                }
                toMat4(result) {
                    if (result) {
                        result.init([
                            this.values[0],
                            this.values[1],
                            this.values[2],
                            0,
                            this.values[3],
                            this.values[4],
                            this.values[5],
                            0,
                            this.values[6],
                            this.values[7],
                            this.values[8],
                            0,
                            0,
                            0,
                            0,
                            1,
                        ]);
                        return result;
                    }
                    else {
                        return new mat4_2.default([
                            this.values[0],
                            this.values[1],
                            this.values[2],
                            0,
                            this.values[3],
                            this.values[4],
                            this.values[5],
                            0,
                            this.values[6],
                            this.values[7],
                            this.values[8],
                            0,
                            0,
                            0,
                            0,
                            1,
                        ]);
                    }
                }
                toQuat() {
                    const m00 = this.values[0];
                    const m01 = this.values[1];
                    const m02 = this.values[2];
                    const m10 = this.values[3];
                    const m11 = this.values[4];
                    const m12 = this.values[5];
                    const m20 = this.values[6];
                    const m21 = this.values[7];
                    const m22 = this.values[8];
                    const fourXSquaredMinus1 = m00 - m11 - m22;
                    const fourYSquaredMinus1 = m11 - m00 - m22;
                    const fourZSquaredMinus1 = m22 - m00 - m11;
                    const fourWSquaredMinus1 = m00 + m11 + m22;
                    let biggestIndex = 0;
                    let fourBiggestSquaredMinus1 = fourWSquaredMinus1;
                    if (fourXSquaredMinus1 > fourBiggestSquaredMinus1) {
                        fourBiggestSquaredMinus1 = fourXSquaredMinus1;
                        biggestIndex = 1;
                    }
                    if (fourYSquaredMinus1 > fourBiggestSquaredMinus1) {
                        fourBiggestSquaredMinus1 = fourYSquaredMinus1;
                        biggestIndex = 2;
                    }
                    if (fourZSquaredMinus1 > fourBiggestSquaredMinus1) {
                        fourBiggestSquaredMinus1 = fourZSquaredMinus1;
                        biggestIndex = 3;
                    }
                    const biggestVal = Math.sqrt(fourBiggestSquaredMinus1 + 1) * 0.5;
                    const mult = 0.25 / biggestVal;
                    const result = new quat_2.default();
                    switch (biggestIndex) {
                        case 0:
                            result.w = biggestVal;
                            result.x = (m12 - m21) * mult;
                            result.y = (m20 - m02) * mult;
                            result.z = (m01 - m10) * mult;
                            break;
                        case 1:
                            result.w = (m12 - m21) * mult;
                            result.x = biggestVal;
                            result.y = (m01 + m10) * mult;
                            result.z = (m20 + m02) * mult;
                            break;
                        case 2:
                            result.w = (m20 - m02) * mult;
                            result.x = (m01 + m10) * mult;
                            result.y = biggestVal;
                            result.z = (m12 + m21) * mult;
                            break;
                        case 3:
                            result.w = (m01 - m10) * mult;
                            result.x = (m20 + m02) * mult;
                            result.y = (m12 + m21) * mult;
                            result.z = biggestVal;
                            break;
                    }
                    return result;
                }
                rotate(angle, axis) {
                    let x = axis.x;
                    let y = axis.y;
                    let z = axis.z;
                    let length = Math.sqrt(x * x + y * y + z * z);
                    if (!length) {
                        return null;
                    }
                    if (length !== 1) {
                        length = 1 / length;
                        x *= length;
                        y *= length;
                        z *= length;
                    }
                    const s = Math.sin(angle);
                    const c = Math.cos(angle);
                    const t = 1.0 - c;
                    const a00 = this.values[0];
                    const a01 = this.values[1];
                    const a02 = this.values[2];
                    const a10 = this.values[4];
                    const a11 = this.values[5];
                    const a12 = this.values[6];
                    const a20 = this.values[8];
                    const a21 = this.values[9];
                    const a22 = this.values[10];
                    const b00 = x * x * t + c;
                    const b01 = y * x * t + z * s;
                    const b02 = z * x * t - y * s;
                    const b10 = x * y * t - z * s;
                    const b11 = y * y * t + c;
                    const b12 = z * y * t + x * s;
                    const b20 = x * z * t + y * s;
                    const b21 = y * z * t - x * s;
                    const b22 = z * z * t + c;
                    this.values[0] = a00 * b00 + a10 * b01 + a20 * b02;
                    this.values[1] = a01 * b00 + a11 * b01 + a21 * b02;
                    this.values[2] = a02 * b00 + a12 * b01 + a22 * b02;
                    this.values[3] = a00 * b10 + a10 * b11 + a20 * b12;
                    this.values[4] = a01 * b10 + a11 * b11 + a21 * b12;
                    this.values[5] = a02 * b10 + a12 * b11 + a22 * b12;
                    this.values[6] = a00 * b20 + a10 * b21 + a20 * b22;
                    this.values[7] = a01 * b20 + a11 * b21 + a21 * b22;
                    this.values[8] = a02 * b20 + a12 * b21 + a22 * b22;
                    return this;
                }
                static product(m1, m2, result) {
                    const a00 = m1.at(0);
                    const a01 = m1.at(1);
                    const a02 = m1.at(2);
                    const a10 = m1.at(3);
                    const a11 = m1.at(4);
                    const a12 = m1.at(5);
                    const a20 = m1.at(6);
                    const a21 = m1.at(7);
                    const a22 = m1.at(8);
                    const b00 = m2.at(0);
                    const b01 = m2.at(1);
                    const b02 = m2.at(2);
                    const b10 = m2.at(3);
                    const b11 = m2.at(4);
                    const b12 = m2.at(5);
                    const b20 = m2.at(6);
                    const b21 = m2.at(7);
                    const b22 = m2.at(8);
                    if (result) {
                        result.init([
                            b00 * a00 + b01 * a10 + b02 * a20,
                            b00 * a01 + b01 * a11 + b02 * a21,
                            b00 * a02 + b01 * a12 + b02 * a22,
                            b10 * a00 + b11 * a10 + b12 * a20,
                            b10 * a01 + b11 * a11 + b12 * a21,
                            b10 * a02 + b11 * a12 + b12 * a22,
                            b20 * a00 + b21 * a10 + b22 * a20,
                            b20 * a01 + b21 * a11 + b22 * a21,
                            b20 * a02 + b21 * a12 + b22 * a22,
                        ]);
                        return result;
                    }
                    else {
                        return new mat3([
                            b00 * a00 + b01 * a10 + b02 * a20,
                            b00 * a01 + b01 * a11 + b02 * a21,
                            b00 * a02 + b01 * a12 + b02 * a22,
                            b10 * a00 + b11 * a10 + b12 * a20,
                            b10 * a01 + b11 * a11 + b12 * a21,
                            b10 * a02 + b11 * a12 + b12 * a22,
                            b20 * a00 + b21 * a10 + b22 * a20,
                            b20 * a01 + b21 * a11 + b22 * a21,
                            b20 * a02 + b21 * a12 + b22 * a22,
                        ]);
                    }
                }
            };
            exports_10("default", mat3);
            mat3.identity = new mat3().setIdentity();
        }
    };
});
// Modified version of https://www.npmjs.com/package/union-find https://github.com/mikolalysenko/union-find
System.register("lib/union-find", [], function (exports_11, context_11) {
    "use strict";
    "use restrict";
    var __moduleName = context_11 && context_11.id;
    function UnionFind(count) {
        this.roots = new Array(count);
        this.ranks = new Array(count);
        for (var i = 0; i < count; ++i) {
            this.roots[i] = i;
            this.ranks[i] = 0;
        }
    }
    exports_11("default", UnionFind);
    return {
        setters: [],
        execute: function () {
            UnionFind.prototype.length = function () {
                return this.roots.length;
            };
            UnionFind.prototype.makeSet = function () {
                var n = this.roots.length;
                this.roots.push(n);
                this.ranks.push(0);
                return n;
            };
            UnionFind.prototype.find = function (x) {
                var roots = this.roots;
                while (roots[x] !== x) {
                    var y = roots[x];
                    roots[x] = roots[y];
                    x = y;
                }
                return x;
            };
            UnionFind.prototype.link = function (x, y) {
                var xr = this.find(x), yr = this.find(y);
                if (xr === yr) {
                    return;
                }
                var ranks = this.ranks, roots = this.roots, xd = ranks[xr], yd = ranks[yr];
                if (xd < yd) {
                    roots[xr] = yr;
                }
                else if (yd < xd) {
                    roots[yr] = xr;
                }
                else {
                    roots[yr] = xr;
                    ++ranks[xr];
                }
            };
        }
    };
});
// This is a typescriptified version of https://github.com/abetusk/kruskal.js
System.register("lib/kruskal", ["lib/union-find"], function (exports_12, context_12) {
    "use strict";
    var union_find_1, Kruskal;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [
            function (union_find_1_1) {
                union_find_1 = union_find_1_1;
            }
        ],
        execute: function () {// This is a typescriptified version of https://github.com/abetusk/kruskal.js
            // vertices hold data that will be used in the distance 'metric' function
            // edges holds position in vertices list
            //
            exports_12("Kruskal", Kruskal = {
                kruskal: (vertices, edgesAsIndexPairs, metric) => {
                    var finalEdges = [];
                    const forest = new union_find_1.default(vertices.length);
                    var edgeDist = [];
                    for (var ind in edgesAsIndexPairs) {
                        const u = edgesAsIndexPairs[ind][0];
                        const v = edgesAsIndexPairs[ind][1];
                        const e = { edge: edgesAsIndexPairs[ind], weight: metric(vertices[u], vertices[v]) };
                        edgeDist.push(e);
                    }
                    edgeDist.sort((a, b) => a.weight - b.weight);
                    for (var i = 0; i < edgeDist.length; i++) {
                        var u = edgeDist[i].edge[0];
                        var v = edgeDist[i].edge[1];
                        if (forest.find(u) != forest.find(v)) {
                            finalEdges.push([u, v]);
                            forest.link(u, v);
                        }
                    }
                    return finalEdges;
                }
            });
        }
    };
});
System.register("NumericalMonoid", ["cytoscape", "Hash", "utils", "lib/tsm/src/mat3", "lib/tsm/src/mat2", "lib/kruskal"], function (exports_13, context_13) {
    "use strict";
    var cytoscape, Hash_1, utils_1, mat3_3, mat2_1, kruskal_1, NumericalMonoid;
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [
            function (cytoscape_1) {
                cytoscape = cytoscape_1;
            },
            function (Hash_1_1) {
                Hash_1 = Hash_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (mat3_3_1) {
                mat3_3 = mat3_3_1;
            },
            function (mat2_1_1) {
                mat2_1 = mat2_1_1;
            },
            function (kruskal_1_1) {
                kruskal_1 = kruskal_1_1;
            }
        ],
        execute: function () {
            NumericalMonoid = class NumericalMonoid {
                constructor(generators) {
                    this.elementIsBetti = (n) => !this.elementIsNotBetti(n);
                    this.maxnonreducibleEdgesEuclidean = (n) => this._non_dynamic_maxnonreducibleEdgesByMetric(n, utils_1.euclideanDistance);
                    this._catenaryBoundHypothesis = () => this.frobenius() + Math.max(...this.bettiElements());
                    this._satisfiesCatenaryBoundHypothesisEuclidean = () => this._satisfiesCatenaryBoundHypothesis(utils_1.euclideanDistance);
                    this.generators = generators.slice().sort((a, b) => a - b);
                    this.cachedFacs = new Map();
                    this.cachedCatenaryDegrees = new Map();
                    this.cachedCatenaryDegreesByMetric = new Map();
                    this.cachedMSTsByMetric = new Map();
                }
                factorizations(n) {
                    if (n < 0) {
                        return [];
                    }
                    else if (n == 0) {
                        return [(new Array(this.generators.length)).fill(0)];
                    }
                    else if (this.cachedFacs.has(n)) {
                        return this.cachedFacs.get(n);
                    }
                    else {
                        if (this.calculatingNewMemoizedFactorizationCallback)
                            this.calculatingNewMemoizedFactorizationCallback(n);
                        const predecessorFactorizationsUpped = this.generators.map((generator, index) => {
                            return this.factorizations(n - generator).map(x => utils_1.addOneAtIndex(x, index));
                        });
                        const returnSet = new Hash_1.JSONHashSet();
                        predecessorFactorizationsUpped.forEach(x => {
                            x.forEach(factorization => returnSet.add(factorization));
                        });
                        const returnArray = returnSet.toArray();
                        this.cachedFacs.set(n, returnArray);
                        return returnArray;
                    }
                }
                hasElement(n) {
                    return this.factorizations(n).length > 0;
                }
                frobenius() {
                    for (let n = 0;; n++) {
                        if (utils_1.zeroThroughN(Math.min(...this.generators)).every(x => this.hasElement(n + x))) {
                            return n - 1;
                        }
                    }
                }
                elementIsNotBetti(n) {
                    if (this.generators.length !== 3) {
                        throw new Error('this only works on 3 generators for now');
                    }
                    const vert = this.generators.filter(x => this.hasElement(n - x));
                    const dim = vert.length;
                    if (dim === 1)
                        return true;
                    const matDim = dim === 3 ? mat3_3.default : mat2_1.default;
                    const adj = new matDim();
                    for (let i = 0; i < dim; i++) {
                        for (let j = i; j < dim; j++) {
                            if (this.hasElement(n - vert[i] - vert[j])) {
                                const newValues = utils_1.zeroThroughN(Math.pow(dim, 2)).map(x => {
                                    const index1 = i * dim + j;
                                    const index2 = i + j * dim;
                                    return (x === index1 || x === index2) ? 1 : adj.at(x);
                                });
                                adj.init(newValues);
                            }
                        }
                    }
                    const c = new matDim().setIdentity();
                    const aa = new matDim().setIdentity();
                    for (let i = 0; i < dim; i++) {
                        aa.multiply(adj);
                        const newC = utils_1.zeroThroughN(Math.pow(dim, 2)).map(x => c.at(x) + aa.at(x));
                        c.init(newC);
                    }
                    for (let i = 0; i < dim; i++) {
                        for (let j = i + 1; j < dim; j++) {
                            const index = i * dim + j;
                            if (c.at(index) === 0) {
                                return false;
                            }
                        }
                    }
                    return true;
                }
                bettiElementCandidates() {
                    // from GAP
                    const ap = this.AperyListOfNumericalSemigroupWRTElement(this.generators[0]);
                    return Array.from(new Set(utils_1.flattenArray(this.generators.map(x => ap.map(m => m + x))))); //.filter((x,i,a) => !a.slice(i+1).includes(x));
                }
                bettiElements() {
                    if (this.generators.length === 1) {
                        return [];
                    }
                    if (this.cachedBettiElements) {
                        return this.cachedBettiElements;
                    }
                    else {
                        // const ap = ap1.slice(1);//# I remove the zero,
                        //#   minimal generators yield conneted graphs
                        const candidates = this.bettiElementCandidates();
                        //# Gn not conneted implies n = wi + minimalgenerator
                        //#    thus these are the candidates
                        const result = candidates.filter(x => this.elementIsBetti(x));
                        this.cachedBettiElements = result;
                        return result;
                        //# choose n with nonconnected graphs
                    }
                }
                AperyListOfNumericalSemigroupWRTElement(n) {
                    return utils_1.zeroThroughN(n).map(x => {
                        for (let i = 0;; i++) {
                            const elem = x + i * n;
                            if (this.hasElement(elem)) {
                                return elem;
                            }
                        }
                    });
                }
                _non_dynamic_catenaryDegree(n) {
                    if (this.cachedCatenaryDegrees.has(n))
                        return this.cachedCatenaryDegrees.get(n);
                    const factorizations = this.factorizations(n);
                    for (let i = 0;; i++) {
                        const g = cytoscape({});
                        factorizations.forEach(fac => g.add({ data: { id: JSON.stringify(fac) } })); // first pass: add all nodes. can't add edges if one end isn't there yet
                        factorizations.forEach(fac1 => {
                            factorizations.forEach(fac2 => {
                                if (utils_1.numberArrayEqualityCheck(fac2, fac1))
                                    return;
                                const distance = NumericalMonoid.distanceForClassicCatenary(fac1, fac2);
                                if (distance <= i) {
                                    g.add({ data: { source: JSON.stringify(fac1), target: JSON.stringify(fac2) } });
                                }
                            });
                        });
                        if (g.elements().components().length == 1) {
                            this.cachedCatenaryDegrees.set(n, i);
                            return i;
                        }
                    }
                }
                _non_dynamic_maxnonreducibleEdgesByMetric(n, metric) {
                    // Returns the set of nonreducible edges that are maximal (i.e. d = catenary degree)
                    const factorizations = this.factorizations(n);
                    const catenaryDegree = this._non_dynamic_catenaryDegreeByMetric(n, metric);
                    const vertices = factorizations.map(fac => ({ data: { id: JSON.stringify(fac) } }));
                    const g = cytoscape({
                        elements: vertices
                    }); // just vertices for now, edges next
                    const maximalEdges = [];
                    for (let fac1 of factorizations) {
                        for (let fac2 of factorizations) {
                            if (utils_1.numberArrayEqualityCheck(fac2, fac1))
                                continue;
                            const d = metric(fac1, fac2);
                            if (d < catenaryDegree) {
                                g.add({
                                    data: {
                                        source: JSON.stringify(fac1),
                                        target: JSON.stringify(fac2)
                                    }
                                });
                            }
                            else if (d == catenaryDegree) {
                                maximalEdges.push([fac1, fac2]);
                            }
                        }
                    }
                    const returnSet = new Hash_1.JSONHashSet();
                    for (let [fac1, fac2] of maximalEdges) {
                        // If this maximal edge is not reducible...
                        if (!returnSet.has([fac2, fac1]) && // Make sure we don't have any reverse-order duplicates
                            !g.elements().aStar({
                                root: g.nodes(`node[id="${JSON.stringify(fac1)}"]`),
                                goal: g.nodes(`node[id="${JSON.stringify(fac2)}"]`)
                            }).found) {
                            returnSet.add([fac1, fac2]);
                        }
                    }
                    return returnSet.toArray();
                }
                _non_dynamic_catenaryDegreeByMetric(n, metric) {
                    if (this.cachedCatenaryDegreesByMetric.has(metric)) {
                        const metricCache = this.cachedCatenaryDegreesByMetric.get(metric);
                        if (metricCache.has(n)) {
                            return metricCache.get(n);
                        }
                    }
                    const bettis = this.bettiElements();
                    const bettiDistances = bettis.includes(n) ? [Infinity] : bettis.map(x => this._non_dynamic_catenaryDegreeByMetric(x, metric));
                    const factorizations = this.factorizations(n);
                    const pairwiseDistancesLessThanMaxBettiElement = new Set();
                    factorizations.forEach(fac1 => {
                        factorizations.forEach(fac2 => {
                            const distance = metric(fac1, fac2);
                            if (distance <= Math.max(...bettiDistances)) {
                                pairwiseDistancesLessThanMaxBettiElement.add(distance);
                            }
                        });
                    });
                    // only include distances less-or-equal than the max catenary degree of a betti element,
                    // except in the case above where the n is a betti element, in which case we compare with Infinity to safely include all edges and not get recursive calculation
                    const pairwiseDistances = Array.from(pairwiseDistancesLessThanMaxBettiElement)
                        .sort((a, b) => a - b);
                    for (let pairDistance of pairwiseDistances) {
                        const g = cytoscape({});
                        factorizations.forEach(fac => g.add({ data: { id: JSON.stringify(fac) } })); // first pass: add all nodes. can't add edges if one end isn't there yet
                        factorizations.forEach(fac1 => {
                            factorizations.forEach(fac2 => {
                                if (utils_1.numberArrayEqualityCheck(fac2, fac1))
                                    return;
                                const distance = metric(fac1, fac2);
                                if (distance <= pairDistance) {
                                    g.add({ data: { source: JSON.stringify(fac1), target: JSON.stringify(fac2) } });
                                }
                            });
                        });
                        if (g.elements().components().length == 1) {
                            const metricCache = (this.cachedCatenaryDegreesByMetric.get(metric) || this.cachedCatenaryDegreesByMetric.set(metric, new Map()).get(metric));
                            metricCache.set(n, pairDistance);
                            return pairDistance;
                        }
                    }
                }
                minimalSpanningTreeByMetric(n, metric) {
                    // Returns a list of pairs of indices pointing to factorizations within this.factorizations
                    // Is dynamic
                    if (this.cachedMSTsByMetric.has(metric)) {
                        const metricCache = this.cachedMSTsByMetric.get(metric);
                        if (metricCache.has(n)) {
                            return metricCache.get(n);
                        }
                    }
                    const factorizations = this.factorizations(n);
                    const bettiElements = this.bettiElements();
                    let edges;
                    if (n > Math.max(...bettiElements)) {
                        const pairsOfElAndMst = this.generators
                            .map(g => [n - g, this.minimalSpanningTreeByMetric(n - g, metric)]);
                        const factorizationPairs = pairsOfElAndMst
                            .map(([el, mst], i) => mst
                            .map(([index1, index2]) => [
                            utils_1.addOneAtIndex(this.factorizations(el)[index1], i),
                            utils_1.addOneAtIndex(this.factorizations(el)[index2], i)
                        ]))
                            .reduce((a, b) => a.concat(b), []);
                        const factorizationsIndexMap = new Map();
                        factorizations.forEach((fac, i) => {
                            factorizationsIndexMap.set(JSON.stringify(fac), i);
                        });
                        edges = [];
                        factorizationPairs.forEach(([fac1, fac2]) => {
                            const index1 = factorizationsIndexMap.get(JSON.stringify(fac1));
                            const index2 = factorizationsIndexMap.get(JSON.stringify(fac2));
                            edges.push([index1, index2]);
                        });
                    }
                    else {
                        edges = factorizations
                            .map((fac1, index1) => factorizations
                            .map((fac2, index2) => [index1, index2]))
                            .reduce((a, b) => a.concat(b), []);
                    }
                    const vertices = utils_1.zeroThroughN(factorizations.length);
                    const mstAsIndexPairs = kruskal_1.Kruskal.kruskal(vertices, edges, (index1, index2) => metric(factorizations[index1], factorizations[index2]));
                    const metricCache = (this.cachedMSTsByMetric.get(metric) || this.cachedMSTsByMetric.set(metric, new Map()).get(metric));
                    metricCache.set(n, mstAsIndexPairs);
                    return mstAsIndexPairs;
                    // .map(([index1, index2]) => [factorizations[index1], factorizations[index2]]);
                }
                catenaryDegreeByMetric(n, metric) {
                    const mst = this.minimalSpanningTreeByMetric(n, metric);
                    const factorizations = this.factorizations(n);
                    return Math.max(...mst.map(([index1, index2]) => metric(factorizations[index1], factorizations[index2])));
                }
                percent_of_edges_that_are_minimal(n, metric) {
                    const mst = this.minimalSpanningTreeByMetric(n, metric);
                    const factorizations = this.factorizations(n);
                    const distances = mst.map(([index1, index2]) => metric(factorizations[index1], factorizations[index2]));
                    const min = Math.min(...distances);
                    return distances.filter(x => x === min).length / distances.length;
                }
                _non_dynamic_maxnonreducibleEdges(n) {
                    // Returns the set of nonreducible edges that are maximal (i.e. d = catenary degree)
                    const factorizations = this.factorizations(n);
                    const catenaryDegree = this._non_dynamic_catenaryDegree(n);
                    const vertices = factorizations.map(fac => ({ data: { id: JSON.stringify(fac) } }));
                    const g = cytoscape({
                        elements: vertices
                    }); // just vertices for now, edges next
                    const maximalEdges = [];
                    for (let fac1 of factorizations) {
                        for (let fac2 of factorizations) {
                            if (utils_1.numberArrayEqualityCheck(fac2, fac1))
                                continue;
                            const d = NumericalMonoid.distanceForClassicCatenary(fac1, fac2);
                            if (d < catenaryDegree) {
                                g.add({
                                    data: {
                                        source: JSON.stringify(fac1),
                                        target: JSON.stringify(fac2)
                                    }
                                });
                            }
                            else if (d == catenaryDegree) {
                                maximalEdges.push([fac1, fac2]);
                            }
                        }
                    }
                    const returnSet = new Hash_1.JSONHashSet();
                    for (let [fac1, fac2] of maximalEdges) {
                        // If this maximal edge is not reducible...
                        if (!returnSet.has([fac2, fac1]) && // Make sure we don't have any reverse-order duplicates
                            !g.elements().aStar({
                                root: g.nodes(`node[id="${JSON.stringify(fac1)}"]`),
                                goal: g.nodes(`node[id="${JSON.stringify(fac2)}"]`)
                            }).found) {
                            returnSet.add([fac1, fac2]);
                        }
                    }
                    return returnSet.toArray();
                }
                static distanceForClassicCatenary(fac1, fac2) {
                    const gcd = utils_1.tupleGCD(fac1, fac2);
                    return Math.max(utils_1.sum(utils_1.tupleMinus(fac1, gcd)), utils_1.sum(utils_1.tupleMinus(fac2, gcd)));
                }
                _satisfiesCatenaryBoundHypothesis(metric) {
                    const lcm = utils_1.product(this.generators);
                    const boundHypothesis = this.frobenius() + Math.max(...this.bettiElements());
                    console.log('boundHypothesis:', boundHypothesis, 'lcm:', lcm);
                    const v1 = this._non_dynamic_catenaryDegreeByMetric(boundHypothesis, metric);
                    console.log(`catenaryDegree(${boundHypothesis}):`, v1);
                    console.log(`calculating catenaryDegree(${boundHypothesis + lcm})`);
                    for (let i = 0; i < utils_1.product(this.generators.slice(1)); i++) {
                        // preload
                        const next = boundHypothesis + this.generators[0] * i;
                        const unsafeStdout = process.stdout;
                        if (unsafeStdout.clearLine) {
                            unsafeStdout.clearLine();
                            unsafeStdout.cursorTo(0);
                            process.stdout.write(`memoizing factorizations(${next})`);
                        }
                        this.factorizations(next);
                    }
                    const facsup = this.factorizations(boundHypothesis + lcm);
                    const v2 = this._non_dynamic_catenaryDegreeByMetric(boundHypothesis + lcm, metric);
                    console.log(`catenaryDegree(${boundHypothesis + lcm}): ${v2}`);
                    return v1 === v2;
                }
            };
            exports_13("default", NumericalMonoid);
        }
    };
});
System.register("browser/main", ["NumericalMonoid", "utils"], function (exports_14, context_14) {
    "use strict";
    var NumericalMonoid_1, utils_2, updateStateElement, updateEuclideanCheckbox, catenaryFunction, metricFunction, state, getInput, getValueOfInput, numericalMonoidOfCurrentInputs, counterexample, checkRun, updateGenerators, moveUpOrDownByElement, facsMap, colorMap, upByLcmOverG, upByG, renderPlotly;
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [
            function (NumericalMonoid_1_1) {
                NumericalMonoid_1 = NumericalMonoid_1_1;
            },
            function (utils_2_1) {
                utils_2 = utils_2_1;
            }
        ],
        execute: function () {
            window.onload = () => {
                [1, 2, 3].map(x => getInput(x)).forEach(x => {
                    x.onchange = updateGenerators;
                });
                document.getElementById('element-input').onchange = e => {
                    try {
                        updateStateElement(parseInt(e.target.value));
                    }
                    catch (e) {
                        console.error(e);
                    }
                };
                document.getElementById('euclidean-checkbox').onchange = e => {
                    updateEuclideanCheckbox(e.target.checked);
                };
                document.getElementById('explode-button').onclick = e => {
                    updateStateElement(state.element, true);
                };
                document.getElementById('counterexample').onclick = e => {
                    updateStateElement(counterexample);
                };
                const applyMoveElement = (x, b) => updateStateElement(moveUpOrDownByElement(x, b, state.element));
                document.onkeydown = (ev) => {
                    switch (ev.key) {
                        case 'a':
                            applyMoveElement(1, true);
                            break;
                        case 'z':
                            applyMoveElement(1, false);
                            break;
                        case 's':
                            applyMoveElement(2, true);
                            break;
                        case 'x':
                            applyMoveElement(2, false);
                            break;
                        case 'd':
                            applyMoveElement(3, true);
                            break;
                        case 'c':
                            applyMoveElement(3, false);
                            break;
                        default:
                            return;
                    }
                };
                updateGenerators();
            };
            updateStateElement = (element, explode = false) => {
                state.element = element;
                document.getElementById('element-input').value = element.toString();
                document.getElementById('catenary-input').value = catenaryFunction(state.numericalMonoid, state.useEuclidean)(element).toString();
                renderPlotly(explode);
            };
            updateEuclideanCheckbox = (useEuclidean) => {
                state.useEuclidean = useEuclidean;
                updateStateElement(state.element);
            };
            // const maxnonredFunction = (nm: NumericalMonoid, useEuclidean: boolean) => (useEuclidean ? nm.maxnonreducibleEdgesEuclidean : nm.maxnonreducibleEdges).bind(nm);
            catenaryFunction = (nm, useEuclidean) => (x) => nm.catenaryDegreeByMetric(x, metricFunction(useEuclidean));
            metricFunction = (useEuclidean) => useEuclidean ? utils_2.euclideanDistance : NumericalMonoid_1.default.distanceForClassicCatenary;
            state = {
                numericalMonoid: null,
                element: 0,
                useEuclidean: false
            };
            getInput = (id) => document.getElementById(`input${id}`);
            getValueOfInput = (id) => parseInt(getInput(id).value);
            numericalMonoidOfCurrentInputs = () => new NumericalMonoid_1.default([getValueOfInput(1), getValueOfInput(2), getValueOfInput(3)]);
            checkRun = (incrBy, el) => {
                const bound = el + getValueOfInput(1) * getValueOfInput(2);
                const catAtHypothesis = catenaryFunction(state.numericalMonoid, state.useEuclidean)(el);
                for (let i = el; i < bound; i += incrBy) {
                    console.log(i);
                    if (catenaryFunction(state.numericalMonoid, state.useEuclidean)(i) != catAtHypothesis) {
                        counterexample = i;
                        return false;
                    }
                }
                return true;
            };
            updateGenerators = () => {
                state.numericalMonoid = numericalMonoidOfCurrentInputs();
                // updateStateElement(state.numericalMonoid.frobenius() + 1);
                updateStateElement(state.numericalMonoid._catenaryBoundHypothesis());
                document.getElementById('forall-axis1').value = checkRun(Math.min(...state.numericalMonoid.generators), state.numericalMonoid._catenaryBoundHypothesis()).toString();
                document.getElementById('forall-axis1and2').value = checkRun(getValueOfInput(1) * getValueOfInput(2), state.numericalMonoid._catenaryBoundHypothesis()).toString();
                document.getElementById('betti').value = JSON.stringify(state.numericalMonoid.bettiElements());
                renderPlotly();
            };
            moveUpOrDownByElement = (generatorIndex, up, currentElement) => {
                return currentElement + (up ? 1 : -1) * getValueOfInput(generatorIndex);
            };
            facsMap = (factorizations, color) => {
                return {
                    x: factorizations.map(x => x[0]),
                    y: factorizations.map(x => x[1]),
                    z: factorizations.map(x => x[2]),
                    mode: 'markers',
                    marker: {
                        size: 5,
                        line: {
                            color: color,
                            width: 0.5
                        },
                        opacity: 0.8
                    },
                    type: 'scatter3d'
                };
            };
            colorMap = i => i == 0 ? "red" : i == 1 ? "blue" : "green";
            upByLcmOverG = (i, lcm, g) => (z, j) => j == i ? (z + lcm / g) : z;
            upByG = (i, lcm, g) => (z, j) => z + g;
            renderPlotly = (explode = false) => {
                let trace1 = {}, trace2 = {}, trace3 = {};
                if (explode) {
                    const factorizations = state.numericalMonoid.factorizations(state.element);
                    const lcm = utils_2.product(state.numericalMonoid.generators);
                    const exploded = state.numericalMonoid.generators.map((g, i) => factorizations.map(y => y.map(upByLcmOverG(i, lcm, g)))); // make 3 sets, each exploded upward in the ith direction
                    [trace1, trace2, trace3] = exploded.map((x, i) => facsMap(x, colorMap(i)));
                    const maxnonredTraces = [];
                    const metric = metricFunction(state.useEuclidean);
                    const MST = state.numericalMonoid.minimalSpanningTreeByMetric(state.element, metric);
                    const distances = MST.map(([index1, index2]) => metric(factorizations[index1], factorizations[index2]));
                    const minDistance = Math.min(...distances);
                    const minEdges = MST; //.filter((pair, index) => distances[index] === minDistance);
                    let minimalMSTTraces = [];
                    let aggregateGlobalAxisMax = 0;
                    exploded.forEach((explodee, i) => {
                        minimalMSTTraces = minimalMSTTraces.concat(minEdges.map((indexPair) => ({
                            x: indexPair.map(x => explodee[x][0]),
                            y: indexPair.map(x => explodee[x][1]),
                            z: indexPair.map(x => explodee[x][2]),
                            mode: 'lines',
                            marker: {
                                size: 11,
                                line: {
                                    color: colorMap(i),
                                    width: 0.5
                                },
                                opacity: 0.8
                            },
                            type: 'scatter3d'
                        })));
                        const arrayOfFactorizationComponents = utils_2.flattenArray([0, 1, 2].map(x => explodee.map(fac => fac[x])));
                        const globalAxisMax = Math.max(...arrayOfFactorizationComponents);
                        aggregateGlobalAxisMax = Math.max(aggregateGlobalAxisMax, globalAxisMax);
                    });
                    const axisLayout = { range: [0, aggregateGlobalAxisMax] };
                    const layout = {
                        scene: {
                            aspectmode: "manual",
                            aspectratio: {
                                x: 1, y: 1, z: 1,
                            },
                            margin: {
                                l: 0,
                                r: 0,
                                b: 0,
                                t: 0
                            },
                            xaxis: axisLayout,
                            yaxis: axisLayout,
                            zaxis: axisLayout
                        }
                    };
                    try {
                        Plotly.purge('plotly-container');
                    }
                    catch (e) {
                        0;
                    }
                    Plotly.newPlot('plotly-container', [trace1, trace2, trace3, ...maxnonredTraces, ...minimalMSTTraces], layout);
                }
                else {
                    const factorizations = state.numericalMonoid.factorizations(state.element);
                    trace1 = facsMap(factorizations, 'rgba(217, 217, 217, 0.14)');
                    // const maxnonred = maxnonredFunction(state.numericalMonoid, state.useEuclidean)(state.element);
                    const maxnonredTraces = [];
                    // maxnonred.map(pair => {
                    //     const pairWithMaybeGCDMidpoint = state.useEuclidean ? pair : [pair[0], tupleGCD(pair[0], pair[1]), pair[1]];
                    //     return {
                    //         x: pairWithMaybeGCDMidpoint.map(x => x[0]),
                    //         y: pairWithMaybeGCDMidpoint.map(x => x[1]),
                    //         z: pairWithMaybeGCDMidpoint.map(x => x[2]),
                    //         mode: 'lines',
                    //         type: 'scatter3d'
                    //     }
                    // });
                    const metric = metricFunction(state.useEuclidean);
                    const MST = state.numericalMonoid.minimalSpanningTreeByMetric(state.element, metric);
                    const distances = MST.map(([index1, index2]) => metric(factorizations[index1], factorizations[index2]));
                    const minDistance = Math.min(...distances);
                    const minEdges = MST; //.filter((pair, index) => distances[index] === minDistance);
                    const minimalMSTTraces = minEdges.map((indexPair) => ({
                        x: indexPair.map(x => factorizations[x][0]),
                        y: indexPair.map(x => factorizations[x][1]),
                        z: indexPair.map(x => factorizations[x][2]),
                        mode: 'lines',
                        // marker: {
                        //     size: 12,
                        //     line: {
                        //         color: 'rgba(217, 217, 217, 0.14)',
                        //         width: 0.5
                        //     },
                        //     opacity: 0.8
                        // },
                        type: 'scatter3d'
                    }));
                    const arrayOfFactorizationComponents = utils_2.flattenArray([0, 1, 2].map(x => factorizations.map(fac => fac[x])));
                    const globalAxisMax = Math.max(...arrayOfFactorizationComponents);
                    const axisLayout = { range: [0, globalAxisMax] };
                    const layout = {
                        scene: {
                            aspectmode: "manual",
                            aspectratio: {
                                x: 1, y: 1, z: 1,
                            },
                            margin: {
                                l: 0,
                                r: 0,
                                b: 0,
                                t: 0
                            },
                            xaxis: axisLayout,
                            yaxis: axisLayout,
                            zaxis: axisLayout
                        }
                    };
                    try {
                        Plotly.purge('plotly-container');
                    }
                    catch (e) {
                        0;
                    }
                    Plotly.newPlot('plotly-container', [trace1, ...maxnonredTraces, ...minimalMSTTraces], layout);
                }
            };
        }
    };
});

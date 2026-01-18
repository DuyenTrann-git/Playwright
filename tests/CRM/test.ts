// as const (const assertion)

const direction = {
    UP: 'up',
    DOWN: 'down',
} as const;

// nghĩa là mình có thể vô tình gán lại thành chuỗi khác
const PI = 3.14;

// as const sẽ khóa cứng object, ngăn chặn việc sửa đổi ngớ ngẩn
// direction.UP = 'left';

const envs = ['dev', 'uat', 'prod'] as const;

// envs.push();

// typeof
// dùng để copy kiểu dữ liệu từ 1 đối tượng đã có sẵn
//
const settings = {
    theme: 'dark',
    notification: true,
    version: 1.0,
};

// type
// interface Settings {
//   theme: string;
//   notifications: boolean;
//   version: number;
// }

type SettingsType = typeof settings;

// keyof // chỉ lấy được key of TYPE
// có 2 thế giới ở trong TypeScript song song với nhau
// 1) thế giới TYPE (kiểu = bản vẽ) => interface, type
// 2) là thế giới VALUE () const, let và function

// => thì thằng keyof là 1 công cụ của thế giới TYPE

interface User {
    id: number;
    name: string;
    email: string;
}

type UserKeys = keyof User;
const Colors = {
    Red: '#FF0000',
    Green: '#00FF00',
    Blue: '#0000FF',
} as const;

// 2 cách để lấy giá trị trong 1 object
console.log(Colors.Green);
console.log(Colors['Blue']);

// viết 1 cái hàm chỉ nhận đúng tên màu có trong object
type ColorsType = typeof Colors;

// bước 1: typeof Colors => ra cái type là { Red: '...', Green: '...', Blue: '...' }
// bước 2: keyof (b1) => keyof ColorsType => union 'Red' | 'Green' | 'Blue'

// type ColorName = 'Red' | 'Green' | 'Blue'
type ColorName = keyof typeof Colors;

function changeColor(color: ColorName) {
    console.log(Colors[color]);
}
changeColor('Red');

// const configDevEnv = {
//   endPoint: 'https://api.com',
//   timeOut: 5000,
//   retries: 3,
// };

const config = {
    endPoint: 'https://api2.com',
    timeOut: 3000,
    retries: 3,
};
// viết 1 cái hàm lấy giá trị của config
function getConfigValue(key: keyof typeof config) {
    return config[key];
}

const endPoint = getConfigValue('endPoint');

const timeout = getConfigValue('timeOut');

// Partial
interface UserProfile {
    id: number;
    name: string;
    email: string;
    age: number;
}

// Partial =>
// interface UserProfile {
//   id?: number;
//   name?: string;
//   email?: string;
//   age?: number;
// }



// cú pháp Partial<T>
// ví dụ là tôi muốn viết 1 cái hàm updateProfile
function updateProfile(
    original: UserProfile,
    updates: Partial<UserProfile>
): UserProfile {
    return {
        ...original,
        ...updates,
    };
}

const userA: UserProfile = {
    id: 1,
    name: 'A',
    email: '123@gmail.com',
    age: 20,
};

const userB = updateProfile(userA, { age: 21 });

console.log(userB);

// rest params
// {...rest}

interface UserEntity {
    id: string;
    username: string;
    password: string;
    secretKey: string;
    role: string;
}

const dbUser: UserEntity = {
    id: 'u1',
    username: 'admin',
    password: '123',
    secretKey: 'abc',
    role: 'admin',
};

function chuanHoaUser(user: UserEntity) {
    // sử dụng rest param và destructuring để tách password và secretKey ra khỏi phần còn lại
}

const user = {
    name: 'Alice',
    age: 25,
};

// const name = user.name
// const age = user.age

// destructuring
const { name, age } = user;
const { name: userName } = user;

console.log(userName);
console.log(age);
const colors = ['red', 'green'];

const c1 = colors[0];

const [first, second] = colors;
console.log(first);

// rest params
const settings2 = {
    theme: 'dark',
    volume: 80,
    wifi: true,
    bluetooth: false,
};

// const { theme, volume, ...others } = settings2;

// console.log(theme);
// console.log(others);

const racers = ['Hai', 'Minh', 'Tung', 'Lan'];
// racers[0]
const [winner, nhi, ...others] = racers;

console.log(winner);
console.log(others);
// Records

// tư duy sử dụng record để tạo ra OBJECT giống như 1 cuốn từ điển
// nơi bạn chưa biết tên key cụ thể, nhưng biết kiểu dữ liệu của value

// {
//   productName: 330
// }

// type ProductPrices = {
//   [x: string]: number;
// }

type ProductPrices = Record<string, number>;

const prices: ProductPrices = {
    laptop: 1500,
    mouse: 25,
};
type OrderStatus = 'pending' | 'shipping' | 'delivered';

const statusLabels: Record<OrderStatus, string> = {
    delivered: 'Giao hàng thành công',
    shipping: 'đang giao hàng',
    pending: 'đang chờ xử lý',
};

//Closure =>Hàm trả về 1 hàm
// bình thường: khi 1 hàm chạy xong -> nó chết đi và quên sạch kí ức (biến cục bộ bị xoá khỏi bộ nhớ)
// closure: khi hàm cha return 1 hàm con, hàm con đó giống như được đeo 1 cái balo "balo kí ức"
// trong balo chứa tất cả các biến của hàm cha dù hàm cha đã chạy xong, hàm con vẫn mang theo cái balo này

function hamCha(x: number) {
    // biến này nằm trong phạm vi của cha => biến cục bộ
    let bienCuaCha = x;

    return function hamCon(y: number) {
        return bienCuaCha + y;
    };
}

// cú pháp quan trọng là phải hứng giá trị của closure = 1 biến
const add5 = hamCha(5);
const ketQua = add5(2);

console.log(ketQua);

// tạo ra nhà máy tạo hàm
// tạo ra hàm nhân
function createMultiplier(factor: number) {
    return function (number: number) {
        return number * factor;
    };
}

// ví dụ tôi muốn tạo hàm nhân đôi
const double = createMultiplier(2);

console.log(double(10));

const triple = createMultiplier(3);

console.log(triple(3));
// // // tư duy tạo ra 1 hệ thống đồng bộ hóa dữ liệu

// 1. mình có 1 object gốc
// 2. dùng keyof typeof để lấy danh sách key của nó
// 3. dùng record để bắt buộc 1 object khác có key y hệt object gốc.

// Nguồn
// const SOURCE = { KeyA: '...' };

// type SOURCEKEY = keyof typeof SOURCE;

// const Target: Record<SOURCEKEY, ValueType>;

const ORDER_STATUS = {
    CREATED: 'orderCreated',
    PAID: 'orderPaid',
    SHIPPED: 'orderShipped',
} as const;

type StatusKey = keyof typeof ORDER_STATUS;

const STATUS_COLOR: Record<StatusKey, string> = {
    CREATED: 'gray',
    PAID: 'blue',
    SHIPPED: 'green',
};

function getBadgeColor(status: StatusKey) {
    return STATUS_COLOR[status];
}

getBadgeColor('CREATED');

// getBadgeColor('');

const ENV_LIST = {
    DEV: 'development',
    STAGING: 'staging',
    PROD: 'prod',
} as const;

type EnvKey = keyof typeof ENV_LIST;

interface EnvConfig {
    baseUrl: string,
    retries: number,
    timeOut: number,
}
const PLAYWRIGHT_CONFIG: Record<EnvKey, EnvConfig> = {
    DEV: {
        baseUrl: 'dev',
        retries: 0,
        timeOut: 300,
    },
    STAGING: {
        baseUrl: 'uat',
        retries: 0,
        timeOut: 100,
    },
    PROD: {
        baseUrl: 'prod',
        retries: 1,
        timeOut: 200,
    },
};
PLAYWRIGHT_CONFIG['PROD']

const MEMBERSHIP_TIERS = {
    STD: 'standard_user',
    GOLD: 'gold_user',
    VIP: 'vip_user',
} as const;

type TierKey = keyof typeof MEMBERSHIP_TIERS;

type FeeConfig = Record<TierKey, number>;

// phần clouse tạo nhà máy hàm
function createFeeCalculator(config: FeeConfig) {
    console.log('khoi tao bo tinh phi voi config');

    // closure
    // closure
    return (tier: TierKey, amount: number): number => {
        const rate = config[tier];
        const fee = rate * amount;
        console.log(`${tier} giao dich ${amount}: Phi ${fee}`);
        return fee;
    }
};
const giangSinhConfig: FeeConfig = {
    STD: 0.05,
    GOLD: 0.02,
    VIP: 0.0,
};

const tetConfig: FeeConfig = {
    STD: 0.1,
    GOLD: 0.05,
    VIP: 0.01,
};
const calculateGiangSinh = createFeeCalculator(giangSinhConfig);
const calculateTet = createFeeCalculator(tetConfig);
// sử dụng
calculateGiangSinh('GOLD', 100);
calculateTet('VIP', 500);
// ví dụ đây là locator
type LyNuoc = string;
//Viết 1 hàm vào Menu -> trả về 1 nút bấm cho menu
function caiDatMayBanNuoc<T extends Record<string, string | (() => LyNuoc)>>(menu: T): (tenMon: keyof T) => LyNuoc {
    //Nut bam tra ve
    return (tenMon: keyof T): LyNuoc => {
        const congThuc = menu[tenMon];

        if (typeof congThuc === 'function') {
            console.log(`May dang pha che mon ${String(tenMon)}`);
            return congThuc();
        }

        console.log(`Lay ngay mon co san ${String(tenMon)}`);
        return congThuc;


    }
}
const MENU_QUAN = {
    cocacola: 'Lon coca uong lanh',
    sinh_to_bo: () => {
        return 'Xay bo + sua da => sinh to bo';
    },
    cafe_sua: 'Cafe pha phin',
} as const;

const banNuoc = caiDatMayBanNuoc(MENU_QUAN);
// khách hàng sử dụng
// case 1: lấy nước ngọt
const nc1 = banNuoc('cocacola');

// case 2: nc sinh tố
const nc2 = banNuoc('sinh_to_bo');
console.log(nc2);
// T extends Record<string, string | ((page: Page) => Locator)>
// => chúng ta sẽ nhận vào là bất cứ dạng css, xpath hoặc getBy bởi pw


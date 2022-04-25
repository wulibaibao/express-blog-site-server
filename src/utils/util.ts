import dayjs from "dayjs";
import { request, Dispatcher } from "undici";

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
    if (value === null) {
        return true;
    } else if (typeof value !== "number" && value === "") {
        return true;
    } else if (typeof value === "undefined" || value === undefined) {
        return true;
    } else if (value !== null && typeof value === "object" && !Object.keys(value).length) {
        return true;
    } else {
        return false;
    }
};

export const today = () => {
    return dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
};

export const ajax = (url: string, options): Promise<Dispatcher.ResponseData> =>
    request(url, options);

export const queryUserIp = ip =>
    ajax(
        `https://api.map.baidu.com/location/ip?ip=${ip}&ak=DZAPHu2wWxBSZap6rMI5mrFq4TKBgElm&coor=bd09ll`,
        {
            method: "get",
        },
    );

export const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

export const find = (db, query) =>
    new Promise((resolve, reject) => {
        db.findOne(query, (err, doc) => {
            console.log(err, doc);
            if (err) reject(err);
            else resolve(doc);
        });
    });

export const createCode = (len = 6) => {
    let code = ""; //存放验证码
    const codeChars = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
    ]; //验证码要随机挑选的字符

    for (let i = 0; i < len; i++) {
        let charIndex = Math.floor(Math.random() * 52); //随机产生0-52之间的整数
        code += codeChars[charIndex]; //将随机指向我们规定的字符添加到code容器里
    }

    return code;
};

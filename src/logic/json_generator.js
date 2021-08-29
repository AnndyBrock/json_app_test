let randomWords = require('random-words');

const getEnum = (array) => {
    if (Array.isArray(array)) {
        return array[number(0, array.length - 1)];
    }
    return null;
};

const getString = () => {
    let wordsCount = getNumber(0, 1);
    let tmp = randomWords(wordsCount);
    let res = '';
    for (let a=0;a<tmp.length; a++){
        res+=tmp[a] + ' '
    }
    return res;
};

const getNumber = () => {
    return Math.round(Math.random()*10);
};

const getInteger = () => {
    return Math.random() * 100;
};

const number = (min, max) =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const getType = (obj) =>{
    let res = '';
    if (obj.hasOwnProperty('default')) {
        return obj.default;
    } else if (obj.type === 'string') {
        res = getString()
    } else if (obj.type === 'number') {
        res = getNumber()
    } else if (obj.type === 'integer') {
        res = getInteger()
    } else if (obj.type === 'enum') {
        res = getEnum()
    } else if (obj.type === 'object') {
        res =  {}
    } else if (obj.type === 'array') {
        res = []
    } else if (obj.type === 'null') {
        res = null;
    } else if (obj.type === 'boolean') {
        res =  Math.random() < 0.5;
    }
    return res;
};

const jsonGenerator = (schema = {}) => {
    let res = {};

    const scrollObj =(obj, val, name ) =>{
        if (obj.type === 'array'){
            val[name] = getType(obj);
            for (let i = 0; i < getNumber(); i++) {
                scrollObj(obj.items,val[name], i );
            }
        }
        else if (obj.type === 'object' && obj.properties) {
            val[name] = val[name] || {};
            for (let key in obj.properties) {
                scrollObj(obj.properties[key], val[name], key)
            }
        }
        else if (obj.type === 'string') {
            val[name] = getType(obj)
        } else if (obj.type === 'number') {
            val[name] = getType(obj)
        } else if (obj.type === 'integer') {
            val[name] = getType(obj)
        }else if (obj.type === 'enum') {
            val[name] = getType(obj)
        }else if (obj.type === 'object') {
            val[name] = getType(obj)
        }else if (obj.type === 'null') {
            val[name] = getType(obj)
        }
    };
    scrollObj(schema, res,'result' );

    return res['result'];
};

export {jsonGenerator};
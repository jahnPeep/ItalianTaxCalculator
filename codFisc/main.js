class ItalianTaxCalculator {

    constructor(
        surname,
        name,
        gender,
        birthdate,
        birthplace 
    ) {
        this.name = name;
        this.surname = surname;
        this.gender = gender;
        this.birthday = getValidDate(birthdate);
        // { codice: 'G712', comune: 'Pisticci', provincia: 'MT' }
        this.birthplace = birthplace;
    }

    getSurnameCode() {
        const codeSurname = `${extractConsonants(this.surname)}${extractVowels(this.surname)}XXX`;
        return codeSurname.substr(0, 3).toUpperCase();
    }

    getNameCode() {
        let codNome = extractConsonants(this.name);
        if (codNome.length >= 4) {
            codNome = codNome.charAt(0) + codNome.charAt(2) + codNome.charAt(3);
        } else {
            codNome += `${extractVowels(this.name)}XXX`;
            codNome = codNome.substr(0, 3);
        }
        return codNome.toUpperCase();
    }

    dateCode() {
        let day = this.birthday.getDate();
        let month = this.birthday.getMonth() + 1;
        let year = this.birthday.getFullYear();

        year = `0${year}`;
        year = year.substr(year.length - 2, 2);
        month = MONTH_CODES[month-1];
        if (this.gender.toUpperCase() === 'F') {
            day += 40;
        }
        day = `0${day}`;
        day = day.substr(day.length - 2, 2);
        return `${year}${month}${day}`;
    }

    getCheckCode(code) {
        const codiceFiscale = code.toUpperCase();
        let val = 0;
        for (let i = 0; i < 15; i = i + 1) {
            const c = codiceFiscale[i];
            val += i % 2 !== 0 ? CHECK_CODE_EVEN[c] : CHECK_CODE_ODD[c];
        }
        val = val % 26;
        return CHECK_CODE_CHARS.charAt(val);
    }

    compute () {
        let code = this.getSurnameCode();
        code += this.getNameCode();
        code += this.dateCode();
        code += this.birthplace.codice;
        code += this.getCheckCode(code);
        
        return code;
    }
}

function daysInMonth (m, y) {
    switch (m) {
      case 1:
        return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0) ? 29 : 28
      case 8:
      case 3:
      case 5:
      case 10:
        return 30
      default:
        return 31
    }
  }
function isValidDate (d, m, y) {
    const month = m - 1
    return month >= 0 && month < 12 && d > 0 && d <= daysInMonth(month, y)
}

function getValidDate (d, m, y) {
    if (typeof d === 'string' && m === undefined && y === undefined) {
      return new Date(d)
    } else if (isValidDate(d, m, y)) {
      return new Date(y, m - 1, d, 0, 0, 0, 0)
    } else {
      throw new Error(`The date ${y}/${m}/${d} is not a valid date`)
    }
}

function extractVowels (str) {
    return str.replace(/[^AEIOU]/gi, '');
}

function extractConsonants (str) {
    return str.replace(/[^BCDFGHJKLMNPQRSTVWXYZ]/gi, '');
}

const MONTH_CODES = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'H',
    'L',
    'M',
    'P',
    'R',
    'S',
    'T'
];

const CHECK_CODE_ODD = {
    0: 1,
    1: 0,
    2: 5,
    3: 7,
    4: 9,
    5: 13,
    6: 15,
    7: 17,
    8: 19,
    9: 21,
    A: 1,
    B: 0,
    C: 5,
    D: 7,
    E: 9,
    F: 13,
    G: 15,
    H: 17,
    I: 19,
    J: 21,
    K: 2,
    L: 4,
    M: 18,
    N: 20,
    O: 11,
    P: 3,
    Q: 6,
    R: 8,
    S: 12,
    T: 14,
    U: 16,
    V: 10,
    W: 22,
    X: 25,
    Y: 24,
    Z: 23
  };
  
const CHECK_CODE_EVEN = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8,
    J: 9,
    K: 10,
    L: 11,
    M: 12,
    N: 13,
    O: 14,
    P: 15,
    Q: 16,
    R: 17,
    S: 18,
    T: 19,
    U: 20,
    V: 21,
    W: 22,
    X: 23,
    Y: 24,
    Z: 25
  };

const CHECK_CODE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
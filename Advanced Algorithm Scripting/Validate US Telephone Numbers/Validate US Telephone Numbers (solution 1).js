
// Solution without using Regular Expressions

function telephoneCheck(str) {
    var aCodeIndex1 = str.indexOf("(");
    var aCodeIndex2 = str.indexOf(")");
    if (aCodeIndex1 !== -1 && aCodeIndex2 !== -1) {
        if (aCodeIndex2 - aCodeIndex1 !== 4)
            return false;
    } else if (aCodeIndex1 >= 0 && aCodeIndex2 == -1) {
        return false;
    } else if (aCodeIndex1 == -1 && aCodeIndex2 >= 0) {
        return false;
    }

    if (str.indexOf("(", ++aCodeIndex1) !== -1 || str.indexOf(")", ++aCodeIndex2) !== -1)
        return false;

    var chrCode0 = "0".charCodeAt(0),
    chrCode9 = "9".charCodeAt(0);
    if ((str.charCodeAt(0) < chrCode0 || str.charCodeAt(0) > chrCode9) && str[0] !== "(")
        return false;

    str = str.split("");
    str = str.filter(char => (char.charCodeAt(0) >= chrCode0 && char.charCodeAt(0) <= chrCode9));
    if (str.length < 10 || str.length > 11)
        return false;
    else if (str.length == 11 && str[0] !== "1")
        return false;
    return true;
}


console.log(telephoneCheck("1 555-555-5555"));
console.log( true );
console.log( " " );

console.log(telephoneCheck("1 (555) 555-5555"));
console.log( true );
console.log( " " );

console.log(telephoneCheck("5555555555"));
console.log( true );
console.log( " " );

console.log(telephoneCheck("555-555-5555"));
console.log( true );
console.log( " " );

console.log(telephoneCheck("(555)555-5555"));
console.log( true );
console.log( " " );

console.log(telephoneCheck("1(555)555-5555"));
console.log( true );
console.log( " " );

console.log(telephoneCheck("555-5555"));
console.log( false );
console.log( " " );

console.log(telephoneCheck("5555555"));
console.log( false );
console.log( " " );

console.log(telephoneCheck("1 555)555-5555"));
console.log( false );
console.log( " " );

console.log(telephoneCheck("1 555 555 5555"));
console.log( true );
console.log( " " );

console.log(telephoneCheck("1 456 789 4444"));
console.log( true );
console.log( " " );

console.log(telephoneCheck("123**&!!asdf#"));
console.log( false );
console.log( " " );

console.log(telephoneCheck("55555555"));
console.log( false );
console.log( " " );

console.log(telephoneCheck("(6505552368)"));
console.log( false );
console.log( " " );

console.log(telephoneCheck("2 (757) 622-7382"));
console.log( false );
console.log( " " );

console.log(telephoneCheck("0 (757) 622-7382"));
console.log( false );
console.log( " " );

console.log(telephoneCheck("-1 (757) 622-7382"));
console.log( false );
console.log( " " );

console.log(telephoneCheck("2 757 622-7382"));
console.log( false );
console.log( " " );

console.log(telephoneCheck("10 (757) 622-7382"));
console.log( false );
console.log( " " );

console.log(telephoneCheck("27576227382"));
console.log( false );
console.log( " " );

console.log(telephoneCheck("(275)76227382"));
console.log( false );
console.log( " " );

console.log(telephoneCheck("2(757)6227382"));
console.log( false );
console.log( " " );

console.log(telephoneCheck("2(757)622-7382"));
console.log( false );
console.log( " " );

console.log(telephoneCheck("555)-555-5555"));
console.log( false );
console.log( " " );

console.log(telephoneCheck("(555-555-5555"));
console.log( false );
console.log( " " );

console.log(telephoneCheck("(555)5(55?)-5555"));
console.log( false );
console.log( " " );
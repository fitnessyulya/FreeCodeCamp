
function telephoneCheck(str) {
    // This first re doesn't work on Free Code Camp website
    // var re = /^1*([\s\-]*)(?:\d{3}|\(\d{3}\))\1\d{3}\1\d{4}$/;

    // Extended version of the previous re
    var re = /^1*[\s\-]*(?:\d{3}|\(\d{3}\))[\s\-]*\d{3}[\s\-]*\d{4}$/;

    return re.test(str);
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

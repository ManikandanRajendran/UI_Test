const loginErrorMessages = {
    generalErrorMessage:`Sorry, those details don't match. Check you've typed them correctly.`,
    emailEmptyErrorMessage:`Something's missing. Please check and try again.`,
    singleCharUsername:`Sorry, that username's too short. It needs to be at least two characters.`,
    passwordGeneralErrorMessage:`Something's missing. Please check and try again.`,
    invalidEmailErrorMessage:`Sorry, that email doesn’t look right. Please check it's a proper email.`,
    errorWhenEnterEmailNoAt:"Usernames can only include... Letters, numbers and these characters: ?/|}{+=_-^~`%$#",
    shortPasswordError:`Sorry, that password is too short. It needs to be eight characters or more.`,
    errorWhenEntersOnlyLetters:`Sorry, that password isn't valid. Please include something that isn't a letter.`,
    errorWhenEntersOnlyNumbers:`Sorry, that password isn't valid. Please include a letter.`,
    errorNoAccountFound:`Sorry, we can’t find an account with that email. You can register for a new account or get help here.`,
    invalidPassword:`That's not the right password for that account. Please try again or get help here.`//Uh oh, that password doesn’t match that account. Please try again.
}

module.exports = {loginErrorMessages};
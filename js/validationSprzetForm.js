function validateForm() {
    const typeInput = document.getElementById('type');
    const sizeInput = document.getElementById('size');
    const purposeInput = document.getElementById('purpose');
    const errorType = document.getElementById('errorType');
    const errorSize = document.getElementById('errorSize');
    const errorPurpose = document.getElementById('errorPurpose');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([typeInput, sizeInput, purposeInput], [errorType, errorSize, errorPurpose], errorsSummary);

    let valid = true;

    if (!checkRequired(typeInput.value)) {
        valid = false;
        typeInput.classList.add("error-input");
        errorType.innerText = "Typ jest wymagany";
    }

    if (!checkRequired(sizeInput.value)) {
        valid = false;
        sizeInput.classList.add("error-input");
        errorsizeName.innerText = "Rozmiar jest wymagany";
    } else if (!checkTextLengthRange(sizeNameInput.value, 2, 40)) {
        valid = false;
        sizeNameInput.classList.add("error-input");
        errorsizeName.innerText = "Nazwisko powinno mieć od 2 do 40 znaków";
    }

    if (!checkRequired(phoneNoInput.value)) {
        valid = false;
        phoneNoInput.classList.add("error-input");
        errorPhoneNo.innerText = "Numer telefonu jest wymagany";
    } else if (!checkPhoneNo(phoneNoInput.value)) {
        valid = false;
        phoneNoInput.classList.add("error-input");
        errorPhoneNo.innerText = "Numer telefonu powienien składać się z dokładnie 9 cyfr";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}
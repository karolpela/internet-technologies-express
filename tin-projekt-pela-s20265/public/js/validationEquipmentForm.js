/*global resetErrors,checkRequired,checkTextLengthRange, checkShoeSize*/

function validateForm() {
    const typeInput = document.getElementById('type');
    const sizeInput = document.getElementById('size');
    const purposeInput = document.getElementById('purpose');
    const errorType = document.getElementById('errorType');
    const errorSize = document.getElementById('errorSize');
    const errorPurpose = document.getElementById('errorPurpose');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors(
        [typeInput, sizeInput, purposeInput],
        [errorType, errorSize, errorPurpose],
        errorsSummary
    );

    let valid = true;

    if (!checkRequired(typeInput.value)) {
        valid = false;
        typeInput.classList.add('error-input');
        errorType.innerText = 'Typ jest wymagany';
    } else if (!checkTextLengthRange(purposeInput.value, 2, 12)) {
        valid = false;
        purposeInput.classList.add('error-input');
        errorPurpose.innerText = 'Przeznaczenie powinno mieć od 2 do 12 znaków';
    }

    if (!checkRequired(sizeInput.value)) {
        valid = false;
        sizeInput.classList.add('error-input');
        errorSize.innerText = 'Rozmiar jest wymagany';
    } else if (!checkShoeSize(sizeInput.value)) {
        valid = false;
        sizeInput.classList.add('error-input');
        errorSize.innerText = 'Rozmiar powinien być w formacie np. 40.0 lub 40.5';
    }

    if (!checkRequired(purposeInput.value)) {
        valid = false;
        purposeInput.classList.add('error-input');
        errorPurpose.innerText = 'Przeznaczenie jest wymagane';
    } else if (!checkTextLengthRange(purposeInput.value, 2, 20)) {
        valid = false;
        purposeInput.classList.add('error-input');
        errorPurpose.innerText = 'Przeznaczenie powinno mieć od 2 do 20 znaków';
    }

    if (!valid) {
        errorsSummary.innerText = 'Formularz zawiera błędy';
    }
    return valid;
}

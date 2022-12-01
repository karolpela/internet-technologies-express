/*global resetErrors,checkRequired,checkTextLengthRange, checkDate, checkDateIfAfter*/

function validateForm() {
    const customerInput = document.getElementById('customer');
    const equipmentInput = document.getElementById('equipment');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const errorCustomer = document.getElementById('errorCustomer');
    const errorEquipment = document.getElementById('errorEquipment');
    const errorStartDate = document.getElementById('errorStartDate');
    const errorEndDate = document.getElementById('errorEndDate');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors(
        [customerInput, equipmentInput, startDateInput, endDateInput],
        [errorCustomer, errorEquipment, errorStartDate, errorEndDate],
        errorsSummary
    );

    let valid = true;

    if (!checkRequired(customerInput.value)) {
        valid = false;
        customerInput.classList.add('error-input');
        errorCustomer.innerText = 'Klient jest wymagany';
    }

    if (!checkRequired(equipmentInput.value)) {
        valid = false;
        equipmentInput.classList.add('error-input');
        errorEquipment.innerText = 'Sprzęt jest wymagany';
    }

    // date checking

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    const nowString = [year, month, day].join('-');

    if (!checkRequired(startDateInput.value)) {
        valid = false;
        startDateInput.classList.add('error-input');
        errorStartDate.innerText = 'Data wypożyczenia jest wymagana';
    } else if (!checkDate(startDateInput.value)) {
        valid = false;
        startDateInput.classList.add('error-input');
        errorStartDate.innerText = 'Data powinna mieć format yyyy-MM-dd (np. 2000-01-01)';
    } else if (checkDateIfAfter(startDateInput.value, nowString)) {
        valid = false;
        startDateInput.classList.add('error-input');
        errorStartDate.innerText = 'Data nie może być z przyszłości';
    } else if (
        checkRequired(endDateInput.value) &&
        checkDate(endDateInput.value) &&
        !checkDateIfAfter(endDateInput.value, startDateInput.value)
    ) {
        valid = false;
        endDateInput.classList.add('error-input');
        errorEndDate.innerText = 'Data zwrotu powinna być późniejsza niż data wypożyczenia';
    }

    if (!valid) {
        errorsSummary.innerText = 'Formularz zawiera błędy';
    }
    return valid;
}

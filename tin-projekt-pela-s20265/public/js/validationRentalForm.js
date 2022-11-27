/*global resetErrors,checkRequired,checkTextLengthRange, checkDate, checkDateIfAfter*/

function validateForm() {
    const clientInput = document.getElementById('client');
    const equipmentInput = document.getElementById('equipment');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const errorClient = document.getElementById('errorClient');
    const errorEquipment = document.getElementById('errorEquipment');
    const errorStartDate = document.getElementById('errorStartDate');
    const errorEndDate = document.getElementById('errorEndDate');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([clientInput, equipmentInput, startDateInput, endDateInput], [errorClient, errorEquipment, errorStartDate, errorEndDate], errorsSummary);

    let valid = true;

    if (!checkRequired(clientInput.value)) {
        valid = false;
        clientInput.classList.add("error-input");
        errorClient.innerText = "Client jest wymagany";
    }

    if (!checkRequired(equipmentInput.value)) {
        valid = false;
        equipmentInput.classList.add("error-input");
        errorEquipment.innerText = "Sprzęt jest wymagany";
    }

    // date checking

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month
    if (day.length < 2)
        day = '0' + day
    const nowString = [year, month, day].join('-');

    if (!checkRequired(startDateInput.value)) {
        valid = false;
        startDateInput.classList.add("error-input");
        errorStartDate.innerText = "Data od jest wymagana";
    } else if (!checkDate(startDateInput.value)) {
        valid = false;
        startDateInput.classList.add("error-input");
        errorStartDate.innerText = "Data powinna mieć format yyyy-MM-dd (np. 2000-01-01)";
    } else if (checkDateIfAfter(startDateInput.value, nowString)) {
        valid = false;
        startDateInput.classList.add("error-input");
        errorStartDate.innerText = "Data nie może być z przyszłości";
    } else if (checkRequired(endDateInput.value) && checkDate(endDateInput.value)
        && !checkDateIfAfter(endDateInput.value, startDateInput.value)) {
        valid = false;
        endDateInput.classList.add("error-input");
        errorEndDate.innerText = "Data do powinna być późniejsza niż data od"
    }


    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}
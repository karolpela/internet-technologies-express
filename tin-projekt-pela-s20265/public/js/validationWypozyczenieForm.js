function validateForm() {
    const klientInput = document.getElementById('klient');
    const sprzetInput = document.getElementById('sprzet');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const errorKlient = document.getElementById('errorKlient');
    const errorSprzet = document.getElementById('errorSprzet');
    const errorStartDate = document.getElementById('errorStartDate');
    const errorEndDate = document.getElementById('errorEndDate');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([klientInput, sprzetInput, startDateInput, endDateInput], [errorKlient, errorSprzet, errorStartDate, errorEndDate], errorsSummary);

    let valid = true;

    if (!checkRequired(klientInput.value)) {
        valid = false;
        klientInput.classList.add("error-input");
        errorKlient.innerText = "Klient jest wymagany";
    }

    if (!checkRequired(sprzetInput.value)) {
        valid = false;
        sprzetInput.classList.add("error-input");
        errorSprzet.innerText = "Sprzęt jest wymagany";
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
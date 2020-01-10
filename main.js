function isNumeric(value) {   // проверка на то, что строка содержит только числа 
    return (/^[\d]+$/g).test(value); 
}

function validateEmpty(value) { // проверка ан пустое поле
    if (value === "") {
        return true;
    } else{
        return false
    }
}

function errorInput(func, input, addClass) { // функция для выдачи классов с ошибкам для input 
    // ( func = функция или функции проверки  ) ( input = проверяемое моле, пример:  input[0] ) ( addClass = добавляемый класс при ошибке)
    if (func) { // если проверка вернула true, то выдаётся класс с ошибкой
        input.classList.add(addClass);
        return false;
    } else {
        input.classList.remove( addClass); // если проверка вернула false, то удаляется класс с ошибкой или не выдаётся
        return true;
    }
}


function formSubmit() {

    const message = {
            success: 'Спасибо, ваша заявка отправлена!',
            failure: 'Ошибка на сервере.<br>Попробуйте позже'
        },
        form = document.querySelector('.form'),
        input = form.getElementsByTagName('input'),
        overlay = document.querySelector('.overlay'),
        body = document.querySelector('body'),
        modal = overlay.querySelector('.modal'),
        modalText = overlay.querySelector('.modal__text');


    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let inputResultFirst = errorInput(validateEmpty(input[0].value), input[0], 'input_error');
        let inputResultSecond = errorInput(validateEmpty(input[1].value) || !isNumeric(input[1].value), input[1], 'input_error');
        let inputResultThird = errorInput(validateEmpty(input[2].value), input[2], 'input_error');


        if (inputResultFirst &&  inputResultSecond && inputResultThird) {

            let request = new XMLHttpRequest();
            request.open('POST', 'mail.php');

            let formData = new FormData(form);
            request.send(formData);

            request.addEventListener('readystatechange', function () {
                if (request.readyState === 4 && request.status === 200) {
                    modalText.innerHTML = message.success;
                    modal.classList.add('modal_active');
                    body.classList.add('body_overlay');
                    overlay.classList.add('overlay_active');
                } else {
                    modalText.innerHTML = message.failure;
                    modal.classList.add('modal_active');
                    body.classList.add('body_overlay');
                    overlay.classList.add('overlay_active');
                }

            });
        }
    });

    overlay.querySelector('.modal__close').addEventListener('click', () => {
        overlay.classList.remove('overlay_active');
        body.classList.remove('body_overlay');
        modal.classList.remove('modal_active');
    });

}


formSubmit();
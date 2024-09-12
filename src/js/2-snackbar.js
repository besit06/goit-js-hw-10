import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stateInputs = form.querySelectorAll('input[name="state"]');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const delay = Number(delayInput.value);
    const selectedState = [...stateInputs].find(input => input.checked).value;

    console.log(`Selected delay: ${delay}, state: ${selectedState}`);
    
    createPromise(delay, selectedState).finally(() => {
        clearForm();
    });
    });

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay); console.log('Promise fulfilled');

            } else {
                reject(delay); console.log('Promise rejected');
            }
        }, delay);
    }).then((delay) => {
        iziToast.success({
            title: "Success",
            message: `✅ Fulfilled promise in ${delay}ms`,
        });
    }).catch((delay) => {
        iziToast.error({
            title: "Error",
            message: `❌ Rejected promise in ${delay}ms`,
        });
    });
}

function clearForm() {
    delayInput.value = ''; 
    stateInputs.forEach(input => input.checked = false);
}
/*jslint browser */

function initializeCalculator() {
    "use strict";

    const form = document.getElementById("order-form");
    const product = document.getElementById("product");
    const quantity = document.getElementById("quantity");
    const error = document.getElementById("order-error");
    const result = document.getElementById("order-total");
    const digits = /^\d+$/;

    function clearMessages() {
        error.textContent = "";
        result.value = "";
        quantity.removeAttribute("aria-invalid");
        product.removeAttribute("aria-invalid");
    }

    function showError(message, field) {
        error.textContent = message;
        field.setAttribute("aria-invalid", "true");
        field.focus();
    }

    function calculateOrder(event) {
        event.preventDefault();
        clearMessages();

        // Проверяем всю строку до parseInt: "2abc" не должно стать числом 2.
        if (!digits.test(quantity.value)) {
            showError(
                "Введите только цифры: без букв, пробелов и дробей.",
                quantity
            );
            return;
        }

        const count = parseInt(quantity.value, 10);
        if (!Number.isSafeInteger(count) || count < 1) {
            showError(
                "Введите целое число больше нуля, не слишком большое.",
                quantity
            );
            return;
        }

        const price = parseInt(product.value, 10);
        if (
            !digits.test(product.value)
            || !Number.isSafeInteger(price)
            || price < 1
        ) {
            showError("Выберите товар из списка.", product);
            return;
        }

        const total = price * count;
        if (!Number.isSafeInteger(total)) {
            showError(
                "Сумма слишком велика. Уменьшите количество.",
                quantity
            );
            return;
        }

        result.value = (
            "Стоимость заказа: " + total.toLocaleString("ru-RU") + " ₽"
        );
    }

    form.addEventListener("submit", calculateOrder);
    quantity.addEventListener("input", clearMessages);
    product.addEventListener("change", clearMessages);
}

document.addEventListener("DOMContentLoaded", initializeCalculator);

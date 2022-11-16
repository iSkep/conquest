// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from './functions.js';
// Подключение списка активных модулей
import { flsModules } from './modules.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('.search-form__item');
    const searchInput = document.querySelector('.search-form__input');

    searchForm.addEventListener('submit', (e) => {
        if (!searchInput.value) {
            e.preventDefault();
        }
    });
});

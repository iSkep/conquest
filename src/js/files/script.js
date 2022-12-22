import { isMobile, bodyLockToggle, bodyLockStatus } from './functions.js';
// Подключение списка активных модулей
import { flsModules } from './modules.js';
import { rangeItems } from './forms/range.js';

const filterPanel = document.querySelector('.filter-catalog');

function filterMenuInit() {
    const filterBtn = document.querySelector('.catalog__filter-btn');

    if (filterBtn) {
        // Скрытие фильтра от табуляции
        // getComputedStyle(filterBtn).display === 'none' ? (filterPanel.hidden = false) : (filterPanel.hidden = true);

        document.addEventListener('click', function (e) {
            if (bodyLockStatus && e.target.closest('.catalog__filter-btn')) {
                bodyLockToggle();
                // filterPanel.hidden = false;
                document.documentElement.classList.toggle('filter-open');
            }

            const overlay = document.querySelector('.overlay');
            if ((bodyLockStatus && e.target.closest('.filter-catalog__back')) || e.target === overlay) {
                bodyLockToggle();
                // filterPanel.hidden = true;
                document.documentElement.classList.toggle('filter-open');
            }
        });

        document.addEventListener('keydown', function (e) {
            const filterIsOpen = document.querySelector('.filter-open');
            if (e.which == 27 && e.code === 'Escape' && filterIsOpen) {
                setTimeout(() => {
                    bodyLockToggle();
                    // filterPanel.hidden = true;
                    document.documentElement.classList.toggle('filter-open');
                }, 0);
            }
        });
    }
}

function filterResetBtnInit(params) {
    const btnResetFilter = document.querySelector('.filter-catalog__reset');
    const filterCheckboxes = document.querySelectorAll('.filter-catalog input[type=checkbox]');

    if (filterPanel) {
        btnResetFilter.addEventListener('click', () => {
            filterCheckboxes.forEach((checkbox) => {
                checkbox.checked = false;
            });
    
            rangeItems.forEach((rangeItem) => {
                const item = rangeItem.querySelector('[data-range-item]');
                item.noUiSlider.reset();
            });
        });
    }
}

// Кнопка "Добавить в избранное"
export function changeIconInit(btnSelector, iconFrom, iconTo, colorFrom, colorTo) {
    const buttons = document.querySelectorAll(btnSelector);

    buttons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            let favIcon = e.currentTarget.children[0].children[0];
            if (favIcon.getAttribute('xlink:href') === iconFrom) {
                favIcon.setAttribute('xlink:href', iconTo);
                e.currentTarget.children[0].style.fill = colorTo;
            } else {
                favIcon.setAttribute('xlink:href', iconFrom);
                e.currentTarget.children[0].style.fill = colorFrom;
            }
        });
    });
}

function preventEmptySubmit() {
    const searchForm = document.querySelector('.search-form__item');
    const searchInput = document.querySelector('.search-form__input');

    searchForm.addEventListener('submit', (e) => {
        if (!searchInput.value) {
            e.preventDefault();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    preventEmptySubmit();
    filterMenuInit();
    filterResetBtnInit();
    changeIconInit(
        '.product-card__favorite',
        'img/icons/sprite.svg#svg-heart',
        'img/icons/sprite.svg#svg-heart_full',
        '#000',
        '#d75a4a'
    );
});

// Глобальная функция для предзаполнения калькулятора из шаблона
window.populateCalculatorWithTemplate = function(template) {
    if (!template) return;
    
    // Сбросить всё сначала
    setTimeout(() => {
        // Сбросить все чекбоксы и радио
        document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
            input.checked = false;
        });
        
        // Сбросить данные калькулятора если они есть
        if (typeof breakdownItems !== 'undefined') {
            breakdownItems = [];
        }
        
        if (typeof totalPrice !== 'undefined') {
            totalPrice = 0;
        }
        
        // Обновить отображение если функция есть
        if (typeof updateDisplay === 'function') {
            updateDisplay();
        }
    }, 50);
    
    // Выбрать тип сайта
    setTimeout(() => {
        const typeRadio = document.getElementById(template.type);
        if (typeRadio) {
            typeRadio.checked = true;
            // Триггерим и click и change для надежности
            typeRadio.click();
            const changeEvent = new Event('change', { bubbles: true });
            typeRadio.dispatchEvent(changeEvent);
        }
    }, 100);
    
    // Выбрать дизайн
    setTimeout(() => {
        const designRadio = document.getElementById(template.design);
        if (designRadio) {
            designRadio.checked = true;
            designRadio.click();
            const changeEvent = new Event('change', { bubbles: true });
            designRadio.dispatchEvent(changeEvent);
        }
    }, 150);
    
    // Выбрать функции
    if (template.features && Array.isArray(template.features)) {
        template.features.forEach((featureId, index) => {
            setTimeout(() => {
                const featureCheckbox = document.getElementById(featureId);
                if (featureCheckbox) {
                    featureCheckbox.checked = true;
                    featureCheckbox.click();
                    const changeEvent = new Event('change', { bubbles: true });
                    featureCheckbox.dispatchEvent(changeEvent);
                }
            }, 200 + (index * 50));
        });
    }
    
    // Выбрать доп услуги
    if (template.extras && Array.isArray(template.extras)) {
        template.extras.forEach((extraId, index) => {
            setTimeout(() => {
                const extraCheckbox = document.getElementById(extraId);
                if (extraCheckbox) {
                    extraCheckbox.checked = true;
                    extraCheckbox.click();
                    const changeEvent = new Event('change', { bubbles: true });
                    extraCheckbox.dispatchEvent(changeEvent);
                }
            }, 300 + (index * 50));
        });
    }
    
    // Показать сообщение
    setTimeout(() => {
        alert(`Калькулятор предзаполнен шаблоном "${template.name}"`);
    }, 500);
};


document.addEventListener('DOMContentLoaded', function() {
    // Проверить и применить сохраненный шаблон через
    setTimeout(() => {
        if (typeof TemplateSelection !== 'undefined' && 
            typeof TemplateSelection.populateCalculator === 'function') {
            // Вызываем функцию из main.js
            TemplateSelection.populateCalculator();
        } else {
            // Альтернативный вариант: проверяем localStorage напрямую
            const savedTemplateId = localStorage.getItem('selectedTemplate');
            if (savedTemplateId) {
                // Базовая проверка шаблонов
                const templates = {
                    'startup-landing': { 
                        name: 'ЛЕНДИНГ "СТАРТАП"',
                        type: 'siteType4',
                        design: 'design1',
                        features: ['function1', 'function5'],
                        extras: ['extra1']
                    },
                    'internet-shop': { 
                        name: 'ИНТЕРНЕТ-МАГАЗИН',
                        type: 'siteType1',
                        design: 'design2',
                        features: ['function1', 'function4'],
                        extras: ['extra1', 'extra2']
                    },
                    'corporate-site': { 
                        name: 'КОРПОРАТИВНЫЙ САЙТ',
                        type: 'siteType3',
                        design: 'design2',
                        features: ['function1', 'function3'],
                        extras: ['extra1', 'extra2', 'extra3']
                    },
                    'visiting-card': { 
                        name: 'САЙТ-ВИЗИТКА',
                        type: 'siteType2',
                        design: 'design1',
                        features: ['function1', 'function5'],
                        extras: []
                    },
                    'blog-portal': { 
                        name: 'БЛОГ',
                        type: 'siteType5',
                        design: 'design1',
                        features: ['function1', 'function3'],
                        extras: ['extra1']
                    }
                };
                
                const template = templates[savedTemplateId];
                if (template && typeof window.populateCalculatorWithTemplate === 'function') {
                    window.populateCalculatorWithTemplate(template);
                    localStorage.removeItem('selectedTemplate');
                }
            }
        }
    }, 500);
    
    
    // Элементы DOM
    const totalPriceElement = document.getElementById('totalPrice');
    const breakdownList = document.getElementById('breakdownList');
    const sendEmailBtn = document.getElementById('sendEmailBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    // Начальные значения - ПУСТО
    let totalPrice = 0;
    let breakdownItems = [];
    
    // Цены по умолчанию для каждого типа
    const defaultPrices = {
        siteType: {
            'siteType1': 45000,
            'siteType2': 25000,
            'siteType3': 60000,
            'siteType4': 15000,
            'siteType5': 15000
        },
        design: {
            'design1': 5000,
            'design2': 15000,
            'design3': 30000
        },
        functions: {
            'function1': 5000,
            'function2': 7000,
            'function3': 4000,
            'function4': 12000,
            'function5': 3000
        },
        extras: {
            'extra1': 5000,
            'extra2': 8000,
            'extra3': 7000,
            'extra4': 3000
        }
    };
    
    // Названия опций
    const optionNames = {
        // Типы сайтов
        'siteType1': 'Интернет-магазин',
        'siteType2': 'Сайт-визитка',
        'siteType3': 'Корпоративный сайт',
        'siteType4': 'Лендинг',
        'siteType5': 'Блог',
        
        // Дизайн
        'design1': 'Базовый дизайн',
        'design2': 'Персонализированный дизайн',
        'design3': 'Уникальный дизайн',
        
        // Функции
        'function1': 'Адаптивная верстка',
        'function2': 'Мультиязычность',
        'function3': 'Поиск по сайту',
        'function4': 'Система бронирования',
        'function5': 'Форма обратной связи',
        
        // Доп услуги
        'extra1': 'Домен на 1 год',
        'extra2': 'Хостинг на 1 год',
        'extra3': 'Техподдержка 3 мес',
        'extra4': 'Наполнение контентом'
    };
    
    // Обновить отображение
    function updateDisplay() {
        // Обновить итоговую сумму
        totalPriceElement.textContent = formatPrice(totalPrice) + '₽';
        
        // Обновить детализацию
        updateBreakdown();
    }
    
    // Форматирование цены с пробелами
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    
    // Обновить список детализации
    function updateBreakdown() {
        breakdownList.innerHTML = '';
        
        if (breakdownItems.length === 0) {
            // Показать сообщение, если список пуст
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'breakdown-empty';
            emptyMessage.textContent = 'Выберите опции для расчета';
            emptyMessage.style.color = '#6c757d';
            emptyMessage.style.fontStyle = 'italic';
            emptyMessage.style.textAlign = 'center';
            emptyMessage.style.padding = '20px';
            breakdownList.appendChild(emptyMessage);
            return;
        }
        
        // Добавить элементы
        breakdownItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'breakdown-item';
            itemElement.innerHTML = `
                <span class="breakdown-name">${item.name}</span>
                <span class="breakdown-price">${formatPrice(item.price)}₽</span>
            `;
            breakdownList.appendChild(itemElement);
        });
    }
    
    // Пересчитать итоговую стоимость
    function recalculateTotal() {
        totalPrice = breakdownItems.reduce((sum, item) => sum + item.price, 0);
        updateDisplay();
    }
    
    // Обработчики для типа сайта (radio)
    const siteTypeRadios = document.querySelectorAll('input[name="siteType"]');
    siteTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Удалить старый тип сайта (если был)
            breakdownItems = breakdownItems.filter(item => item.category !== 'type');
            
            // Добавить новый тип сайта
            const id = this.id;
            const price = defaultPrices.siteType[id];
            const name = optionNames[id];
            
            if (name && price) {
                breakdownItems.unshift({ 
                    name, 
                    price, 
                    category: 'type' 
                });
                recalculateTotal();
            }
        });
    });
    
    // Обработчики для дизайна (radio)
    const designRadios = document.querySelectorAll('input[name="design"]');
    designRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Удалить старый дизайн (если был)
            breakdownItems = breakdownItems.filter(item => item.category !== 'design');
            
            // Добавить новый дизайн
            const id = this.id;
            const price = defaultPrices.design[id];
            const name = optionNames[id];
            
            if (name && price) {
                breakdownItems.push({ 
                    name, 
                    price, 
                    category: 'design' 
                });
                recalculateTotal();
            }
        });
    });
    
    // Обработчики для функций (checkbox)
    const functionCheckboxes = document.querySelectorAll('.function-checkbox');
    functionCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const id = this.id;
            const price = defaultPrices.functions[id];
            const name = optionNames[id];
            
            if (this.checked) {
                // Добавить функцию
                breakdownItems.push({ 
                    name, 
                    price, 
                    category: 'functions' 
                });
            } else {
                // Удалить функцию
                breakdownItems = breakdownItems.filter(item => 
                    item.name !== name || item.category !== 'functions'
                );
            }
            
            recalculateTotal();
        });
    });
    
    // Обработчики для доп услуг (checkbox)
    const extraCheckboxes = document.querySelectorAll('.extra-checkbox');
    extraCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const id = this.id;
            const price = defaultPrices.extras[id];
            const name = optionNames[id];
            
            if (this.checked) {
                // Добавить доп услугу
                breakdownItems.push({ 
                    name, 
                    price, 
                    category: 'extras' 
                });
            } else {
                // Удалить доп услугу
                breakdownItems = breakdownItems.filter(item => 
                    item.name !== name || item.category !== 'extras'
                );
            }
            
            recalculateTotal();
        });
    });
    
    // Сохранить расчет
    sendEmailBtn.addEventListener('click', function() {
        if (breakdownItems.length === 0) {
            alert('Выберите хотя бы одну опцию для расчета!');
            return;
        }
        
        // Показать итоговый расчет
        let message = 'РАСЧЕТ СТОИМОСТИ:\n\n';
        message += 'ИТОГОВАЯ СТОИМОСТЬ: ' + formatPrice(totalPrice) + '₽\n\n';
        message += 'СОСТАВ:\n';
        
        breakdownItems.forEach(item => {
            message += '• ' + item.name + ': ' + formatPrice(item.price) + '₽\n';
        });
        
        alert(message);
    });
    
    // Сбросить расчет
    resetBtn.addEventListener('click', function() {
        if (breakdownItems.length === 0) {
            alert('Расчет уже пуст!');
            return;
        }
        
        if (confirm('Сбросить все выбранные опции?')) {
            // Сбросить все чекбоксы и радио
            document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
                input.checked = false;
            });
            
            // Сбросить breakdown
            breakdownItems = [];
            
            // Сбросить цену
            totalPrice = 0;
            
            updateDisplay();
            alert('Расчет сброшен!');
        }
    });
    
    // Инициализация при загрузке
    function init() {
        // Обновить отображение (будет 0₽ и пустой список)
        updateDisplay();
    }
    
    // === ФУНКЦИИ ДЛЯ ИСТОРИИ РАСЧЕТОВ ===

// Загрузить историю из localStorage
function loadHistory() {
    const historyList = document.getElementById('historyList');
    const savedHistory = localStorage.getItem('calculationHistory');
    const history = savedHistory ? JSON.parse(savedHistory) : [];
    
    historyList.innerHTML = '';
    
    if (history.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-history';
        emptyMessage.textContent = 'История расчетов пуста';
        historyList.appendChild(emptyMessage);
        return;
    }
    
    // Показать последние 5 расчетов
    const recentHistory = history.slice(-5).reverse();
    
    recentHistory.forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        // Форматируем дату
        const date = new Date(item.date);
        const formattedDate = date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Ограничиваем количество отображаемых опций
        const itemsToShow = item.items.slice(0, 3);
        const remainingItems = item.items.length - 3;
        
        historyItem.innerHTML = `
            <div class="history-header">
                <span class="history-date">${formattedDate}</span>
                <span class="history-total">${formatPrice(item.total)}₽</span>
            </div>
            <div class="history-items">
                ${itemsToShow.map(item => `<span>${item.name}</span>`).join('')}
                ${remainingItems > 0 ? `<span>... и еще ${remainingItems}</span>` : ''}
            </div>
        `;
        
        // Добавить клик для просмотра деталей
        historyItem.addEventListener('click', function() {
            showCalculationDetails(item);
        });
        
        historyList.appendChild(historyItem);
    });
}

// Сохранить расчет в историю
function saveToHistory() {
    if (breakdownItems.length === 0) {
        alert('Выберите хотя бы одну опцию для расчета!');
        return false;
    }
    
    // Получаем существующую историю
    const savedHistory = localStorage.getItem('calculationHistory');
    const history = savedHistory ? JSON.parse(savedHistory) : [];
    
    // Создаем новую запись
    const newCalculation = {
        id: Date.now(),
        date: new Date().toISOString(),
        total: totalPrice,
        items: breakdownItems.map(item => ({
            name: item.name,
            price: item.price,
            category: item.category
        }))
    };
    
    // Добавляем новую запись
    history.push(newCalculation);
    
    // Сохраняем (максимум 50 записей)
    if (history.length > 50) {
        history.shift(); // Удаляем самую старую запись
    }
    
    localStorage.setItem('calculationHistory', JSON.stringify(history));
    
    // Обновляем отображение истории
    loadHistory();
    
    return true;
}

// Показать детали расчета
function showCalculationDetails(calculation) {
    let message = `РАСЧЕТ ОТ ${new Date(calculation.date).toLocaleDateString('ru-RU')}\n\n`;
    message += `ИТОГОВАЯ СТОИМОСТЬ: ${formatPrice(calculation.total)}₽\n\n`;
    message += 'СОСТАВ:\n';
    
    calculation.items.forEach(item => {
        message += `• ${item.name}: ${formatPrice(item.price)}₽\n`;
    });
    
    alert(message);
}

// Очистить историю
function clearHistory() {
    if (confirm('Вы уверены, что хотите очистить всю историю расчетов? Это действие нельзя отменить.')) {
        // Очищаем localStorage
        localStorage.removeItem('calculationHistory');
        
        // Перезагружаем историю (покажет пустое сообщение)
        loadHistory();
        
        // Показываем сообщение об успехе
        alert('История расчетов полностью очищена!');
    }
}

// === ОБНОВИТЕ ИНИЦИАЛИЗАЦИЮ ===
function init() {
    // Загружаем историю
    loadHistory();
    
    // Добавляем обработчик для кнопки очистки истории
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', clearHistory);
    } else {
        console.error('Кнопка clearHistoryBtn не найдена!');
    }
    
    // Обновить отображение калькулятора
    updateDisplay();
}

// === ОБНОВИТЕ КНОПКУ "СОХРАНИТЬ" ===
sendEmailBtn.addEventListener('click', function() {
    if (saveToHistory()) {
        // Показываем сообщение о сохранении
        let message = 'РАСЧЕТ СОХРАНЕН!\n\n';
        message += 'ИТОГОВАЯ СТОИМОСТЬ: ' + formatPrice(totalPrice) + '₽\n\n';
        message += 'СОСТАВ:\n';
        
        breakdownItems.forEach(item => {
            message += '• ' + item.name + ': ' + formatPrice(item.price) + '₽\n';
        });
        
        message += '\nРасчет сохранен в историю.';
        alert(message);
    }
});

// === ДОБАВЬТЕ ОБРАБОТЧИК ДЛЯ КНОПКИ ОЧИСТКИ ===
document.addEventListener('DOMContentLoaded', function() {
    // Загружаем историю при загрузке страницы
    loadHistory();
    
    // Добавляем обработчик для кнопки очистки истории
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', clearHistory);
    }
});

// Обновите функцию resetBtn чтобы она не очищала историю
resetBtn.addEventListener('click', function() {
    if (breakdownItems.length === 0) {
        alert('Расчет уже пуст!');
        return;
    }
    
    if (confirm('Сбросить текущий расчет?')) {
        // Сбросить все чекбоксы и радио
        document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
            input.checked = false;
        });
        
        // Сбросить breakdown
        breakdownItems = [];
        
        // Сбросить цену
        totalPrice = 0;
        
        updateDisplay();
    }
});

    // Запустить инициализацию
    init();
});




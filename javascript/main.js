// Объект для хранения выбранного шаблона
const TemplateSelection = {
    selectedTemplate: null,
    
    // Шаблоны и их параметры
    templates: {
        'startup-landing': {
            name: 'ЛЕНДИНГ "СТАРТАП"',
            type: 'siteType4', // Лендинг
            design: 'design1', // Базовый
            features: ['function1', 'function5'], // Адаптивная верстка + Форма обратной связи
            extras: ['extra1'], // Домен на 1 год
            basePrice: 15000
        },
        'internet-shop': {
            name: 'ИНТЕРНЕТ-МАГАЗИН',
            type: 'siteType1', // Интернет-магазин
            design: 'design2', // Персонализированный
            features: ['function1', 'function4'], // Адаптивная верстка + Система бронирования
            extras: ['extra1', 'extra2'], // Домен + Хостинг
            basePrice: 45000
        },
        'corporate-site': {
            name: 'КОРПОРАТИВНЫЙ САЙТ',
            type: 'siteType3', // Корпоративный сайт
            design: 'design2', // Персонализированный
            features: ['function1', 'function3'], // Адаптивная верстка + Поиск по сайту
            extras: ['extra1', 'extra2', 'extra3'], // Домен + Хостинг + Техподдержка
            basePrice: 60000
        },
        'visiting-card': {
            name: 'САЙТ-ВИЗИТКА',
            type: 'siteType2', // Сайт-визитка
            design: 'design1', // Базовый
            features: ['function1', 'function5'], // Адаптивная верстка + Форма обратной связи
            extras: [],
            basePrice: 25000
        },
        'blog-portal': {
            name: 'БЛОГ',
            type: 'siteType5', // Блог
            design: 'design1', // Базовый
            features: ['function1', 'function3'], // Адаптивная верстка + Поиск по сайту
            extras: ['extra1'],
            basePrice: 15000
        }
    },
    
    // Сохранить выбранный шаблон
    saveTemplate(templateId) {
        this.selectedTemplate = templateId;
        localStorage.setItem('selectedTemplate', templateId);
    },
    
    // Получить сохраненный шаблон
    getTemplate() {
        const saved = localStorage.getItem('selectedTemplate');
        return saved ? this.templates[saved] : null;
    },
    
    // Очистить сохраненный шаблон
    clearTemplate() {
        this.selectedTemplate = null;
        localStorage.removeItem('selectedTemplate');
    },
    
    // Предзаполнить калькулятор
    populateCalculator() {
        const template = this.getTemplate();
        if (!template) return false;
        
        // Этот код выполнится на странице калькулятора
        if (typeof window.populateCalculatorWithTemplate === 'function') {
            window.populateCalculatorWithTemplate(template);
            this.clearTemplate(); // Очистить после применения
            return true;
        }
        
        return false;
    }
};

// Функция выбора шаблона
function selectTemplate(templateId) {
    // Сохраняем выбранный шаблон
    TemplateSelection.saveTemplate(templateId);
    
    // Перенаправляем на калькулятор
    window.location.href = 'calc.html';
}

// Обработчики для страницы шаблонов
document.addEventListener('DOMContentLoaded', function() {
    // Для кнопок выбора шаблона
    const templateButtons = document.querySelectorAll('.template-select-btn');
    templateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const templateId = this.getAttribute('data-template');
            selectTemplate(templateId);
        });
    });
});

// Простая кнопка "Наверх"
document.getElementById('scrollTopBtn').addEventListener('click', function() {
    // Просто прокручиваем наверх
    window.scrollTo(0, 0);
});
/* =========================================
   TRADUCCIONES
========================================= */

const translations = {
    es: {
        titulo: "Registro",
        nombre: "Nombre:",
        email: "Correo electrónico:",
        nombre_placeholder: "Escribe tu nombre",
        email_placeholder: "correo@ejemplo.com",
        terminos: "Acepto los términos y condiciones",
        suscripcion: "Selecciona tu suscripción:",
        basico: "Básico",
        premium: "Premium",
        enviar: "Enviar Datos",
        ver_mensaje: "Ver mensaje de confirmación",
        target_titulo: "¡Foco en el destino!",
        target_texto: "Has activado este elemento usando :target.",
        cerrar: "Cerrar"
    },
    en: {
        titulo: "Registration",
        nombre: "Name:",
        email: "Email address:",
        nombre_placeholder: "Enter your name",
        email_placeholder: "email@example.com",
        terminos: "I accept the terms and conditions",
        suscripcion: "Select your subscription:",
        basico: "Basic",
        premium: "Premium",
        enviar: "Submit Data",
        ver_mensaje: "View confirmation message",
        target_titulo: "Focus on destination!",
        target_texto: "You activated this element using :target.",
        cerrar: "Close"
    },
    zh: {
        titulo: "注册",
        nombre: "名字:",
        email: "电子邮件:",
        nombre_placeholder: "请输入您的名字",
        email_placeholder: "email@example.com",
        terminos: "我接受条款和条件",
        suscripcion: "选择您的订阅:",
        basico: "基础",
        premium: "高级",
        enviar: "提交数据",
        ver_mensaje: "查看确认消息",
        target_titulo: "目标焦点！",
        target_texto: "您使用 :target 激活了此元素。",
        cerrar: "关闭"
    },
    ru: {
        titulo: "Регистрация",
        nombre: "Имя:",
        email: "Эл. адрес:",
        nombre_placeholder: "Введите ваше имя",
        email_placeholder: "email@example.com",
        terminos: "Я принимаю условия",
        suscripcion: "Выберите подписку:",
        basico: "Базовый",
        premium: "Премиум",
        enviar: "Отправить",
        ver_mensaje: "Посмотреть сообщение",
        target_titulo: "Фокус на цели!",
        target_texto: "Вы активировали этот элемент с помощью :target.",
        cerrar: "Закрыть"
    }
};

/* =========================================
   OBTENER ELEMENTOS
========================================= */

const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
const wrappers = document.querySelectorAll(".contenedor-tarjeta");
const form = document.getElementById("formulario-registro");

/* =========================================
   COMPROBAR RTL
========================================= */

function checkAnyRtl() {
    const hayRtl = Array.from(wrappers).some(
        wrapper => wrapper.getAttribute("dir") === "rtl"
    );

    if (hayRtl) {
        document.body.classList.add("bg-rtl");
    } else {
        document.body.classList.remove("bg-rtl");
    }
}

/* =========================================
   CAMBIAR IDIOMA
========================================= */

function translatePage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = "ltr";

    /* Cambiar textos */
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    /* Cambiar placeholders */
    document.querySelectorAll("[data-placeholder]").forEach(input => {
        const key = input.getAttribute("data-placeholder");
        if (translations[lang] && translations[lang][key]) {
            input.placeholder = translations[lang][key];
        }
    });

    /* Cambiar fondo según idioma */
    document.body.classList.remove(
        "idioma-es",
        "idioma-en",
        "idioma-zh",
        "idioma-ru"
    );

    document.body.classList.add("idioma-" + lang);
}

/* =========================================
   INTERACCIÓN CON LOS INPUTS
========================================= */

inputs.forEach(input => {
    input.addEventListener("focus", function () {
        const wrapper = this.closest(".contenedor-tarjeta");
        wrapper.setAttribute("dir", "rtl");
        wrapper.classList.add("campo-activo");
        checkAnyRtl();
    });

    input.addEventListener("blur", function () {
        const wrapper = this.closest(".contenedor-tarjeta");
        wrapper.classList.remove("campo-activo");
        wrapper.setAttribute("dir", "ltr");
        checkAnyRtl();
    });
});

/* =========================================
   ENVIAR FORMULARIO
========================================= */

form.addEventListener("submit", function (event) {
    event.preventDefault();

    form.reset();

    wrappers.forEach(wrapper => {
        wrapper.setAttribute("dir", "ltr");
        wrapper.classList.remove("campo-activo");
    });

    document.body.classList.remove("bg-rtl");

    form.classList.add("form-enviado");

    setTimeout(() => {
        form.classList.remove("form-enviado");
    }, 2000);
});
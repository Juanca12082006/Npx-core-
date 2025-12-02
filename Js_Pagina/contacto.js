// ----- CONTACT FORM TO WHATSAPP -----

// Número de WhatsApp (formato internacional sin + ni espacios)
// Para Colombia: 57 + número de 10 dígitos
const WHATSAPP_NUMBER = '573012655645'; // Cambia este número si es necesario

// Capturar el formulario
const contactForm = document.getElementById('contactForm');

// --- Nuevo: obtener input teléfono y agregar restricciones ---
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    // Forzar maxlength en el atributo (UI)
    phoneInput.setAttribute('maxlength', '14');

    // Bloquear teclas que no sean dígitos o teclas de control
    phoneInput.addEventListener('keydown', function(e) {
        const allowedKeys = [
            'Backspace','Delete','Tab','Escape','Enter',
            'ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'
        ];
        if (allowedKeys.includes(e.key)) return; // permitir navegación y edición
        if ((e.ctrlKey || e.metaKey) && ['a','c','v','x','A','C','V','X'].includes(e.key)) return; // permitir atajos
        // permitir solo un dígito y bloquear si ya hay 14
        if (/^\d$/.test(e.key)) {
            const currentDigits = (phoneInput.value || '').replace(/\D/g, '');
            if (currentDigits.length >= 14) {
                e.preventDefault();
            }
            return;
        }
        // cualquier otra tecla -> bloquear
        e.preventDefault();
    });

    // Sanitizar en input: mantener solo dígitos y cortar a 14
    phoneInput.addEventListener('input', function() {
        const digits = (phoneInput.value || '').replace(/\D/g, '').slice(0, 14);
        if (phoneInput.value !== digits) {
            phoneInput.value = digits;
        }
    });

    // Manejar pegado: extraer solo dígitos y respetar límite de 14
    phoneInput.addEventListener('paste', function(e) {
        e.preventDefault();
        const paste = (e.clipboardData || window.clipboardData).getData('text') || '';
        const digits = paste.replace(/\D/g, '').slice(0, 14);
        const start = phoneInput.selectionStart || 0;
        const end = phoneInput.selectionEnd || 0;
        const before = (phoneInput.value || '').slice(0, start).replace(/\D/g, '');
        const after = (phoneInput.value || '').slice(end).replace(/\D/g, '');
        const newVal = (before + digits + after).slice(0, 14);
        phoneInput.value = newVal;
    });
}
// --- Fin nuevo ---

// Función que detecta caracteres inválidos en el teléfono (cualquier cosa que no sea dígito)
function getInvalidPhoneChars(input) {
    // quitar espacios para evaluar lo que efectivamente escribió el usuario
    const compact = input.replace(/\s+/g, '');
    // encontrar todos los caracteres que no sean dígitos
    const matches = compact.match(/\D/g);
    if (!matches) return [];
    // devolver valores únicos para mostrar en el mensaje
    return [...new Set(matches)];
}

// Manejar el envío del formulario
contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevenir envío tradicional del formulario

    // Obtener los valores del formulario
    const name = document.getElementById('name').value.trim();
    const phoneRaw = document.getElementById('phone').value.trim();
    const requestRaw = document.getElementById('request').value.trim();

    // Detectar caracteres inválidos en el teléfono
    const invalidChars = getInvalidPhoneChars(phoneRaw);
    if (invalidChars.length > 0) {
        alert(`El teléfono contiene caracteres inválidos: ${invalidChars.join(' ')}`);
        return;
    }

    // Normalizar teléfono a solo dígitos
    const phone = phoneRaw.replace(/\D+/g, '');

    // Validación: debe quedar al menos un dígito
    if (!/^\d+$/.test(phone)) {
        alert('El teléfono debe contener solo números (sin letras ni caracteres).');
        return;
    }

    // Nuevo: validar longitud máxima de 14 dígitos
    if (phone.length > 14) {
        alert('El teléfono no puede tener más de 14 dígitos.');
        return;
    }

    // Validación: request máximo 150 caracteres
    if (requestRaw.length > 150) {
        alert('La solicitud no puede superar los 150 caracteres.');
        return;
    }
    const request = requestRaw;

    // Validar que los campos no estén vacíos
    if (!name || !phone || !request) {
        alert('Por favor completa todos los campos.');
        return;
    }

    // Construir el mensaje para WhatsApp
    const message = `
Npx core </> Contact 

Name: ${name}
Phone: ${phone}

Request:
${request}
    `.trim();

    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message);

    // Construir la URL de WhatsApp
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Abrir WhatsApp en nueva pestaña
    window.open(whatsappURL, '_blank');

    // Opcional: Limpiar el formulario después de enviar
    contactForm.reset();
});

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Conexión y guardado de sesión
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Generar el código QR en la terminal
client.on('qr', (qr) => {
    console.log('Escanea este código QR con tu WhatsApp (Dispositivos vinculados):');
    qrcode.generate(qr, { small: true });
});

// Confirmación de que ya está conectado
client.on('ready', () => {
    console.log('¡Bot Anti-Recargas en línea y listo para vender 24/7! 🚀');
});

// Lectura de los mensajes
client.on('message', async (message) => {
    // Evitar que el bot responda en grupos o a estados
    if (message.from.includes('@g.us') || message.isStatus) return;

    // Limpiar el mensaje entrante (pasar todo a minúsculas)
    const textoEntrante = message.body.trim().toLowerCase();

    // Filtro de la palabra clave
    if (textoEntrante === 'manual') {
        const respuestaPago = `¡Excelente decisión! 🚀 El costo de tu Guía PDF es de $99 MXN.\n\nPuedes realizar tu pago seguro aquí:\n\n🏪 *OXXO / Tarjeta Spin:*\n4741742919891161\n\n🏦 *Transferencia (SPEI):*\n*CLABE:* 167730000086295042\n*A nombre de:* ProFire\n\n📸 En cuanto realices el pago, mándame una foto del ticket o captura de pantalla por aquí mismo y te envío el archivo PDF al instante para que empieces.`;        
        await message.reply(respuestaPago);
        console.log(`Mensaje de venta enviado a: ${message.from}`);
    }
});

client.initialize();
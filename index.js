const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const http = require('http'); // Mantenedor de vida para la nube

// 1. Servidor web básico (Requisito para que la nube no lo apague)
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot de Free Fire Activo 24/7');
}).listen(process.env.PORT || 3000);

// 2. Conexión de WhatsApp (Sin la ruta de Windows)
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('NUEVO CÓDIGO QR - Escanéalo para conectar a la nube:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('¡Bot Anti-Recargas en línea y listo para vender 24/7! 🚀');
});

client.on('message', async (message) => {
    if (message.from.includes('@g.us') || message.isStatus) return;
    const textoEntrante = message.body.trim().toLowerCase();
    
    if (textoEntrante === 'manual') {
        const respuestaPago = `¡Excelente decisión! 🚀 El costo de tu Guía PDF es de $99 MXN.\n\nPuedes realizar tu pago seguro aquí:\n\n🏪 *OXXO / Tarjeta Spin:*\n4741742919891161\n\n🏦 *Transferencia (SPEI):*\n*CLABE:* 167730000086295042\n*A nombre de:* ProFire\n\n📸 En cuanto realices el pago, mándame una foto del ticket o captura de pantalla por aquí mismo y te envío el archivo PDF al instante para que empieces.`;
        await message.reply(respuestaPago);
    }
});

client.initialize();
 

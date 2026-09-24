const { Client, LocalAuth } = require('whatsapp-web.js');
const http = require('http');
const qrcode = require('qrcode');

let qrCodeData = 'Aún no se ha generado el código QR... Espera unos segundos y recarga la página.';

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        // DIETA EXTREMA: Comandos para que Chrome use la mínima memoria posible
        args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox', 
            '--disable-dev-shm-usage', 
            '--disable-gpu',
            '--no-first-run',
            '--no-zygote',
            '--single-process' 
        ]
    }
});

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    if (qrCodeData.startsWith('data:image')) {
        res.end(`<html><body><h2>Escanea este QR con tu iPhone:</h2><img src="${qrCodeData}"></body></html>`);
    } else {
        res.end(`<html><body><h2>${qrCodeData}</h2></body></html>`);
    }
}).listen(process.env.PORT || 3000);

client.on('qr', async (qr) => {
    console.log('Generando código QR para la web...');
    qrCodeData = await qrcode.toDataURL(qr);
});

client.on('ready', () => {
    qrCodeData = '¡Bot conectado y listo para vender 24/7! 🚀';
    console.log(qrCodeData);
});

client.on('message', async (message) => {
    console.log('📩 Mensaje recibido:', message.body); 

    if (message.from.includes('@g.us') || message.isStatus) return;
    const textoEntrante = message.body.trim().toLowerCase();
    
    if (textoEntrante === 'manual') {
        console.log('✅ Palabra clave detectada. Respondiendo...');
        const respuestaPago = `¡Excelente decisión! 🚀 El costo de tu Guía PDF es de $99 MXN.\n\nPuedes realizar tu pago seguro aquí:\n\n🏪 *OXXO / Tarjeta Spin:*\n4741742919891161\n\n🏦 *Transferencia (SPEI):*\n*CLABE:* 167730000086295042\n*A nombre de:* ProFire\n\n📸 En cuanto realices el pago, mándame una foto del ticket o captura de pantalla por aquí mismo y te envío el archivo PDF al instante para que empieces.`;
        await message.reply(respuestaPago);
    }
});

client.initialize();

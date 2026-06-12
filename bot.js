const mineflayer = require('mineflayer');
const config = require('./config.json');

let bot = null;
let reconnectTimeout = null;

function createBot() {
  console.log(`[MABFA] Подключение к ${config.host}:${config.port} как ${config.username}`);

  bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    auth: 'offline',
    version: false,          // автоопределение версии (работает с 4.37.1)
    viewDistance: config.viewDistance || 5
  });

  bot.on('spawn', () => {
    console.log(`✅ ${config.username} зашёл на сервер!`);
    
    // Анти-AFK: простое движение
    startMoving();
    
    // Регистрация / логин
    if (config.enablePassword && config.password) {
      setTimeout(() => {
        bot.chat(`/register ${config.password}`);
        setTimeout(() => bot.chat(`/login ${config.password}`), 500);
      }, 1000);
    }
  });

  bot.on('error', (err) => {
    console.error('⚠️ Ошибка:', err.message);
    scheduleReconnect();
  });

  bot.on('end', (reason) => {
    console.log(`⛔ Отключён: ${reason || 'неизвестно'}`);
    scheduleReconnect();
  });

  bot.on('kicked', (reason) => {
    console.log(`👢 Кикнут: ${reason}`);
    scheduleReconnect();
  });
}

// Простой анти-AFK: повороты и прыжки
let step = 0;
function startMoving() {
  setInterval(() => {
    if (!bot || !bot.entity) return;
    if (step % 4 === 0) {
      bot.setControlState('forward', true);
      setTimeout(() => bot.setControlState('forward', false), 500);
    } else if (step % 4 === 1) {
      bot.setControlState('back', true);
      setTimeout(() => bot.setControlState('back', false), 500);
    } else if (step % 4 === 2) {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 300);
    } else {
      // просто поворот головой
      const yaw = Math.random() * Math.PI * 2;
      bot.look(yaw, 0);
    }
    step++;
  }, 2000);
}

function scheduleReconnect() {
  if (reconnectTimeout) clearTimeout(reconnectTimeout);
  if (bot) bot.end();
  reconnectTimeout = setTimeout(() => {
    console.log('🔄 Переподключение через 5 сек...');
    createBot();
  }, 5000);
}

createBot();

process.on('SIGINT', () => {
  console.log('\n🔚 Завершение');
  if (reconnectTimeout) clearTimeout(reconnectTimeout);
  if (bot) bot.end();
  process.exit(0);
});
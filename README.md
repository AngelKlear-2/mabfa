<div align="center">

# **🤖 Minecraft AFK Bot For Aternos (MABFA)🤖** 

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-yellow)](LICENSE)
[![Mineflayer](https://img.shields.io/badge/mineflayer-4.37.1-blue)](https://github.com/PrismarineJS/mineflayer)
</div>

  [Features](#features)
  ·
  [Installing](#installation)
  ·
  [Configure the bot](#configure-the-bot)
  ·
  [How It Works](#how-it-works)
  ·
  [Troubleshooting](#troubleshooting)
  ·
  [Project Structure](#project-structure)
  ·
  [Contributing](#contributing)
  ·
  [License](#license)
  ·
  [Disclaimer](#disclaimer)




**A lightweight AFK bot for Minecraft Java Edition servers, designed specifically for Aternos.**  
Built with Mineflayer, it automatically reconnects, mimics player activity, and supports server passwords (/register, /login).

## **Features:**

- **Auto-connect & reconnect** – Joins the server automatically. If kicked or the server restarts, it waits 5 seconds and reconnects.
- **Anti-AFK** – Every 2 seconds: move forward/back, jump, or look around. Prevents idle kicks.
- **Password support** – Automatically sends /register and /login on spawn (optional).
- **Lightweight** – Only one dependency (mineflayer), simple config.
- **Auto version detection** – Bot detects the server's Minecraft version automatically.

## **Installation:**

*Clone the repository*
```bash
git clone https://github.com/AngelKlear-2/mabfa.git
cd mabfa
```

*Install dependencies*

  ```bash
npm install
```

## *Configure the bot*

   Edit config.json with your Aternos server details:
```json
   {
     "host": "example.aternos.me",
     "port": 25565,
     "username": "AFKbot",
     "viewDistance": 5,
     "enablePassword": false,
     "password": ""
   }
```

   **Fields:**  
   
   host – Your Aternos server address  
   port – Server port (usually 25565)  
   username – Bot's in-game name  
   viewDistance – Lower = less server load  
   enablePassword – Set to true if your server requires /register and /login  
   password – Your password (ignored if enablePassword is false)

   *Important for Aternos:* The server must be manually started (or kept alive with an uptime service). The bot cannot turn on the server.

*Run the bot*

```bash
node bot.js
```
*or*
```bash
npm start
```
   To keep it running 24/7 on a VPS or Raspberry Pi:
   npm install -g pm2
   pm2 start bot.js --name mabfa
   pm2 save
   pm2 startup

*Stop the bot* – Press Ctrl+C or pm2 stop mabfa.

## **How It Works:**

- On start, the bot connects to host:port.
- After spawning, an interval runs every 2 seconds: it cycles through moving forward, moving backward, jumping, or looking around.
- If the bot is disconnected (server offline, kick, error), it waits 5 seconds and tries to reconnect automatically.
- If enablePassword: true, the bot sends /register <password> one second after spawn, then /login <password> half a second later.

## **Troubleshooting:**

| Issue | Solution |
|-------|----------|
| *ECONNREFUSED* | Your Aternos server is offline. Start it from the Aternos panel. |
| *Bot doesn't move* | Some anti-cheat plugins block rapid movements. Increase the interval in bot.js (the 2000 in setInterval). |
| *Bot doesn't send password* | Make sure enablePassword: true and password is not empty. If the server is slow, increase the delay in bot.js (the 1000 in setTimeout). |
| *Invalid username error* | The bot uses auth: 'offline' (hardcoded). It works with any username – no Microsoft login. |

## **Project Structure:**
```structure
mabfa/
├── bot.js            # Main script (connection, movement, reconnect)
├── config.json       # Your settings (ignored by git)
├── package.json      # Dependencies and metadata
├── README.md         # This file
└── LICENSE           # MIT License
```
## **Contributing:**

Pull requests are welcome. Feel free to fork and improve the bot – add chat commands, better anti-AFK, or Microsoft auth support.

1. Fork the repo
2. Create a branch: git checkout -b feature/amazing-feature
3. Commit changes: git commit -m 'Add amazing feature'
4. Push: git push origin feature/amazing-feature
5. Open a Pull Request

## **License:**  
Distributed under the MIT License. See LICENSE for details.

## **Disclaimer:**  
Using bots may violate server rules. Always check if AFK bots are allowed on your Aternos server. The author is not responsible for any bans.

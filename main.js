// deno-lint-ignore-file

// ^^^^ DO NOT REMOVE THIS, THIS IS TO DISABLE DENO COMPLAINING ABOUT MY BAD CODE -delusions ^^^^

// this is a mess
// at least we think it is
// ok it definitely is
// actually wait it might possibly not be a mess actually
// -noodles and delusions

// albuquerquebot v1.4 - no more maelink
const decoder = new TextDecoder("utf-8");
const readfile = JSON.parse(decoder.decode(Deno.readFileSync("./supersecret.txt")));
try {
    Deno.readFileSync("./db.txt");
} catch {
    Deno.writeTextFileSync("./db.txt", JSON.stringify([]));
}

import { Client, Events, GatewayIntentBits } from 'discord.js';
const disconn = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});
disconn.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    switch (interaction.commandName) {
        case 'miau':
            await interaction.reply('MIAU\n*pvz victory music*');
            break;
        case 'echo':
            const message = interaction.options.getString('message');
            await interaction.reply(message);
            break;
        case 'albuquerque':
            const albuquerqueMessage = decoder.decode(Deno.readFileSync("./albuquerque.txt"));
            await interaction.reply(albuquerqueMessage);
            break;
        case 'miaugif':
            await interaction.reply("https://tenor.com/view/miau-hd-adobe-after-effects-glass-breaking-preset-gif-752576862881430143");
            break;
            }
    }
);
import { REST, Routes } from 'discord.js';
const gcommands = [
    {
    },
];
const rest = new REST({ version: '10' }).setToken(readfile.DISCORDTOKEN);
(async () => {
    try {
        console.log('started reloading guild (/) commands...');
        await rest.put(
            Routes.applicationGuildCommands(readfile.DISCORDCLIENTID, readfile.DISCORDGUILDID),
            { body: gcommands },
        );
        console.log('done reloading guild (/) commands!');
    } catch (error) {
        console.error(error);
    }
})();
const glcommands = [
    {
        name: 'miau',
        description: 'says the MIAU',
    },
    {
        name: 'echo',
        description: 'echo echo echo echo',
        options: [{ name: 'message', type: 3, description: 'echo', required: true }],
    },
    {
        name: 'albuquerque',
        description: 'albuquerque',
    },
    {
        name: 'miaugif',
        description: 'watch the miau as it explodes, albot edition',
    },
];
const grest = new REST({ version: '10' }).setToken(readfile.DISCORDTOKEN);
(async () => {
    try {
        console.log('started reloading application (/) commands...');
        await grest.put(
            Routes.applicationCommands(readfile.DISCORDCLIENTID),
            { body: glcommands },
        );
        console.log('done reloading application (/) commands!');
    } catch (error) {
        console.error(error);
    }
})();
disconn.on(Events.ClientReady, c => {
    console.log(`discord bot has started up!`);
});
disconn.login(readfile.DISCORDTOKEN);

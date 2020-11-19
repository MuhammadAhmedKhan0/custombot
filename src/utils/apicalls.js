const fetch = require('node-fetch');
const baseDiscord = 'https://discordapp.com/api';
const agent = 'zneixbot project: https://github.com/zneix/zneixbot';
const formatter = require('./formatter');
//custom query getting partial user profile, used by commands like user.js, avatar.js, etc...
exports.getDiscordUser = async function(id){
    let response = await fetch(`${baseDiscord}/users/${id}`, {
        method: 'GET',
        headers: { 'User-Agent': agent, Authorization: `Bot ${client.token}` }
    }).then(c => c.json());
    if (!response.id) return null; //escape on wrong user (all valid users should have their ID field returned)

    //hard fix for non-bot users
    if (!response.bot) response.bot = false;
    response.tag = `${response.username}#${response.discriminator}`;
    response.createdTimestamp = formatter.snowflake(response.id).timestamp;
    response.createdAt = new Date(response.createdTimestamp);

    //avatarURL with properties: dynamic, max res
    response.avatarURL = function({ size } = {}){
        return `${client.options.http.cdn}/avatars/${response.id}/${response.avatar}.${/^a_/.test(response.avatar) ? 'gif' : 'png'}${size ? `?size=${size}` : ''}`;
    }

    return response;
}
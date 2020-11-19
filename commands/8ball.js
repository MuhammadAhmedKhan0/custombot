exports.description = 'Ask 8ball a question. Responses might be a little dank at times';
exports.usage = '[question]';
exports.level = 0;
exports.perms = [];
exports.cooldown = 3000;
exports.dmable = false;

exports.run = async message => {
    let responses = require('fs').readFileSync('./src/assets/8ball.txt').toString().split('\n');
    let rng = Math.floor(Math.random()*(responses.length));
    let responseFunctions = {
        mentDev: () => {
            return message.guild.member('288028423031357441') ? `\*Inhales...\* ;monkaS; 📣 <@288028423031357441>` : '...Except he\'s not in this server ;NaM;';
        }
    }
    message.reply(clean(responses[rng]));
    function clean(string){
        string = string
        .replace(/@everyone/, '`@everyone`')
        .replace(/@here/, '`@here`')
        .replace(/{n}/g, '\n')
        .replace(/{func:(.+)}/, (a, b) => responseFunctions.hasOwnProperty(b) ? responseFunctions[b]() : a);

        while (/;[a-z0-9-_]*?;/i.test(string)){
            //emote replacer
            let eth = /;[a-z0-9-_]*?;/i.exec(string)[0]; //eth - emotes to handle
            string = string.replace(eth, client.emoteHandler.find(eth.slice(1, -1)));
        }
        return string;
    }
}
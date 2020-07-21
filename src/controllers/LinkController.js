const connection = require('../database/connection');
const nunjucks = require('nunjucks');
const qrcode = require('qrcode');

const module_ = module.exports = {

    index(request, response){
        const code = request.query.code;
        const redirect_url = `http://localhost:3333/${code}`;
        const view = nunjucks.render('home.njk', { redirect_url });
        response.send(view);
    },

    async goTo(request, response){
        const code = request.params.code;
        const url = await connection('cut_links').where('code', '=', code).first();
        return response.redirect(url.redirect_url);
    },

    async generate(request, response){
        const redirect_url = request.body.url;
        const code = await module_.generateCode(redirect_url);
        qrcode.toFile(__dirname + `/../../public/qrcodes/${code}.png`, redirect_url, {
            color: {
              dark: '#000000',
              light: '#fff'
            }
        });
        const view = nunjucks.render('success.njk', { 
            redirect_url:`http://localhost:3333/${code}`,
            code:code,
            extended_url:redirect_url
        });
        response.send(view);
    },

    async generateCode(redirect_url){

        const possibilities = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        
        const random_1 = possibilities[module_.getRandomIntInclusive(0,35)];
        const random_2 = possibilities[module_.getRandomIntInclusive(0,35)];
        const random_3 = possibilities[module_.getRandomIntInclusive(0,35)];
        const random_4 = possibilities[module_.getRandomIntInclusive(0,35)];
        
        const code = `${random_1}${random_2}${random_3}${random_4}`;

        const code_exists = await connection('cut_links').where('code', '=', code).first();

        if (code_exists){
            module_.generateCode();
        }else{
            await connection('cut_links').insert({code, redirect_url});
            return code;
        }
    },

    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
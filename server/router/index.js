module.exports = function (app) {
    app.use('/api/pessoa', require('./routes/pessoa.js'));
    app.use('/api/profissao', require('./routes/profissao.js'));
};

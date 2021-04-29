const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const palavraChave = "prioritario";
const idade = [];

const funcoes = {
    /*idade : 60,
    palavraChave:"prioritario",
    getClassificacao: function() {
        if(idade >= 60) {
            return this.palavraChave; 
        }
    }*/
      ObservacaoCriada:(observacao) => {
        observacao.status = observacao.clientes.includes(palavraChave) ?
        "prioritario":"comum";
        axios.post("http://localhost:10000/eventos", {
            tipo: "ObservacaoClassificada",
            dados: observacao
        });
      }
    
};
app.post("/eventos", (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    }catch(err){}
    res.status(200).send({
        msg:"ok"
    });
});
app.listen(7000, () => console.log("Classificacao de clientes. Porta 7000"));

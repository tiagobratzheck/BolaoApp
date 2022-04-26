import axios from 'axios';
import db from './dbConnection';

export const updateTabela = () => {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.api-futebol.com.br/v1/campeonatos/10/tabela`, {
            headers: {
                'Authorization': `Bearer live_4471d775d1a70eeb4db88ba7eb75dd`
            }
        }).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
};

export const saveTabela = (data) => {
    return new Promise((resolve, reject) => {
        db.collection('tabelaBrasileirao')
            .doc('campeonato_2022')
            .set(data)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const getTabela = () => {
    return new Promise((resolve, reject) => {
        db.collection('tabelaBrasileirao')
            .doc('campeonato_2022')
            .get()
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const saveBetTable = (apostas) => {
    return new Promise((resolve, reject) => {
        db.collection('tabelaApostas')
            .doc('apostas_2022')
            .set(apostas)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const getApostas = () => {
    return new Promise((resolve, reject) => {
        db.collection('tabelaApostas')
            .doc('apostas_2022')
            .get()
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
const Klient = require('../../model/sequelize/Klient');
const Sprzet = require('../../model/sequelize/Sprzet');
const Wypozyczenie = require('../../model/sequelize/Wypozyczenie');

exports.getKlients = () => {
    return Klient.findAll();
}

exports.getKlientById = (klientId) => {
    return Klient.findByPk(klientId,
        {
            include: [{
                model: Wypozyczenie,
                as: 'wypozyczenia',
                include: [{
                    model: Sprzet,
                    as: 'sprzet'
                }]
            }]
        });
};

exports.createKlient = (newKlientData) => {
    return Klient.create({
        imie: newKlientData.imie,
        nazwisko: newKlientData.nazwisko,
        nrTelefonu: newKlientData.nrTelefonu,
    })
}

exports.updateKlient = (klientId, klientData) => {
    /* eslint-disable no-unused-vars */
    const imie = klientData.imie;
    const nazwisko = klientData.nazwisko;
    const nrTelefonu = klientData.nrTelefonu;
    return Klient.update(klientData, { where: { _id: klientId } });
};

exports.deleteKlient = (klientId) => {
    return Klient.destroy({
        where: { _id: klientId }
    });
};
const Klient = require('../../model/sequelize/Klient');
const Sprzet = require('../../model/sequelize/Sprzet');
const Wypozyczenie = require('../../model/sequelize/Wypozyczenie');

exports.getSprzets = () => {
    return Sprzet.findAll();
}

exports.getSprzetById = (sprzetId) => {
    return Sprzet.findByPk(sprzetId,
        {
            include: [{
                model: Wypozyczenie,
                as: 'wypozyczenia',
                include: [{
                    model: Klient,
                    as: 'klient'
                }]
            }]
        });
};

exports.createSprzet = (newSprzetData) => {
    return Sprzet.create({
        rozmiar: newSprzetData.rozmiar,
        przeznaczenie: newSprzetData.przeznaczenie
    })
}

exports.updateSprzet = (sprzetId, sprzetData) => {
    /* eslint-disable no-unused-vars */
    const rozmiar = sprzetData.rozmiar;
    const przeznaczenie = sprzetData.przeznaczenie;
    return Sprzet.update(sprzetData, { where: { _id: sprzetId } });
};

exports.deleteSprzet = (sprzetId) => {
    return Sprzet.destroy({
        where: { _id: sprzetId }
    });
};
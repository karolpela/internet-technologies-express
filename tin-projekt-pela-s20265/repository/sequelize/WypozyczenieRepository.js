const Sequelize = require('sequelize');

const Klient = require('../../model/sequelize/Klient');
const Sprzet = require('../../model/sequelize/Sprzet');
const Wypozyczenie = require('../../model/sequelize/Wypozyczenie');

exports.getWypozyczenia = () => {
    return Wypozyczenie.findAll({
        include: [
            {
                model: Klient,
                as: 'klient'
            },
            {
                model: Sprzet,
                as: 'sprzet'
            }
        ]
    })
}

exports.getWypozyczenieById = (wypozyczenieId) => {
    return Wypozyczenie.findByPk(wypozyczenieId,
        {
            include: [
                {
                    model: Klient,
                    as: 'klient'
                },
                {
                    model: Sprzet,
                    as: 'sprzet'
                }
            ]
        });
};

exports.createWypozyczenie = (data) => {
    console.log(JSON.stringify(data));
    return Wypozyczenie.create({
        id_klient: data.id_klient,
        id_sprzet: data.id_sprzet,
        data_wypozyczenia: data.data_wypozyczenia,
        data_zwrotu: data.data_zwrotu
    });
};

exports.updateWypozyczenie = (wypozyczenieId, data) => {
    return Wypozyczenie.update(data, { where: { _id: wypozyczenieId } });
};

exports.deleteWypozyczenie = (wypozyczenieId) => {
    return Wypozyczenie.destroy({
        where: { _id: wypozyczenieId }
    });
};

exports.deleteManyWypozyczenia = (wypozyczenieIds) => {
    return Wypozyczenie.find({ _id: { [Sequelize.Op.in]: wypozyczenieIds } });
};
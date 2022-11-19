const sequelize = require('./sequelize');

const Klient = require('../../model/sequelize/Klient');
const Sprzet = require('../../model/sequelize/Sprzet');
const Wypozyczenie = require('../../model/sequelize/Wypozyczenie');

module.exports = () => {
    Klient.hasMany(Wypozyczenie, { as: 'wypozyczenia', foreignKey: { name: 'id_klient', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    Wypozyczenie.belongsTo(Klient, { as: 'klient', foreignKey: { name: 'id_klient', allowNull: false } });
    Sprzet.hasMany(Wypozyczenie, { as: 'wypozyczenia', foreignKey: { name: 'id_sprzet', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    Wypozyczenie.belongsTo(Sprzet, { as: 'sprzet', foreignKey: { name: 'id_sprzet', allowNull: false } });

    let allKlienci, allSprzety;
    return sequelize
        .sync({ force: true })
        .then(() => {
            return Klient.findAll();
        })
        .then(klienci => {
            if (!klienci || klienci.length === 0) {
                return Klient.bulkCreate([
                    { imie: 'Jan', nazwisko: 'Kowalski', nrTelefonu: '424144112' },
                    { imie: 'Adam', nazwisko: 'Nowak', nrTelefonu: '312311551' },
                    { imie: 'Marek', nazwisko: 'Szewczyk', nrTelefonu: '736731311' }
                ])
                    .then(() => {
                        return Klient.findAll();
                    });
            } else {
                return klienci;
            }
        })
        .then(klienci => {
            allKlienci = klienci;
            return Sprzet.findAll();
        })
        .then(sprzety => {
            if (!sprzety || sprzety.length === 0) {
                return Sprzet.bulkCreate([
                    { rozmiar: 39, przeznaczenie: 'hokejowe' },
                    { rozmiar: 42.5, przeznaczenie: 'figurowe' },
                    { rozmiar: 40, przeznaczenie: 'wyścigowe' },
                ])
                    .then(() => {
                        return Sprzet.findAll();
                    })
            } else {
                return sprzety;
            }
        })
        .then(sprzety => {
            allSprzety = sprzety;
            return Wypozyczenie.findAll();
        })
        .then(wypozyczenia => {
            if (!wypozyczenia || wypozyczenia.length === 0) {
                return Wypozyczenie.bulkCreate([
                    { id_klient: allKlienci[0]._id, id_sprzet: allSprzety[0]._id, data_wypozyczenia: '2022-09-03', data_zwrotu: '2022-09-06' },
                    { id_klient: allKlienci[1]._id, id_sprzet: allSprzety[1]._id, data_wypozyczenia: '2022-10-14', data_zwrotu: '2022-10-14' },
                    { id_klient: allKlienci[2]._id, id_sprzet: allSprzety[0]._id, data_wypozyczenia: '2022-11-19', data_zwrotu: null }
                ]);
            } else {
                return wypozyczenia;
            }
        });
};
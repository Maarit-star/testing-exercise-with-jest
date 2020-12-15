'use strict';

// MUUTTUJAT
const Tietokonerekisteri = require('../rekisteri');
const tietokoneet = require('../tietokoneet.json');
let rekisteri;

// KONSTRUKTORI
describe('Konstruktori', () => {
    test('olio luotu', () => {
        rekisteri= new Tietokonerekisteri(tietokoneet);
        expect(rekisteri.tietokonerekisteri).toEqual(tietokoneet);
    });
    test('jos parametri puuttuu aiheuttaa poikkeuksen', () => {
        expect(() => new Tietokonerekisteri()).toThrow('tietokoneet puuttuvat');
    });
});

// HAEVALMISTAJAT
describe('Testataan haeValmistajat', () => {
    beforeEach(() => {
        rekisteri = new Tietokonerekisteri(tietokoneet);
    });
    test('palauttaa taulukon ["BMI","CERA"]', () => {
        expect(rekisteri.haeValmistajat().sort())
        .toEqual(['BMI','CERA'].sort());
    });
});

describe('Testataan haeValmistajat, jos valmistajia ei ole', () => {
    const testidata = [{
        "numero": 1,
        "valmistaja": "",
        "tyyppi": "minitorni",
        "varusteet": ["näppis", "näyttö", "hiiri"],
        "hinta": 250,
        "ohjelmat": [
            { "nimi": "Teksturi", "hinta": 123 },
            { "nimi": "Pasianssi", "hinta": 10 }
        ]
    },
    {
        "numero": 2,
        "tyyppi": "läppäri",
        "varusteet": ["hiiri"],
        "hinta": 350,
        "ohjelmat": [
            { "nimi": "Teksturi", "hinta": 10 },
            { "nimi": "Laskuri", "hinta": 20 }
        ]
    },
    {
        "numero": 3,
        "tyyppi": "läppäri",
        "varusteet": [],
        "hinta": 150,
        "ohjelmat": [
            { "nimi": "Teksturi", "hinta": 123 }
        ]
    }]

    beforeEach(() => {
        rekisteri = new Tietokonerekisteri(testidata);
    });
    test('palauttaa tyhjän taulukon []', () => {
        expect(rekisteri.haeValmistajat()).toEqual([]);
    });
});

// HAE NUMEROLLA
describe('Testataan haeNumerolla', () => {
    beforeEach(() => {
        rekisteri = new Tietokonerekisteri(tietokoneet);
    });
    test('haetaan numerolla 1', () => {
        expect(rekisteri.haeNumerolla(1)).toEqual({
            "numero": 1,
            "valmistaja": "BMI",
            "tyyppi": "minitorni",
            "varusteet": ["näppis", "näyttö", "hiiri"],
            "hinta": 250,
            "ohjelmat": [
                { "nimi": "Teksturi", "hinta": 123 },
                { "nimi": "Pasianssi", "hinta": 10 }
                ]
            });
        });
    });

    describe('Testataan haeNumerolla', () => {
        beforeEach(() => {
            rekisteri = new Tietokonerekisteri(tietokoneet);
        });
        test('haetaan ilman parametria', () => {
            expect(()=>rekisteri.haeNumerolla()).toThrow('numerolla ei löydy konetta');
        });
        test('haetaan numerolla jota ei ole', () => {
            expect(()=>rekisteri.haeNumerolla(5)).toThrow('numerolla ei löydy konetta');
        });
    });

    // HAE VALMISTAJALLA
    describe('Testataan haeValmistajalla', () => {
        beforeEach(() => {
            rekisteri = new Tietokonerekisteri(tietokoneet);
        });
        test('palauttaa taulukon [1,3]', () => {
            expect(rekisteri.haeValmistajalla('BMI')).toEqual([1,3]);
        });
    });

    describe('Testataan haeValmistajalla', () => {
        beforeEach(() => {
            rekisteri = new Tietokonerekisteri(tietokoneet);
        });
        test('palauttaa tyhjän taulukon [] jos valmistajaa ei löydy', () => {
            expect(rekisteri.haeValmistajalla('Lenovo')).toEqual([]);
        });
        test('palauttaa tyhjän taulukon, jos parametri puuttuu', () => {
            expect(rekisteri.haeValmistajalla()).toEqual([]);
        });
    });

    // HAE TIETYN TYYPPISET KONEET
    describe('Testataan haeTietynTyyppisetKoneet', () => {
        beforeEach(() => {
            rekisteri = new Tietokonerekisteri(tietokoneet);
        });
        test('palauttaa taulukkomuodossa löytyneet koneet', () => {
            expect(rekisteri.haeTietynTyyppisetKoneet('läppäri'))
            .toEqual(
                {
                    "numero": 2,
                    "valmistaja": "CERA",
                    "tyyppi": "läppäri",
                    "varusteet": ["hiiri"],
                    "hinta": 350,
                    "ohjelmat": [
                        { "nimi": "Teksturi", "hinta": 10 },
                        { "nimi": "Laskuri", "hinta": 20 }
                    ]
                },
                {
                    "numero": 3,
                    "valmistaja": "BMI",
                    "tyyppi": "läppäri",
                    "varusteet": [],
                    "hinta": 150,
                    "ohjelmat": [
                        { "nimi": "Teksturi", "hinta": 123 }
                    ]
                }
            );
        });
    });

    describe('Testataan haeTietynTyyppisetKoneet', () => {
        beforeEach(() => {
            rekisteri = new Tietokonerekisteri(tietokoneet);
        });
        test('haetaan ilman parametria', () => {
            expect(() =>rekisteri.haeTietynTyyppisetKoneet()).toThrow('parametri puuttuu');
        });
        test('haetaan tyypillä, jota ei ole olemassa', () => {
            expect(rekisteri.haeTietynTyyppisetKoneet('pöytäkone')).toEqual([]);
        });
    });
  

    // HAE TIETOKONEEN VARUSTEET
    describe('Testataan haeTietokoneenVarusteet', () => {
        beforeEach(() => {
            rekisteri = new Tietokonerekisteri(tietokoneet);
        });
        test('haetaan parametrilla, joka löytyy ja tietokoneella on varusteita', () => {
            expect(rekisteri.haeTietokoneenVarusteet(1))
            .toEqual(['näppis', 'näyttö', 'hiiri']);
        });
        // onko tämä tarpeellinen testi?
        test('haetaan parametrilla, joka löytyy mutta jolla ei ole varusteita', () => {
            expect(rekisteri.haeTietokoneenVarusteet(3))
            .toEqual([]);
        });
        test('haetaan ilman parametria', () => {
            expect(() =>rekisteri.haeTietokoneenVarusteet()).toThrow('parametri puuttuu');
        });
        test('haetaan parametrilla jota ei ole', () => {
            expect(()=>rekisteri.haeNumerolla(5)).toThrow('numerolla ei löydy konetta');
        });
    });

    // HAE HINTA
    describe('Testataan haeHinta', () => {
        beforeEach(() => {
            rekisteri = new Tietokonerekisteri(tietokoneet);
        });
        test('haetaan parametrilla joka löytyy', () => {
            expect(rekisteri.haeHinta(1)).toEqual(250);
        });
        test('haetaan numerolla jota ei ole', () => {
            expect(()=>rekisteri.haeHinta(5)).toThrow('numerolla ei löydy konetta');
        });
        // MIKSI TÄMÄ MENI LÄPI ILMAN ETTÄ REKISTERI.JS-TIEDOSTOSSA OLI MÄÄRITELTY TÄTÄ?
        test('haetaan ilman parametria', () => {
            expect(()=>rekisteri.haeHinta()).toThrow('numerolla ei löydy konetta');
        });
    });

    // HAE YHTEISHINTA
    describe('Testataan ohjelmienYhteishinta', () => {
        beforeEach(() => {
            rekisteri = new Tietokonerekisteri(tietokoneet);
        });
        test('haetaan parametrilla joka löytyy', () => {
            expect(rekisteri.ohjelmienYhteishinta(1)).toEqual(133);
        });
        });

    describe('Testataan ohjelmienYhteishinta, jos ohjelmia ei ole', () => {
        const testidata = [
            {
                "numero": 4,
                "valmistaja": "BMI",
                "tyyppi": "läppäri",
                "varusteet": [],
                "hinta": 150,
                "ohjelmat": []
            }
        ]
        beforeEach(() => {
            rekisteri = new Tietokonerekisteri(testidata);
        });
        test('palauttaa 0', () => {
            // TÄMÄ MENI LÄPI HETI. JOHTUUKO SIIS SIITÄ ETTÄ rekisteri.js:ssä määritelty metodin ekaan testiin summa
            //alustavasti nollaksi?
            expect(rekisteri.ohjelmienYhteishinta(4)).toEqual(0);
        });
    });

    describe('Testataan ohjelmienYhteishinta', () => {
        beforeEach(() => {
            rekisteri = new Tietokonerekisteri(tietokoneet);
        });
        test('jos numeroa ei löydy, aiheuttaa poikkeuksen "numerolla ei löydy konetta"', () => {
            expect(()=>rekisteri.ohjelmienYhteishinta(5)).toThrow('numerolla ei löydy konetta');
        });
        test('jos parametria ei anneta, aiheuttaa poikkeuksen "numerolla ei löydy konetta"', () => {
            expect(()=>rekisteri.ohjelmienYhteishinta()).toThrow('numerolla ei löydy konetta');
        });
    });

    // ONKO OHJELMIA
    describe('Testataan onkoOhjelmia', () => {
        beforeEach(() => {
            rekisteri = new Tietokonerekisteri(tietokoneet);
        });
        test('annetaan numero joka löytyy, palauttaa true', () => {
            expect(rekisteri.onkoOhjelmia(1)).toEqual(true);
        });
    });
    describe('Testataan onkoOhjelmia, jos ei ole ohjelmia', () => {
        const testidata = [
            {
                "numero": 4,
                "valmistaja": "BMI",
                "tyyppi": "läppäri",
                "varusteet": [],
                "hinta": 150,
                "ohjelmat": []
            }
        ]
        beforeEach(() => {
            rekisteri = new Tietokonerekisteri(testidata);
        });
        // MENI HETI LÄPI ALLA OLEVA
        test('palauttaa false', () => {
            expect(rekisteri.onkoOhjelmia(4)).toEqual(false);
        });
    });

    describe('Testataan onkoOhjelmia', () => {
        beforeEach(() => {
            rekisteri = new Tietokonerekisteri(tietokoneet);
        });
        test('annetaan numero jota ei löydy, palauttaa false', () => {
            expect(rekisteri.onkoOhjelmia(5)).toEqual(false);
        });
        test('haetaan ilman parametria, palauttaa false', () => {
            expect(rekisteri.onkoOhjelmia()).toEqual(false);
        });
    });

    // ONKO VARUSTEITA
    describe('Testataan onkoVarusteita', () => {
        beforeEach(() => {
            rekisteri = new Tietokonerekisteri(tietokoneet);
        });
        test('annetaan numero joka löytyy ja on varusteita, palauttaa true', ()=> {
            expect(rekisteri.onkoVarusteita(1)).toEqual(true);
        });
        test('annetaan numero joka löytyy, jolla ei ole varusteita, palauttaa false', () => {
            expect(rekisteri.onkoVarusteita(3)).toEqual(false);
        });
        test('annetaan numero jota ei löydy, palauttaa false', () => {
            expect(rekisteri.onkoVarusteita(5)).toEqual(false);
        });
        test('haetaan ilman parametria, palauttaa false', () => {
            expect(rekisteri.onkoVarusteita()).toEqual(false);
        });
    });
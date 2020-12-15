# Tietokonerekisteri API
Tehdään tietokonerekisteri - luokka.


## KONSTRUKTORI
Konstruktorille annetaan parametrina tietokoneet sisältävä json-taulukko (tietokoneet.json).
Jos parametri puuttuu, aiheutuu poikkeus: **'tietokoneet puuttuvat'**

### Esimerkit

```js
const Tietokonerekisteri = require('./rekisteri');
const tietokoneet = require('./tietokoneet.json');
```

### Esimerkki 1:
Luodaan tietokonerekisteri antamalla tietokoneet-olio parametriksi.
```js
const rekisteri = new Tietokonerekisteri(tietokoneet);
```

### Esimerkki 2:
Luodaan tietokonerekisteri ilman parametria.

```js
const rekisteri = new Tietokonerekisteri();
```
jolloin aiheutuu poikkeus **'tietokoneet puuttuvat'**


## HAETAAN KAIKKIEN TIETOKONEIDEN VALMISTAJAT
Palauttaa tietokoneiden valmistajat taulukkona.
Valmistaja on taulukossa vain kertaalleen.
Jos valmistajia ei löydy, palauttaa tyhjän taulukon.

### Esimerkki 1:
```js
tietokonerekisteri.haeValmistajat()
```
palauttaa esimerkiksi 
```json
[ "BMI",  "CERA" ]
```

### Esimerkki 2:
Luodaan tietokonerekisteri json-taulukolla, jossa ei ole valmistajia
```json
[
    {
        "numero": 1,
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
    }
]
```

Kutsu
```js
tietokonerekisteri.haeValmistajat()
```
palauttaa tyhjän taulukon, koska yhtään valmistajaa ei löydy

```json
[]
```

## HAETAAN TIETOKONE NUMEROLLA
Parametrina annetaan tietokoneen numero.
Palauttaa numeroa vastaavan tietokoneolion.
Jos numerolla ei ole tietokonetta tai parametri puuttuu, 
aiheuttaa poikkeuksen **'numerolla ei löydy konetta'**

### Esimerkki 1: haetaan numerolla 1

```js
tietokonerekisteri.haeNumerolla(1)
```
palauttaa

```json 
{  
    "numero": 1,
    "valmistaja": "BMI",
    "tyyppi": "minitorni",
    "varusteet": ["näppis", "näyttö", "hiiri"],
    "hinta": 250,
    "ohjelmat": [
        { "nimi": "Teksturi", "hinta": 123 },
        { "nimi": "Pasianssi", "hinta": 10 }
    ]
}
```

### Esimerkki 2: haetaan numerolla jota ei ole olemassa, esim 5

```js
tietokonerekisteri.haeNumerolla(5)
```

aiheuttaa poikkeuksen `'numerolla ei löydy konetta'`


### Esimerkki 3: haetaan ilman parametria

```js
tietokonerekisteri.haeNumerolla()
```

aiheuttaa poikkeuksen `'numerolla ei löydy konetta'`


## HAETAAN TIETOKONE VALMISTAJAN NIMELLÄ
Parametrina annetaan tietokoneen valmistaja.
Palauttaa taulukon, jossa on löytyneiden tietokoneiden numerot.
Jos valmistajalla ei ole tietokonetta, palauttaa tyhjän taulukon.
Jos parametri puuttuu, palauttaa tyhjän taulukon.

### Esimerkki 1: haetaan valmistajalla "BMI"

```js
tietokonerekisteri.haeValmistalla("BMI")
```

palauttaa 

```json
[ 1, 3 ]
```

### Esimerkki 2: haetaan valmistajalla, jota ei ole kannassa, esim "Lenovo"

```js
tietokonerekisteri.haeValmistajalla("Lenovo")
```

palauttaa 

```json
[]
```

### Esimerkki 3: haetaan ilman parametria

```js
tietokonerekisteri.haeValmistajalla()
```

palauttaa

```json
[]
```

## HAETAAN KAIKKI TIETYN TYYPPISET TIETOKONEET
Tyyppi annetaan parametrina.
Palauttaa taulukon koneita. Jos koneita ei löydy, palauttaa tyhjän taulukon.
Aiheuttaa poikkeuksen **'parametri puuttuu'** jos parametria ei anneta.

### Esimerkki 1: haetaan parametrilla "läppäri"

```js
tietokonerekisteri.haeTietynTyyppisetKoneet('läppäri')
```

palauttaa

```json
[
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
]
```

### Esimerkki 2: haetaan parametrilla "pöytäkone"

```js
tietokonerekisteri.haeTietynTyyppisetKoneet('pöytäkone')
```

palauttaa

```json
[]
```

### Esimerkki 3: haetaan ilman parametria

```js
tietokonerekisteri.haeTietynTyyppisetKoneet()
```

aiheuttaa poikkeuksen `'parametri puuttuu'`


## HAETAAN TIETOKONEEN VARUSTEET
Parametrina annetaan tietokoneen numero.
Palauttaa tietokoneen varusteet taulukkona. Jos varusteita ei ole, palauttaa tyhjän taulukon.
Aiheuttaa poikkeuksen **'parametri puuttuu'** jos parametria ei anneta.
Jos numerolla ei löydy tietokonetta, aiheuttaa poikkeuksen **'numerolla ei löydy konetta'**.

### Esimerkki 1: haetaan numerolla 1

```js
tietokonerekisteri.haeTietokoneenVarusteet(1)
```

palauttaa 

```json
["näppis", "näyttö", "hiiri"]
```

### Esimerkki 2: varusteita ei ole

```js
tietokonerekisteri.haeTietokoneenVarusteet(3)
```

palauttaa 

```json
[]
```

### Esimerkki 3: parametria ei anneta

```js
tietokonerekisteri.haeTietokoneenVarusteet()
```

aiheuttaa poikkeuksen `'parametri puuttuu'`

### Esimerkki 4: annetaan numero, jota ei löydy 

```js
tietokonerekisteri.haeTietokoneenVarusteet(5)
```

aiheuttaa poikkeuksen `'numerolla ei löydy konetta'`


## PALAUTTAA TIETOKONEEN HINNAN ILMAN OHJELMIA
Parametrina annetaan tietokoneen numero.
Palauttaa hinnan.
Jos numerolla ei ole konetta tai parametri puuttuu,
aiheuttaa poikkeuksen **'numerolla ei löydy konetta'**.

### Esimerkki 1: haetaan numerolla 1

```js
tietokonerekisteri.haeHinta(1)
```

palauttaa

```json
"hinta":250
```

### Esimerkki 2: Jos haetaan numerolla jota ei ole olemassa

```js
tietokonerekisteri.haeHinta(5)
```

aiheuttaa poikkeuksen `'numerolla ei löydy konetta'`

### Esimerkki 3: Jos haetaan ilman parametria

```js
tietokonerekisteri.haeHinta()
```

aiheuttaa poikkeuksen `'numerolla ei löydy konetta'`


## PALAUTTAA TIETOKONEEN OHJELMIEN YHTEISHINNAN
Parametrina annetaan tietokoneen numero.
Palauttaa ohjelmien yhteishinnan.
Jos tietokoneella ei ole ohjelmia, palauttaa nollan.
Jos numerolla ei ole tietokonetta tai parametri puuttuu, 
aiheuttaa poikkeuksen **'numerolla ei löydy konetta'**.

### Esimerkki 1: Haetaan numerolla, joka löytyy

```js
tietokonerekisteri.ohjelmienYhteishinta(1)
```
palauttaa

```json
133
```

### Esimerkki 2: Haetaan tietokone, jolla ei ole ohjelmia (luodaan tietokone nrolla 4)

```js
tietokonerekisteri.ohjelmienYhteishinta(4)
```

palauttaa

```json
0
```

### Esimerkki 3: Haetaan numerolla, jota ei löydy

```js
tietokonerekisteri.ohjelmienYhteishinta(5)
```

aiheuttaa poikkeuksen `'numerolla ei löydy konetta'`

### Esimerkki 4: Haetaan ilman parametria

```js
tietokonerekisteri.ohjelmienYhteishinta()
```

aiheuttaa poikkeuksen `'numerolla ei löydy konetta'`


## PALAUTTAA TIEDON ONKO TIETOKONEELLA OHJELMIA
Parametrina annetaan tietokoneen numero.
Palauttaa true, jos tietokoneella on ohjelmia, ja false muuten.
Jos numerolla ei ole tietokonetta, palauttaa false.
Jos parametri puuttuu, palauttaa false.

### Esimerkki 1: annetaan tietokoneen numero, joka löytyy ja jolla on ohjelmia

```js
tietokonerekisteri.onkoOhjelmia(1)
```

palauttaa `true`

### Esimerkki2 : annetaan tietokoneen numero, jolla ei ole ohjelmia

```js
tietokonerekisteri.onkoOhjelmia(4)
```

palauttaa `false`

### Esimerkki 3: annetaan numero, jota ei löydy

```js
tietokonerekisteri.onkoOhjelmia(5)
```

palauttaa `false`

### Esimerkki 4: parametri puuttuu

```js
tietokonerekisteri.onkoOhjelmia()
```

palauttaa `false`


## PALAUTTAA TIEDON ONKO TIETOKONEELLA VARUSTEITA
Parametrina annetaan tietokoneen numero.
Palauttaa true, jos on varusteita ja false, jos ei ole.
Jos numerolla ei löydy tietokonetta, palauttaa false.
Jos parametria ei anneta, palauttaa false.

### Esimerkki 1: annetaan tietokoneen numero, joka löytyy ja jolla on varusteita

```js
tietokonerekisteri.onkoVarusteita(1)
```

palauttaa `true`

### Esimerkki 2: annetaan tietokoneen numero, joka löytyy ja jolla ei ole varusteita

```js
tietokonerekisteri.onkoVarusteita(3)
```

palauttaa `false`

### Esimerkki 3: annetaan numero, jota ei löydy

```js
tietokonerekisteri.onkoVarusteita(5)
```

palauttaa ``false`


### Esimerkki 4: haetaan ilman parametria

```js
tietokonerekisteri.onkoVarusteita()
```

palauttaa `false`


// TIETOKONEREKISTERI
'use strict';

module.exports = class Tietokonerekisteri {
    constructor(tietokonerekisteri) {
        if(tietokonerekisteri){
            this.tietokonerekisteri=tietokonerekisteri;
        }
        else {
            throw new Error('tietokoneet puuttuvat');
        }   
    } // konstruktorin loppu

haeValmistajat() {
    let valmistajat = [];
    for(let tietokone of this.tietokonerekisteri) {
     if(tietokone.valmistaja && tietokone.valmistaja.length > 0){
        if(!valmistajat.includes(tietokone.valmistaja)) {
            valmistajat.push(tietokone.valmistaja);
        } 
      }      
    }
    return valmistajat;
} //haeValmistajat loppu


haeNumerolla(numero){
    if(!numero)throw new Error('numerolla ei löydy konetta');
    for(let tietokone of this.tietokonerekisteri){
        if(tietokone.numero===numero){
            return {
                numero: tietokone.numero,
                valmistaja: tietokone.valmistaja,
                tyyppi: tietokone.tyyppi,
                varusteet: tietokone.varusteet,
                hinta: tietokone.hinta,
                ohjelmat: tietokone.ohjelmat
            };
        } else{
            throw new Error('numerolla ei löydy konetta');
        }   
    } 
} //haeNumerolla loppu

haeValmistajalla(valmistaja){
    let tietokoneidenNumerot = [];
    for(let tietokone of this.tietokonerekisteri){
        if(tietokone.valmistaja===valmistaja && tietokone.numero){
            if(!tietokoneidenNumerot.includes(tietokone.numero)){
                tietokoneidenNumerot.push(tietokone.numero);
            }   
        }
    }
    return tietokoneidenNumerot;  
}

haeTietynTyyppisetKoneet(tyyppi){
    if(!tyyppi)throw new Error('parametri puuttuu');
    for(let tietokone of this.tietokonerekisteri){
        if(tietokone.tyyppi===tyyppi){
            return {
                numero: tietokone.numero,
                valmistaja: tietokone.valmistaja,
                tyyppi: tietokone.tyyppi,
                varusteet: tietokone.varusteet,
                hinta: tietokone.hinta,
                ohjelmat: tietokone.ohjelmat
            }
        }
    }
    return [];
}

haeTietokoneenVarusteet(numero){
    if(!numero)throw new Error('parametri puuttuu');
    for(let tietokone of this.tietokonerekisteri){
        if(tietokone.numero===numero){
            return tietokone.varusteet
            }
            
        }
        throw new Error('numerolla ei löydy konetta'); 
    } // haeTietokoneenVarusteet loppu


    haeHinta(numero){
        if(!numero)throw new Error('numerolla ei löydy konetta');
        for(let tietokone of this.tietokonerekisteri){
            if(tietokone.numero===numero){
                return tietokone.hinta;
            }
        }
        throw new Error('numerolla ei löydy konetta');
    }

    
    ohjelmienYhteishinta(numero){
        if(!numero)throw new Error('numerolla ei löydy konetta');
        for(let tietokone of this.tietokonerekisteri){
            if(tietokone.numero===numero){
               let summa = 0;
               for(let ohjelma of tietokone.ohjelmat){
                   summa = summa + ohjelma.hinta;    
               } 
               return summa;       
            }
        }
        throw new Error('numerolla ei löydy konetta');
    } // ohjelmienYhteishinta loppu

    onkoOhjelmia(numero){
        // toimii myös ilman seuraavaa riviä
        if(!numero)return false;
        for(let tietokone of this.tietokonerekisteri){
            if(tietokone.numero===numero){
               if(tietokone.ohjelmat.length > 0){
                    return true;
                }else{
                    return false;
                } 
            }
        } return false;
    }

    onkoVarusteita(numero){
         if(!numero)return false;
        for(let tietokone of this.tietokonerekisteri){
            if(tietokone.numero===numero && tietokone.varusteet.length > 0){
                return true; 
            }   
        } return false;
    }
} // luokan loppu


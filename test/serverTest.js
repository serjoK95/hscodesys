const assert = require('chai').assert;
const mainServerModule= require('../server.js');

var BGCode = 'BG';
var BGName = 'Bulgaria';

var EECode = 'EE';
var EEName = 'Estonia';

var GRCode = 'EL';
var GRName = 'Greece';

var DKCode = 'DK';
var DKName = 'Denmark';

var SECode = 'SE';
var SEName = 'Sweden';

var ROCode = 'RO';
var ROName = 'Romania';

var CYCode = 'CY';
var CYName = 'Cyprus';

var NLCode = 'NL';
var NLName = 'Netherlands';

var MTCode = 'MT';
var MTName = 'Malta';

var ESCode = 'ES';
var ESName = 'Spain';

var HS1 = '900130';
var HS2 = '871500';
var HS3 = '710410';
var HS4 = '820110';
var HS5 = '940560';

var HS6 = '940350';
var HS7 = '920190';
var HS8 = '820190';
var HS9 = '330720';
var HS10 = '711319';

var HS11 = '850760';
var HS12 = '293690';
var HS13 = '650610';
var HS14 = '630640';
var HS15 = '911320';


var CN1 = '90013000';
var CN2 = '87150010';
var CN3 = '71041000';
var CN4 = '82011000';
var CN5 = '94056020';
var CN6 = '94035000';
var CN7 = '92019000';
var CN8 = '82019000';
var CN9 = '33072000';
var CN10 = '71131900';

var CN11 = '85076000';
var CN12 = '29369000';
var CN13 = '65061010';
var CN14 = '63064000';
var CN15 = '91132000';

var vatResponse1 = 20;
var vatResponse2 = 24;
var vatResponse3 = 25;
var vatResponse4 = 19;
var vatResponse5 = 21;
var vatResponse6 = 18;
var HS1Response = 'CONTACT LENSES';
var HS2Response = 'BABY CARRIAGES (INC STROLLERS) AND PARTS THEREOF';
var HS3Response = 'PIEZO-ELECTRIC QUARTZ NOT MOUNTED OR SET';
var HS4Response = 'SPADES AND SHOVELS AND PARTS, OF BASE METAL';
var HS5Response = 'ILLUMINATED SIGNS, ILLUMINATED NAMEPLATES AND THE';

var HS6Response = 'WOODEN BEDROOM  FURNITURE, EXCEPT SEATS';
var HS7Response = 'HARPSICHORDS AND OTHER KEYBOARD STRING INST NESOI';
var HS8Response = 'HANDTOOLS NESOI FOR AGRI, HORT ETC, BASE MTL PTS';
var HS9Response = 'PERSONAL DEODORANTS AND ANTIPERSPIRANTS';
var HS10Response = 'JEWELRY AND PARTS THEREOF, OF OTH PRECIOUS METAL';

var HS11Response = 'LITHIUM ION BATTERIES';
var HS12Response = 'VITAMINS, INCLD NATURAL CONCENTRATES ETC NESOI';
var HS13Response = 'SAFETY(INCL SPORTS)HDGR,WHETHER/NOT LINED/TRIMMED';
var HS14Response = 'PNEUMATIC MATTRESSES';
var HS15Response = 'WATCH BANDS, ETC, OF BASE METAL, PLATED OR NOT, PT';

var HS1CategoryResponse = 'Optical, photographic, cinematographic, measuring, checking, precision, medical or surgical instruments and apparatus; parts and accessories thereof';
var HS2CategoryResponse = 'Vehicles other than railway or tramway rolling stock, and parts and accessories thereof';
var HS3CategoryResponse = 'Natural or Cultured Pearls, Precious or Semiprecious Stones, Precious Metals, Metals Clad With Precious Metal, and Articles Thereof Imitation Jewelry Coin';
var HS4CategoryResponse = 'Tools, implements, cutlery, spoons and forks, of base metal; parts thereof of base metal';
var HS5CategoryResponse = 'Furniture; bedding, mattresses, mattress supports, cushions and similar stuffed furnishings; lamps and lighting fittings, not elsewhere specified or included; illuminated sign illuminated nameplates and the like; prefabricated buildings';
var HS6CategoryResponse = 'Furniture; bedding, mattresses, mattress supports, cushions and similar stuffed furnishings; lamps and lighting fittings, not elsewhere specified or included; illuminated sign illuminated nameplates and the like; prefabricated buildings';
var HS7CategoryResponse = 'Musical instruments; parts and accessories of such articles';
var HS8CategoryResponse = 'Tools, implements, cutlery, spoons and forks, of base metal; parts thereof of base metal';
var HS9CategoryResponse = 'Essential oils and resinoids; perfumery, cosmetic or toilet preparations';
var HS10CategoryResponse = 'Natural or Cultured Pearls, Precious or Semiprecious Stones, Precious Metals, Metals Clad With Precious Metal, and Articles Thereof Imitation Jewelry Coin';

var HS11CategoryResponse = 'Electrical machinery and equipment and parts thereof; sound recorders and reproducers, television image and sound recorders and reproducers, and parts and accessories of such articles';
var HS12CategoryResponse = 'Organic chemicals';
var HS13CategoryResponse = 'Headgear and parts thereof';
var HS14CategoryResponse = 'Other made up textile articles; sets; worn clothing and worn textile articles; rags';
var HS15CategoryResponse = 'Clocks and watches and parts thereof';



/////////////////////////////////   Get VAT Function Testing

describe('getVAT Function for Bulgaria', function(){
    it('Test should return a VAT rate of ' + vatResponse1 + "% for " + BGName, function(){
        assert.equal(mainServerModule.getVAT(BGCode, BGName), vatResponse1);
    });
});

describe('getVAT Function for Estonia', function(){
    it('Test should return a VAT rate of ' + vatResponse1 + "% for " + EEName, function(){
        assert.equal(mainServerModule.getVAT(EECode, EEName), vatResponse1);
    });
});

describe('getVAT Function for Greece', function(){
    it('Test should return a VAT rate of ' + vatResponse2 + "% for " + GRName, function(){
        assert.equal(mainServerModule.getVAT(GRCode, GRName), vatResponse2);
    });
});

describe('getVAT Function for Denmark', function(){
    it('Test should return a VAT rate of ' + vatResponse3 + "% for " + DKName, function(){
        assert.equal(mainServerModule.getVAT(DKCode, DKName), vatResponse3);
    });
});

describe('getVAT Function for Sweden', function(){
    it('Test should return a VAT rate of ' + vatResponse3 + "% for " + SEName, function(){
        assert.equal(mainServerModule.getVAT(SECode, SEName), vatResponse3);
    });
});

describe('getVAT Function for Romania', function(){
    it('Test should return a VAT rate of ' + vatResponse4 + "% for " + ROName, function(){
        assert.equal(mainServerModule.getVAT(ROCode, ROName), vatResponse4);
    });
});

describe('getVAT Function for Cyprus', function(){
    it('Test should return a VAT rate of ' + vatResponse4 + "% for " + CYName, function(){
        assert.equal(mainServerModule.getVAT(CYCode, CYName), vatResponse4);
    });
});

describe('getVAT Function for Netherlands', function(){
    it('Test should return a VAT rate of ' + vatResponse5 + "% for " + NLName, function(){
        assert.equal(mainServerModule.getVAT(NLCode, NLName), vatResponse5);
    });
});

describe('getVAT Function for Malta', function(){
    it('Test should return a VAT rate of ' + vatResponse6 + "% for " + MTName, function(){
        assert.equal(mainServerModule.getVAT(MTCode, MTName), vatResponse6);
    });
});

describe('getVAT Function for Spain', function(){
    it('Test should return a VAT rate of ' + vatResponse5 + "% for " + ESName, function(){
        assert.equal(mainServerModule.getVAT(ESCode, ESName), vatResponse5);
    });
});

/////////////////////////////////   Get Description Function Testing

describe('getDescription Function Test One', function(){
    it('Test should return description label "' + HS1Response + '" for HS Code: ' + HS1, function(){
        assert.equal(mainServerModule.getDescription(HS1), HS1Response);
    });
});

describe('getDescription Function Test Two', function(){
    it('Test should return description label "' + HS2Response + '" for HS Code: ' + HS2, function(){
        assert.equal(mainServerModule.getDescription(HS2), HS2Response);
    });
});

describe('getDescription Function Test Three', function(){
    it('Test should return description label "' + HS3Response + '" for HS Code: ' + HS3, function(){
        assert.equal(mainServerModule.getDescription(HS3), HS3Response);
    });
});

describe('getDescription Function Test Four', function(){
    it('Test should return description label "' + HS4Response + '" for HS Code: ' + HS4, function(){
        assert.equal(mainServerModule.getDescription(HS4), HS4Response);
    });
});

describe('getDescription Function Test Five', function(){
    it('Test should return description label "' + HS5Response + '" for HS Code: ' + HS5, function(){
        assert.equal(mainServerModule.getDescription(HS5), HS5Response);
    });
});

describe('getDescription Function Test Six', function(){
    it('Test should return description label "' + HS6Response + '" for HS Code: ' + HS6, function(){
        assert.equal(mainServerModule.getDescription(HS6), HS6Response);
    });
});

describe('getDescription Function Test Seven', function(){
    it('Test should return description label "' + HS7Response + '" for HS Code: ' + HS7, function(){
        assert.equal(mainServerModule.getDescription(HS7), HS7Response);
    });
});

describe('getDescription Function Test Eight', function(){
    it('Test should return description label "' + HS8Response + '" for HS Code: ' + HS8, function(){
        assert.equal(mainServerModule.getDescription(HS8), HS8Response);
    });
});

describe('getDescription Function Test Nine', function(){
    it('Test should return description label "' + HS9Response + '" for HS Code: ' + HS9, function(){
        assert.equal(mainServerModule.getDescription(HS9), HS9Response);
    });
});

describe('getDescription Function Test Ten', function(){
    it('Test should return description label "' + HS10Response + '" for HS Code: ' + HS10, function(){
        assert.equal(mainServerModule.getDescription(HS10), HS10Response);
    });
});

describe('getDescription Function Test Eleven', function(){
    it('Test should return description label "' + HS11Response + '" for HS Code: ' + HS11, function(){
        assert.equal(mainServerModule.getDescription(HS11), HS11Response);
    });
});

describe('getDescription Function Test Twelve', function(){
    it('Test should return description label "' + HS12Response + '" for HS Code: ' + HS12, function(){
        assert.equal(mainServerModule.getDescription(HS12), HS12Response);
    });
});

describe('getDescription Function Test Thirteen', function(){
    it('Test should return description label "' + HS13Response + '" for HS Code: ' + HS13, function(){
        assert.equal(mainServerModule.getDescription(HS13), HS13Response);
    });
});

describe('getDescription Function Test Fourteen', function(){
    it('Test should return description label "' + HS14Response + '" for HS Code: ' + HS14, function(){
        assert.equal(mainServerModule.getDescription(HS14), HS14Response);
    });
});

describe('getDescription Function Test Fiveteen', function(){
    it('Test should return description label "' + HS15Response + '" for HS Code: ' + HS15, function(){
        assert.equal(mainServerModule.getDescription(HS15), HS15Response);
    });
});

////////////////////////////// Get Section Note Function Testing

describe('getSectionNote Test One', function(){
    it('Test should return section note label "' + HS1CategoryResponse + '" for HS Code: ' + HS1, function(){
        assert.equal(mainServerModule.getSectionNote(HS1), HS1CategoryResponse);
    });
});

describe('getSectionNote Test Two', function(){
    it('Test should return section note label "' + HS2CategoryResponse + '" for HS Code: ' + HS2, function(){
        assert.equal(mainServerModule.getSectionNote(HS2), HS2CategoryResponse);
    });
});

describe('getSectionNote Test Three', function(){
    it('Test should return section note label "' + HS3CategoryResponse + '" for HS Code: ' + HS3, function(){
        assert.equal(mainServerModule.getSectionNote(HS3), HS3CategoryResponse);
    });
});

describe('getSectionNote Test Four', function(){
    it('Test should return section note label "' + HS4CategoryResponse + '" for HS Code: ' + HS4, function(){
        assert.equal(mainServerModule.getSectionNote(HS4), HS4CategoryResponse);
    });
});

describe('getSectionNote Test Five', function(){
    it('Test should return section note label "' + HS5CategoryResponse + '" for HS Code: ' + HS5, function(){
        assert.equal(mainServerModule.getSectionNote(HS5), HS5CategoryResponse);
    });
});

describe('getSectionNote Test Six', function(){
    it('Test should return section note label "' + HS6CategoryResponse + '" for HS Code: ' + HS6, function(){
        assert.equal(mainServerModule.getSectionNote(HS6), HS6CategoryResponse);
    });
});

describe('getSectionNote Test Seven', function(){
    it('Test should return section note label "' + HS7CategoryResponse + '" for HS Code: ' + HS7, function(){
        assert.equal(mainServerModule.getSectionNote(HS7), HS7CategoryResponse);
    });
});

describe('getSectionNote Test Eight', function(){
    it('Test should return section note label "' + HS8CategoryResponse + '" for HS Code: ' + HS8, function(){
        assert.equal(mainServerModule.getSectionNote(HS8), HS8CategoryResponse);
    });
});

describe('getSectionNote Test Nine', function(){
    it('Test should return section note label "' + HS9CategoryResponse + '" for HS Code: ' + HS9, function(){
        assert.equal(mainServerModule.getSectionNote(HS9), HS9CategoryResponse);
    });
});

describe('getSectionNote Test Ten', function(){
    it('Test should return section note label "' + HS10CategoryResponse + '" for HS Code: ' + HS10, function(){
        assert.equal(mainServerModule.getSectionNote(HS10), HS10CategoryResponse);
    });
});

describe('getSectionNote Test 11', function(){
    it('Test should return section note label "' + HS11CategoryResponse + '" for HS Code: ' + HS11, function(){
        assert.equal(mainServerModule.getSectionNote(HS11), HS11CategoryResponse);
    });
});

describe('getSectionNote Test 12', function(){
    it('Test should return section note label "' + HS12CategoryResponse + '" for HS Code: ' + HS12, function(){
        assert.equal(mainServerModule.getSectionNote(HS12), HS12CategoryResponse);
    });
});

describe('getSectionNote Test 13', function(){
    it('Test should return section note label "' + HS13CategoryResponse + '" for HS Code: ' + HS13, function(){
        assert.equal(mainServerModule.getSectionNote(HS13), HS13CategoryResponse);
    });
});

describe('getSectionNote Test 14', function(){
    it('Test should return section note label "' + HS14CategoryResponse + '" for HS Code: ' + HS14, function(){
        assert.equal(mainServerModule.getSectionNote(HS14), HS14CategoryResponse);
    });
});

describe('getSectionNote Test 15', function(){
    it('Test should return section note label "' + HS15CategoryResponse + '" for HS Code: ' + HS15, function(){
        assert.equal(mainServerModule.getSectionNote(HS15), HS15CategoryResponse);
    });
});


/////////////////////////////////////////////////////////////// Get CN Function Testing

describe('getCN Test One', function(){
    this.timeout(10000)
    it('Test should return Combined Nomenclature code ' + HS1, function(){
        assert.equal(mainServerModule.getCN(HS1), CN1);
    });
});

describe('getCN Test Two', function(){
    this.timeout(10000)
    it('Test should return Combined Nomenclature code "' + CN2 + '" for HS Code: ' + HS2, function(){
        assert.equal(mainServerModule.getCN(HS2), CN2);
    });
});

describe('getCN Test Three', function(){
    this.timeout(10000)
    it('Test should return Combined Nomenclature code "' + CN3 + '" for HS Code: ' + HS3, function(){
        assert.equal(mainServerModule.getCN(HS3), CN3);
    });
});

describe('getCN Test Four', function(){
    this.timeout(10000)
    it('Test should return Combined Nomenclature code "' + CN4 + '" for HS Code: ' + HS4, function(){
        assert.equal(mainServerModule.getCN(HS4), CN4);
    });
});

describe('getCN Test Five', function(){
    this.timeout(10000)
    it('Test should return Combined Nomenclature code "' + CN5 + '" for HS Code: ' + HS5, function(){
        assert.equal(mainServerModule.getCN(HS5), CN5);
    });
});

describe('getCN Test Six', function(){
    this.timeout(10000)
    it('Test should return Combined Nomenclature code "' + CN6 + '" for HS Code: ' + HS6, function(){
        assert.equal(mainServerModule.getCN(HS6), CN6);
    });
});

describe('getCN Test Seven', function(){
    this.timeout(10000)
    it('Test should return Combined Nomenclature code "' + CN7 + '" for HS Code: ' + HS7, function(){
        assert.equal(mainServerModule.getCN(HS7), CN7);
    });
});

describe('getCN Test Eight', function(){
    this.timeout(10000)
    it('Test should return Combined Nomenclature code "' + CN8 + '" for HS Code: ' + HS8, function(){
        assert.equal(mainServerModule.getCN(HS8), CN8);
    });
});

describe('getCN Test Nine', function(){
    this.timeout(10000)
    it('Test should return Combined Nomenclature code "' + CN9 + '" for HS Code: ' + HS9, function(){
        assert.equal(mainServerModule.getCN(HS9), CN9);
    });
});

describe('getCN Test Ten', function(){
    this.timeout(10000)
    it('Test should return Combined Nomenclature code "' + CN10 + '" for HS Code: ' + HS10, function(){
        assert.equal(mainServerModule.getCN(HS10), CN10);
    });
});

describe('getCN Test 11', function(){
    this.timeout(10000)
    it('Test should return Combined Nomenclature code "' + CN11 + '" for HS Code: ' + HS11, function(){
        assert.equal(mainServerModule.getCN(HS11), CN11);
    });
});

describe('getCN Test 12', function(){
    this.timeout(10000)
    it('Test should return Combined Nomenclature code "' + CN12 + '" for HS Code: ' + HS12, function(){
        assert.equal(mainServerModule.getCN(HS12), CN12);
    });
});

describe('getCN Test 13', function(){
    this.timeout(10000)
    it('Test should return Combined Nomenclature code "' + CN13 + '" for HS Code: ' + HS13, function(){
        assert.equal(mainServerModule.getCN(HS13), CN13);
    });
});

describe('getCN Test 14', function(){
    this.timeout(10000)
    it('Test should return Combined Nomenclature code "' + CN14 + '" for HS Code: ' + HS14, function(){
        assert.equal(mainServerModule.getCN(HS14), CN14);
    });
});

describe('getCN Test 15', function(){
    this.timeout(10000)
    it('Test should return Combined Nomenclature code "' + CN15 + '" for HS Code: ' + HS15, function(){
        assert.equal(mainServerModule.getCN(HS15), CN15);
    });
});
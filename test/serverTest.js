const assert = require('chai').assert;
const mainServerModule= require('../server.js');

var BGCode = 'BG';
var BGName = 'Bulgaria';

var EECode = 'EE';
var EEName = 'Estonia';

var GRCode = 'EL';
var GRName = 'Greece';

var HS1 = '900130';

var vatResponse1 = 20;
var vatResponse2 = 24;
var HS1Response = 'CONTACT LENSES';

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

describe('getDescription Function for Contact Lenses', function(){
    it('Test should return description label "' + HS1Response + '" for HS Code: ' + HS1, function(){
        assert.equal(mainServerModule.getDescription(HS1), HS1Response);
    });
});
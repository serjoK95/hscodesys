var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var ejs = require('ejs');
const { json } = require('body-parser');
var brain = require('brain.js');
var server = express();

var compression = require('compression'); ////////////

//let hsData, cnData;

var DecisionTree = require('decision-tree');
var hsData = require('./hsDataset.json');
var cnData = require('./nst-cn-dataset.json'); //
const { ServerResponse } = require('http');

/*
fs.readFile('hsDataset.json', (err, data) => {
    if (err) throw err;
    hsData = JSON.parse(data);
    //console.log(data);
})

fs.readFile('nst-cn-dataset.json', (err, data) => {
    if (err) throw err;
    cnData = JSON.parse(data);
    //console.log(data);
})
*/

let queryResponse;
let queryResponse2;
let memberStateResponse;
let sectionResponse;
let dutyResponse;//
let mfnDutyResponse;//
let CNResponse;//
/*
var logger = function(req, res, next){
    console.log('Logging...');
    next();
}

server.use(logger);
*/

// Body Parser Middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));


server.use(compression()); //////////////
//  Static Path
server.use(express.static(path.join(__dirname, '/public')));

server.set('view engine', 'ejs');

server.get('/', function(req, res) {
        res.render('pages/index', { data: {subheadingQuery: queryResponse, sectionNotesQuery: queryResponse2,
        vatQuery: memberStateResponse, sectionQuery: sectionResponse, inputField: tagClickResponse, 
        dutyQuery: dutyResponse, mfnQuery: mfnDutyResponse, CNQuery: CNResponse, CNMineAccuracy: cnMineAccuracy}});
});

server.get('/', function(req, res) {
    res.render('pages/about');
});


server.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
});

/////////////////////////

function getDescription(input){

    var test_data2 = [
        {"chapter": "01", "heading": "0105", "category": "Live animals", "description": "TURKEYS, DUCKS, GEESE, GUINEA FOWLS, LIVE, OV 185G", "subheading":"010599"},
        {"chapter": "02", "heading": "0205", "category": "Meat and edible meat offal", "description": "MEAT OF HORSES, ASSES, MULES, HINNIES FR, CHLD, FZ", "subheading":"020500"},
        {"chapter": "03", "heading": "0301", "category": "Fish and crustaceans, molluscs and other aquatic invertebrates", "description": "SOUTHERN BLUEFIN TUNAS (THUNNUS MACCOYII), LIVE", "subheading":"030195"},
        {"chapter": "04", "heading": "0407", "category": "Dairy produce; birds eggs; natural honey; edible products of animal origin, not elsewhere specified or included", "description": "EGGS OF BIRDS, FRESH, NESOI", "subheading":"040729"}
    ];

    var class_name = "description";

    var features = ["heading", "subheading"];

    var dt = new DecisionTree(hsData, class_name, features);

    var h = input.substring(0,4);
    var sh = input.substring(0,6);

    var predicted_class = dt.predict({
        heading: h, 
        subheading: sh
    });

   var accuracy = dt.evaluate(test_data2);

    console.log(predicted_class);
    console.log(accuracy);
    queryResponse = predicted_class;
    
}

function getSectionNote(input){

    var test_data2 = [
        {"chapter": "01", "heading": "0105", "category": "Live animals", "description": "TURKEYS, DUCKS, GEESE, GUINEA FOWLS, LIVE, OV 185G", "subheading":"010599"},
        {"chapter": "02", "heading": "0205", "category": "Meat and edible meat offal", "description": "MEAT OF HORSES, ASSES, MULES, HINNIES FR, CHLD, FZ", "subheading":"020500"},
        {"chapter": "03", "heading": "0301", "category": "Fish and crustaceans, molluscs and other aquatic invertebrates", "description": "SOUTHERN BLUEFIN TUNAS (THUNNUS MACCOYII), LIVE", "subheading":"030195"},
        {"chapter": "04", "heading": "0407", "category": "Dairy produce; birds eggs; natural honey; edible products of animal origin, not elsewhere specified or included", "description": "EGGS OF BIRDS, FRESH, NESOI", "subheading":"040729"}
    ];

    var class_name = "category";

    var features = ["heading", "subheading"];

    var dt = new DecisionTree(hsData, class_name, features);

    var h = input.substring(0,4);
    var sh = input.substring(0,6);

    var predicted_class = dt.predict({
        heading: h, 
        subheading: sh
    });

    var accuracy = dt.evaluate(test_data2);

    console.log(predicted_class);
    console.log(accuracy);
    queryResponse2 = predicted_class;
}

// new function for CN EU CODES of Goods

var cnMineAccuracy;
function getCN(input){
    var test_data = [
        {
            "chapter": "07",
            "heading": "0703",
            "subheading": "070390",
            "CN2021": "07039000"
          },
          {
            "chapter": "07",
            "heading": "0704",
            "subheading": "070410",
            "CN2021": "07041000"
          },
          {
            "chapter": "07",
            "heading": "0704",
            "subheading": "070420",
            "CN2021": "07042000"
          },
          {
            "chapter": "07",
            "heading": "0704",
            "subheading": "070490",
            "CN2021": "07049010"
          },
          {
            "chapter": "07",
            "heading": "0704",
            "subheading": "070490",
            "CN2021": "07049090"
          }
    ];

    var class_name = "CN2021";

    var features = ["chapter" ,"heading", "subheading"];

    var dt = new DecisionTree(cnData, class_name, features); 

    var ch = input.substring(0,2);
    var h = input.substring(0,4);
    var sh = input.substring(0,6);

    var predicted_class = dt.predict({
        chapter: ch, 
        heading: h,
        subheading: sh
    });

    var accuracy = dt.evaluate(test_data);

    console.log(predicted_class);
    console.log(accuracy);
    CNResponse = predicted_class;
    cnMineAccuracy = "Combined Nomenclature (Mining Accuracy (0-1): " + accuracy; // Mining Accuracy 
}
//


function getVAT(code, country){

    var vatData = require('./public/vatRates.json');

    var test_data = [
        {
            "memberState" : "Belgium",
            "memberCode" : "BE",
            "standardRate" : 21
        },     {
            "memberState" : "Bulgaria",
            "memberCode" : "BG",
            "standardRate" : 20
        },     {
            "memberState" : "Czech Republic",
            "memberCode" : "CZ",
            "standardRate" : 21
        },     {
            "memberState" : "Denmark",
            "memberCode" : "DK",
            "standardRate" : 25
        },     {
            "memberState" : "Germany",
            "memberCode" : "DE",
            "standardRate" : 19
        }
    ];

    var class_name = "standardRate";

    var features = ["memberState", "memberCode"];

    var dt = new DecisionTree(vatData, class_name, features);

    var predicted_class = dt.predict({
        memberState: country, 
        memberCode: code
    });

    var accuracy = dt.evaluate(test_data);

    console.log(predicted_class);
    console.log(accuracy);
    memberStateResponse = predicted_class;

}


server.post('/endpoint', function(req, res){
    res.send(req.body.input, req.body.cCode, req.body.cTitle, req.body.sectionP, req.body.duty, req.body.mfnAvgDuty);
    res.end(); //

    sectionResponse = req.body.sectionP;
    dutyResponse = req.body.duty;
    mfnDutyResponse = req.body.mfnAvgDuty;

    if (req.body.input == ''){
        queryResponse = 'Please provide a valid HS Code with 6 digits.';
        queryResponse2 = 'Invalid HS Code provided!';
        CNResponse = 'Cannot allocate CN code for inaccurate HS code!';
    } else {
        getSectionNote(req.body.input);
        getDescription(req.body.input);
        getCN(req.body.input);
    }
    if(req.body.cCode == 'undefined' || req.body.cTitle == 'undefined'){
        memberStateResponse = '0'
    } else {
        getVAT(req.body.cCode, req.body.cTitle);
    }
    
});


var tagClickResponse;
server.post('/input', function(req, res){
    res.send(req.body.userInput);
    getHS(req.body.userInput);
});




function getHS(label){

switch(true){
    case (label == 'Plastic Comb'):
        tagClickResponse = '961511';
        break;
    case (label == 'Pins'):
        tagClickResponse = '961590';
        break;
    case (label == 'Shaving'):
        tagClickResponse = '330710';
        break;
    case (label == 'Dryer'):
        tagClickResponse = '851631';
        break;
    case (label  == 'Sunglasses'):
        tagClickResponse = '900410';
        break;
    case (label == 'Hand Glove'):
        tagClickResponse = '420329';
        break;
    case (label == 'Bags'):
        tagClickResponse = '420229';
        break;
    case (label == 'Hats'):
        tagClickResponse = '650400';
        break;
    case (label =='Head Protection'):
        tagClickResponse = '650610';
        break;
    case (label == 'Shoes'):
        tagClickResponse = '640199';
        break;
    case (label == 'Socks'):
        tagClickResponse = '611594';
        break;
    case (label == 'Stocking'):
        tagClickResponse = '611595';
        break;
    case (label == 'Umbrella'):
        tagClickResponse = '660191';
        break;
    case (label == 'Knitted'):
        tagClickResponse = '611710';
        break;
    case (label == 'Silk'):
        tagClickResponse = '621410';
        break;
    case (label == 'Artificial'):
        tagClickResponse = '621440';
        break;
    case (label == 'Wrist Watch'):
        tagClickResponse = '910111';
        break;
    case (label == 'Contact Lense'):
        tagClickResponse = '900130';
        break;
    case (label == 'Face Mask'):
        tagClickResponse = '902000';
        break;
    case (label == 'Candle'):
        tagClickResponse = '340600';
        break;
    case (label == 'Mouthwash'):
        tagClickResponse = '330690';
        break;
    case (label == 'Synthetic'):
        tagClickResponse = '300450';
        break;
    case (label == 'Derivative'):
        tagClickResponse = '293629';
        break;
    case (label == 'Concentrate'):
        tagClickResponse = '293690';
        break;
    case (label == 'Whey Protein'):
        tagClickResponse = '350220';
        break;
    case (label == 'Perfumery'):
        tagClickResponse = '330300';
        break;
    case (label == 'Optical Cable'):
         tagClickResponse = '900110';
         break;
    case (label == 'Cordless Line Phone'):
         tagClickResponse = '851712';
         break;
         
    case (label == 'Desk Lamp'):
        tagClickResponse = '940520';
        break;
        
    case (label == 'Telephone Sets'):
         tagClickResponse = '851711';
         break;
    case (label == 'For Writing'):
         tagClickResponse = '481022';
         break;
    case (label == 'Envelope'):
         tagClickResponse = '481710';
         break;
    case (label == 'Handmade'):
         tagClickResponse = '480210';
         break;
    case (label == 'Notepads'):
         tagClickResponse = '482010';
         break;
    case (label == 'Postage'):
         tagClickResponse = '490700';
         break;
    case (label == 'Paper Shredder'):
         tagClickResponse = '847290';
         break;
    case (label == 'Business Forms'):
         tagClickResponse = '482040';
         break;
    case (label == 'Equipment'):
         tagClickResponse = '847090';
         break;
    case (label == 'Sorting'):
         tagClickResponse = '847230';
         break;
    case (label == 'Stamps'):
         tagClickResponse = '970400';
         break;
    
    case (label == 'Typewriter'):
        tagClickResponse = '961210';
        break;
    case (label == 'Calendar'):
        tagClickResponse = '491000';
        break;
    case (label == 'Magazine'):
        tagClickResponse = '480100';
        break;
    case (label == 'Fax'):
        tagClickResponse = '844332';
        break;
    case (label == 'Calculator'):
        tagClickResponse = '847010';
        break;
    case (label == 'Ball Point'):
        tagClickResponse = '960810';
        break;
    case (label == 'Felt Tip'):
        tagClickResponse = '960820';
        break;
    case (label == 'Stylograph'):
        tagClickResponse = '960830';
        break;
    case (label == 'Refill'):
        tagClickResponse = '960860';
        break;
    case (label == 'Pencil'):
        tagClickResponse = '960910';
        break;
    case (label == 'Lithium Battery'):
        tagClickResponse = '850760';
        break;
    case (label == 'Binder'):
        tagClickResponse = '482030';
        break;
    case (label == 'Dispenser'):
        tagClickResponse = '854810';
        break;
    case (label == 'Fire'):
        tagClickResponse = '820560';
        break;
    case (label == 'Electric'):
        tagClickResponse = '846810';
        break;
    case (label == 'Vacuum Cleaner'):
        tagClickResponse = '850819';
        break;
    case (label == 'Fan'):
        tagClickResponse = '841459';
        break;
    case (label == 'Flatiron'):
        tagClickResponse = '851640';
        break;
    case (label == 'Audio Amplifier'):
        tagClickResponse = '851850';
        break;
    case (label == 'Air Conditioner'):
        tagClickResponse = '841581';
        break;
    case (label == 'Television'):
        tagClickResponse = '852872';
        break;
    case (label == 'Sound System'):
        tagClickResponse = '851822';
        break;
    case (label == 'Speaker'):
        tagClickResponse = '851821';
        break;
    case (label == 'Wired'):
        tagClickResponse = '852713';
        break;
    case (label == 'Cloth'):
        tagClickResponse = '842112';
        break;
    case (label == 'Washer'):
        tagClickResponse = '845020';
        break;
    case (label == 'Refrigerator'):
        tagClickResponse = '841821';
        break;
    case (label == 'Utility Tools'):
        tagClickResponse = '820559';
        break;

    case (label =='Christmas Decorations'):
        tagClickResponse =  '940530';
        break;
    case (label =='Stoves'):
        tagClickResponse =  '851660';
        break;
    case (label =='Coffee-Tea Makers'):
        tagClickResponse =  '851671';
        break;
    case (label =='Mixers'):
        tagClickResponse =  '850940';
        break;
    case (label =='Toasters'):
        tagClickResponse =  '851672';
        break;
    case (label =='Microwave'):
        tagClickResponse =  '851650';
        break;
    case (label =='Dishwashers'):
        tagClickResponse =  '842211';
        break;
    case (label =='Water Purifier'):
        tagClickResponse =  '842121';
        break;
    case (label =='Utensils'):
        tagClickResponse =  '820551';
        break;
    case (label =='Table Knives'):
        tagClickResponse =  '821191';
        break;
    case (label =='Kitchen Ceramicware'):
        tagClickResponse =  '691110';
        break;
    case (label =='Kitchen Glassware'):
        tagClickResponse =  '701349';
        break;
    case (label =='Steel Utensils'):
        tagClickResponse =  '732393';
        break;
    case (label =='Kitchen Copperware'):
        tagClickResponse =  '741810';
        break;
    case (label =='Scales'):
        tagClickResponse =  '842310';
        break;
    case (label =='Alluminum Foil'):
        tagClickResponse =  '760720';
        break;

    case (label == 'Storage Radiators'):
        tagClickResponse = '851621';
        break;
    case (label == 'Non-Processed'):
        tagClickResponse = '520100';
        break;
    case (label == 'Linter'):
        tagClickResponse = '140420';
        break;
    case (label == 'Garnetted'):
        tagClickResponse = '520291';
        break;
    case (label == 'Rubber Pipes'):
        tagClickResponse = '400912';
        break;
    case (label == 'Mechanical Woodpulp'):
        tagClickResponse = '470100';
        break;
    case (label == 'Asphalt'):
        tagClickResponse = '680710';
        break;
    case (label == 'Magnets'):
        tagClickResponse = '850519';
        break;
    case (label == 'Granulated Iron'):
        tagClickResponse = '261800';
        break;
    case (label == 'Bookbinding Machine'):
        tagClickResponse = '844010';
        break;
    case (label == 'Alloy Steel Powder'):
        tagClickResponse = '720521';
        break;
    case (label == 'Iron Wires'):
        tagClickResponse = '721790';
        break;
    case (label == 'Steel Ingots'):
        tagClickResponse = '721810';
        break;
    case (label == 'Gas/ Oil Pipes'):
        tagClickResponse = '730619';
        break;
    case (label == 'Stud Links'):
        tagClickResponse = '731581';
        break;
    case (label == 'Skid Links'):
        tagClickResponse = '731520';
        break;
    case (label == 'Anchors'):
        tagClickResponse = '731600';
        break;
    case (label == 'Sewing Needles'):
        tagClickResponse = '845230';
        break;
    case (label == 'Threads'):
        tagClickResponse = '540110';
        break;
    case (label == 'Parts'):
        tagClickResponse = '845290';
        break;
    case (label == 'Cereal Milling Machine'):
        tagClickResponse = '843780';
        break;
    case (label == 'Electric Welders'):
        tagClickResponse = '851521';
        break;
    case (label == 'Vegetable Plaiting'):
        tagClickResponse = '140190';
        break;
    case (label == 'Crude Oil'):
        tagClickResponse = '270900';
        break;

        
        case (label == 'Radio Receivers'):
            tagClickResponse =  '852721';
            break;
        case (label == 'Electric Motor Vehicles'):
            tagClickResponse =  '870380';
            break;
        case (label == 'Tracktor Equipment'):
            tagClickResponse =  '870790';
            break;
        case (label == 'Bumpers'):
            tagClickResponse =  '870810';
            break;
        case (label == 'Safety Seatbelts'):
            tagClickResponse =  '870821';
            break;
        case (label == 'Gearboxes'):
            tagClickResponse =  '870840';
            break;
        case (label == 'Drive Axles (Differential)'):
            tagClickResponse =  '870850';
            break;
        case (label == 'Road Wheels'):
            tagClickResponse =  '870870';
            break;
        case (label == 'Radiators'):
            tagClickResponse =  '870891';
            break;
        case (label == 'Exhaust Pipes'):
            tagClickResponse =  '870892';
            break;
        case (label == 'Clutches'):
            tagClickResponse =  '870893';
            break;
        case (label == 'Steering Wheels'):
            tagClickResponse =  '870894';
            break;
        case (label == 'Airbags'):
            tagClickResponse =  '870895';
            break;
        case (label == 'Seats'):
            tagClickResponse =  '940120';
            break;
        case (label == 'Air Conditioners'):
            tagClickResponse =  '841520';
            break;
        case (label == 'Combustion Engines'):
            tagClickResponse =  '851110';
            break;
        case (label == 'Aircraft Engines'):
            tagClickResponse =  '840710';
            break;
        case (label == 'Spark Pistons'):
            tagClickResponse =  '840731';
            break;
        case (label == 'Computers'):
            tagClickResponse =  '847130';
            break;
        case (label == 'Keyboards'):
            tagClickResponse =  '847160';
            break;
        case (label == 'Hard Drives'):
            tagClickResponse =  '847170';
            break;
        case (label == 'Amplifiers'):
            tagClickResponse =  '854233';
            break;
        case (label == 'Solid-State Drives'):
            tagClickResponse =  '852351';
            break;
        case (label == 'Base Stations'):
            tagClickResponse =  '851761';
            break;
        case (label == 'Magnetic Stripe Cards'):
            tagClickResponse =  '852321';
            break;
        case (label == 'Smart Cards'):
            tagClickResponse =  '852352';
            break;
        case (label == 'Monitors'):
            tagClickResponse =  '852859';
            break;
        case (label == 'Microphones'):
            tagClickResponse =  '851810';
            break;
        case (label == 'Computer Mices'):
            tagClickResponse =  '847141';
            break;
        case (label == 'Web Camera'):
            tagClickResponse =  '852580';
            break;
        case (label == 'Vegetable Baby Foods'):
            tagClickResponse =  '200510';
            break;
	    case (label == 'Fruit Baby Foods'):
            tagClickResponse =  '200710';
            break;
	    case (label == 'Other Baby Foods'):
            tagClickResponse =  '210420';
            break;
        case (label == 'Powders'):
            tagClickResponse =  '330491';
            break;
        case (label == 'Cotton Garments'):
            tagClickResponse =  '611120';
            break;
	    case (label == 'Synthetic Fiber'):
            tagClickResponse =  '611130';
            break;
	    case (label == 'Knitted Textile'):
            tagClickResponse =  '611190';
            break;
	    case (label == 'Non-Knit Cotton'):
            tagClickResponse =  '620920';
            break;
        case (label == 'Baby Diapers'):
            tagClickResponse =  '961900';
            break;
        case (label == 'Carriages & Strollers'):
            tagClickResponse =  '871500';
            break;
        case (label == 'Natural Pearls'):
            tagClickResponse =  '710110';
            break;
	    case (label == 'Cultured Pearls'):
            tagClickResponse =  '710121';
            break;
    	case (label == 'Industrial Diamonds'):
            tagClickResponse =  '710229';
            break;
	    case (label == 'Non-Industrial Diamonds'):
            tagClickResponse =  '710239';
            break;
	    case (label == 'Powder Diamonds'):
            tagClickResponse =  '710510';
            break;
        case (label == 'Precious Stones'):
            tagClickResponse =  '710310';
            break;
        case (label == 'Rubbies'):
            tagClickResponse =  '710391';
            break;
        case (label == 'Sapphire'):
            tagClickResponse =  '710391';
            break;
        case (label == 'Emeralds'):
            tagClickResponse =  '710391';
            break;
        case (label == 'Semiprecious Stones'):
            tagClickResponse =  '710399';
            break;
        case (label == 'Quartz'):
            tagClickResponse =  '710410';
            break;
        case (label == 'Gemstones'):
            tagClickResponse =  '710420';
            break;
	    case (label == 'Powder Silver'):
            tagClickResponse =  '710610';
            break;
	    case (label == 'Semimanufactured Silver'):
            tagClickResponse =  '710692';
            break;
	    case (label == 'Unwrought Silver'):
            tagClickResponse =  '710691';
            break;
	    case (label == 'Silver Jewellery'):
            tagClickResponse =  '711311';
            break;
    	case (label == 'Powder Gold'):
            tagClickResponse =  '710811';
            break;
	    case (label == 'Semimanufactured Gold'):
            tagClickResponse =  '710813';
            break;
    	case (label == 'Unwrought  Platinum'):
            tagClickResponse =  '711011';
            break;
	    case (label == 'Powder Platinum'):
            tagClickResponse =  '711011';
            break;
	    case (label == 'Metal Firm Form'):
            tagClickResponse =  '711019';
            break;
        case (label == 'Precious Metal Jewellery'):
            tagClickResponse =  '711319';
            break;
        case (label == 'Platinum/ Gold Products'):
            tagClickResponse =  '711419';
            break;
        case (label == 'Pearl Products'):
            tagClickResponse =  '711610';
            break;
        case (label == 'Dog/ Cat Food'):
            tagClickResponse =  '230910';
            break;
        case (label == 'Other Animal Food Preps'):
            tagClickResponse =  '230990';
            break;
        case (label == 'Skin Cleansers'):
            tagClickResponse =  '340130';
            break;
        case (label == 'Skincare Cremes & Oils'):
            tagClickResponse =  '330499';
            break;
        case (label == 'Lip Make-Up'):
            tagClickResponse =  '330410';
            break;
        case (label == 'Eye Make-Up'):
            tagClickResponse =  '330420';
            break;
        case (label == 'Powder Make-Up'):
            tagClickResponse =  '330491';
            break;
        case (label == 'Deodorants'):
            tagClickResponse =  '330720';
            break;
        case (label == 'Bath Salts'):
            tagClickResponse =  '330730';
            break;
        case (label == 'Hair Trimmers'):
            tagClickResponse =  '851030';
            break;
        case (label == 'Trimmer Parts & Accessories'):
            tagClickResponse =  '851090';
            break;
        case (label == 'Synthetic Wigs'):
            tagClickResponse =  '670411';
            break;
        case (label == 'Sythetic Beard Wigs'):
            tagClickResponse =  '670419';
            break;
        case (label == 'Natural Beard Wigs'):
            tagClickResponse =  '670420';
            break;
        case (label == 'Rubber Shoes'):
            tagClickResponse =  '640199';
            break;
        case (label == 'Sport Shoes'):
            tagClickResponse =  '640411';
            break;
        case (label == 'Waterproof Shoes'):
            tagClickResponse =  '640110';
            break;
        case (label == 'Rubber Boots'):
            tagClickResponse =  '640192';
            break;
        case (label == 'Rubber Sport Footwear'):
            tagClickResponse =  '640219';
            break;
        case (label == 'Shoe Insoles'):
            tagClickResponse =  '640690';
            break;
        case (label == 'Leather Shoes'):
            tagClickResponse =  '640510';
            break;
        case (label == 'Snowboard Shoes'):
            tagClickResponse =  '640312';
            break;
        case (label == 'High Rubber Shoes'):
            tagClickResponse =  '640620';
            break;
        case (label == 'Leather Handbangs'):
            tagClickResponse = '420221';
            break;

        case (label =='Plastic Handbangs'):
            tagClickResponse = '420222';
            break;
        case (label =='Leather Wallets'):
            tagClickResponse = '420231';
            break;
        case (label =='Exercise Books'):
            tagClickResponse = '482020';
            break;
        case (label =='Folder Covers'):
            tagClickResponse = '482030';
            break;
        case (label =='Book Covers'):
            tagClickResponse = '482090';
            break;
        case (label =='Printed Books'):
            tagClickResponse = '490110';
            break;
        case (label =='Dictionaries/ Encyclopedias'):
            tagClickResponse = '490191';
            break;
        case (label =='Journals'):
            tagClickResponse = '490210';
            break;
        case (label =='Coloring Books'):
            tagClickResponse = '490300';
            break;
        case (label =='Music Manuscripts'):
            tagClickResponse = '490400';
            break;
        case (label =='Maps & Atlases'):
            tagClickResponse = '490591';
            break;
        case (label =='Commercial Catalogs'):
            tagClickResponse = '491110';
            break;
        case (label =='Lawn Mowers'):
            tagClickResponse = '843311';
            break;
        case (label =='Other Lawn Mowers'):
            tagClickResponse = '843319';
            break;
        case (label =='Land-Roller Parts'):
            tagClickResponse = '843290';
            break;
        case (label =='Garden Umbrellas'):
            tagClickResponse = '660110';
            break;
        case (label =='Grass Mower Parts'):
            tagClickResponse = '843390';
            break;
        case (label =='Water Jet'):
            tagClickResponse = '845650';
            break;
        case (label =='Metal Shears'):
            tagClickResponse = '820330';
            break;
        case (label =='Edging Shears'):
            tagClickResponse = '820160';
            break;
        case (label =='Shovels'):
            tagClickResponse = '820110';
            break;
        case (label =='Picks'):
            tagClickResponse = '820130';
            break;
        case (label =='Garden Handtools'):
            tagClickResponse = '820190';
            break;
        case (label =='Manure Spreaders'):
            tagClickResponse = '843241';
            break;
        case (label =='Spreaders & Planters'):
            tagClickResponse = '843239';
            break;
        case (label =='Fertilizer Distributors'):
            tagClickResponse = '843242';
            break;
        case (label =='Haying Machines'):
            tagClickResponse = '843330';
            break;
        case (label =='Balers'):
            tagClickResponse = '843340';
            break;
        case (label =='Harvesters'):
            tagClickResponse = '843351';
            break;
        case (label =='Threshers'):
            tagClickResponse = '843352';
            break;
        case (label =='Sprayers'):
            tagClickResponse = '842441';
            break;
        case (label =='Instrument Strings'):
            tagClickResponse = '920930';
            break;
        case (label =='Upright Pianos'):
            tagClickResponse = '920110';
            break;
        case (label =='Grand Pianos'):
            tagClickResponse = '920120';
            break;
        case (label =='Piano Parts & Accessories'):
            tagClickResponse = '920991';
            break;
        case (label =='Keyboard Instruments'):
            tagClickResponse = '920190';
            break;
    	case (label =='Bow Played'):
            tagClickResponse = '920210';
            break;
        case (label =='Non-Bow Played'):
            tagClickResponse = '920290';
            break;
        case (label =='Parts & Accessories'):
            tagClickResponse = '920992';
            break;
        case (label =='Brass Instruments'):
            tagClickResponse = '920510';
            break;
        case (label =='Drum Insrtuments'):
            tagClickResponse = '920600';
            break;
        case (label =='Music Boxes'):
            tagClickResponse = '920810';
            break;
        case (label =='Call Hornes'):
            tagClickResponse = '920890';
            break;
        case (label =='Sound Amplifying Instruments'):
            tagClickResponse = '920790';
            break;
        case (label =='Electric Lamps'):
            tagClickResponse = '940540';
            break;
        case (label =='Non-Electric Lamps'):
            tagClickResponse = '940540';
            break;
        case (label =='Illuminated Signs'):
            tagClickResponse = '940560';
            break;
        case (label =='Of Glass'):
            tagClickResponse = '940591';
            break;
        case (label =='Of Plastic'):
            tagClickResponse = '940592';
            break;
    	case (label =='Refillable'):
            tagClickResponse = '961320';
            break;
        case (label =='Non-Refillable'):
            tagClickResponse = '961310';
            break;
        case (label =='Lighter Parts'):
            tagClickResponse = '961390';
            break;   
        case (label =='Lighters'):
            tagClickResponse = '961380';
            break;
        case (label =='Lighter Fuel'):
            tagClickResponse = '360610';
            break;
        case (label =='LED Lamps'):
            tagClickResponse = '853950';
            break;
        case (label =='Diodes'):
            tagClickResponse = '854110';
            break;
        case (label =='Photographic Apparatus'):
            tagClickResponse = '900669';
            break;
        case (label =='Bicycle Lights'):
            tagClickResponse = '851210';
            break;
        case (label =='Sport Gloves'):
            tagClickResponse = '420321';
            break;
        case (label =='Rubber Footwear'):
            tagClickResponse = '640219';
            break;
        case (label =='Upper Footwear'):
            tagClickResponse = '640319';
            break;
        case (label =='Headgea'):
            tagClickResponse = '650610';
            break;
        case (label =='Scooters'):
            tagClickResponse = '950300';
            break;
        case (label =='Tricycles'):
            tagClickResponse = '950300';
            break;
        case (label =='Billiard Equipment'):
            tagClickResponse = '950420';
            break;
       case (label =='Playing Cards'):
           tagClickResponse = '950440';
           break;
       case (label =='Video Game Console'):
           tagClickResponse = '950450';
           break;
        case (label =='Skiing Equipment'):
            tagClickResponse = '950611';
            break;
        case (label =='Golf Clubs'):
            tagClickResponse = '950631';
            break;
        case (label =='Golf Balls'):
            tagClickResponse = '950632';
            break;
        case (label =='Table Tennis Equipment'):
            tagClickResponse = '950640';
            break;
        case (label =='Lawn Tennis Balls'):
            tagClickResponse = '950661';
            break;
        case (label =='Inflatable Balls'):
            tagClickResponse = '950661';
            break;
        case (label =='Other Balls'):
            tagClickResponse = '950669';
            break;
        case (label =='Ice/ Roller Skates'):
            tagClickResponse = '950670';
            break;
        case (label =='Exercise Equipment'):
            tagClickResponse = '950691';
            break;
        case (label =='Rods'):
            tagClickResponse = '950710';
            break;
        case (label =='Hooks'):
            tagClickResponse = '950720';
            break;
        case (label =='Reels'):
            tagClickResponse = '950730';
            break;
        case (label =='Line Tackles'):
            tagClickResponse = '950790';
            break;
        case (label =='Inflatable'):
            tagClickResponse = '890310';
            break;
        case (label =='Sport Yachts'):
            tagClickResponse = '890399';
            break;
        case (label =='Shotguns'):
            tagClickResponse = '930320';
            break;
        case (label =='Rifles'):
            tagClickResponse = '930330';
            break;
        case (label =='Electronic'):
            tagClickResponse = '847029';
            break;
        case (label =='Accessories & Parts'):
            tagClickResponse = '847321';
            break;
        case (label =='Circuit Processors'):
            tagClickResponse = '854231';
            break;
        case (label =='Circuit Memmory'):
            tagClickResponse = '854232';
            break;
        case (label =='Amplifiers'):
            tagClickResponse = '854233';
            break;
        case (label =='Electronic Integrated Circuits'):
            tagClickResponse = '854239';
            break;
        case (label =='EIC Parts'):
            tagClickResponse = '854290';
            break;
        case (label =='Optical Watch Displays'):
            tagClickResponse = '910812';
            break;
        case (label =='Turntable Equipment'):
            tagClickResponse = '851930';
            break;
        case (label =='Solid-State Drives'):
            tagClickResponse = '852351';
            break;
        case (label =='Radar Equipment'):
            tagClickResponse = '852610';
            break;
        case (label =='Navigation Aid'):
            tagClickResponse = '852691';
            break;
       case (label =='Remote Controllers'):
           tagClickResponse = '852692';
           break;
        case (label =='Casette Players'):
            tagClickResponse = '852712';
            break;
    	case (label =='For Rails'):
            tagClickResponse = '853010';
            break;
        case (label =='Other Traffic Controls'):
            tagClickResponse = '853080';
            break;
        case (label =='Safety Equipment'):
            tagClickResponse = '853090';
            break;
    	case (label =='Burglar/ Fire-Alarms'):
            tagClickResponse = '853110';
            break;
        case (label =='Indicator Panels'):
            tagClickResponse = '853120';
            break;
        case (label =='Sound & Visual Signaling'):
            tagClickResponse = '853180';
            break;
    	case (label =='Aluminum Fixed'):
            tagClickResponse = '853222';
            break;
        case (label =='Ceramic Single Layer'):
            tagClickResponse = '853223';
            break;
        case (label =='Ceramic Multi Layer'):
            tagClickResponse = '853224';
            break;
        case (label =='Adjustable Capacitors'):
            tagClickResponse = '853230';
            break;
        case (label =='Capacitor Parts'):
            tagClickResponse = '853290';
            break;
    	case (label =='Carbon Fixed'):
            tagClickResponse = '853310';
            break;
        case (label =='20W Fixed'):
            tagClickResponse = '853321';
            break;
        case (label =='Over 20W'):
            tagClickResponse = '853329';
            break;
        case (label =='Wirewound'):
            tagClickResponse = '853331';
            break;
        case (label =='Polyethelyne Bags'):
            tagClickResponse = '630533';
            break;
        case (label =='Textile Bags'):
            tagClickResponse = '630539';
            break;
        case (label =='Leather Suitcases'):
            tagClickResponse = '420211';
            break;
        case (label =='Plastic Suitcases'):
            tagClickResponse = '420212';
            break;
        case (label =='Vanity Cases'):
            tagClickResponse = '420219';
            break;
        case (label =='Coin Operated Games'):
            tagClickResponse = '950430';
            break;
        case (label =='Tricycles, Scooters'):
            tagClickResponse = '950300';
            break;
        case (label =='Billiard Accessories'):
            tagClickResponse = '950420';
            break;
        case (label =='Playing Cards'):
            tagClickResponse = '950440';
            break;
        case (label =='Video Game Console'):
            tagClickResponse = '950450';
            break;
        case (label =='Board Games'):
            tagClickResponse = '950490';
            break;
        case (label =='Christmas Art'):
            tagClickResponse = '950510';
            break;
        case (label =='Carnival Accessories'):
            tagClickResponse = '950590';
            break;
        case (label =='Table Tennis Equipment'):
            tagClickResponse = '950640';
            break;
        case (label =='Badminton/ Tennis Rackets'):
            tagClickResponse = '950651';
            break;
        case (label =='Ice & Roller Skates'):
            tagClickResponse = '950670';
            break;
        case (label =='Desk'):
            tagClickResponse = '940330';
            break;
        case (label =='Chair'):
            tagClickResponse = '940330';
            break;
        case (label =='Portable Lamps'):
            tagClickResponse = '851310';
            break;
        case (label =='Textile Posters'):
            tagClickResponse = '590500';
            break;
        case (label =='Office Furniture'):
            tagClickResponse = '940330';
            break;
        case (label =='Kitchen Furniture'):
            tagClickResponse = '940340';
            break;
        case (label =='Bedroom Furniture'):
            tagClickResponse = '940350';
            break;
        
        case(label =='Of Plastic'):
        tagClickResponse = '940370';
        break;
        case(label =='Of Bamboo'):
        tagClickResponse = '940382';
        break;
        case(label =='Of Rattan'):
        tagClickResponse = '940383';
        break;
        case(label =='Bed Sheets'):
        tagClickResponse = '481890';
        break;
        case(label =='Knitted'):
        tagClickResponse = '630210';
        break;
        case(label =='Cotton Prints'):
        tagClickResponse = '630221';
        break;
        case(label =='Manmade of Fibers'):
        tagClickResponse = '630222';
        break;
        case(label =='Textile Prints'):
        tagClickResponse = '630229';
        break;
        case(label =='Other Bed Linen'):
        tagClickResponse = '630239';
        break;
        case(label =='Pneumatic Mattresse'):
        tagClickResponse = '630640';
        break;
        case(label =='Wool Blankets'):
        tagClickResponse = '630120';
        break;
        case(label =='Travelling Rugs'):
        tagClickResponse = '630190';
        break;
        case(label =='Metal Furniture'):
        tagClickResponse = '940310';
        break;
        case(label =='Fittings'):
        tagClickResponse = '392630';
        break;
        case(label =='Mechanical Watches'):
        tagClickResponse ='910111';
        break;
        case(label =='Automatic Watches without batteries'):
        tagClickResponse = '910121';
        break;
        case(label =='Optical/ Electric'):
        tagClickResponse = '910212';
        break;
        case(label =='Electric Watches'):
        tagClickResponse = '910191';
        break;
        case(label =='Electric Clocks'):
        tagClickResponse = '910310';
        break;
        case(label =='Electric Clocks without batteries'):
        tagClickResponse = '910390';
        break;
        case(label =='Electric Alarm Clocks'):
        tagClickResponse = '910511';
        break;
        case(label =='Non-Electric Alarm Clocks'):
        tagClickResponse = '910519';
        break;
        case(label =='Electric Wall Clocks'):
        tagClickResponse = '910521';
        break;
        case(label =='Non-Electric Wall Clocks '):
        tagClickResponse ='910529';
        break;
        case(label =='Time Registers/ Records'):
        tagClickResponse = '910610';
        break;
        case(label =='Precious Metals'):
        tagClickResponse = '911110';
        break;
        case(label =='Gold/ Silver Plated'):
        tagClickResponse = '911120';
        break;
        case(label =='Other Cases'):
        tagClickResponse = '911180';
        break;
        case(label =='Parts (Any Material) '):
        tagClickResponse ='911190';
        break;
        case(label =='Metal Bands'):
        tagClickResponse = '911320';
        break;
        case(label =='Non-Metal Bands'):
        tagClickResponse = '911390';
        break;
    	case(label =='Springs'):
        tagClickResponse = '911410';
        break;
        case(label =='Dials'):
        tagClickResponse = '911430';
        break;
        case(label =='Plates/ Bridges'):
        tagClickResponse = '911440';
        break;
        case(label =='Other Watch Parts'):
        tagClickResponse = '911490';
        break;
        

        default:
            tagClickResponse = 'error';
            break;

    }


    //tagClickResponse.trim();
    console.log(tagClickResponse); //
}

/////////////////////////

server.listen(process.env.PORT, function(){
    console.log('HSCODESYS server started');
})



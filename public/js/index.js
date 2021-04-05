var DecisionTree = require('decision-tree');
var data = require('./hsDataset.json');

function codeAllocation(){

    var test_data2 = [
        {"chapter": "01", "heading": "0105", "category": "Live animals", "description": "TURKEYS, DUCKS, GEESE, GUINEA FOWLS, LIVE, OV 185G", "subheading":"010599"},
        {"chapter": "02", "heading": "0205", "category": "Meat and edible meat offal", "description": "MEAT OF HORSES, ASSES, MULES, HINNIES FR, CHLD, FZ", "subheading":"020500"},
        {"chapter": "03", "heading": "0301", "category": "Fish and crustaceans, molluscs and other aquatic invertebrates", "description": "SOUTHERN BLUEFIN TUNAS (THUNNUS MACCOYII), LIVE", "subheading":"030195"},
        {"chapter": "04", "heading": "0407", "category": "Dairy produce; birds eggs; natural honey; edible products of animal origin, not elsewhere specified or included", "description": "EGGS OF BIRDS, FRESH, NESOI", "subheading":"040729"}
    ];

    var class_name = "description";

    var features = ["chapter", "subheading"];

    var dt = new DecisionTree(data, class_name, features);

    let inputValue = document.getElementById('hs').value;
    var ch = inputValue.substring(0,2);
    var sh = inputValue;

    var predicted_class = dt.predict({
        chapter: ch,
        subheading: sh
    });

    var accuracy = dt.evaluate(test_data2);

    console.log(predicted_class);
    console.log(accuracy);

}



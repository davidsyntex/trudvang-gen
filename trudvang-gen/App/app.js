﻿"use strict";

// Robot Class
/*
function Robot() {
    var robot = {};
    var helper = new Helper();
    var data = {};
    robot.ProgramPoints = 10;
    robot.TotalaStats = {};
    robot.Name = "ROBiTiCA";
    robot.Model = {};
    robot.Modules = [];
    // Public functions
    this.Robot = function(dataStoreService) {
        data = {};
        data.Robot = dataStoreService.getRobot();
    };
    // Priviliged functions
    this.GetRandomRobot = function() {
        robot.Head = getRandomHead();
        robot.Torso = getRandomTorso();
        robot.Leg = getRandomLeg();

        robot.Model = getRandomStartModel();
        robot.SecondaryFunctions = [];
        robot.SecondaryFunctions[0] = getFirstSecondaryFunction();

        for (var i = 0; i < helper.GetRandomInt(1, 3); i++) {
            robot.SecondaryFunctions.push(getRandomSecondaryFunction());
        }
        robot.Modules = [];
        robot.FakeModules = 0;

        robot.Programs = data.Robot.Programs.slice();
        robot.Programs.push(robot.Model.SpecialProgram);
        generateProgramValues();

        calculateStats();
        addFakeModule();
        robot.Modules = getRandomModules(robot.TotalaStats.MOD);
        createDisplayTexts();
        return robot;
    };

    // Private functions
    function getRandomHead() {
        return data.Robot.Heads[helper.GetRandomInt(0, data.Robot.Heads.length)];
    }

    function getRandomTorso() {
        return data.Robot.Torsos[helper.GetRandomInt(0, data.Robot.Torsos.length)];
    };

    function getRandomLeg() {
        return data.Robot.Legs[helper.GetRandomInt(0, data.Robot.Legs.length)];
    }

    function getRandomStartModel() {
        var model = {};
        var randomStartModell = data.Robot.StartModels[helper.GetRandomInt(0, data.Robot.StartModels.length)];
        model.Name = randomStartModell.Name;

        model.Colour = randomStartModell.Colour[helper.GetRandomInt(0, randomStartModell.Colour.length)];
        model.Features = randomStartModell.Features[helper.GetRandomInt(0, randomStartModell.Features.length)];
        model.Voice = helper.GetTwoRandomStrings(randomStartModell.Voice, "och");
        model.Personality = randomStartModell
            .Personality[helper.GetRandomInt(0, randomStartModell.Personality.length)];
        model.SecondaryFunctions = data.Robot.SecondaryFunctions[model.Name];
        model.Artifacts = randomStartModell.Artifacts;
        model.Hiearchy = randomStartModell.Hiearchy;
        model.SpecialProgram = randomStartModell.SpecialProgram;

        return model;
    }

    function generateProgramValues() {
        robot.ProgramPoints = 10;

        robot.Programs.forEach(function(program) {
            program.Value = 0;
        });
        robot.Programs[robot.Programs.length - 1].Value = 1;
        robot.ProgramPoints -= 1;

        var random;
        while (robot.ProgramPoints > 0) {
            random = helper.GetRandomInt(0, robot.Programs.length);
            if (robot.Programs[random].Value < 3) {
                robot.Programs[random].Value += 1;
                robot.ProgramPoints -= 1;
            }
        }
    }

    function getFirstSecondaryFunction() {
        return data.Robot.SecondaryFunctions[robot.Model
            .Name][helper.GetRandomInt(0, data.Robot.SecondaryFunctions[robot.Model.Name].length)];
    }

    // Returns a random and unique Secondary Function from either the Models SFs or General SFs
    function getRandomSecondaryFunction() {
        var secondaryFunction = {};
        var hasNotFoundUnique = true;

        var listOfFunctions = robot.Model.SecondaryFunctions.slice();
        listOfFunctions.push.apply(listOfFunctions, data.Robot.SecondaryFunctions.Allmänna);

        while (hasNotFoundUnique === true) {
            secondaryFunction = listOfFunctions[helper.GetRandomInt(0, listOfFunctions.length)];

            if (!robot.SecondaryFunctions.includes(secondaryFunction)) {
                hasNotFoundUnique = false;
            }
        }

        return secondaryFunction;
    }

    function getRandomModules(numberOfModules) {
        var moduleList = robot.Modules.slice();
        for (var i = 0; i < numberOfModules; i++) {
            var module = data.Robot.Modules[helper.GetRandomInt(0, data.Robot.Modules.length)];
            while (helper.Contains(moduleList, module)) {
                module = data.Robot.Modules[helper.GetRandomInt(0, data.Robot.Modules.length)];
            }
            if (i >= numberOfModules - 1 && robot.FakeModules === 1) {
                module.Name += " (Attrapp)";
            }

            moduleList.push(module);
        }
        return moduleList;
    }

    function calculateStats() {
        robot.TotalaStats.SRV = 0;
        robot.TotalaStats.STB = 0;
        robot.TotalaStats.PRC = 0;
        robot.TotalaStats.NTV = 0;
        robot.TotalaStats.MOD = 0;
        robot.TotalaStats.SKYDD = 0;
        robot.TotalaStats.Hiearchy = 0;
        robot.TotalaStats.Belastning = 0;

        robot.TotalaStats.SRV = robot.Head.SRV + robot.Torso.SRV + robot.Leg.SRV;
        robot.TotalaStats.STB = robot.Head.STB + robot.Torso.STB + robot.Leg.STB;
        robot.TotalaStats.PRC = robot.Head.PRC + robot.Torso.PRC + robot.Leg.PRC;
        robot.TotalaStats.NTV = robot.Head.NTV + robot.Torso.NTV + robot.Leg.NTV;
        robot.TotalaStats.MOD = robot.Head.MOD + robot.Torso.MOD + robot.Leg.MOD;
        robot.TotalaStats.SKYDD = robot.Head
            .SKYDD +
            robot.Torso.SKYDD +
            robot.Leg.SKYDD;

        robot.TotalaStats.Hiearchy = robot.Model.Hiearchy;
        robot.TotalaStats.Belastning = robot.TotalaStats.SRV * 2;

        robot.SecondaryFunctions.forEach(function(element) {
            if (element.hasOwnProperty("Options")) {
                if (element.Options.hasOwnProperty("Attribute")) {
                    robot.TotalaStats[element.Options.Attribute] += element.Options.Value;
                }
            }
        });

        robot.SecondaryFunctions.forEach(function(element) {
            if (element.hasOwnProperty("Options")) {
                if (element.Options.Attribute === "Belastning") {
                    robot.TotalaStats.Belastning = robot.TotalaStats.SRV * element.Options.Value;
                }
            }
        });
    }

    function addFakeModule() {
        robot.SecondaryFunctions.forEach(function(element) {
            if (element.hasOwnProperty("Options") && element.Options.hasOwnProperty("Module")) {
                if (element.Options.Module === "Fake") {
                    robot.TotalaStats.MOD += 1;
                    robot.FakeModules = 1;
                }
            }
        });
    }

    function createDisplayTexts() {
        robot.Name = getRandomName();
        robot.CodeName = getRandomCodeName();
        generateDescription();

    };

    function generateDescription() {
        robot.Description = helper.Capitalize(robot.Head.BESKRIVNING) +
            " med " +
            robot.Torso.BESKRIVNING +
            " och " +
            robot.Leg.BESKRIVNING +
            ".";
    };

    function getRandomName() {
        var name = generate_name("robot");
        if (name.charAt(name.lastIndex) === "-") {
            name.slice(0, -1);
        }
        return name;
    }

    function getRandomCodeName() {
        return helper.GetRandomLetter() +
            helper.GetRandomLetter() +
            helper.GetRandomLetter() +
            helper.GetRandomInt(0, 9) +
            helper.GetRandomInt(0, 9) +
            helper.GetRandomInt(0, 9);
    }

    return this;
}

function Thing() {
    var thing = {};
    var helper = new Helper();
    var data = {};

    this.SetData = function(dataStoreService) {
        data = dataStoreService.getItemsData();
        data.Sources = getSources();
        thing.SelectedSources = data.Sources.slice();
        data.Types = ["Artefakt", "Skrot"];
    };
    this.GetTypes = function() {
        return data.Types.slice();
    };
    this.GetSources = function() {
        return data.Sources.slice();
    };
    this.GetRandomThing = function(selectedSources, selectedTypes) {
        var filteredList = getFilteredListOfThings(selectedSources, selectedTypes);

        if (filteredList.length <= 0) {
            return -1;
        }
        var randomThing = filteredList[helper.GetRandomInt(0, filteredList.length)];

        if (randomThing.hasOwnProperty("effect")) {
            if (angular.isString(randomThing.effect)) {
                randomThing.effect = helper.GetHtmlOutput(randomThing.effect);
            }
        }


        return randomThing;
    };

    function getFilteredListOfThings(selectedSources, selectedTypes) {
        var filtered = [];
        for (var type in data) {
            if (data.hasOwnProperty(type)) {
                var items = data[type];
                for (var item in items) {
                    if (items.hasOwnProperty(item)) {
                        if (helper.Contains(selectedSources, items[item].source) &&
                            helper.Contains(selectedTypes, items[item].type)) {
                            filtered.push(items[item]);
                        }
                    }
                }
            }
        }
        return filtered;
    };

    function getSources() {
        var sources = [];
        for (var type in data) {
            if (data.hasOwnProperty(type)) {
                data[type].forEach(function(element, index, array) {
                    if (!helper.Contains(sources, element.source)) {
                        sources.push(element.source);
                    }
                });
            }
        }
        return sources;
    }

    return this;
}*/

/*function Danger() {
    var danger = {};
    var helper = new Helper();
    var data = {};
    var self = this;
    var dss;

    this.SetData = function(dataStoreService) {
        dss = dataStoreService;

        data = dss.getFarorData();

        data.General = dss.getGeneral();
    };
    this.GetAll = function() {
        return data.faror.slice();
    };
    this.GetSpecificDanger = function(name) {
        var search = helper.FindWithAttr(data.faror, "name", name);
        if (search === -1) {
            return {};
        }
        var dataDanger = data.faror[search];
        danger = {};
        danger.Name = dataDanger.name;
        danger.Description = dataDanger.description;
        danger.Image = dataDanger.image;
        danger.Weapons = [];

        var stats = getStats(dataDanger);

        danger.Inline = stats.inline.slice();
        danger.BlockValues = stats.blockValue.slice();
        danger.Block = stats.block.slice();

        if (dataDanger.hasOwnProperty("functions")) {
            dataDanger.functions.forEach(function(func) {
                var funcString = "_" + func.function;
                if (angular.isFunction(self[funcString])) {
                    self[funcString]();
                }
            });
        }

        for (var blockKey in danger.Block) {
            if (danger.Block.hasOwnProperty(blockKey)) {
                if (danger.Block[blockKey].hasOwnProperty("properties")) {
                    var properties = danger.Block[blockKey].properties;

                    getWeapons(properties);

                    if (Array.isArray(properties) && properties != null) {
                        for (var i = 0; i < properties.length; i++) {
                            if (angular.isString(properties[i])) {

                            }
                        }
                    }
                }
            }

        };

        return danger;
    };
    this.GetRandomRobot = function(robotService) {
        robotService.Robot(dss);
        var robot = robotService.GetRandomRobot();

        danger = {};
        danger.Name = robot.Name + " - " + robot.CodeName;
        danger.Description = robot.Description;
        danger.Image = [
            {
                "path": robot.Head.BILD,
                "offSet": 0,
                "zIndex": 4
            }, {
                "path": robot.Torso.BILD,
                "offSet": robot.Torso.HEADOFFSET,
                "zIndex": 3
            }, {
                "path": robot.Leg.BILD,
                "offSet": robot.Torso.LEGOFFSET,
                "zIndex": 1
            }
        ];
        var stats = convertRobotStats(robot);
        danger.Inline = stats.inline.slice();
        danger.BlockValues = stats.blockValue.slice();
        danger.Block = stats.block.slice();

        if (danger.Block.things != null) {
            danger.Weapons = getWeapons();
        }
        return danger;
    };
    this.GetZoneDangerName = function(type) {

    };

    function getStats(chosenDanger) {
        var stats = {
            "inline": [],
            "blockValue": [],
            "block": []
        };

        if (chosenDanger.hasOwnProperty("statBlock")) {

            chosenDanger.statBlock.forEach(function(stat) {
                if (stat.hasOwnProperty("type")) {
                    switch (stat.type) {
                    case "inline":
                        stat.description = helper.GetHtmlOutput(stat.description);
                        stats.inline.push(stat);
                        break;

                    case "blockValue":
                        stat.description = helper.GetHtmlOutput(stat.description);
                        stats.blockValue.push(stat);
                        break;

                    case "block":
                        stat.description = helper.GetHtmlOutput(stat.description);
                        stats.block.push(stat);
                        break;
                    default:
                        break;
                    }
                }
            });
        }

        return stats;
    };

    // Takes a String array and compares it to the weapons data
    function getWeapons(list) {
        var weaponNames = [];
        data.General.weapons.forEach(function(weapon) {
            weaponNames.push(weapon.name);
        });

        list.forEach(function(thing) {
            data.General.weapons.forEach(function(weapon) {
                if (weapon.name === thing) {
                    danger.Weapons.push(weapon);
                }

            });
        });
    }

    function convertRobotStats(robot) {
        var stats = {
            "inline": [],
            "blockValue": [],
            "block": []
        };

        var stat = {
            "name": "Huvud: " + robot.Head.NAMN,
            "type": "inline",
            "description": robot.Head.BESKRIVNING,
            "properties": {
                "srv": robot.Head.SRV,
                "stb": robot.Head.STB,
                "prc": robot.Head.PRC,
                "ntv": robot.Head.NTV,
                "skydd": robot.Head.SKYDD
            }
        };
        stats.inline.push(stat);

        stat = {
            "name": "Bål: " + robot.Torso.NAMN,
            "type": "inline",
            "description": robot.Torso.BESKRIVNING,
            "properties": {
                "srv": robot.Torso.SRV,
                "stb": robot.Torso.STB,
                "prc": robot.Torso.PRC,
                "ntv": robot.Torso.NTV,
                "skydd": robot.Torso.SKYDD
            }
        };
        stats.inline.push(stat);

        stat = {
            "name": "Underrede: " + robot.Leg.NAMN,
            "type": "inline",
            "description": robot.Leg.BESKRIVNING,
            "properties": {
                "srv": robot.Leg.SRV,
                "stb": robot.Leg.STB,
                "prc": robot.Leg.PRC,
                "ntv": robot.Leg.NTV,
                "skydd": robot.Leg.SKYDD
            }
        };
        stats.inline.push(stat);

        stat = {
            "name": "Grundegenskaper: ",
            "type": "inline",
            "description": "",
            "properties": {
                "srv": robot.TotalaStats.SRV,
                "stb": robot.TotalaStats.STB,
                "prc": robot.TotalaStats.PRC,
                "ntv": robot.TotalaStats.NTV,
                "skydd": robot.TotalaStats.SKYDD,
                "Moduler": robot.TotalaStats.MOD
            }
        };
        stats.inline.push(stat);

        var skills = {};
        robot.Programs.forEach(function(program, index, array) {
            var string = array[index].Name + " (" + array[index].Attribute + ")";
            skills[string] = array[index].Value;
        });
        stat = {
            "name": "Program",
            "type": "blockValue",
            "description": "",
            "properties": skills
        };
        stats.blockValue.push(stat);

        var modules = [];
        robot.Modules.forEach(function(module, index, array) {
            modules.push(helper.Capitalize(array[index].Name));
        });
        stat = {
            "name": "Moduler",
            "type": "block",
            "description": "",
            "properties": modules
        };
        stats.block.push(stat);

        var secondaryFunctions = [];
        robot.SecondaryFunctions.forEach(function(secondaryFunction, index, array) {
            secondaryFunctions.push(helper.Capitalize(array[index].Name));
        });
        stat = {
            "name": "Sekundärfunktioner",
            "type": "block",
            "description": "",
            "properties": secondaryFunctions
        };
        stats.block.push(stat);

        stat = {
            "name": "Information",
            "type": "inline",
            "description": "",
            "properties": {
                "Modell": robot.Model.Name,
                "Färg": robot.Model.Colour,
                "Röst": robot.Model.Voice,
                "Kännetecken": robot.Model.Features,
                "Personlighet": robot.Model.Personality,
                "Hierarki": robot.TotalaStats.Hiearchy
            }
        };
        stats.inline.unshift(stat);

        return stats;
    }

    // Danger Funcs
    //function _CalcArmour() {
    this._CalcArmour = function() {
        var skydd = 0;
        var propSkydd = [];
        danger.Inline.forEach(function(element) {
            if (element.hasOwnProperty("properties")) {
                if (element.properties.hasOwnProperty("skydd")) {
                    skydd += element.properties.skydd;
                }
            }
        });

        propSkydd.push(skydd);

        var skyddsObjekt = {
            "name": "Skydd",
            "type": "block",
            "description": "",
            "properties": propSkydd
        };
        danger.Block.push(skyddsObjekt);
    };
    this._CalcAttributes = function() {
        var attributes = {
            "srv": 0,
            "stb": 0,
            "prc": 0,
            "ntv": 0
        };
        danger.Inline.forEach(function(element) {
            if (element.hasOwnProperty("properties")) {
                if (element.properties.hasOwnProperty("srv")) {
                    attributes.srv += element.properties.srv;
                }
                if (element.properties.hasOwnProperty("stb")) {
                    attributes.stb += element.properties.stb;
                }
                if (element.properties.hasOwnProperty("prc")) {
                    attributes.prc += element.properties.prc;
                }
                if (element.properties.hasOwnProperty("ntv")) {
                    attributes.ntv += element.properties.ntv;
                }
            }
        });
        var attributesObjekt = {
            "name": "Grundegenskaper",
            "description": "",
            "properties": attributes
        };
        danger.Inline.push(attributesObjekt);
    };

    return this;
}*/

function DataStore() {
    var data = {};
    var currentLanguage = "en";

    var observerCallbacks = [];

    if (typeof window.nameData !== "undefined" || window.nameData !== null) {
        data.Names = window.nameData;
    }
    this.getNameData = function() {
        return angular.copy(data.Names);
    };

    //register an observer
    this.registerObserverCallback = function(callback) {
        observerCallbacks.push(callback);
    };

    //call this when you know 'foo' has been changed
    var notifyObservers = function() {
        angular.forEach(observerCallbacks,
            function(callback) {
                callback();
            });
    };

    this.SetCurrentLanguage = function(key) {
        currentLanguage = key;
        notifyObservers();
    };

    this.GetCurrentLanguage = function() {
        return currentLanguage;
    };
    return this;
}

function Name() {
    var helper = new Helper();
    //var self = this;
    var dss;
    var data = {};
    this.SetData = function(dataStoreService) {
        dss = dataStoreService;
        data = dss.getNameData();
    };
    var lastNames = {};
    this.GetRandomNames = function(language, people, numberOfNames) {
        people = people.toLowerCase();
        var names = {};
        var name;

        if (people === "troll") {
            names.troll = [];
            for (var i = 0; i < numberOfNames; i++) {
                name = helper.GetRandomFromList(data[language].people.troll.prefix) +
                    helper.GetRandomFromList(data[language].people.troll.suffix);

                name = helper.Capitalize(name);
                names.troll.push(name);
            }
        }

        if (data[language].people[people].suffix.hasOwnProperty("male")) {
            names.male = [];
            for (var j = 0; j < numberOfNames; j++) {
                name = helper.GetRandomFromList(data[language].people[people].prefix) +
                    helper.GetRandomFromList(data[language].people[people].suffix.male);

                name = helper.Capitalize(name);
                names.male.push(name);
            }

        }
        if (data[language].people[people].suffix.hasOwnProperty("female")) {
            names.female = [];
            for (var k = 0; k < numberOfNames; k++) {
                name = helper.GetRandomFromList(data[language].people[people].prefix) +
                    helper.GetRandomFromList(data[language].people[people].suffix.female);

                name = helper.Capitalize(name);
                names.female.push(name);
            }
        }

        return names;
    };
  
    this.GetRandomLastNames = function(language, type, numberOfNames) {
        type = type.toLowerCase();
        
        var name;
        // HEROIC
        if (type === "heroic") {
            lastNames[type] = [];
            if (data[language].people.lastnames[type].hasOwnProperty("prefix") &&
                data[language].people.lastnames[type].hasOwnProperty("suffix")) {
                //suffixLength.male = data.people[people].suffix.male.length;
                
                for (var j = 0; j < numberOfNames; j++) {
                    name = helper.GetRandomFromList(data[language].people.lastnames[type].prefix) +
                        helper.GetRandomFromList(data[language].people.lastnames[type].suffix);

                    name = helper.Capitalize(name);
                    lastNames[type].push(name);
                }

            }
        }
        // LINEAGE
        if (type === "lineage") {
            lastNames[type] = [];
            var markovg = new markov(3, 12);
            var lines = data[language].people.lastnames.lineage;

            for (var i = 0; i < lines.length; i++) {
                markovg.feed(lines[i]);
            }

            for (var k = 0; k < numberOfNames; k++) {
                name = markovg.generate();
                lastNames[type].push(name);
            }
        }
        if (type === "peasant") {
            lastNames[type] = [];
   
            for (var l = 0; l < numberOfNames; l++) {
                var choice = helper.GetRandomInt(0, 2);
                if (choice === 0) {
                    name = helper.GetRandomFromList(data[language].people.lastnames[type].profession);
                } else {
                    name = helper.GetRandomFromList(data[language].people.lastnames[type].nickname);
                }
                lastNames[type].push(name);
            }
            
        }
        console.log(lastNames);
        return lastNames;
    };

    this.GetRandomPlaceNames = function(language, type, numberOfNames) {
        type = type.toLowerCase();
        var names = [];
        var name;
        for (var i = 0; i < numberOfNames; i++) {
            name = helper.GetRandomFromList(data[language].place[type].prefix) +
                data[language].nameSpacer +
                helper.GetRandomFromList(data[language].place[type].suffix);
            name = helper.Capitalize(name);
            names.push(name);
        }
        return names;
    };
    this.GetRandomThingNames = function(language, type, numberOfNames) {
        type = type.toLowerCase();
        var names = [];
        var name;
        var hasAlone = data[language].thing[type].hasOwnProperty("alone");
        var isAle = (type === "ale");
        console.log(isAle);
        for (var i = 0; i < numberOfNames; i++) {
            if (hasAlone && helper.GetRandomInt(0, 5) === 0) {
                name = helper.GetRandomFromList(data[language].thing[type].alone);
            } else {
                var prefix = helper.GetRandomFromList(data[language].thing[type].prefix);
                var suffix = helper.GetRandomFromList(data[language].thing[type].suffix);

                if (isAle && prefix === "people") {
                    var randomPeople = helper.GetRandomFromList(["mittlander", "dwarf", "stormlander", "virann"]);
                    prefix = this.GetRandomNames(language, randomPeople, 1);
                    console.log(prefix);
                    if (helper.GetRandomInt(0, 2) === 0 && prefix.hasOwnProperty("female")) {
                        prefix = prefix.female[0] + data[language].plural;
                    } else {
                        prefix = prefix.male[0] + data[language].plural;
                    }
                }

                name = prefix + data[language].nameSpacer + suffix;
            }

            name = helper.Capitalize(name);
            names.push(name);
        }
        return names;
    };

    function markov(n1, max1) {
        var self = this;
        // Order (or length) of each ngram
        var n = n1;
        // What is the maximum amount we will generate?
        var max = max1;
        // An object as dictionary
        // each ngram is the key, a list of possible next elements are the values
        var ngrams = {};
        // A separate array of possible beginnings to generated text
        var beginnings = [];
        this.beg = function ()
        {
            return ngrams;
        }
        // A function to feed in text to the markov chain
        this.feed = function(text) {

            // Discard this line if it's too short
            if (text.length < this.n) {
                return false;
            }

            // Store the first ngram of this line
            var beginning = text.substring(0, n);
            // Is this a new one?
            if (!helper.Contains(beginnings, beginning)) {
                beginnings.push(beginning);
            }

            // Now let's go through everything and create the dictionary
            for (var i = 0; i < text.length - n; i++) {
                var gram = text.substring(i, i + n);
                var next = text.charAt(i + n);
                // Is this a new one?
                if (!ngrams.hasOwnProperty(gram)) {
                    ngrams[gram] = [];
                }
                // Add to the list
                ngrams[gram].push(next);
            }
        };

        // Generate a text from the information ngrams
        this.generate = function() {

            // Get a random  beginning 
            var current = helper.GetRandomFromList(beginnings);
            var output = current;

            // Generate a new token max number of times
            for (var i = 0; i < max; i++) {
                // If this is a valid ngram
                if (ngrams.hasOwnProperty(current)) {
                    // What are all the possible next tokens
                    var possibleNext = ngrams[current];
                    // Pick one randomly
                    var next = helper.GetRandomFromList(possibleNext);
                    // Add to the output
                    output += next;
                    // Get the last N entries of the output; we'll use this to look up
                    // an ngram in the next iteration of the loop
                    current = output.substring(output.length - n, output.length);
                    
                } else {
                    break;
                }
            }
            // Here's what we got!
            return output;
        };
    }

    return this;
}

var app = angular.module("trudvangHelper", ["ngSanitize", "pascalprecht.translate"]);

app.config([
    "$translateProvider", function($translateProvider/*, DataStoreService*/) {
        //var dss = DataStoreService;
        $translateProvider.translations("en",
        {
            "changeLanguage": "Language",
            "frontpage": {
                "description": "Tools for Game Masters and Players!"
            },
            "namegen": {
                "title": "Character Names",
                "description":
                    "Generate names for PCs and NPCs. The names are generated from prefix and suffix released by RiotMinds. Later on names could be generated with Markov Chains to produce even more random names. Right now the lineage names are generated with Markov Chains.",
                "people": {
                    "title": "People",
                    "maleNameString": " male names",
                    "femaleNameString": " female names",
                    "trollNameString": " names",
                    "stormlander": {
                        "button": "Stormlander",
                        "title": "Stormlandish"
                    },
                    "mittlander": {
                        "button": "Mittlander",
                        "title": "Mittlandish"
                    },
                    "virann": {
                        "button": "Virann",
                        "title": "Viranni"
                    },
                    "elf": {
                        "button": "Elf",
                        "title": "Elven"
                    },
                    "dwarf": {
                        "button": "Dwarf",
                        "title": "Dwarven"
                    },
                    "troll": {
                        "button": "Troll",
                        "title": "Trollish"
                    }
                },
                "lastnames": {
                    "title": "Surnames, epithets and lineages",
                    "description": "I need help with more names!",
                    "heroic": "Heroic",
                    "lineage": "Lineage",
                    "peasant": "Peasant"
                }

            },
            "placenamegen": {
                "title": "Place Names",
                "description":
                    "Generate names for places and landscapes.",
                "place": {
                    "nameString": " names",
                    "civilization": {
                        "title": "Civilization",
                        "town": "Town",
                        "tavern": "Tavern"
                    },
                    "terrain": {
                        "title": "Terrain",
                        "river": "River",
                        "mountain": "Mountain",
                        "lake": "Lake"
                    }

                }
            },
            "thingnamegen": {
                "title": "Thing Names",
                "description":
                    "Generate names for objects. Ship name inspiration taken from Rudolf Simek's article <a href='http://ssns.org.uk/resources/Documents/NorthernStudies/Vol13/Simek_1979_Vol_13_pp_26_36.pdf'>Old norse ship names and ship terms</a>.",
                "nameString": " names",
                "misc": {
                    "title": "Miscellaneous",
                    "plant": "Plant",
                    "ale": "Ale",
                    "horse": "Horse"
                },
                "items": {
                    "title": "Items",
                    "weapon": "Weapon",
                    "relic": "Ancient relics",
                    "ship": "Ship"
                }
            }
        });

        $translateProvider.translations("sv",
        {
            "changeLanguage": "Språk",
            "frontpage": {
                "description": "Verktyg för Spelledare och spelare!"
            },
            "namegen": {
                "title": "Karaktärsnamn",
                "description":
                    "Skapa namn för rollpersoner och spelledarpersoner. Namnen skapas från prefix och suffix släppta av RiotMinds. Planer att skapa namn med hjälp av Markovkedjor för att skapa mer slumpartade namn.",
                "people": {
                    "title": "Folkslag",
                    "maleNameString": " mansnamn",
                    "femaleNameString": " kvinnonamn",
                    "trollNameString": " namn",
                    "stormlander": {
                        "button": "Stormländare",
                        "title": "Stormländska"
                    },
                    "mittlander": {
                        "button": "Mittländare",
                        "title": "Mittländska"
                    },
                    "virann": {
                        "button": "Virann",
                        "title": "Viranniska"
                    },
                    "elf": {
                        "button": "Alf",
                        "title": "Alfiska"
                    },
                    "dwarf": {
                        "button": "Dvärg",
                        "title": "Dvärgiska"
                    },
                    "troll": {
                        "button": "Troll",
                        "title": "Trolliska"
                    }
                },
                "place": {
                    "title": "Plats och saker",
                    "nameString": "namn",
                    "town": "By",
                    "tavern": "Värdshus",
                    "plant": "Växt"
                }
            }
        });
        $translateProvider.translations("es",
        {
            "frontpage": {
                "description": "Herramientas para maestros de juego y los jugadores!"
            }
        });
        $translateProvider.translations("fr",
        {
            "frontpage": {
                "description": "Outils pour Masters et joueurs de jeux!"
            }
        });

        $translateProvider.preferredLanguage("en");
    }
]);

app.controller("appController",
[
    "$scope", "$translate", "DataStoreService", function($scope, $translate, DataStoreService) {
        var dss = DataStoreService;
        $scope.Links = [
            {
                name: "Character names",
                path: "namegen.html"
            }, {
                name: "Place names",
                path: "placenamegen.html"
            }, {
                name: "Thing names",
                path: "thingnamegen.html"
            }
        ];
        $scope.changeLanguage = function(langKey) {
            $translate.use(langKey);
            dss.SetCurrentLanguage(langKey);
        };
    }
]);
app.controller("nameController",
[
    "$scope", "DataStoreService", "NameService", function($scope, DataStoreService, NameService) {
        var helper = new Helper();
        var nameService = NameService;
        nameService.SetData(DataStoreService);

        var dss = DataStoreService;

        $scope.selectedLanguage = "en";

        $scope.Names = {};
        $scope.SelectedPeopleName = "";
        $scope.LastNames = {};
        $scope.SelectedLastName = "";
        $scope.PlaceNames = {};
        $scope.SelectedPlaceName = "";
        $scope.ThingNames = {};
        $scope.SelectedThingName = "";

        var updateSelectedLanguage = function() {
            $scope.selectedLanguage = dss.GetCurrentLanguage();
        };
        dss.registerObserverCallback(updateSelectedLanguage);

        $scope.GenerateName = function(people) {
            $scope.SelectedPeopleName = helper.Capitalize(people);
            $scope.Names = nameService.GetRandomNames($scope.selectedLanguage, people, 10);
        };
        $scope.GenerateLastName = function(type) {
            $scope.SelectedLastName = helper.Capitalize(type);
            $scope.LastNames = nameService.GetRandomLastNames($scope.selectedLanguage, type, 10);
        };
        $scope.GeneratePlaceName = function(place) {
            $scope.SelectedPlaceName = helper.Capitalize(place);
            $scope.PlaceNames[place] = nameService.GetRandomPlaceNames($scope.selectedLanguage, place, 10);
        };
        $scope.GenerateThingName = function(thing) {
            $scope.SelectedThingName = helper.Capitalize(thing);
            $scope.ThingNames[thing] = nameService.GetRandomThingNames($scope.selectedLanguage, thing, 10);
        };
    }
]);
app.controller("zonenController",
[
    "$scope", "DataStoreService", "ThingService", "DangerService",
    function($scope, DataStoreService, ThingService, DangerService) {
        var helper = new Helper();
        var thingService = ThingService;
        thingService.SetData(DataStoreService);

        var dangerService = DangerService;
        dangerService.SetData(DataStoreService);

        var data = DataStoreService.getZonenData();

        $scope.Zonen = {};
        $scope.Zonen.Threat = {};
        $scope.Zonen.Artifacts = {};

        $scope.RollSector = function() {
            $scope.Zonen.Environment = helper.GetRandomFromListWeigthed(data.environment, "chance");
            if ($scope.Zonen.Environment.hasOwnProperty("ruins")) {
                $scope.Zonen.Ruin = helper.GetRandomFromList(data.ruins[$scope.Zonen.Environment.ruins.toLowerCase()]);
            }

            var random;

            $scope.Zonen.Rot = function() {
                random = helper.RullaT6();
                if (random === 1) {
                    return {
                        "level": 0,
                        "description": "Röt-oas. RP tar inga rötpoäng"
                    };
                } else if (random === 6) {
                    return {
                        "level": 2,
                        "description": "Extra rötdrabbad sektor. En rötpoäng per timme."
                    };
                } else {
                    return {
                        "level": 1,
                        "description": "Typisk zonsektor. RP tar en rötpoäng varje dygn"
                    };
                }
            }();

            var detail = helper.GetRandomFromList(data.details);

            $scope.Zonen.Detail = {};
            $scope.Zonen.Detail.Name = detail.name;
            $scope.Zonen.Detail.Description = detail.description;

            $scope.Zonen.Threat.Level = helper.GetRandomInt(1, 12);
            $scope.Zonen.Artifacts.Amount = 0;
            $scope.Zonen.Threat.Amount = 0;

            for (var i = 0; i < $scope.Zonen.Threat.Level; i++) {
                var t6 = helper.RullaT6();
                if (t6 === 6) {
                    $scope.Zonen.Artifacts.Amount += 1;
                } else if (t6 === 1) {
                    $scope.Zonen.Threat.Amount += 1;
                }
            }

            // DANGERS
            $scope.Zonen.Threat.Dangers = [];
            $scope.Zonen.Threat.Names = [];

            for (var k = 0; k < $scope.Zonen.Threat.Amount; k++) {
                random = helper.RullaT6();
                if (random === 1 || random === 2) {
                    $scope.Zonen.Threat.Names.push(helper.GetRandomFromListWeigthed(data.dangers.humanoider, "chance")
                        .name);
                } else if (random === 6) {
                    $scope.Zonen.Threat.Names.push(helper
                        .GetRandomFromListWeigthed(data.dangers.fenomen, "chance")
                        .name);
                } else {
                    $scope.Zonen.Threat.Names.push(helper
                        .GetRandomFromListWeigthed(data.dangers.monster, "chance")
                        .name);
                }
            }

            for (var l = 0; l < $scope.Zonen.Threat.Names.length; l++) {
                $scope.Zonen.Threat.Dangers.push(dangerService.GetSpecificDanger($scope.Zonen.Threat.Names[l]));
            }

            // ARTIFACTS
            var artifacts = [];

            for (var j = 0; j < $scope.Zonen.Artifacts.Amount; j++) {
                var artifact = thingService.GetRandomThing(["Maskinarium", "År Noll", "Genlab Alfa"], ["Artefakt"]);

                while (artifacts.indexOf(artifact) > -1) {
                    artifact = thingService.GetRandomThing(["Maskinarium", "År Noll", "Genlab Alfa"], ["Artefakt"]);
                }
                artifacts.push(artifact);
            }

            $scope.Zonen.Artifacts.Things = artifacts;
        };


    }
]);
app.controller("prylarController",
[
    "$scope", "DataStoreService", "ThingService", function($scope, DataStoreService, ThingService) {
        var thingService = ThingService;
        thingService.SetData(DataStoreService);

        $scope.Things = {};
        $scope.Things.Sources = thingService.GetSources();
        $scope.Things.SelectedSources = $scope.Things.Sources.slice();

        $scope.Things.Types = thingService.GetTypes();
        $scope.Things.SelectedTypes = ["Artefakt", "Skrot"];

        $scope.Things.Filtered = [];
        $scope.Things.RandomList = [];

        $scope.RollArtifacts = function() {

            $scope.Things.RandomList = [];
            $scope.Things.RandomList.push(thingService
                .GetRandomThing($scope.Things.SelectedSources, $scope.Things.SelectedTypes));
        };

        $scope.toggleSelection = function(source) {
            var idx = $scope.Things.SelectedSources.indexOf(source);
            // is currently selected
            if (idx > -1) {
                $scope.Things.SelectedSources.splice(idx, 1);
            }
            // is newly selected
            else {
                $scope.Things.SelectedSources.push(source);
            }
        };
        $scope.toggleTypeSelection = function(type) {
            var idx = $scope.Things.SelectedTypes.indexOf(type);
            // is currently selected
            if (idx > -1) {
                $scope.Things.SelectedTypes.splice(idx, 1);
            }
            // is newly selected
            else {
                $scope.Things.SelectedTypes.push(type);
            }
        };

        ////////// D E V /////////////
        /*
        $scope._dev = {};
        $scope._dev
            .area =
            "KLASERPISTOL\r\nEtt smäckert högteknologiskt skjutvapen \r\nmed enhandsgrepp. Vapnet avlossar en \r\nröd ljusstråle som avger ett fräsande ljud.\r\nEffekt: Lätt vapen med prylbonus +3 på \r\nbeskjutaoch vapenskada 2. Lång räckvidd. \r\nEnergivapen. Elektroniskt föremål. \r\nUN-krav: Tek nologi 70\r\nUN-bonus: Tek nologi +T6";
        $scope._dev.done = "";
        $scope._dev.do = function() {
            var lines = $scope._dev.area.match(/^.*([\n\r]+|$)/gm);
            for (var line in lines) {
                if (lines.hasOwnProperty(line)) {
                    lines[line] = lines[line].replace(/\r\n/g, "");
                    lines[line] = lines[line].replace(/\n/g, "");
                }
            }
            var header = lines[0].slice();
            if (header[0] === "K") {
                header = header.slice(1, header.length);
            }

            lines.shift();

            var effektLine = -1;
            for (var i = 0; i < lines.length; i++) {
                if (lines[i].indexOf("Effekt:") !== -1) {
                    effektLine = i;
                }
            }

            var desc = "";
            for (var j = 0; j < effektLine; j++) {
                desc += lines[j];
                lines.shift();
            }

            var unkravline = -1;
            for (var i2 = 0; i2 < lines.length; i2++) {
                if (lines[i2].indexOf("UN-krav:") !== -1) {
                    unkravline = i2;
                }
            }

            var effekt = "";
            for (var k = 0; k < unkravline - 1; k++) {
                effekt += lines[k];
                lines.shift();
            }
            lines.shift();

            if (lines[0].indexOf("Tek nologi")) {
                lines[0] = lines[0].replace("Tek nologi", "Teknologi");
            }
            if (lines[1].indexOf("Tek nologi")) {
                lines[1] = lines[1].replace("Tek nologi", "Teknologi");
            }

            var obj = {
                "name": header,
                "book": "Maskinarium",
                "description": desc,
                "effect": getHtmlOutput(effekt),
                "unKrav": lines[0],
                "unBonus": lines[1]
            };
            $scope._dev.done = JSON.stringify(obj, null, 4) + ",";
            
        };*/
    }
]);
app.controller("farorController",
[
    "$scope", "RobotService", "DataStoreService", "DangerService",
    function($scope, RobotService, DataStoreService, DangerService) {
        var robotService = RobotService;
        var dangerService = DangerService;
        dangerService.SetData(DataStoreService);


        //data.Faror = DataStoreService.getFaror();
        //data.General = DataStoreService.getGeneral();

        $scope.sortType = "Name"; // set the default sort type
        $scope.sortReverse = false; // set the default sort order
        $scope.searchDanger = {}; // set the default search/filter term
        $scope.filtered = []; // variable to store filtered results

        $scope.$watch("filtered",
            function(newValue) {
                if (newValue.length === 1) {
                    $scope.ShowDanger(newValue[0].name);
                }
            },
            true);

        $scope.Dangers = dangerService.GetAll();
        $scope.ChosenDanger = {};

        $scope.ShowDanger = function(name) {
            $scope.ChosenDanger = dangerService.GetSpecificDanger(name);
        };
        $scope.GetRandomRobot = function() {
            $scope.ChosenDanger = dangerService.GetRandomRobot(robotService);
        };
    }
]);
app.controller("robotController",
[
    "$scope", "RobotService", "DataStoreService", function($scope, RobotService, DataStoreService) {
        var robotService = RobotService;
        $scope.Robot = {};
        $scope.RobotList = [];
        $scope.FillRobotList = fillRobotList;
        $scope.GoNuts = false;


        function fillRobotList(numberOf) {
            $scope.RobotList = [];
            for (let i = 0; i < numberOf; i++) {
                $scope.RobotList.push(returnRandomRobot());
            }
        }

        function returnRandomRobot() {
            var robot = {};
            //robot.Head = getRandomHead();
            robot.Torso = $scope.Data.Torsos[Helper.GetRandomInt(0, $scope.Data.Torsos.length)];
            robot.Leg = $scope.Data.Legs[Helper.GetRandomInt(0, $scope.Data.Legs.length)];

            robot["TotalaStats"] = [];
            //robot["Name"] = getRandomName();
            //robot["CodeName"] = getRandomCodeName();

            robot["TotalaStats"]["SRV"] = robot.Head.SRV + robot.Torso.SRV + robot.Leg.SRV;
            robot["TotalaStats"]["STB"] = robot.Head.STB + robot.Torso.STB + robot.Leg.STB;
            robot["TotalaStats"]["PRC"] = robot.Head.PRC + robot.Torso.PRC + robot.Leg.PRC;
            robot["TotalaStats"]["NTV"] = robot.Head.NTV + robot.Torso.NTV + robot.Leg.NTV;
            robot["TotalaStats"]["MOD"] = robot.Head.MOD + robot.Torso.MOD + robot.Leg.MOD;
            robot["TotalaStats"]["SKYDD"] = robot.Head.SKYDD + robot.Torso.SKYDD + robot.Leg.SKYDD;

            return robot;
        }

        $scope.GetRandomRobot = function() {
            robotService.Robot(DataStoreService);
            $scope.Robot = robotService.GetRandomRobot();
            $scope.Robot.Visual = {};
            $scope.Robot.Visual.ModulesClass = getModulesClass();
        };

        (function() { $scope.GetRandomRobot(); })();

        function getModulesClass() {
            var numberOfModules = $scope.Robot.Modules.length;
            var modulesClass = "modules col-xs-12 ";
            if (numberOfModules === 1) {
                modulesClass += "col-md-12";
            }
            if (numberOfModules === 2) {
                modulesClass += "col-md-6";
            }
            if (numberOfModules === 3) {
                modulesClass += "col-md-4";
            }
            if (numberOfModules >= 4) {
                modulesClass += "col-md-3";
            }
            return modulesClass;
        };

        $scope.GetPreviousHead = function() {
            var index = $scope.Data.Heads.findIndex(x => x.NAMN === $scope.Robot.Head.NAMN);
            index -= 1;
            if (index < 0) {
                index = $scope.Data.Heads.length - 1;
            }

            $scope.Robot.Head = $scope.Data.Heads[index];
        };
        $scope.GetNextHead = function() {
            var index = $scope.Data.Heads.findIndex(x => x.NAMN === $scope.Robot.Head.NAMN);
            index += 1;
            if (index >= $scope.Data.Heads.length) {
                index = 0;
            }

            $scope.Robot.Head = $scope.Data.Heads[index];
        };

        $scope.GetPreviousTorso = function() {
            var index = $scope.Data.Torsos.findIndex(x => x.NAMN === $scope.Robot.Torso.NAMN);
            index -= 1;
            if (index < 0) {
                index = $scope.Data.Torsos.length - 1;
            }

            $scope.Robot.Torso = $scope.Data.Torsos[index];
        };
        $scope.GetNextTorso = function() {
            var index = $scope.Data.Torsos.findIndex(x => x.NAMN === $scope.Robot.Torso.NAMN);
            index += 1;
            if (index >= $scope.Data.Torsos.length) {
                index = 0;
            }

            $scope.Robot.Torso = $scope.Data.Torsos[index];
        };

        $scope.GetPreviousLeg = function() {
            var index = $scope.Data.Legs.findIndex(x => x.NAMN === $scope.Robot.Leg.NAMN);
            index -= 1;
            if (index < 0) {
                index = $scope.Data.Legs.length - 1;
            }

            $scope.Robot.Leg = $scope.Data.Legs[index];
        };
        $scope.GetNextLeg = function() {
            var index = $scope.Data.Legs.findIndex(x => x.NAMN === $scope.Robot.Leg.NAMN);
            index += 1;
            if (index >= $scope.Data.Legs.length) {
                index = 0;
            }

            $scope.Robot.Leg = $scope.Data.Legs[index];
        };

    }
]);

//app.factory("RobotService", Robot);
app.factory("DataStoreService", DataStore);
app.factory("NameService", Name);
//app.factory("DangerService",function() {return new Danger();});

app.filter("trust",
[
    "$sce", function($sce) {
        return function(htmlCode) {

            return $sce.trustAsHtml(htmlCode);
        };
    }
]);

app.directive("bnRepeatDelimiter",
    function() {
        // I compile the list, injecting in the conditionally
        // visible delimiter onto the end of the template.
        function compile(element, attributes) {
            // Get the delimiter that goes between each item.
            var delimiter = (attributes.bnRepeatDelimiter || ",");
            // The delimiter will show on all BUT the last
            // item in the list.
            var delimiterHtml = (
                `<span ng-show=' ! $last '>${delimiter} </span>`
            );
            // Add the delimiter to the end of the list item,
            // making sure to add the existing whitespace back
            // in after the delimiter.
            var html = element.html()
                .replace(
                    /(\s*$)/i,
                    function(whitespace) {
                        return(delimiterHtml + whitespace);
                    }
                );
            // Update the compiled HTML.
            element.html(html);
        }

        // Return the directive configuration. Notice that
        // our priority is 1 higher than ngRepeat - this will
        // be compiled before the ngRepeat compiles.
        return({
            compile: compile,
            priority: 1001,
            restirct: "A"
        });
    });

function Helper() {
    this.Trim = function(str) {
        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    this.GetRandomInt = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max-- - min)) + min;
    };
    this.RullaT6 = function() {
        return this.GetRandomInt(0, 6) + 1;
    };
    this.RullaT66 = function() {
        return (this.RullaT6() * 10) + this.RullaT6();
    };
    this.GetRandomLetter = function() {
        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
        return alphabet.charAt(this.GetRandomInt(0, alphabet.length));
    };
    this.GetRandomFromList = function(list) {
        return list[this.GetRandomInt(0, list.length)];
    };
    this.GetRandomFromListWeigthed = function(list, prop) {
        var sum = 0;

        for (var i = 0; i < list.length; i++) {
            sum += list[i].chance;
        }

        var randomInt = this.GetRandomInt(0, sum) + 1;
        var randomSelection = {};

        for (var j = 0; j < list.length; j++) {
            randomInt -= list[j][prop];
            if (randomInt <= 0) {
                randomSelection = list[j];
                break;
            }
        }
        return randomSelection;
    };
    this.RollMutantDieSuccessesOnly = function(numberOfDice) {
        var successes = 0;
        var roll;
        for (let i = 0; i < numberOfDice; i++) {
            roll = this.GetRandomInt(0, 6) + 1;
            if (roll === 6) {
                successes += 1;
            }
        }
        return successes;
    };
    this.Capitalize = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    this.CapitalizeEachWord = function(string) {
        var strings = string.split(" ");
        for (var i = 0; i < strings.length; i++) {
            strings[i] = this.Capitalize(strings[i]);
        }
        return strings.join(" ");
    };
    this.Contains = function(array, value) {
        var doesContain = false;
        for (var i = 0, length = array.length; i < length; i++) {
            if (array[i] === value) {
                doesContain = true;
                break;
            }
        }

        return doesContain;
    };
    this.FindWithAttr = function(array, attr, value) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    };
    this.GetTwoRandomStrings = function(list, separator) {

        var item1;
        var item2;

        item1 = list[this.GetRandomInt(0, list.length)];
        item2 = list[this.GetRandomInt(0, list.length)];

        item1 = item1.toLowerCase();
        item2 = item2.toLowerCase();

        while (item1 === item2) {
            item2 = list[this.GetRandomInt(0, list.length)];
            item2 = item2.toLowerCase();
        }

        return this.Capitalize(item1 + " " + separator + " " + item2);
    };
    this.CSSify = function(string) {
        var stuffInside = string.match(/{([^}]*)}/);
        var tokens = stuffInside[1].split(":");
        string = string.replaceAll(stuffInside[0], "<span class=\"" + tokens[0] + "\">" + tokens[1] + "</span>");
        return string;
    };
    this.GetHtmlOutput = function(string) {
        var matchIndex;

        var hasMoreSkillMatches = true;
        while (hasMoreSkillMatches) {
            matchIndex = string.indexOf("{skill:");

            if (matchIndex !== -1) {
                string = this.CSSify(string);
            } else {
                hasMoreSkillMatches = false;
            }
        }

        var hasMoreSymbolMatches = true;
        while (hasMoreSymbolMatches) {
            matchIndex = string.indexOf("{symbol:");

            if (matchIndex !== -1) {
                string = this.CSSify(string);
            } else {
                hasMoreSymbolMatches = false;
            }
        }

        var hasMoreRefMatches = true;
        while (hasMoreRefMatches) {
            matchIndex = string.indexOf("{ref:");

            if (matchIndex !== -1) {
                string = this.CSSify(string);
            } else {
                hasMoreRefMatches = false;
            }
        }
        return string;
    };
}

// A MarkovGenerate object
function MarkovGenerator(n, max) {
    // Order (or length) of each ngram
    this.n = n;
    // What is the maximum amount we will generate?
    this.max = max;
    // An object as dictionary
    // each ngram is the key, a list of possible next elements are the values
    this.ngrams = {};
    // A separate array of possible beginnings to generated text
    this.beginnings = [];

    // A function to feed in text to the markov chain
    this.feed = function (text) {

        // Discard this line if it's too short
        if (text.length < this.n) {
            return false;
        }

        // Store the first ngram of this line
        var beginning = text.substring(0, this.n);
        this.beginnings.push(beginning);

        // Now let's go through everything and create the dictionary
        for (var i = 0; i < text.length - this.n; i++) {
            var gram = text.substr(i, i + this.n);
            var next = text.charAt(i + this.n);
            // Is this a new one?
            if (!this.ngrams.hasOwnProperty(gram)) {
                this.ngrams[gram] = [];
            }
            // Add to the list
            this.ngrams[gram].push(next);
        }
    }

    // Generate a text from the information ngrams
    this.generate = function () {

        // Get a random  beginning 
        var current = this.beginnings.choice();
        var output = current;

        // Generate a new token max number of times
        for (var i = 0; i < this.max; i++) {
            // If this is a valid ngram
            if (this.ngrams.hasOwnProperty(current)) {
                // What are all the possible next tokens
                var possibleNext = this.ngrams[current];
                // Pick one randomly
                var next = possibleNext.choice();
                // Add to the output
                output += next;
                // Get the last N entries of the output; we'll use this to look up
                // an ngram in the next iteration of the loop
                current = output.substring(output.length - this.n, output.length);
            } else {
                break;
            }
        }
        // Here's what we got!
        return output;
    }
    return this;
}

function pick(arg, def) {
    return (typeof arg == "undefined" ? def : arg);
}


// ReSharper disable once NativeTypePrototypeExtending
String.prototype.replaceAll = function(search, replace) {
    if (replace === undefined) {
        return this.toString();
    }
    return this.split(search).join(replace);
};

// ReSharper disable once NativeTypePrototypeExtending
Array.prototype.choice = function () {
    var i = Math.floor(Math.random(this.length));
    return this[i];
}
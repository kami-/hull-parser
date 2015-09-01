import Lexer = require('../node_modules/config-parser/Lexer');
import Parser = require('../node_modules/config-parser/Parser');
import Ast = require('../node_modules/config-parser/Ast');
import Mission = require('../node_modules/config-parser/Mission');

function addAllFactionItems(node: Parser.Node, nodeSelector: string, factionFiles): void {
    var allItems: Parser.Node[] = [];
    for (var i = 0, len = factionFiles.length; i < len; i++) {
        allItems = allItems.concat(getFactionItems(nodeSelector, factionFiles[i]));
    }
    Mission.mergeItems(node, allItems);
};

function getFactionItems(nodeSelector, factionFile): Parser.Node[] {
    var lexer: Lexer.Lexer = Lexer.create(factionFile);
    var parser: Parser.Parser = Parser.create(factionFile, lexer);
    var ast = parser.parse();
    return Ast.select(ast, nodeSelector + '.Item*');
}

export function addFactions(node: Parser.Node, factionFiles: string[]): void {
    var groups: Parser.Node = Ast.createClass(node, 'Mission', 'Groups'),
        vehicles: Parser.Node = Ast.createClass(node, 'Mission', 'Vehicles');
    addAllFactionItems(groups, 'Mission.Groups', factionFiles);
    addAllFactionItems(vehicles, 'Mission.Vehicles', factionFiles);
}
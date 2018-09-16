let assert = require('assert');
let BoggleSolver = require('../boggle-solver.js')

describe('BoggleSolver', function () {
    describe('#get_solution()', function () {
        it('should return, in sorted order, all valid words that can be made using the given board and dictionary.', function () {
            let dictionary = new Set(['chypre', 'ech', 'ego', 'eng', 'ewt', 'gen',
                'gent', 'get', 'zoo', 'gon', 'hyp', 'neg', 'net', 'new', 'newt', 'nog',
                'once', 'oncer', 'pre', 'pry', 'pyne', 'reb', 'rec', 'rhy', 'rhyne',
                'teg', 'ten', 'tench', 'tenzon', 'tew', 'twp', 'wen', 'wench',
                'went', 'wet', 'wyn', 'winner', 'question']);

            let board = [
                ['t', 'w', 'y', 'r'],
                ['e', 'n', 'p', 'h'],
                ['g', 'z', 'c', 'r'],
                ['o', 'n', 'b', 'e']
            ];

            let solution = ['chypre', 'ech', 'ego', 'eng', 'ewt', 'gen', 'gent', 'get',
                            'gon', 'hyp', 'neg', 'net', 'new', 'newt', 'nog', 'once',
                            'oncer', 'pre', 'pry', 'pyne', 'reb', 'rec', 'rhy', 'rhyne',
                            'teg', 'ten', 'tench', 'tenzon', 'tew', 'twp', 'wen',
                            'wench', 'went', 'wet', 'wyn' ];

            let boggle_solver = new BoggleSolver(board, dictionary);

            assert.deepEqual(boggle_solver.get_solution(), solution);
        });
    });
});


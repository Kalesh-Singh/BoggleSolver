let assert = require('assert');
let BoggleSolver = require('../boggle-solver.js')

describe('BoggleSolver', function () {
    describe('#findAllSolutions()', function () {
        it('should return, in sorted order, all valid words that can be made using the given board and dictionary.', function () {

            let dictionary = new Set(['chypre', 'ech', 'ego', 'eng', 'ewt', 'gen',
                'gent', 'get', 'zoo', 'gon', 'hyp', 'neg', 'net', 'new', 'newt', 'nog',
                'once', 'oncer', 'pre', 'pry', 'pyne', 'reb', 'rec', 'rhy', 'rhyne',
                'teg', 'ten', 'tench', 'tenzon', 'tew', 'twp', 'wen', 'wench',
                'went', 'wet', 'wyn', 'winner', 'question']);

            let board = [
                ['T', 'W', 'Y', 'R'],
                ['E', 'N', 'P', 'H'],
                ['G', 'Z', 'C', 'R'],
                ['O', 'N', 'B', 'E']
            ];

            let solution = ['chYpre', 'ech', 'ego', 'eng', 'ewt', 'gen', 'gent', 'get',
                            'gon', 'hyp', 'neg', 'net', 'new', 'newt', 'nog', 'once',
                            'oncer', 'pre', 'pry', 'pyne', 'reb', 'rec', 'rhy', 'rhyne',
                            'teg', 'ten', 'tench', 'tenzon', 'Tew', 'twp', 'wen',
                            'wench', 'went', 'wet', 'wyn' ];

            let boggle_solver = new BoggleSolver(board, dictionary);

            assert.deepEqual(boggle_solver.findAllSolutions(), solution.map(x => x.toLowerCase()).sort());


            board = [
                 ['A', 'B'],
                 ['C', 'D']
            ];

            dictionary = new Set(['A', 'B', 'AC', 'ACA', 'DE']);
            solution = ['a', 'b', 'ac'];

            boggle_solver = new BoggleSolver(board, dictionary);

            assert.deepEqual(boggle_solver.findAllSolutions(), solution.map(x => x.toLowerCase()).sort());
        });
    });
});


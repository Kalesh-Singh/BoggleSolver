let assert = require('assert');
let findAllSolutions = require('../boggle.js')

describe('BoggleSolver', function () {
    describe('#findAllSolutions()', function () {
        it('Test 1 for correct solutions.', function () {

            let dictionary = ['chypre', 'ech', 'ego', 'eng', 'ewt', 'gen',
                'gent', 'get', 'zoo', 'gon', 'hyp', 'neg', 'net', 'new', 'newt', 'nog',
                'once', 'oncer', 'pre', 'pry', 'pyne', 'reb', 'rec', 'rhy', 'rhyne',
                'teg', 'ten', 'tench', 'tenzon', 'tew', 'twp', 'wen', 'wench',
                'went', 'wet', 'wyn', 'winner', 'question'];

            let grid = [
                ['T', 'W', 'Y', 'R'],
                ['E', 'N', 'P', 'H'],
                ['G', 'Z', 'C', 'R'],
                ['O', 'N', 'B', 'E']
            ];

            let solution = ['chYpre', 'ech', 'ego', 'eng', 'ewt', 'gen', 'gent', 'get',
                'gon', 'hyp', 'neg', 'net', 'new', 'newt', 'nog', 'once',
                'oncer', 'pre', 'pry', 'pyne', 'reb', 'rec', 'rhy', 'rhyne',
                'teg', 'ten', 'tench', 'tenzon', 'Tew', 'twp', 'wen',
                'wench', 'went', 'wet', 'wyn'];

            assert.deepEqual(findAllSolutions(grid, dictionary), solution.map(x => x.toLowerCase()).sort());
        });

        it('Test 2 for correct solutions.', function () {
            let grid = [
                ['A', 'B', 'C', 'D'],
                ['E', 'F', 'G', 'H'],
                ['I', 'J', 'K', 'L'],
                ['A', 'B', 'C', 'D']
            ];


            let dictionary = ['ABEF', 'AFJIEB', 'DGKD', 'DGKA'];

            let solution = ['ABEF', 'AFJIEB', 'DGKD'];

            assert.deepEqual(findAllSolutions(grid, dictionary), solution.map(x => x.toLowerCase()).sort());
        });

        it('Test 1 for incorrect solutions.', function () {

            let dictionary = ['chypre', 'ech', 'ego', 'eng', 'ewt', 'gen',
                'gent', 'get', 'zoo', 'gon', 'hyp', 'neg', 'net', 'new', 'newt', 'nog',
                'once', 'poncer', 'pre', 'pry', 'pyne', 'reb', 'rec', 'rhy', 'rhyne',
                'teg', 'ten', 'tench', 'tenzon', 'tew', 'twp', 'wen', 'wench',
                'went', 'wet', 'wyn', 'winner', 'question'];

            let grid = [
                ['T', 'W', 'Y', 'R'],
                ['E', 'N', 'P', 'H'],
                ['G', 'Z', 'C', 'R'],
                ['O', 'N', 'B', 'E']
            ];

            let solution = ['chYpre', 'ech', 'ego', 'eng', 'ewt', 'gen', 'gent', 'get',
                'gon', 'hyp', 'neg', 'net', 'new', 'newt', 'nog', 'once',
                'oncer', 'pre', 'pry', 'pyne', 'reb', 'rec', 'rhy', 'rhyne',
                'teg', 'ten', 'tench', 'tenzon', 'Tew', 'twp', 'wen',
                'wench', 'went', 'wet', 'wyn'];

            assert.notDeepEqual(findAllSolutions(grid, dictionary), solution.map(x => x.toLowerCase()).sort());
        });

        it('Test 2 for incorrect solutions.', function () {
            let grid = [
                ['A', 'B', 'C', 'D'],
                ['E', 'F', 'G', 'H'],
                ['I', 'J', 'K', 'L'],
                ['A', 'B', 'C', 'D']
            ];


            let dictionary = ['ABEF', 'AFJIEB', 'DGKD', 'DGKA'];

            let solution = ['ABEFA', 'AFJIEB', 'DGKD'];

            assert.notDeepEqual(findAllSolutions(grid, dictionary), solution.map(x => x.toLowerCase()).sort());
        });

      /*  it('Test 3 for correctness', function () {
          let board = [
                ['A', 'B'],
                ['C', 'D']
            ];

            let dictionary = new Set(['A', 'B', 'AC', 'ACA', 'DE']);
            let solution = ['a', 'b', 'ac'];

            assert.deepEqual(boggle_solver.getSolutions(), solution.map(x => x.toLowerCase()).sort());
        });*/
    });
});


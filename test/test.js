let assert = require('assert');
let findAllSolutions = require('..src/boggle.js')

describe('BoggleSolver', function () {
    describe('#findAllSolutions()', function () {
        it('test 1 for correct solutions.', function () {

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

        it('test 2 for correct solutions.', function () {
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

        it('test 1 for incorrect solutions.', function () {

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

        it('test 2 for incorrect solutions.', function () {
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

        it('test 3 for correct solutions', function () {
          let grid = [
                ['A', 'B'],
                ['C', 'D']
            ];

            let dictionary = ['A', 'B', 'AC', 'ACA', 'DE'];
            let solution = ['a', 'b', 'ac'];

            assert.deepEqual(findAllSolutions(grid, dictionary), solution.map(x => x.toLowerCase()).sort());
        });


        it('should return an empty solution set if no words are in the dictionary', function () {
            let grid = [
                ['A', 'B', 'C', 'D'],
                ['E', 'F', 'G', 'H'],
                ['I', 'J', 'K', 'L'],
                ['A', 'B', 'C', 'D']
            ];

            let dictionary = [];

            assert.equal(findAllSolutions(grid, dictionary).length, 0);
        });


        it('should return an empty solution set if the dictionary is undefined', function () {
            let grid = [
                ['A', 'B', 'C', 'D'],
                ['E', 'F', 'G', 'H'],
                ['I', 'J', 'K', 'L'],
                ['A', 'B', 'C', 'D']
            ];

            assert.equal(findAllSolutions(grid).length, 0);
        });


        it('should return an empty solution set if the dictionary not an array', function () {
            let grid = [
                ['A', 'B', 'C', 'D'],
                ['E', 'F', 'G', 'H'],
                ['I', 'J', 'K', 'L'],
                ['A', 'B', 'C', 'D']
            ];

            let dictionary = new Set(['bae']);

            assert.equal(findAllSolutions(grid, dictionary).length, 0);
        });

        it('should handle the case where the gird only has 1 row', function () {
            let grid = ['B', 'A', 'T', 'S'];
            let dictionary = ['boy', 'bat', 'bats', 'at', 'ats', 'cat', 'hat', 'bts'];
            let solution = ['bat', 'bats', 'at', 'ats'];

            assert.deepEqual(findAllSolutions(grid, dictionary), solution.map(x => x.toLowerCase()).sort());

        });

        it('should return an empty solution set if the grid is undefined', function () {
            assert.equal(findAllSolutions().length, 0);
        });

        it('should return an empty solution set if the grid is not an array', function () {
            assert.equal(findAllSolutions(new Set(['a', 'b']), ['a', 'b']).length, 0);
        });

        it('should return an empty solution set if the grid has size of zero', function () {
            assert.equal(findAllSolutions([], ['a', 'b']).length, 0);
        });
    });
});


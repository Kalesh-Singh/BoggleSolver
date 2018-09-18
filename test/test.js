let assert = require('assert');
let boggle = require('../src/boggle.js')

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

            assert.deepEqual(boggle.findAllSolutions(grid, dictionary), solution.map(x => x.toLowerCase()).sort());
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

            assert.deepEqual(boggle.findAllSolutions(grid, dictionary), solution.map(x => x.toLowerCase()).sort());
        });

        it('test 3 for correct solutions', function () {
            let grid = [
                ['A', 'B'],
                ['C', 'D']
            ];

            let dictionary = ['A', 'B', 'AC', 'ACA', 'DE'];
            let solution = ['a', 'b', 'ac'];

            assert.deepEqual(boggle.findAllSolutions(grid, dictionary), solution.map(x => x.toLowerCase()).sort());
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

            assert.notDeepEqual(boggle.findAllSolutions(grid, dictionary), solution.map(x => x.toLowerCase()).sort());
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

            assert.notDeepEqual(boggle.findAllSolutions(grid, dictionary), solution.map(x => x.toLowerCase()).sort());
        });

        it('should handle the case where the gird only has 1 row', function () {
            let grid = ['B', 'A', 'T', 'S'];
            let dictionary = ['boy', 'bat', 'bats', 'at', 'ats', 'cat', 'hat', 'bts'];
            let solution = ['bat', 'bats', 'at', 'ats'];

            assert.deepEqual(boggle.findAllSolutions(grid, dictionary), solution.map(x => x.toLowerCase()).sort());

        });

        it('should throw DictionaryUndefined the dictionary is undefined', function () {
            let grid = [
                ['A', 'B', 'C', 'D'],
                ['E', 'F', 'G', 'H'],
                ['I', 'J', 'K', 'L'],
                ['A', 'B', 'C', 'D']
            ];

            assert.throws(function () {
                boggle.findAllSolutions(grid);
            });
        });

        it('should throw DictionaryNotAnArray if the dictionary not an array', function () {
            let grid = [
                ['A', 'B', 'C', 'D'],
                ['E', 'F', 'G', 'H'],
                ['I', 'J', 'K', 'L'],
                ['A', 'B', 'C', 'D']
            ];

            let dictionary = new Set(['bae']);

            assert.throws(function () {
                boggle.findAllSolutions(grid, dictionary);
            });
        });

        it('should throw DictionarySizeZero if no words are in the dictionary', function () {
            let grid = [
                ['A', 'B', 'C', 'D'],
                ['E', 'F', 'G', 'H'],
                ['I', 'J', 'K', 'L'],
                ['A', 'B', 'C', 'D']
            ];

            let dictionary = [];

            assert.throws(function () {
                boggle.findAllSolutions(grid, dictionary);
            });
        });

        it('should throw GridUndefined if the grid is undefined', function () {
            assert.throws(function () {
                boggle.findAllSolutions();
            });
        });

        it('should throw GridNotAnArray if the grid is not an array', function () {
            assert.throws(function () {
                boggle.findAllSolutions(new Set(['a', 'b']), ['a', 'b']);
            });
        });

        it('should throw GridSizeZero if the grid has size of zero', function () {
            assert.throws(function () {
                boggle.findAllSolutions([], ['a', 'b']);
            });
        });
    });
});


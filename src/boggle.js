class TrieNode {
    constructor() {
        this.links = new Map();
        this.end = false;
    }

    contains(key) {
        return this.links.has(key);
    }

    get(key) {
        return this.links.get(key);
    }

    set(key, item) {
        this.links.set(key, item);
    }

    is_end() {
        return this.end;
    }

    set_end() {
        this.end = true;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    getRoot() {
        return this.root;
    }

    insert(word) {
        let node = this.root;

        for (let char of word) {
            char = char.toLowerCase();
            if (!(node.contains(char))) {
                node.set(char, new TrieNode());
            }
            node = node.get(char);
        }

        node.set_end();
    }

    contains(word) {
        let node = this.root;

        for (let char of word) {
            if (!node.contains(char)) {
                return false;
            }
            node = node.get(char);
        }

        return node.is_end()
    }
}

class Boggle {
    constructor(board, dictionary) {
       

        if (typeof dictionary === 'undefined') {
            throw new Error('DictionaryUndefined');
        }
        if (!Array.isArray(dictionary)) {
            throw new Error('DictionaryNotAnArray');
        }
        if (dictionary.length === 0) {
            throw new Error('DictionarySizeZero');
        }
        if (typeof board === 'undefined') {
            throw new Error('GridUndefined');
        }
        if (!Array.isArray(board)) {
            throw Error('GridNotAnArray');
        }
        if (board.length === 0) {
            throw Error('GridSizeZero');
        }
        
        this.board = board;
        this.trie = new Trie();
         
        for (let word of dictionary) {
            this.trie.insert(word);
        }

        // Board height (number of rows)
        this.m = board.length;

        // Board width (number of columns)
        this.n = (Array.isArray(board[0])) ? board[0].length : 1;

        this.transitions = [{x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1},
            {x: -1, y: 0}, {x: 1, y: 0},
            {x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}];
    }

    _isSafe(i, j, visited) {
        return !(visited.has(this._rowColToPosition(i, j))) && i >= 0 && i < this.m
            && j >= 0 && j < this.n;
    }

    _nextLetters(i, j, visited) {
        let letters = [];
        for (let transition of this.transitions) {
            let new_i = i + transition.x;
            let new_j = j + transition.y;

            if (this._isSafe(new_i, new_j, visited)) {
                letters.push({x: new_i, y: new_j});
            }

        }
        return letters;
    }

    _rowColToPosition(row, col) {
        return (row * this.board[0].length) + col;
    }

    * _findWords(i, j, visited, trie_node, curr_string) {
        if (typeof visited === 'undefined') {
            visited = new Set();
        }
        if (typeof trie_node === 'undefined') {
            trie_node = this.trie.getRoot();
        }
        if (typeof curr_string === 'undefined') {
            curr_string = '';
        }

        if (this._isSafe(i, j, visited)) {

            let letter = this.board[i][j].toLowerCase();

            if (trie_node.contains(letter)) {

                visited.add(this._rowColToPosition(i, j));

                curr_string += letter;

                let next_letters = this._nextLetters(i, j, visited);

                trie_node = trie_node.get(letter);

                if (trie_node.is_end()) {
                    yield curr_string;
                }

                for (let pos of next_letters) {
                    for (let word of this._findWords(pos.x, pos.y, new Set(visited), trie_node, curr_string)) {
                        yield word;
                    }
                }
            }
        }
    }

    getSolutions() {
        let words = new Set();

        for (let i = 0; i < this.m; ++i) {
            for (let j = 0; j < this.n; ++j) {
                for (let word of this._findWords(i, j)) {
                    words.add(word);
                }
            }
        }

        return Array.from(words).sort();
    }
}

exports.findAllSolutions = function(grid, dictionary) {
    return new Boggle(grid, dictionary).getSolutions();
}

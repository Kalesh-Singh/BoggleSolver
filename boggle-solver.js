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

class BoggleSolver {
    constructor(board, dictionary) {
        this.board = board;

        this.trie = new Trie();
        for (let word of dictionary) {
            this.trie.insert(word);
        }

        // Board height (number of rows)
        this.m = (board instanceof Array) ? board.length : 1;

        // Board width (number of columns)
        this.n = (board[0] instanceof Array) ? board[0].length : 1;

        this.transitions = [{x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1},
                            {x: -1, y: 0}, {x: 1, y: 0},
                            {x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}];
    }

    _isSafe(i, j, visited) {
        return !visited.has({x: i, y: j}) && i >= 0 && i < this.m
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
        if (trie_node.is_end()) {
            yield curr_string;
        }

        if (this._isSafe(i, j, visited) && trie_node.contains(this.board[i][j])) {

            visited.add({x: i, y: j});

            curr_string += this.board[i][j].toLowerCase();

            let next_letters = this._nextLetters(i, j, visited);

            trie_node = trie_node.get(this.board[i][j]);

            for (let pos of next_letters) {
                for (let word of this._findWords(pos.x, pos.y, new Set(visited), trie_node, curr_string)) {
                    yield word;
                }
            }
        }
    }

    getSolution() {
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

module.exports = BoggleSolver;

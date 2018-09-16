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
            if (!node.contains(char)) {
                node.set(char, new TrieNode());
            }
            node = node.get(char);
        }
    //    TODO: Try to do this on the node itself.
    //    The above statement is moving it to the new node.
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
        // TODO: Ditto as above.
        return node.is_end()
    }
}

class BoggleSolver {
    constructor(board, dictionary) {
        this.board = board;

        this.trie = new Trie();
        for (let word in dictionary) {
            self.trie.insert(word);
        }

        // Board height (number of rows)
        this.m = board.length;

        // Board width (number of columns)
        this.n = (board[0] instanceof Array) ? board[0].length : 1;

        this.transitions = [{x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1},
                            {x: -1, y: 0}, {x: 1, y: 0},
                            {x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}];
    }

    _is_safe(i, j, visited) {
        return !visited.has({x: i, y: j}) && i >= 0 && i < this.m
                && j >= 0 && j < this.n;
    }

    _next_letters(i, j, visited) {
        let letters = [];
        for (let transition in this.transitions) {
            let new_i = i + transition.x;
            let new_j = j + transition.y;

            if (this._is_safe(new_i, new_j, visited)) {
                letters.push({x: new_i, y: new_j});
            }

        }
    }
}


// Driver code
let dictionary = new Set(['chypre', 'ech', 'ego', 'eng', 'ewt', 'gen',
    'gent', 'get', 'gon', 'hyp', 'neg', 'net', 'new', 'newt', 'nog',
    'once', 'oncer', 'pre', 'pry', 'pyne', 'reb', 'rec', 'rhy', 'rhyne',
    'teg', 'ten', 'tench', 'tenzon', 'tew', 'twp', 'wen', 'wench',
    'went', 'wet', 'wyn', 'winner', 'question']);

let board = [
    ['t', 'w', 'y', 'r'],
    ['e', 'n', 'p', 'h'],
    ['g', 'z', 'c', 'r'],
    ['o', 'n', 'b', 'e']
];
trie_node = new TrieNode();
trie = new Trie();
boggle_solver = new BoggleSolver(board, dictionary);

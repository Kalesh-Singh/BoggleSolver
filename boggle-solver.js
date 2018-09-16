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

        /*for (let i = 0; i < word.length; ++i) {
            if (!(node.contains(word[i]))) {
                node.set(word[i], new TrieNode());
            }
            if (i === word.length - 1) {
                node.set_end();
            } else {
                node = node.get(word[i]);
            }
        }*/

        for (let char of word) {
            if (!(node.contains(char))) {
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

        /*for (let i = 0; i < word.length; ++i) {
            if (!(node.contains(word[i]))) {
                return false;
            } else if ((i === word.length - 1) && node.is_end()) {
                return true;
            } else {
                node = node.get(word[i]);
            }
        }*/
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
        for (let word of dictionary) {
            this.trie.insert(word);
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
        for (let transition of this.transitions) {
            let new_i = i + transition.x;
            let new_j = j + transition.y;

            if (this._is_safe(new_i, new_j, visited)) {
                letters.push({x: new_i, y: new_j});
            }

        }
        return letters;
    }

    _find_words(i, j, found_words, visited, trie_node, curr_string) {
        if (typeof visited === 'undefined') {
            visited = new Set();
        }
        if (typeof trie_node === 'undefined') {
            trie_node = this.trie.getRoot();
        }
        if (typeof found_words === 'undefined') {
            console.log('Found words was undefined');       // TODO: Delete
            found_words = new Set();
        }
        if (typeof curr_string === 'undefined') {
            curr_string = '';
        }
        if (trie_node.is_end()) {
            // console.log(curr_string);
            found_words.add(curr_string);
        }

        if (this._is_safe(i, j, visited) && trie_node.contains(this.board[i][j])) {

            visited.add({x: i, y: j});

            curr_string += this.board[i][j].toLowerCase();

            let next_letters = this._next_letters(i, j, visited);

            trie_node = trie_node.get(this.board[i][j]);



            for (let pos of next_letters) {

                console.log('Found words =', found_words);
                let new_words = this._find_words(pos.x, pos.y,  found_words, new Set(visited), trie_node, curr_string);
                console.log('New words =', new_words);

                found_words = new Set(found_words, new_words);
                console.log('Combined words =', found_words);

                /*found_words
                    = new Set(found_words,
                    this._find_words(pos.x, pos.y,  found_words, new Set(visited), trie_node, curr_string));
                */
            }
        }

        // console.log(found_words);       // TODO: Delete

        return found_words;
    }

    get_solution() {
        let words = new Set();

        for (let i = 0; i < this.m; ++i) {
            for (let j = 0; j < this.n; ++j) {
                // console.log('Words', words);
                words = new Set(words, this._find_words(i, j, words));
            }
        }

        return words;
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

// trie = new Trie();
//
// for (let word of dictionary) {
//     trie.insert(word);
// }
//
// console.log(trie.contains('twp'));
// console.log(trie.getRoot().contains('z'));
// console.log(trie.getRoot().contains('t'));


trie_node = new TrieNode();
trie = new Trie();
boggle_solver = new BoggleSolver(board, dictionary);
console.log(boggle_solver.get_solution());

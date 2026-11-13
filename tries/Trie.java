// Trie over lowercase ASCII words, with child nodes held in a fixed array.

static class Node {
    final Node[] children = new Node[26];
    boolean isWord;
}

final Node root = new Node();

void insert(String word) {
    Node node = root;
    for (char c : word.toCharArray()) {
        int i = c - 'a';
        if (node.children[i] == null) node.children[i] = new Node();
        node = node.children[i];
    }
    node.isWord = true;
}

// Returns the node reached by following every character, or null if the walk
// falls off the trie.
Node walk(String s) {
    Node node = root;
    for (char c : s.toCharArray()) {
        node = node.children[c - 'a'];
        if (node == null) return null;
    }
    return node;
}

boolean contains(String word) {
    Node node = walk(word);
    return node != null && node.isWord;
}

boolean startsWith(String prefix) {
    return walk(prefix) != null;
}

boolean remove(String word) {
    return remove(root, word, 0);
}

// Returns whether the word was present. On the way back up, prunes any child
// that no longer marks a word and has no children of its own.
boolean remove(Node node, String word, int depth) {
    if (depth == word.length()) {
        if (!node.isWord) return false;
        node.isWord = false;
        return true;
    }
    int i = word.charAt(depth) - 'a';
    Node child = node.children[i];
    if (child == null || !remove(child, word, depth + 1)) return false;
    if (!child.isWord && isLeaf(child)) node.children[i] = null;
    return true;
}

boolean isLeaf(Node node) {
    for (Node child : node.children) {
        if (child != null) return false;
    }
    return true;
}

void main() {
    for (String word : List.of("car", "cart", "cat")) insert(word);

    IO.println("contains(car)   = " + contains("car"));    // true
    IO.println("contains(ca)    = " + contains("ca"));     // false: prefix only
    IO.println("startsWith(ca)  = " + startsWith("ca"));   // true
    IO.println("startsWith(dog) = " + startsWith("dog"));  // false

    remove("car");
    IO.println("after remove(car):");
    IO.println("contains(car)   = " + contains("car"));    // false
    IO.println("contains(cart)  = " + contains("cart"));   // true: shared path kept
}

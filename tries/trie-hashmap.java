import java.util.*;

class Trie {
    private TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode tNode = root;
        for (char c : word.toCharArray()) {
            tNode = tNode.children.computeIfAbsent(c, k -> new TrieNode());
        }
        tNode.isEnd = true;
    }

    public boolean search(String word) {
        TrieNode tNode = root;
        for(char c : word.toCharArray()){
            tNode = tNode.children.get(c);
            if(tNode == null) return false;
        }
        return tNode.isEnd;
    }

    public boolean startsWith(String prefix) {
        TrieNode tNode = root;
        for(char c : prefix.toCharArray()) {
            tNode=tNode.children.get(c);
            if(tNode == null) return false;
        }
        return true;
    }

    public static void main(String[] args){
      Trie obj = new Trie();
      obj.insert("apple");
      obj.insert("app");
      obj.insert("appricot");
      System.out.println(obj.search("apple"));   //true
      System.out.println(obj.search("app"));     //true
      System.out.println(obj.search("appl"));    //false
      System.out.println(obj.startsWith("app")); //true
    }
}

class TrieNode {
    Map<Character, TrieNode> children;
    boolean isEnd;

    TrieNode() {
        children = new HashMap<>();
        isEnd = false;
    }
}

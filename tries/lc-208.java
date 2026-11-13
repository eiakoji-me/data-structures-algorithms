class Trie {

  TrieNode root;
  public Trie(){
    root = new TrieNode();
  }

  public void insert(String word){
    TrieNode node = root;
    for(char c : word.toCharArray()){
      int index=c-'a';
      if(node.children[index] == null) node.children[index] = new TrieNode();
      node = node.children[index];
    }
    node.isEnd = true;
  }

  public boolean search(String word) {
    TrieNode node = root;
    for(char c : word.toCharArray()){
      int index = c - 'a';
      node = node.children[index];
      if(node == null) return false;
    }
    return node.isEnd;
  }

  public boolean startsWith(String prefix) {
    TrieNode node = root;
    for(char c: prefix.toCharArray()){
      int index = c - 'a';
      node = node.children[index];
      if(node == null) return false;
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
  TrieNode[] children;
  boolean isEnd;
  TrieNode(){
    children = new TrieNode[26];
    isEnd = false;
  }
}

class Trie {

  static class Node {
    final Node[] children = new Node[26];
    boolean isWord;
  }

  Node root;
  public Trie(){
    root = new Node();
  }

  public void insert(String word){
    Node node = root;
    for(char c : word.toCharArray()){
      int i=c-'a';
      if(node.children[i] == null) node.children[i] = new Node();
      node = node.children[i];
    }
    node.isWord = true;
  }

  public boolean search(String word) {
    Node node = root;
    for(char c : word.toCharArray()){
      node = node.children[c-'a'];
      if(node == null) return false;
    }
    return node.isWord;
  }

  public boolean startsWith(String prefix) {
    Node node = root;
    for(char c: prefix.toCharArray()){
      node = node.children[c-'a'];
      if(node == null) return false;
    }
    return true;
  }

  public static void main(String[] args){
    Trie obj = new Trie();
    obj.insert("apple");
    System.out.println(obj.search("apple")); //true
    System.out.println(obj.search("app")); //false
    System.out.println(obj.startsWith("app")); //true
    obj.insert("app");
    System.out.println(obj.search("app")); //true
  }
}

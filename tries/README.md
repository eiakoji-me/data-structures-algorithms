# Tries

A hash set answers whether a whole word is present. It cannot cheaply answer
which stored words begin with a given prefix: every key has to be scanned,
because hashing destroys the relationship between `car` and `cart`. A trie
keeps that relationship by storing the shared prefix once and branching only
where words diverge.

## Structure

Each node represents one prefix. An edge from a node is labelled with the next
character, and a flag on the node marks whether that prefix is itself a stored
word. The root represents the empty prefix.

```
(root)
  └─ c
     └─ a
        ├─ r*        "car"
        │  └─ t*     "cart"
        └─ t*        "cat"
```

The end-of-word flag is what separates `car` from a prefix that only exists on
the way to `cart`. Without it, `contains("ca")` would wrongly succeed.

## Operations

| Operation | Time | Notes |
|---|---|---|
| `insert(word)` | O(L) | Creates nodes only for the unshared suffix |
| `contains(word)` | O(L) | The walk must end on a node flagged as a word |
| `startsWith(prefix)` | O(L) | The walk only has to reach a node |
| `remove(word)` | O(L) | Clears the flag, then prunes nodes left with no children and no flag |

L is the length of the word or prefix. None of these depend on how many words
are stored, which is the property a hash set cannot offer for prefix queries.

## Children: array or map

- **Fixed array** (`Node[26]` for lowercase ASCII): constant-time child lookup,
  but every node pays for all 26 slots whether it uses them or not.
- **Map** (`HashMap<Character, Node>`): memory grows with the edges actually
  present, so it handles arbitrary alphabets, at the cost of hashing on every
  step.

The array suits a small, known alphabet with dense branching. The map suits
sparse branching or input that is not restricted to `a`–`z`.

## Where it breaks down

- Memory is the main cost. A trie of mostly unrelated words shares almost
  nothing and holds one node per character. Compressing chains of single-child
  nodes into one edge (a radix tree) addresses this.
- Removing a word must not prune a node that still carries another word's flag
  or leads to other words: `remove("car")` must leave `cart` intact.

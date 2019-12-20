class BipartiteGraph<L, R> {
  readonly left: Map<L, Set<R>>;
  readonly right: Map<R, Set<L>>;

  constructor() {
    this.left = new Map<L, Set<R>>();
    this.right = new Map<R, Set<L>>();
  }

  public addEdge(leftVertex: L, rightVertex: R): this {
    if (!this.left.has(leftVertex)) {
      this.left.set(leftVertex, new Set<R>());
    }

    if (!this.right.has(rightVertex)) {
      this.right.set(rightVertex, new Set<L>());
    }

    (this.left.get(leftVertex) as Set<R>).add(rightVertex);
    (this.right.get(rightVertex) as Set<L>).add(leftVertex);

    return this;
  }

  public removeEdge(leftVertex: L, rightVertex: R): this {
    this.left.delete(leftVertex);
    this.right.delete(rightVertex);

    for (const key of Array.from(this.left.keys())) {
      (this.left.get(key) as Set<R>).delete(rightVertex);

      if ((this.left.get(key) as Set<R>).size === 0) {
        this.left.delete(key);
      }
    }

    for (const key of Array.from(this.right.keys())) {
      (this.right.get(key) as Set<L>).delete(leftVertex);

      if ((this.right.get(key) as Set<L>).size === 0) {
        this.right.delete(key);
      }
    }

    return this;
  }
}

export default BipartiteGraph;


class BipartiteGraph<L, R> {
  private left: Map<L, Set<R>>;
  private right: Map<R, Set<L>>;


  public addEdge(leftVertex: L, rightVertex: R): this {
    if (!this.left.has(leftVertex)) {
      this.left.set(leftVertex, new Set<R>());
    }

    if (!this.right.has(rightVertex)) {
      this.right.set(rightVertex, new Set<L>());
    }

    this.left.get(leftVertex).add(rightVertex);
    this.right.get(rightVertex).add(leftVertex);


    // this.left.set(
    //   leftVertex,
    //   (this.left.has(leftVertex) ? this.left.get(leftVertex) : new Set<R>()).add(rightVertex),
    // );

    // this.right.set(
    //   rightVertex,
    //   (this.right.has(rightVertex) ? this.right.get(rightVertex) : new Set<L>()).add(leftVertex),
    // );

    return this;
  }
}

export default BipartiteGraph;

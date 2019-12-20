import BipartiteGraph from './bipartite-graph';

// immutability VS performance & memory usage ???
const hopcroftKarp = function*<L, R>(graph: BipartiteGraph<L, R>): Generator {
  while (graph.left.size > 0 && graph.right.size > 0) {
    const leftOrdered: [L, Set<R>][] = Array.from(graph.left.entries()).sort(
      ([, edges1], [, edges2]) => edges1.size - edges2.size
    );
    const rightOrdered: [R, Set<L>][] = Array.from(graph.right.entries()).sort(
      ([, edges1], [, edges2]) => edges1.size - edges2.size
    );

    const [vertexLeft, edgesRight] = leftOrdered[0];
    const [vertexRight, edgesLeft] = rightOrdered[0];
    let path: [L, R];

    if (edgesRight.size <= edgesLeft.size) {
      const rightVertices = Array.from(edgesRight).sort(
        (edge1: R, edge2: R) =>
          (graph.right.get(edge1) as Set<L>).size -
          (graph.right.get(edge2) as Set<L>).size
      );

      graph.removeEdge(vertexLeft, rightVertices[0]);
      path = [vertexLeft, rightVertices[0]];
    } else {
      const leftVertices = Array.from(edgesLeft).sort(
        (edge1: L, edge2: L) =>
          (graph.left.get(edge1) as Set<R>).size -
          (graph.left.get(edge2) as Set<R>).size
      );

      graph.removeEdge(leftVertices[0], vertexRight);
      path = [leftVertices[0], vertexRight];
    }

    yield path;
  }
};

export default hopcroftKarp;

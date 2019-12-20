import BipartiteGraph from './bipartite-graph';
import hopcroftKarp from './hopcroft-karp';

describe('Hopcroft Karp algorithm', () => {
  test('should find max possible matches', () => {
    const graph = new BipartiteGraph<number, string>();

    graph
      .addEdge(1, 'a')
      .addEdge(1, 'b')
      .addEdge(2, 'a')
      .addEdge(3, 'b')
      .addEdge(4, 'b')
      .addEdge(4, 'c')
      .addEdge(4, 'd');

    const result = Array.from(hopcroftKarp(graph));

    expect(result).toMatchInlineSnapshot(`
      Array [
        Array [
          2,
          "a",
        ],
        Array [
          1,
          "b",
        ],
        Array [
          4,
          "c",
        ],
      ]
    `);
  });

  test('complex example', () => {
    const graph = new BipartiteGraph<string, string>();

    graph
      .addEdge('u0', 'v0')
      .addEdge('u0', 'v1')
      .addEdge('u1', 'v0')
      .addEdge('u1', 'v4')
      .addEdge('u2', 'v2')
      .addEdge('u2', 'v3')
      .addEdge('u3', 'v0')
      .addEdge('u3', 'v4')
      .addEdge('u4', 'v1')
      .addEdge('u4', 'v3');

    const result = Array.from(hopcroftKarp(graph));

    expect(result.length).toEqual(5);
  });

  test('empty graph', () => {
    const graph = new BipartiteGraph<string, string>();
    const result = Array.from(hopcroftKarp(graph));

    expect(result).toEqual([]);
  });
});

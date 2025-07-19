from collections import deque


class Node:
    def __init__(self, id, online):
        self.id = id
        self.online = online
        self.neighbours: dict[Node, int] = {}  # Neighbour and cost to reach it

    def __repr__(self) -> str:
        return f"Node({self.id})"

    def __str__(self) -> str:
        return f"Node({self.__dict__!r})"


class Solution:
    def findMaxPathScore(
        self, edges: list[list[int]], online: list[bool], k: int
    ) -> int:
        INF = 10**18

        nodes: list[Node] = []
        for i in range(len(online)):
            nodes.append(Node(i, online[i]))

        origin_node = nodes[0]
        target_node = nodes[-1]
        max_cost_edge = 0

        for _from, to, cost in edges:
            nodes[_from].neighbours[nodes[to]] = cost
            max_cost_edge = max(max_cost_edge, cost)

        for i in range(len(nodes)):
            # print(i, nodes[i])
            pass

        def bfs(min_edge: int):
            queue: deque[tuple[Node, int]] = deque()  # Node and accumulated_cost
            min_costs: list[int] = [INF] * len(nodes)

            queue.append((origin_node, 0))
            min_costs[origin_node.id] = 0

            while queue:
                node, accumulated_cost = queue.popleft()
                for neighbor, cost in node.neighbours.items():
                    if cost >= min_edge and neighbor.online:
                        next_cost = accumulated_cost + cost
                        if next_cost <= k and next_cost < min_costs[neighbor.id]:
                            min_costs[neighbor.id] = next_cost
                            if neighbor is target_node:
                                # print(f"    {min_edge} -> {min_costs}")
                                return True
                            queue.append((neighbor, next_cost))
            return False

        # print(1, bfs(1))
        # print(2, bfs(2))
        # print(3, bfs(3))
        # print(4, bfs(4))
        # print(5, bfs(5))
        # print(6, bfs(6))
        # print(7, bfs(7))
        # print(8, bfs(8))
        # print(9, bfs(9))
        # print(10, bfs(10))

        left, right = 0, max_cost_edge
        ans = -1
        while left <= right:
            middle = (left + right) // 2

            res = bfs(middle)
            if res:
                ans = middle
                left = middle + 1
            else:
                right = middle - 1

        return ans

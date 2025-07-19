from typing import List, cast
import math
import itertools
import functools
from collections import deque


class Solution:
    def countIslands(self, grid: List[List[int]], k: int) -> int:
        DIRECTIONS = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        visited = [[False for _ in range(len(grid[0]))] for _ in range(len(grid))]

        def bfs(start_i, start_j):
            total = 0
            queue = deque()

            queue.append((start_i, start_j))
            visited[start_i][start_j] = True

            while queue:
                i, j = queue.popleft()
                total += grid[i][j]
                for di, dj in DIRECTIONS:
                    ni, nj = i + di, j + dj
                    if (
                        0 <= ni < len(grid)
                        and 0 <= nj < len(grid[0])
                        and not visited[ni][nj]
                        and grid[ni][nj] > 0
                    ):
                        queue.append((ni, nj))
                        visited[ni][nj] = True

            return total

        islands_sums = []
        divisible = 0
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if not visited[i][j] and grid[i][j] > 0:
                    total = bfs(i, j)
                    islands_sums.append(total)
                    if total % k == 0:
                        divisible += 1

        return divisible

from typing import List, cast
import math

# import itertools
import functools


class Solution:
    def minCost(self, row: int, col: int, waitCost: List[List[int]]) -> int:
        INF = cast(int, math.inf)
        cache: List[List[int]] = [[INF] * col for _ in range(row)]
        # print(cache)

        def dp(i, j):
            if i < 0 or j < 0:
                return INF

            if i == 0 and j == 0:
                return 1

            if cache[i][j] != INF:
                return cache[i][j]

            cost = (
                min(
                    dp(i - 1, j),
                    dp(i, j - 1),
                )
                + (i + 1) * (j + 1)
                + waitCost[i][j]
            )

            cache[i][j] = cost
            return cost

        return dp(row - 1, col - 1) - waitCost[row - 1][col - 1]

    # -----------------------------------

    def minCost_tools(self, row: int, col: int, waitCost: List[List[int]]) -> int:
        INF = cast(int, math.inf)

        @functools.cache
        def dp(i, j):
            if i < 0 or j < 0:
                return INF

            if i == 0 and j == 0:
                return 1

            cost = (
                min(
                    dp(i - 1, j),
                    dp(i, j - 1),
                )
                + (i + 1) * (j + 1)
                + waitCost[i][j]
            )

            return cost

        return dp(row - 1, col - 1) - waitCost[row - 1][col - 1]

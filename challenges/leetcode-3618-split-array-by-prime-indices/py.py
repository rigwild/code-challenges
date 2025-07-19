import functools


class Solution:
    def splitArray(self, nums: list[int]) -> int:
        # @functools.cache
        # def isprime(n):
        #     if n <= 1:
        #         return False
        #     count = 0
        #     for i in range(1, n + 1):
        #         if n % i == 0:
        #             count += 1
        #     return count == 2

        @functools.cache
        def isprime(n: int) -> bool:
            if n < 2:
                return False
            if n == 2 or n == 3:
                return True
            if n % 2 == 0 or n % 3 == 0:
                return False
            for i in range(5, int(n**0.5) + 1, 6):
                if n % i == 0 or n % (i + 2) == 0:
                    return False
            return True

        a = []
        b = []
        for i in range(len(nums)):
            if isprime(i):
                a.append(nums[i])
            else:
                b.append(nums[i])
        return abs(sum(a) - sum(b))

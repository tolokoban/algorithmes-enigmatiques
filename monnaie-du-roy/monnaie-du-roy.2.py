# -*- coding: utf-8 -*-
import sys
import math
import time
import random

def createCandidate( size, m ):
    candidate = [1]
    while len(candidate) < size:
        n = random.randint(2, m)
        if n not in candidate:
            candidate.append( n )
    candidate.sort()
    return (candidate, score(candidate, m))

def isFine(n, coins):
	for a in coins:
		if a == n: return True
		for b in coins:
			if a + b == n: return True
	return False

def score(coins, m):
    s = 1
    for n in range(2, m + 1):
        if isFine(n, coins):
            s = s + 1
    return s

def improve(coins, m):
    bestCandidate = None
    bestScore = score(coins, m)
    for i in range(1, len(coins)):
        n = coins[i]
        for w in range(2, m + 1):
            if w == n: continue
            if w not in coins:
                coins[i] = w
                s = score( coins, m )
                if s > bestScore:
                    bestScore = s
                    bestCandidate = coins[:]
                    break
                coins[i] = n
    if bestCandidate == None:
        return None
    else:
        bestCandidate.sort()
        return (bestCandidate, bestScore)

def getWhatIsMissing(coins, m):
    result = []
    for n in range(1, m + 1):
        if not isFine(n, coins):
            result.append( n )
    return result

def solve(q=17, m=99):
    candidate = createCandidate(q, m)
    failures = 0
    while candidate[1] < m:
        print( "score =", candidate[1], "    ", candidate[0])
        sys.stdout.flush()
        nextone = improve(candidate[0], m)
        if nextone == None:
            missing = getWhatIsMissing( candidate[0], m )
            print("                Local minimum: ", missing)
            failures = failures + 1
            if failures > 99:
                nextone = createCandidate(q, m)
                failures = 0
            else:
                coins = candidate[0][:]
                coins[random.randint(1, len(coins) - 1)] = missing[random.randint(0, len(missing) - 1)]
                coins.sort()
                nextone = (coins, score(coins, m))
        candidate = nextone
    print("-" * 60)
    champion = candidate[0]
    print( champion )

start_time = time.time()
solve( 16, 99 )

t = time.time() - start_time
ss = t % 60
mm = math.floor((t - ss) / 60)
hh = math.floor(mm / 60)
mm = mm % 60
print("\nFound in", hh, "H", mm, "M", ss, "S")

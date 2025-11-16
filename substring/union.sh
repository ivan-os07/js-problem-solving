#!/bin/bash

touch result.txt

res1=$(node boyer-moore.js input1.txt input2.txt)
res2=$(node fsm.js input1.txt input2.txt)
res3=$(node hash.js input1.txt input2.txt)
res4=$(node kmp.js input1.txt input2.txt)

echo $res1 >> result.txt
echo -e $res2 >> result.txt
echo -e $res3 >> result.txt
echo -e $res4 >> result.txt

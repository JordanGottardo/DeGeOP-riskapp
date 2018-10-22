#!/bin/bash

SAVEIFS=$IFS
IFS=$(echo -en "\n\b")

REV="02-RP"
FILES=$(find ../$REV/ -type f -name "*.tex")

for f in $FILES;
do
	RES=$(grep -ni '\\subsubparagraph' $f)
	if [ -n "$RES" ]
	then
		echo "$f"
		echo "$RES"
	fi
done

IFS=$SAVEIFS

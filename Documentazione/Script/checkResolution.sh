#!/bin/bash

SAVEIFS=$IFS
IFS=$(echo -en "\n\b")


if [ -n "$1" ]
then
	MINRES=$1
else
	MINRES=720
fi
#MAXRES=2160;#4000

REV="02-RP"
FILES=$(find ../$REV/ -type f)

for f in $FILES;
do
	INFO=$(file $f)
	TYPE=$(echo $INFO | cut -d':' -f2 | grep -w "PNG image data")

	if [ -n "$TYPE" ]
	then
		
		FNAME=$(echo $INFO | cut -d':' -f 1)
		DIM=$(echo $INFO |  grep -o '[0-9]\{1,4\} x [0-9]\{1,4\}')
		W=$(echo $DIM | cut -d' ' -f 1)
		H=$(echo $DIM | cut -d' ' -f 3)

		#if [ $H -lt $MINRES ] && [ $W -lt $MINRES ]
		if [ $H -lt $MINRES ]
		#if [ $W -lt $MINRES ]
		then
			echo "$FNAME"
			#echo "$FNAME non rispetta la metrica!"
		#else
		#	echo "$FNAME rispetta la metrica."
		fi
	fi
done

IFS=$SAVEIFS

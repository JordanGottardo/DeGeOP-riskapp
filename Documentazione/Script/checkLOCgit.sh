#!/bin/bash

DAY=1
GITWD="../.git"

EMAILS=("daniel_DG@hotmail.it" "jordangottardo@libero.it" "giovanni.damo@studenti.unipd.it" "giulia.petenazzi@studenti.unipd.it" "giovanni@fastmail.se" "leojava@live.it platoronet@gmail.com")


while getopts ":d:" opt; do
	case $opt in
	d)
		if [[ "$OPTARG" =~ ^[0-9]+$ ]]
		then
			DAY=$OPTARG
		fi
	;;
	\?)
		echo "Invalid option: -$OPTARG" >&2
      		exit 1
	;;
	:)
		echo "Option -$OPTARG requires an argument." >&2
		exit 1
	;;
	esac
done

for e in ${EMAILS[*]}
do
	COUNTER=0
	GITLOG=$(git --git-dir=$GITWD log --no-merges --since="$DAY days ago" --format=format:"%ae" --shortstat | grep -A1 $e)
	CHANGES=$(echo $GITLOG | grep -o '[0-9]\{1,3\} insertions' | cut -d' ' -f1)

	for c in $CHANGES
	do
		COUNTER=$((COUNTER+$c))
	done

	echo -e "$e: \n\t$COUNTER linee aggiunte/modificate"
done


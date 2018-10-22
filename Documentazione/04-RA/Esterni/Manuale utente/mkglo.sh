#!/bin/bash
MAIN=$1
rm -f *.acn *.aux *.glo *.ist *.log *.out *.pdf *.toc *.acr *.alg *.glg *.gls
pdflatex $MAIN
makeglossaries ${MAIN%.tex}
pdflatex $1
pdflatex $1

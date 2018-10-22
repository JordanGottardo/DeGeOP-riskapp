import parseGoogle as google
import re
from copy import copy, deepcopy
import os
# from pprint import pprint

def glo( label, term ):
   return "\\glo{" + str(label) + "}{" + str(term) + "}";

def cmpMatch(match):
    return match[0].start(0)

def gloss(file, glossary, filter):
    file_input = open(file,'r')
    doc = file_input.read()
    file_input.close()
    filter = "|".join(filter)

    for label in glossary.keys():
        terms = glossary[label]
        Terms = [s.capitalize() for s in terms]
        terms = Terms + terms
        filter_pattern = re.compile(r'\\(%s)\s*{[^}]*(}\s*{[^}]*)*' % filter)

        matchArray = []
        for term in terms:
            term_pattern = re.compile(r'(?<!([a-zA-Z0-9:]))%s(?![a-zA-Z0-9])'%term)
            for match in re.finditer(term_pattern, doc):
                matchArray.append([match,term])
        matchArray.sort(key=cmpMatch)

        if (len(matchArray) > 0):
            found = False
            cnt = 0
            while (found == False and cnt < len(matchArray)):
                match = matchArray[cnt][0]
                for filter_found in re.finditer(filter_pattern, doc[:match.start(0)]):
                    pass
                if filter_found != None and filter_found.end(0) != match.start(0):
                    doc = doc[:match.start(0)] + glo(label, matchArray[cnt][1]) + doc[match.end(0):]
                    found = True
                cnt += 1

    # write to file
    out_file = open(file, "w")
    out_file.write(doc)
    out_file.close()

    return

def listGloss(files):
    (glossary, filter) = google.parseGoogle()
    for file in files:
        copyGlossary = deepcopy(glossary)
        print("processing: " + file)
        gloss(file, copyGlossary, filter)
    return

def warning(text):
    return '\033[93m' + text + '\033[0m'

def main():
    print(warning("this is a utility file - this is not the code you are looking for"))
    return

if __name__ == "__main__":
    main()

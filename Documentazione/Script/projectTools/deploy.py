import os
import sys
import glob
import shutil
import re
import parser
from pprint import pprint
from subprocess import call

def copytree(src, dst, symlinks=False, ignore=None):
    if not os.path.exists(dst):
        os.makedirs(dst)
    for item in os.listdir(src):
        s = os.path.join(src, item)
        d = os.path.join(dst, item)
        if os.path.isdir(s):
            copytree(s, d, symlinks, ignore)
        else:
            if not os.path.exists(d) or os.stat(s).st_mtime - os.stat(d).st_mtime > 1:
                shutil.copy2(s, d)

def preprocess(file):
    with open(file, 'r') as openFile:
        data = openFile.read()

    versionNumber = 0

    if gulp:
        data = data.replace('\\begin{document}', '\\begin{document}\n\tIntroduzione\n\tIntroduzione\n')

    if ("Verbale" in file):
        data = data.replace('\\usepackage{../../../Template/zemplateVerb}', '\\usepackage{../../../../Template/zemplateVerb-deploy}')
    else:
        reSult = re.search(r'\\docVersion{.*}', data)
        if (reSult):
            versionNumber = reSult.group(0)[12:17]

    if '%\includeGlossario' not in data:
        data = data.replace('\includeGlossario', '\externaldocument{../Esterni/Glossario_v2.0.0}')

    with open(file, 'w') as openFile:
        openFile.write(data)

    return versionNumber

compile = '-c' in sys.argv
gulp = '-g' in sys.argv

print()
print('Deploying')
if gulp or compile:
    print()
if gulp:
    print('gulpease mode activated')
if compile:
    print('compile mode activated: it will take a lot of time')
print()

pwd = "../../"
revisione = "04-RA/"
src = pwd + revisione
DEST = pwd + "Deploy/Zephyrus/"
interni = "Interni/"
esterni = "Esterni/"

ar = "Analisi dei requisiti"
gl = "Glossario"
lp = "Lettera di presentazione"
pp = "Piano di progetto"
pq = "Piano di qualifica"
np = "Norme di progetto"
sf = "Studio di fattibilita"
vb = "Verbali"
st = "Specifica tecnica"
mu = "Manuale utente"
mm = "Manuale manutentore"
ddp = "Definizione di prodotto"

docs = {}
lest = [ar, gl, pp, pq, vb, st, mm, mu, ddp] # manca lp perché richiede troppe robe da fare per compilarla inplace
lint = [np, vb] # sf non viene più consegnato
docs[esterni] = lest
docs[interni] = lint
folders = ['','sections/','img/']
formats = ['*.tex', '*.png']

if os.path.exists(os.getcwd() + "/" + DEST):
    shutil.rmtree(os.getcwd() + "/" + DEST)
for doctype in docs.keys():
    for folder in folders:
        os.makedirs(os.getcwd() + "/" + DEST + doctype + folder)
os.makedirs(os.getcwd() + "/" + DEST + interni + vb)
os.makedirs(os.getcwd() + "/" + DEST + esterni + vb)

files=[]
imgFolder=[]
for doctype in docs.keys():
    for doc in docs[doctype]:
        for folder in folders:
            path = pwd + revisione + doctype + doc + "/" + folder

            if folder == 'img/':
                for ffolder in os.walk(path):
                    if not (ffolder[0].endswith("img/")):
                        imgFolder.append([doctype, doc, ffolder[0]])

            for format in formats:
                for file in glob.glob(r'%s'%(path+format)):
                    filename = file.replace(path, "")
                    dest = DEST + doctype + folder
                    if folder == '': # main file
                        if (doc == vb):
                            dest = dest + vb + "/"
                    if(os.path.isfile(dest+filename) and not(filename.endswith('.png'))):
                       print("file: " + file)
                       print("already exists at: " + dest)
                       sys.exit(1)
                    shutil.copy(file, dest)
                    if (file.endswith(".tex")):
                        files.append([dest, filename])

# copy folders in all img/ folders to dest
for folder in imgFolder:
    copytree(folder[2], DEST + folder[0] + "/img/" + folder[2].split("/")[-1])

files = [file for file in files if "sections" not in file[0]]

gloIndex = [index for index in range(len(files)) if "Glossario" in files[index][1]][0]
gloFile = files[gloIndex]
files[gloIndex] = files[0]
files[0] = gloFile

for file in files:
    #if ("Verbale" in file[1]):
    print("processando: " + file[1], end=' ... ', flush=True)
    versionNumber = preprocess(file[0]+file[1])
    if versionNumber != 0:
        shutil.move(file[0]+file[1], file[0]+file[1][:-4]+'_v'+str(versionNumber)+'.tex')
        file[1] = file[1][:-4]+'_v'+str(versionNumber)+'.tex'
    if compile:
        with open("log.txt","w") as of:
            p = call(["pdflatex","-synctex=1","-interaction=nonstopmode",file[1]], cwd=file[0], stdout=of)
            p = call(["pdflatex","-synctex=1","-interaction=nonstopmode",file[1]], cwd=file[0], stdout=of)
            #p = call(["latexmk","-pdf",file[1]], cwd=file[0], stdout=of, stderr=of)
        if (p != 0):
            print()
            print("fail: " + file[1])
            print("error code: " + str(p))
            sys.exit(2)
    print("OK")

print()
print('fine')
print()

if compile:
    for root, dirs, files in os.walk(DEST):
        for currentFile in files:
            if not (currentFile.lower().endswith(".pdf")):
                os.remove(os.path.join(root, currentFile))

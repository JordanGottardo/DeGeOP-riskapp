                                            Guida Git v 1.0.2
                                          by Jordan, Giovanni D & Giovanni P
                  Ultimo changelog: 20/12/2016 by Giovanni P. Aggiunto git checkout

# Documenti

## 0. Riferimenti
* https://git-scm.com/doc
* https://www.atlassian.com/git/tutorials/

## 1. Configurazione
* ` git config --global user.name <Nome Cognome>` imposta il nome dell’utente, il quale comparirà come autore delle commit effettuate.
* ` git config --global user.email <e-mail> ` imposta l’e-mail dell’utente; deve essere impostata la stessa e-mail utilizzata per la registrazione su GitHub.

- - -

## 2. Creazione repository
* `git clone <URL repository remoto>` crea una copia locale di un repository remoto già esistente

- - -

## 3. Parte Locale
* `git status` fornisce una descrizione testuale dello stato dei file nel repository locale relativamente all’ultima commit. Evidenzia modifiche ai file, nuovi file, file rimossi. Inoltre differenzia tra le modifiche aggiunte alle staging area (“Changes to be committed”) e quelle ancora da aggiungere (“Changes not staged for commit”).
* `git log` elenca tutte le commit, a partire dall’ultima. Di ognuna mostra il codice identificativo sha, l’autore, la data e il messaggio.
* `git add <nomefile>` aggiunge alla staging area il file indicato.
* `git add --all` aggiunge alla staging area tutti i file modificati o non tracciati.
* `git commit -m "Messaggio per la commit"` Per validare le modifiche fatte. Ora il file è correttamente nell'HEAD(locale), ma **non ancora** nel repository remoto.
* `git checkout <commit> <file>` Per riportare il file alla versione del commit indicato, se nessun commit è fornito usa HEAD (può essere utile se si hanno modifica che **NON** si vogliono salvare o se si ha un file segnato come modifica e **NON** ci si ricorda le modifiche eseguite).

### 3.1 Operazioni su file
Per le operazioni sui file è consigliato utilizzare i seguenti comandi in modo che git possa tenere traccia delle modifiche:
* `git rm <file>` elimina un file
* `git mv <vecchio> <nuovo>` rinomina il file vecchio in nuovo
* `git mv <file> <dir/>` sposta il file in dir/

- - -

## 4. Parte Remota
* `git fetch origin` equivalente `git fetch` per aggiornare le informazioni del tuo repository locale **senza** scaricare anche gli eventuali file modificati, utile per vedere se è cambiato qualcosa nel repository remoto.
* `git pull origin <branch attuale>` equivalente `git pull` per aggiornare il tuo repository locale alla commit più recente del repository remoto.
* `git push origin master` equivalente a `git push` per inviare le modifiche locali presenti nella staging area al repository remoto. 
* `git stash` per accantonare in un'area temporanea le modifiche fatte alla staging area quando il pull non va a buon fine
* `git stash clear` per pulire del tutto l'area temporanea (perdendo le modifiche)


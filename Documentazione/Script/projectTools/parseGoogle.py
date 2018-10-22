import httplib2
import os
from apiclient import discovery
from oauth2client import client
from oauth2client import tools
from oauth2client.file import Storage

# from __future__ import print_function

try:
    import argparse
    flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
except ImportError:
    flags = None

# If modifying these scopes, delete your previously saved credentials
# at ~/.credentials/sheets.googleapis.com-python-quickstart.json
SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly'
CLIENT_SECRET_FILE = './keys/client_secret.json'
APPLICATION_NAME = 'Google Sheets API Python-glossary'

def getCredentials():
    credential_path = os.path.join('./keys/','sheets.googleapis.com-python.json')
    store = Storage(credential_path)
    credentials = store.get()
    if not credentials or credentials.invalid:
        flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, SCOPES)
        flow.user_agent = APPLICATION_NAME
        if flags:
            credentials = tools.run_flow(flow, store, flags)
        print('Storing credentials to ' + credential_path)
    return credentials

def parseData(values):
    map = {}
    for cnt, row in enumerate(values[1:]):
        if len(row) <= 1 or row[0] == "" or row[0] == None:
            print("wrong spreadsheet format: line " + str(cnt+1))
        else:
            list = []
            for value in row[1:]:
                if value != None and value != "":
                    list.append(value)
            map[row[0]] = list
    return map

def parseFilter(values):
    filter = []
    for value in values[1:]:
        if value != None and value != "":
            filter.append(value[0])
    return filter

def parseGoogle():
    credentials = getCredentials()
    http = credentials.authorize(httplib2.Http())
    discoveryUrl = ('https://sheets.googleapis.com/$discovery/rest?''version=v4')
    service = discovery.build('sheets', 'v4', http=http, discoveryServiceUrl=discoveryUrl)

    spreadsheetId = '1PZVS57KHYCAekCuckY_qm3F3yiFIJGNsVFefkr-vK4M'
    sheetId = '1663039515'

    rangeName = 'Labels!A:D'
    result = service.spreadsheets().values().get(spreadsheetId=spreadsheetId, range=rangeName).execute()
    values = result.get('values', [])

    if not values:
        print('No data found.')
        return
    else:
        data = parseData(values)

    rangeName = 'Filter!A:A'
    result = service.spreadsheets().values().get(spreadsheetId=spreadsheetId, range=rangeName).execute()
    values = result.get('values', [])

    if not values:
        print('No data found.')
        return
    else:
        filter = parseFilter(values)

    return (data, filter)

def warning(text):
    return '\033[93m' + text + '\033[0m'

def main():
    print(warning("this is a utility file - this is not the code you are looking for"))
    print("testing connection & google spreadsheet availability")
    (a, b) = parseGoogle()
    return

if __name__ == "__main__":
    main()
import json
from pprint import pprint
with open('DB Template.json') as json_data:
    d = json.load(json_data)
    json_data.close()
fields = ["Free Lunch", "LinkedIN","Facebook","Sanpchat","Gender","Birthdate","Language","Ethnicity"]
#Edits Student Fields
for user in d["Users"]:
    if(d["Users"][user]["isStudent"]):
        for field in fields:
            d["Students"][user][field]="null"
            if(field=="Birthdate"):
                d["Students"][user][field]={"Month":12,"Day":10}
with open('DB Template.json','w') as json_data:
    json.dump(d,json_data)
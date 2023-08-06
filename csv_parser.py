import pandas as pd

# data still needed to be cleaned up after parsing

with open('airports.csv', 'r', encoding="utf-8") as inp:
    lines = inp.readlines()

countries = ['Albania', 'Andorra', 'Austria', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 
             'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 
             'Georgia', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 
             'Malta', 'Moldova', 'Montenegro', 'Netherlands', 'Macedonia', 'Norway', 'Poland', 'Portugal', 
             'Romania', 'Russia', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 
             'Ukraine', 'United Kingdom', 'Georgia', 'Armenia', 'Azerbaijan']

rus_asia = ['Asia/Anadyr', 'Asia/Barnaul', 'Asia/Chita', 'Asia/Irkutsk', 'Asia/Kamchatka', 'Asia/Krasnoyarsk', 
            'Asia/Omsk', 'Asia/Srednekolymsk', 'Asia/Vladivostok', 'Asia/Yakutsk', 'Asia/Yekaterinburg']

with open('airports_euro.csv', 'w', encoding="utf-8") as out:
    for line in lines:
        if any(country in line for country in countries) and all(timezone not in line for timezone in rus_asia):
            out.write(line)

df = pd.read_csv('airports_euro.csv', encoding="utf-8")
del df['ID']
del df['timezone']
del df['DST']
del df['tz']
del df['type']
del df['source']

df.to_csv('airport_data.csv', index=False)
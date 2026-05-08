# API för registrering och inloggning
Detta är ett API som är byggt med express, node.js och SQLite som databas. Syftet med detta API är att hantera funktionalitet för registrering och inloggning på ett säkert sätt med JWT-autentisering, detta för att skydda känsliga resurser från obehöriga.

## Funktionalitet
Resistrering för användare, inloggning med användarnamn och lösenord, JWT-autentisering, skyddade routes, hashade lösenord med bycrypt, databaslagring med SQLite.

## Databas
Detta projekt använder en SQLite-databas för lagring av data. 

Tabell: user

| Fält | Beskrivning |
|---|---|
| id | Unikt ID |
| username | Användarnamn |
| password | Hashat lösenord |
| created_at | Datum då kontot skapades |

## Säkerhet
Flera återgärder har tagits till för att detta API ska vara så säkert som möjligt. Dessa visas här. Alla lösenord har hashats med bycrypt innan de sparas i databasen. Detta innebär att lösenordet aldrig sparas i klartext. Sedan skapas även en JWT-token vid inloggning som används för att autentisera användaren vid anrop till skyddade routes.

## Testning
Detta API har testats med Thunder Client i Visual Studio Code. 

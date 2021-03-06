# [Cortex Back End Developer Challenge][project] - Solution

This larger solution was made possible by a PluralSight course, [Node.js: Getting Started][pluralSight], and a tutorial I used to get started, [How To Write An Express JS Server Using Test Driven Development][tutorial].
## Installation
The first thing needed for installing this project is a local installation of a mongo database.

To install this project, run the following commands in the root directory.
```
npm i global yarn
```
The command window will likely need to be restarted after that.
```
yarn
```
There are now three ways to run the solution.
### Testing
To run tests and see their results.
```
yarn run test
```
### Development Mode
The following command will allow you to run in development mode.
```
yarn run dev
```
Included with the project, in the postman folder, is a collection of already setup calls to test the solution in development mode.
### Production Build
The following command will build the project for release, using Babel to ensure the code is ready to be supported in whatever environment it is needed in. This utilizes Babel, a node package that compiles javascript code in a way that allows it to be supported widely while still using new features in your code.
```
yarn run build
```
The result of the build will be copied to the dist directory, which can then be distributed where installation is needed.
## Development Notes
### Development Decisions
Below I would like to document some of the decisions I made while developing this project and why I made them. 
1. Node.js: Being unfamiliar with the language, I had to focus a large amount of my time on familiarizing myself with its practices and quirks. This will be one of the biggest factors that motivates other decisions.
1. Testing: I normally would include a large amount of unit tests in my code. However, I did not have the time I would have liked for that here. Instead of the unit tests I would normally have added, I have integration tests that work with the database and show that the system is behaving as it should. These tests are inspired by the article I sited above.
1. Dependency Injection: To me, one of the largest leaps in my coding has been the use of dependency injection. It allows much easier separation of layers and the use of mocking and unit tests. I think the ability to learn the practice in this new system was outside of the scope for me here.
1. Mongo: I have spent most of my career as a developer works with normal transaction-SQL databases. This was my first time working with Mongo and I found the implementation incredibly quick and easy. I however think I find the lack of data integrity somewhat unnerving and am not sure how I would feel about it in anything beyond small projects.
1. Docker: This was one of the last things I was able to get working. I had to change my connection strings for my Mongo Db to make this even work properly. I am leaving my project in a state where it will run outside of docker, but by changing the 3 connection string files in config so that localhost is replaced with host.docker.internal, then building for docker, it will be able to run in docker and still connect to the local mongo database. I was able to get this working with docker for Windows, which in my research seems to work differently than other versions as well.
### System Decisions
Here are some decisions that I chose to make about the system itself as I was designing it.
1. Average hp: For myself, when I have played D&D 5th edition, I have made characters using the rule of making characters with the average number per level, so I gravitated towards that rule for this system.
1. First level: One rule that was missing from the documentation was that the first level for a character is supposed to be max hit points (regardless of hp determination method). I thought this was an import rule and assumed the first listed class was the level 1 class and used it to give max hit points. 
1. JSON errors: I began writing custom errors for missing JSON sections. I realized that granted the amount of time I had, this would quickly escalate and chose to instead simply stick to a 500 error for now.
1. JSON cast: One of the first hurdles I hit was realizing the JSON supplied had different casing for different examples of the same field. I had to find a solution to make sure all property names were imported as lowercase to allow me to not hit errors from this. I found a similar issue might come up with damage types and made changes to stop this from happening as well.  
### Suggested Enhancements
Here are some enhancements I wanted to make beyond what I detailed above. I either did not have time or had to prioritize other items above these.
1. Validate Damage Types: D&D has a set amount of damage types. I wanted to be able to validate the type of damage that was used was a valid one.
1. Damage without a type: Often when assigning damage to a character, the player has already done the work of resistances and immunities. This means there might be times they want to send in untyped damage that ignores these rules and just assigns damage.
1. First level: Find a way to pass in on character creation which class is the characters first level. This does not make a huge difference, but it's a nonzero difference in hit points.
1. Long Rest: ~~This is low hanging fruit. Pass in the ability to give a character a long rest. This would reset their hit points to max and their temporary hit points to 0.~~ I decided at the last moment to add this on. I knew it would not take me long and put it in before finalizing.
1. Short Rest: Harder than a long rest and would modify long rest. You can add in the ability to spend hit dice, maintain the dice, and heal based on them. long rests would then recover half of their hit dice (minimum of 1) each time.
1. Item Update: The default JSON character given had an item added that would add to the character's constitution. However, the Ioun stone that was added should technically be implemented not as a modifier of 2 but as "+2" with a max of 20. The current system also does not allow for an Amulet of Health to be implemented, which would replace Constitution with 19 if it is lower than that. 
---
## API Documentation<br />
---
## **Get All Characters**
---
Get all characters stored in the system.
* **URL**<br />
  <//api/v1/character>
* **Method:**  
  <_`GET`_>  
* **Success Response:** 
  * **Code:** 200 <br />
    **Content:** `characterReturn[]`
* **Error Response:**
  * **Code:** 500 Interval server error <br />
    **Content:** `{message: "Interval server error"}`
---
## **Get Character**
---
Get a character by _characterId_.
* **URL**
  <//api/v1/character/*characterId*>
* **Method:**  
  <_`GET`_>
  * **Params**
``` 
      characterId=[string]
```
* **Success Response:**  
  * **Code:** 200 <br />
    **Content:** `characterReturn` 
* **Error Response:**
   If no character is found for _characterId_.
  * **Code:** 204 No Content<br />
  **Content:** `{message: "No Content"}`<br />
  OR
  * **Code:** 500 Interval server error <br />
  **Content:** `{message: "Interval server error"}`
---
## **Create Character**
---
Create a new character in the system and set their initial hit points.
* **URL**<br />
  <//api/v1/character>
* **Data Params**<br />
    The body should be a JSON object representing a character as defined by the original project request.
* **Method:**  
  <_`POST`_>  
* **Success Response:** 
  * **Code:** 200 <br />
    **Content:** `characterReturn` 
* **Error Response:**
  * **Code:** 500 Interval server error <br />
---
## **Get Character Hp**
---
Get hit points for _characterId_.
* **URL**<br />
  <//api/v1/character/*characterId*/hp>
* **Method:**  
  <_`GET`_>
*  **Params**<br />
  ```
      characterId=[string]
  ```
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `currentHp`
* **Error Response:**
   If no character is found for _characterId_.
  * **Code:** 204 No Content<br />
    **Content:** `{message: "No Content"}`<br />
  OR
  * **Code:** 500 Interval server error <br />
    **Content:** `{message: "Interval server error"}`
---
## **Assign Character Damage**
---
Assign *damage* points of *damageType* damage to *characterId*.
* **URL** <br/>
  <//api/v1/character/*characterId*/damage/*damageType*/*damage*>
* **Method:**<br/>
  <_`POST`_>  
* **Params**<br/>   
```
    characterId=[string]
    damageType=[string]
    damage=[number]
```
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `damageDealt`
* **Error Response:**<br />
If no character is found for *characterId*.
  * **Code:** 204 No Content<br />
    **Content:** `{message: "No Content"}`<br />
    OR
  * **Code:** 500 Interval server error <br />
    **Content:** `{message: "Interval server error"}`
---
## **Heal Character**
---
Heals *characterId* for *hp* points.
* **URL** <br/>
  <//api/v1/character/*characterId*/hp/*hp*>
* **Method:**<br/>
  <_`POST`_>  
* **Params**<br/>   
```
    characterId=[string]
    hp=[number]
```
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `currentHpChange`
* **Error Response:**<br />
If no character is found for *characterId*.
  * **Code:** 204 No Content<br />
    **Content:** `{message: "No Content"}`<br />
    OR
  * **Code:** 500 Interval server error <br />
    **Content:** `{message: "Interval server error"}`
---
## **Heal Character**
---
Assign *characterId* *tempHp* temporary hit points.
* **URL** <br/>
  <//api/v1/character/*characterId*/tempHP/*tempHP*>
* **Method:**<br/>
  <_`POST`_>  
* **Params**<br/>   
```
    characterId=[string]
    tempHP=[number]
```
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `currentHpChange`
* **Error Response:**<br />
If no character is found for *characterId*.
  * **Code:** 204 No Content<br />
    **Content:** `{message: "No Content"}`<br />
    OR
  * **Code:** 500 Interval server error <br />
    **Content:** `{message: "Interval server error"}`
---
## **Long Rest**
---
Gives *characterId* a long rest.
* **URL** <br/>
  <//api/v1/character/*characterId*/longRest>
* **Method:**<br/>
  <_`POST`_>  
* **Params**<br/>   
```
    characterId=[string]
```
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `currentHpChange`
* **Error Response:**<br />
If no character is found for *characterId*.
  * **Code:** 204 No Content<br />
    **Content:** `{message: "No Content"}`<br />
    OR
  * **Code:** 500 Interval server error <br />
    **Content:** `{message: "Interval server error"}`
---
## **Return Objects**
---
* **currentHp**
```
{
  "characterId": "string; characterId from database",
  "currentHp": "number; character's hp when call was complete",
  "maxHp": "number; comes from database",
  "tempHp": "number; character's tempHp when call was complete",
}
```
* **currentHpChange extends currentHp**
```
{
  "previousHp": "number; hp when call was initiated",
  "previousTempHp": "number; tempHp when call was initiated",
}
```
* **damageDealt extends currentHpChange**
```
{
  "damage": "number; damage that was sent in by call",
  "damageTaken": "number; damage character took after calculations",
  "damageType": "string; the damage type of the attack",
  "resistance": "string: any resistance that is relative to the attack"
  "immunity": "string: any immunity that is relative to the attack"
}
```
* **characterReturn extends currentHp**
```
{
  "character": "JSON; The character data passed into the database"
}
```


[//]: # (Links used in documentation.)

[tutorial]: <https://medium.com/developer-circles-lusaka/how-to-write-an-express-js-server-using-test-driven-development-921dc55aec07>

[project]: <https://github.com/DnDBeyond/cortex-back-end-developer-challenge/blob/master/README.md>

[pluralSight]: <https://app.pluralsight.com/library/courses/nodejs-getting-started/table-of-contents>
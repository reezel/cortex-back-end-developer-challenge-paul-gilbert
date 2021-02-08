# [Cortex Back End Developer Challenge][project] - Solution

This solution was larger made posssible by a PluralSight course, [Node.js: Getting Started][pluralSight], and a tutorial I used to get started, [How To Write An Express JS Server Using Test Driven Development][tutorial].


## Installation

To install this project, run the following commands in the root directory.

```sh
npm i global yarn
```
The command window will likely need to be restarted after that.

```sh
yarn
```
There are now three ways to run the solution

### Testing

To run tests and see their results
```sh
yarn run test
```

### Development Mode

The following command will allow you to run in development mode.

```sh
yarn run dev
```
Included with the project, in the postman folder, is a collection of already setup calls to test the solution in development mode.

### Production Build

The following command will build the project for release, using Babel to ensure the code is ready to be supported in whatever environment it is needed in.

```sh
yarn run build
```
The result of the build will be copied to the dist directory, which can then be distributed where installation is needed.

## API Documentation
<br />

----
## **Get All Characters**
----
  Get all characters stored in the system.

* **URL**

  <_//api/v1/character_>

* **Method:**
  
  <_`GET`_>  
  

* **Success Response:**
 
  * **Code:** 200 <br />
    **Content:** `characterReturn[]`
 
* **Error Response:**

  * **Code:** 500 Interval server error <br />
    **Content:** `{ message : "Interval server error" }`
----
## **Get Character**
----
Get a character by <em>characterId</em>.

* **URL**

  <<em>//api/v1/character/</em>characterId>

* **Method:**
  
  <_`GET`_>  

  *  **Params**   

   **Required:**
 
   `characterId=[string]`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `characterReturn`
 
* **Error Response:**

   If not character is found for <em>characterId<em>.

  * **Code:** 204 No Content<br />
  **Content:** `{ message : "No Content" }`

    OR

  * **Code:** 500 Interval server error <br />
  **Content:** `{ message : "Interval server error" }`
----
## **Create a new character**
----
  Create a new character in the system. Sets their initial hit points.

* **URL**

  <_//api/v1/character_>

* **Data Params**

    The body should be a JSON object representing a character as defined by the original project request.

* **Method:**
  
  <_`POST`_>  
  
* **Success Response:**
 
  * **Code:** 200 <br />
    **Content:** `characterReturn[]`
 
* **Error Response:**

  * **Code:** 500 Interval server error <br />
----
## **Get Character's hit points**
----
Get a character's hit points by <em>characterId</em>.

* **URL**

  <<em>//api/v1/character/</em>characterId<em>/hp</em>>

* **Method:**
  
  <_`GET`_>  

  *  **Params**   

   **Required:**
 
   `characterId=[string]`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `currentHp`
 
* **Error Response:**

   If not character is found for <em>characterId<em>.

  * **Code:** 204 No Content<br />
  **Content:** `{ message : "No Content" }`

    OR

  * **Code:** 500 Interval server error <br />
  **Content:** `{ message : "Interval server error" }`



[//]: # (Links used in documentation.)

[tutorial]: <https://medium.com/developer-circles-lusaka/how-to-write-an-express-js-server-using-test-driven-development-921dc55aec07>

[project]: <https://github.com/DnDBeyond/cortex-back-end-developer-challenge/blob/master/README.md>

[pluralSight]: <https://app.pluralsight.com/library/courses/nodejs-getting-started/table-of-contents>
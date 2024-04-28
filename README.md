# Picture modification API

TypeScript | Node.js | Express | Sharp | Jasmine | Supertest | Eslint | Prettier 

Picture modification API that resizes and saves pictures to user specific folder when visiting URL.

## Instructions

#### 1. **Install the dependencies**

```bash
  npm install
```

#### 2. Now you can **use the following scripts**:

```bash
  npm run test
```
```bash
  npm run start
```

- test: to test endpoint and picture modification
- start: to start the server

#### 3. After that you should **write the path in the browser**.

Example of endpoint: http://localhost:3000/api/pictures?filename=bridge&width=200&height=200 .

In this app you can change parameters in the path above: filename, width, heigth.

The list of pictures is provided. Use the following filenames:
- bridge
- sunset

Input width and height dimensions in pixels you want to resize.

#### 4. **A new resized picture will be stored locally** in specified folder for thumb pictures `assets/thumb`.  
Subsequent calls to the same endpoint will not recreate the picture. 


The original pictures place in the folder `assets/original`. In this app you can use only .jpg extention. 
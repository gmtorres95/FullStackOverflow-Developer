# FullStackOverflow-Developer

Find the best answers to your code related question  
Link of the API: https://fsod.herokuapp.com

## Technologies

<div styles="display: flex">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" />
</div>

## How to use the API

### POST /users

With this route you can create an account.    
<details>
  <summary>Send a JSON like this one:</summary>

  ```bash
  {
    "name": "My Name",
    "class": "T2" 
  }
  ```
</details>
<details>
  <summary>And the return is another JSON, like this one:</summary>

  ```bash
  {
    "token": "aebf4dd8-5bf9-11ec-bf63-0242ac130002"
  }
  ```
</details>

### POST /questions

With this route you can post a question to the community.  
<details>
  <summary>Send a JSON like this one:</summary>

  ```bash
  {
    "question": "How do I print 'HELLO WORLD'?",
    "student": "My Name",
    "class": "T2",
    "tags": "typescript, code, javascript, helloWorld"
  }
  ```
</details>
<details>
  <summary>And the return is another JSON, like this one:</summary>

  ```bash
  {
    "id": 3224
  }
  ```
</details>
<details>
  <summary>Don't forget to send a header like this one:</summary>

  ```bash
  {
    headers: { Authorization: `Bearer ${token}` }
  }
  ```
</details>

### POST /questions/:id

With this route you can post an answer to someone else's question.  
The author of the answer will receive the same amount of score of the question as points to his profile.  
<details>
  <summary>Send a JSON like this one:</summary>

  ```bash
  {
    "answer": "Try using console.log()" 
  }
  ```
</details>
<details>
  <summary>Don't forget to send a header like this one:</summary>

  ```bash
  {
    headers: { Authorization: `Bearer ${token}` }
  }
  ```
</details>

### Get /questions

With this route you can get a list of unanswered questions.   
<details>
  <summary>This route will return a JSON like this one:</summary>

  ```bash
  [
    {
      "id": 123,
      "question": "How do I print 'HELLO WORLD'?", 
      "student": "My Name", 
      "class": "T2",
      "score": 31
      "submitAt": "2021-01-01 10:12"
    },
    ...
  ]
  ```
</details>
<details>
  <summary>Don't forget to send a header like this one:</summary>

  ```bash
  {
    headers: { Authorization: `Bearer ${token}` }
  }
  ```
</details>

### Get /questions/:id

With this route you can get details of someone else's question.   
<details>
  <summary>This route will return a JSON like this one (UNANSWERED):</summary>

  ```bash
  {
    "question": "How do I print 'HELLO WORLD'?", 
    "student": "My Name", 
    "class": "T2",
    "tags": "typescript, code, javascript, helloWorld",
    "score": 31,
    "answered": false,
    "submitAt": "2021-01-01 10:12"
  }
  ```
</details>
<details>
  <summary>Or like this one (ANSWERED):</summary>

  ```bash
  {
    "question": "How do I print 'HELLO WORLD'?", 
    "student": "My Name", 
    "class": "T2",
    "tags": "typescript, code, javascript, helloWorld",
    "score": 31,
    "answered": true,
    "submitAt": "2021-01-01 10:12",
    "answeredAt": "2021-01-01 10:30"
    "answeredBy": "Not My Name",
    "answer": "Try using console.log()"
  }
  ```
</details>
<details>
  <summary>Don't forget to send a header like this one:</summary>

  ```bash
  {
    headers: { Authorization: `Bearer ${token}` }
  }
  ```
</details>

### PUT /questions/:id/upvote

With this route you can upvote a question you like.  
If the ```:id``` param is a valid question ID then it will increase the question score by 1 point.
<details>
  <summary>Don't forget to send a header like this one:</summary>

  ```bash
  {
    headers: { Authorization: `Bearer ${token}` }
  }
  ```
</details>

### PUT /questions/:id/downvote

Just like upvote, this route allows you to downvote a question you don't like.  
If the ```:id``` param is a valid question ID then it will decrease the question score by 1 point.  
<details>
  <summary>Don't forget to send a header like this one:</summary>

  ```bash
  {
    headers: { Authorization: `Bearer ${token}` }
  }
  ```
</details>

### GET /ranking

With this route you will get a list of the top 10 students ordered by points.  
<details>
  <summary>This route will return a JSON like this one:</summary>

  ```bash
  {
    "name": "My Name",
    "answers": 64,
    "points": 79
  },
  {
    "name": "Not My Name",
    "answers": 68,
    "points": 71
  },
  ...
  ```
</details>
<details>
  <summary>Don't forget to send a header like this one:</summary>

  ```bash
  {
    headers: { Authorization: `Bearer ${token}` }
  }
  ```
</details>


## How to run

### Install the application

```bash
# Clone this repository
$ git clone https://https://github.com/gmtorres95/FullStackOverflow-Developer

# Install the dependencies
$ npm i
```

### Configure the .env file

Use the .env.example file

### Run the application

```bash
$ npm run start
```

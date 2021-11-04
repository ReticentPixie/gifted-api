# Gifted API Overview
The Gifted API is a RESTful backend only API built to support the Gifted React frontend application. The API utilizes MongoDB for data storage/management and Google Firebase for authentication.

To see the API in action check out the Gifted app here(insert netlify link)



# Technologies Used
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)     ![Nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)     ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)     ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)     ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)     ![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)


# Resources
### **Transactions**
Transactions are the receipt or log of a given gift.

| Endpoint | HTTP Method | Action | Notes |
| ---------- | ---------- | ---------- | ---------- |
| /api/transactions | GET | index | get all transactions |
| /api/transactions | POST | create | create a new transaction |
| /api/recipients/:id | DELETE | delete | delete a single recipient by id |

### **Recipients**
Recipients are the gift receivers.

| Endpoint | HTTP Method | Action | Notes |
| ---------- | ---------- | ---------- | ---------- |
| /api/recipients | GET | index | get all recipients |
| /api/recipients | POST | create | create a new recipient |
| /api/recipients/:id | GET | show | get a single recipient by id |

### **Events**
Events are the various holidays and reasons a gift is given.

| Endpoint | HTTP Method | Action | Notes |
| ---------- | ---------- | ---------- | ---------- |
| /api/events | GET | index | get all events |



# IceBox - Future Enhancements
The Gifted API is designed to scale with the Gifted React App. Future enhancements will include:
- additional routes and available data
- improved documentation including site navigation
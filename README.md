# Coffee E-Commerce Application

## Overview

* An application that sells a wide assortment of coffee to both guests and signed-in users. This application was built using JavaScript (React) and backed with
PostgreSQL. 

## Customize

Now that you've got the code, follow these steps to get acclimated:

* Update project name and description in `package.json`
* `npm install`
* Create two postgres databases (`MY_APP_NAME` should match the `name`
  parameter in `package.json`):
* These commands will create both your **development** and **test** databases

```
createdb <YOUR APP NAME HERE FROM package.json>
createdb <YOUR APP NAME HERE FROM package.json>-test
```

* By default, running `npm test` will use your test database, while
  regular development uses development database

## Start

Sync and seed your database by running `npm run seed`. Running `npm run start:dev` will make great things happen!

- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database (this is useful when you are making schema changes and you don't want to run your seed script separately)


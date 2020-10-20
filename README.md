# phable-care-assignment
This repo contains assignment for phable care.

## Application setup

### Rabbit MQ
1. Install Rabbit MQ.
2. Run Rabbit MQ and change config in env to point to RabbitMQ host and port.

### MySql

1. Install and run MySql Server.
2. Change config in env to point to Mysql host and port with credentials.

### Running Application

* Install Dependencies.
```shell script
npm install
```
* start server.
```shell script
# Or node app.js
npm start
```

### Curls

#### - Save rules to DB
```
curl --location --request POST 'localhost:3000/rule/update-rules' --form 'file=@/Users/sridharswain/Downloads/Phable Test - Sheet1 (3).csv'
```

#### - Get Rules by medicine id
```
curl --location --request GET 'localhost:3000/medicine/3'
```

#### - Get Rules by rule status(EXPIRED/ONGOING/FUTURE)
* Gets all future rules
```
curl --location --request GET 'localhost:3000/rule/get-rules/FUTURE'
```

* Gets all expired rules
```
curl --location --request GET 'localhost:3000/rule/get-rules/EXPIRED'
```

* Gets all ongoing rules
```
curl --location --request GET 'localhost:3000/rule/get-rules/ONGOING'
```

### How it works?

* While saving the rules, `csvtojson` library is used to read csv file and convert it to json.
After that validation happens for the rows to check if the row is valid, for example, if 
startDate is lesser than endDate, etc. After that it is pushed to queue for further processing
like mapping and saving to DB.

* All get call calls go through `sequelize` library which provides ORM in NodeJS.

* `node-schedule` runs a cron job which reads rules from db and puts to queue to be updated 
checking the startDate and endDate with currentDate.

### Scope of improvement and future work
* While updating or adding rules lock has to be put on the composite key(vendorId, medicineId).
* Different function declaration types and case were used in the code for the sake of assignment.
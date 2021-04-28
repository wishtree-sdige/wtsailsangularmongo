Shell Application

This project is an accelerator project which would help you cut down the initial development and setup of a MSRN ( MongoDB, Sails. js, React, and Node. js ).

For development, you will only need Docker installed in your environement.

Run project using docker
1) docker-compose build 
2) docker-compose up

Note: Can not run project using docker because redis configuration is not implemented in docker. 

This project contains:

1) Login using local startegy of passport
2) New user registration
3) Session handling using redis also stored logedin user object in redis and set TTL to 23:59:59:999
4) Validate request parameter at back-end
5) Setup eslint using airbnb-base rule
6) Audit log for every request
7) Logger framework
8) Sockets implementation to send notification on edit profile
9) Scheduler to send email to user
10) Use bootstrap.js for checking logger, redis setup and also create admin user in it.
11) Follow Controller => Service => Model Architecture 
12) MongoDB connection with sails
13) Different environment setup
14) Proper handling of routes
15) Authenticate and authorise poilicy
16) Use uniqid npm module to generate unique id 
17) Use bcrypt npm module for password encryprion
18) All error message should be in one file
19) Docker setup
20) File upload functionality
21) Moment.js to perform date related operation
22) Email template
23) Rate Limiting
24) Intergration with sentry
25) Mysql support
26) Mongoose with sails(fetch/create record)

Controllers:

You can your new controller in controllers folder.
In controller you have to validate request parameter and then call service to execute business logic and then take response comming from service and give to front-end.
You can refer registration action in UserController available at /api/coisAuthenticatedntrollers/UserController.js

Services:

You can add your new service in service folder.
You have to write all business logic in service.
For this you refer UserService.js available at /api/services/UserService.js

Model:

In this you have to specify collection name(optional), attributes of collection, queries that you want to perform on that collection.
You can refer User.js available at /api/models/User.js

Poilicies

You can write authentication and authorization policies in this folder.
You can refer /api/policies/isAuthenticated.js or /api/policies/isAdmin.js

Email Template:

You can create you own email template (html and style) in templates folder of services.
You can refere user-email folder available at /api/services/templates/user-email to create you own email template

bootstrap.js

Code written in this file is executed at sails start up so in this you can check database setup, logger setup, create super admin user. 

routes.js

Specify routes used in application in this file available at /config/routes.js
Routes which are used by react(or any front end) should be prefix with api
*  Example :
*  methodName /api/routeName:{
*   controller: 'controllerName',
*   action: 'actionName',
* }

policies.js

You can use this file to apply policies written in api/policies folder to actions in controller or controller.
available at /config/policies 

http.js

http.js is middleware of sails application where you can write code that you want to execute for every request.
You can refer http.js available at /config/http.js

messages.js

You can put all message used in application in this file.
You can refer messages.js available at /config/messages.js


Environement Setup:

env folder contain different environement files(development, docker, production).
Before deployemnt make sure all files setup with proper configuration
You can refer development.js available at /config/env/development.js




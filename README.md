# Getting Started with Red cross Ålesund



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



# Installation progress
Get the project from version control 
Install node.js, then use node to install yarn(https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
Run yarn install to download packages



# Running the application
To start the front-end application run yarn start
To start the back-end application run  mvn spring-boot:run 

# Create admin user
To create an admin user simply type in admin in the name field when registering a user

# Env files
In the redcross folder you need an .env 
file with this content: REACT_APP_API_BASE_URL=http://localhost:8080/api

# application.properties
spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.PostgreSQLDialect
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

## PostgreSQL
spring.datasource.url=jdbc:postgresql://10.212.27.113:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=mypass

spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
jwt_secret_key=gammainalkmknepaalknaielpwoqoasmvbbbehjhajsdiiw

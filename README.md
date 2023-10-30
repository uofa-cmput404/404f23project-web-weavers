CMPUT404-project-socialdistribution
===================================

CMPUT 404 Project: Social Distribution

[Project requirements](https://github.com/uofa-cmput404/project-socialdistribution/blob/master/project.org) 

Contributors / Licensing
========================

Authors:
    
* Gary Ng Kwong Sang
* Genna Cockburn
* Jacqueline Azarcon
* Shanemel Asuncion
* Sparsh Thakur

Generally everything is LICENSE'D under the GNU GPLv3.

## API Documentation
The API Documentation can be found at http://127.0.0.1:8000/api/schema/swagger-ui after running
```bash
python3 manage.py runserver
```
## Setting up the development environment
### Installing dependencies

Install the python dependencies
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
python3 -m pip install -r requirements.txt
```

## Setting up the database
#### For Linux Users
First, make sure that the PostgreSQL server is started:
`sudo service postgresql start`
And check that it's accepting connections:
`sudo pg_isready`
The response should be something along the lines of `/var/run/postgresql:5432 - accepting connections`

Now, we setup the database (for real this time). We first switch to the *postgres* system user account:
```
$ sudo -u postgres psql postgres
```
You should be inside PostgreSQL's database shell (indicated by the 'postgres=#'). Change the password of the 'postgres' account as follows:
```
postgres=# \password postgres
Enter new password for user "postgres": 12345
Enter it again: 12345
postgres=# \q
```
There'll be an issue with peer authentication, we'll fix that by changing a line in a file. Use whatever editor you like:
`sudo vim /etc/postgresql/[version]/main/pg_hba.conf`
where [version] is the version of the PostgreSQL you installed. 
Scroll down until the lines
```
# Database administrative login by Unix domain socket
local   all             postgres                                peer

# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     peer
```
and change `peer` to `md5` as follows:
```
# Database administrative login by Unix domain socket
local   all             postgres                                md5

# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     md5
```
And we'll restart PostgreSQL for the changes to take effect:
`sudo service postgresql restart`

Now we'll create our database:
```
psql -U postgres -W
postgres=# CREATE DATABASE "web-database";
postgres=# \q
```

## For Frontend
#### Install Node
```bash
sudo apt install nodejs npm
```

#### Install Dependencies
```bash
cd frontend
cd social-distribution
npm install --legacy-peer-deps
```

#### For Running Frontend
```bash
cd frontend
cd social-distribution
npm start 
```

#### For Windows Users
Pgadmin4 should be installed along with your installation of PostgreSQL.
Follow the tutorial [here](https://www.youtube.com/watch?v=KqcS3P32s6Y)
and create a database named "web-database", with its password being "12345".

## References  
Authentication: https://dev.to/koladev/django-rest-authentication-cmh
Pagination: https://stackoverflow.com/questions/35830779/django-rest-framework-apiview-pagination

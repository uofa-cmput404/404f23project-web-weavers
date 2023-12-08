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

Links
========================
Backend: https://web-weavers-backend-fb4af7963149.herokuapp.com/

Frontend: https://web-weavers-2df78f.netlify.app/

Backend Credentials:

Frontend Credentials:

User Stories
========================
- [x] As an author I want to make public posts.
- [x] As an author I want to edit public posts.
- [x] As an author, posts I create can link to images.
- [x] As an author, posts I create can be images.
- [x] As a server admin, images can be hosted on my server.
- [x] As an author, posts I create can be private to another author (WW allows creating a private post and sharing it to another user via the reshare option)
- [x] As an author, posts I create can be private to my friends
- [x] As an author, I can share other author's public posts
- [x] As an author, I can re-share other author's friend posts to my friends
- [x] As an author, posts I make can be in simple plain text
- [x] As an author, posts I make can be in CommonMark
- [x] As an author, I want a consistent identity per server
- [x] As a server admin, I want to host multiple authors on my server
- [x] As a server admin, I want to share public images with users
     on other servers.
- [x] As an author, I want to pull in my github activity to my "stream"
- [x] As an author, I want to post posts to my "stream"
- [x] As an author, I want to delete my own public posts.
- [x] As an author, I want to befriend local authors
- [x] As an author, I want to befriend remote authors
- [x] As an author, I want to feel safe about sharing images and posts
     with my friends -- images shared to friends should only be
     visible to friends. [public images are public]
- [ ] As an author, when someone sends me a friends only-post I want to
     see the likes.
- [x] As an author, comments on friend posts are private only to me the
     original author.
- [x] As an author, I want un-befriend local and remote authors
- [x] As an author, I want to be able to use my web-browser to manage
     my profile
- [x] As an author, I want to be able to use my web-browser to manage/author
     my posts
- [x] As a server admin, I want to be able add, modify, and remove
     authors.
- [x] As a server admin, I want to OPTIONALLY be able allow users to sign up but
     require my OK to finally be on my server
- [x] As a server admin, I don't want to do heavy setup to get the
     posts of my author's friends.
- [x] As a server admin, I want a restful interface for most operations
- [x] As an author, other authors cannot modify my public post
- [x] As an author, other authors cannot modify my shared to friends post.
- [x] As an author, I want to comment on posts that I can access
- [x] As an author, I want to like posts that I can access
- [x] As an author, my server will know about my friends
- [x] As an author, When I befriend someone (they accept my friend request) I follow them, only when
     the other author befriends me do I count as a real friend -- a bi-directional follow is a true friend.
- [x] As an author, I want to know if I have friend requests.
- [x] As an author I should be able to browse the public posts of everyone
- [x] As a server admin, I want to be able to add nodes to share with
- [x] As a server admin, I want to be able to remove nodes and stop
     sharing with them.
- [x] As a server admin, I can limit nodes connecting to me via
     authentication.
- [x] As a server admin, node to node connections can be authenticated
     with HTTP Basic Auth
- [x] As a server admin, I can disable the node to node interfaces for
     connections that are not authenticated!
- [ ] As an author, I want to be able to make posts that are unlisted,
     that are publicly shareable by URI alone (or for embedding images)


Other Teams 
========================
## Packet Pirates Team Connectivity
- Sending and Recieving Friend Requests 
- Accepting and Declining Friend Requests 
- Image Posts
- Private Posts
- Friends Only Posts
- Sharing and Receiving Posts
- Liking and Recieving Likes 
- Sending and Recieving Comments

### Packet Pirates Credentials
Backend: https://packet-pirates-backend-d3f5451fdee4.herokuapp.com/

Frontend: https://packet-pirates-frontend-46271456b73c.herokuapp.com/

Backend Credentials:

Frontend Username: Jack
Frontend Password: cmput404



## A Team Connectivity
- Sending and Recieving Friend Requests 
- Accepting and Declining Friend Requests 
- Recieving Posts (A Team has no inbox and instead filters our posts) 
- Image Posts
- Private Posts
- Friends Only Posts
- Liking and Recieving Likes 
- Sending and Recieving Comments 

## Beeg Yoshi Team Connectivity
- Sending and Recieving Friend Requests 
- Accepting and Declining Friend Requests 
- Sharing and Receiving Posts
- Image Posts
- Private Posts
- Friends Only Posts
- Liking and Recieving Likes 
- Sending and Recieving Comments 


Set up 
========================

## API Documentation
The API Documentation can be found at http://127.0.0.1:8000/api/schema/swagger-ui after running
or at https://web-weavers-backend-fb4af7963149.herokuapp.com/api/schema/swagger-ui/#/
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
#### Initialize your system
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
Deployment: https://dev.to/mdrhmn/deploying-react-django-app-using-heroku-2gfa  

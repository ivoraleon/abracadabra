# abracadabra
This is a full stack web application that allows a real estate agent to list his/her house on sale.

Technologies used:
Database: MongoDB Atlas,
Backend: Express js
Frontend: Embedded JavaScript, HTML, CSS

CSS Themes and font downloaded from online.

PLEASE NOTE:
Since MongoDB Atas requires us to hard code our user name and password I have removed that file from this project. If you plan to connect to MongoDB Atlas 
then create a default.json file under config folder and add the Mongo DB URI that is provided by MongoDB Atlas. It should look like the below:

{
    "mongoURI": "mongodb+srv://<user_name>:<password>@********.******.mongodb.net/<database_name>?retryWrites=true&w=majority"
}

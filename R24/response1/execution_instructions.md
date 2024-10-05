To run the PHP file on Windows or Mac, use a local web server that can interpret PHP files. 
In my case, I used XAMPP because it’s the easiest option to configure Apache locally and run response.php in the browser.

To download it, go to the official site:

Install XAMPP

Download XAMPP: Go to the official XAMPP website (https://www.apachefriends.org/index.html) and download the version for Windows.
Install XAMPP: Follow the installation instructions. During the setup, make sure to select the option to install Apache and MySQL.
Configure and run XAMPP

Open the XAMPP Control Panel.
In the panel, click on Start next to Apache to start the web server.
If you're using a MySQL database, you can also click on Start next to MySQL.
Locate your PHP file

Copy your PHP file into the htdocs folder inside the XAMPP installation directory (usually located at C:\xampp\htdocs on Windows).
You can create a folder within htdocs to organize your projects, for example: C:\xampp\htdocs\outlier\.
Run your PHP file in the browser

Open your web browser.
Enter http://localhost/outlier/response.php



For the database, you can create it by going to http://localhost/phpmyadmin/, creating a new database called 'library', and importing the 'books.sql' and 'students.sql'

The connection details in the PHP code are:
$username = "root";
$password = "root";

If you have different credentials in your local environment, you will need to update them accordingly.


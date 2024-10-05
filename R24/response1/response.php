<?php

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "library";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function save_book($conn) {
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['book_name'])) {
        $bookName = $_POST['book_name'];
        $status = 1;
        $sql = "INSERT INTO books (name, status) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $bookName, $status);

        if ($stmt->execute()) {
            echo "Book saved successfully.";
        } else {
            echo "Error saving book: " . $conn->error;
        }
    }
}

function return_book($conn) {
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['return_book_id'])) {
        $bookId = $_POST['return_book_id'];
        $sql = "UPDATE books SET status = 1 WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $bookId);
        if ($stmt->execute()) {
            echo "Book returned successfully.";
        } else {
            echo "Error returning book: " . $conn->error;
        }
    }
}

function loan_book($conn) {
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['student_id']) && isset($_POST['book_id'])) {
        $studentId = $_POST['student_id'];
        $bookId = $_POST['book_id'];
        $sql = "UPDATE books SET status = 2, id_students = ? WHERE id = ? AND status = 1";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $studentId, $bookId);
        if ($stmt->execute()) {
            echo "Book loaned successfully.";
        } else {
            echo "Error loaning book: " . $conn->error;
        }
    }
}



function register_user($conn) {
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['username']) && isset($_POST['password'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $sql = "INSERT INTO users_system (username, password) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $username, $hashed_password);
        if ($stmt->execute()) {
            echo "User registered successfully.";
        } else {
            echo "Error registering user: " . $conn->error;
        }
    }
}

function login_user($conn) {
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['username']) && isset($_POST['password'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];
        $sql = "SELECT * FROM users_system WHERE username = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                $_SESSION['logged_in'] = true;
                $_SESSION['username'] = $username;
                echo "Login successful.";
            } else {
                echo "Invalid password.";
            }
        } else {
            echo "Invalid username.";
        }
    }
}

save_book($conn);
return_book($conn);
loan_book($conn);
register_user($conn);
login_user($conn);
$page = 1;
if (isset($_GET['page'])) {
    $page = $_GET['page'];
}

$limit = 10;
$offset = ($page - 1) * $limit;

$sql = "SELECT * FROM books LIMIT $limit OFFSET $offset";
$result = $conn->query($sql);

$sqlCount = "SELECT COUNT(*) as count FROM books";
$resultCount = $conn->query($sqlCount);
$count = $resultCount->fetch_assoc()['count'];

$pages = ceil($count / $limit);

$conn->close();
?>

<!DOCTYPE HTML>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Library</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        nav {
            margin-bottom: 20px;
        }
        nav a {
            margin: 0 10px;
            text-decoration: none;
            color: #007BFF;
        }
        .container {
            display: none;
        }
        .active {
            display: block;
        }
        .grid {
            display: grid;
            grid-template-columns: 1fr 3fr 1fr;
            gap: 10px;
        }

        .grid div {
            padding: 10px;
            border: 1px solid #ddd;
        }

        .grid-header {
            font-weight: bold;
            background-color: #f4f4f4;
        }

        .grid div strong {
            display: block;
        }

        .pagination {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 10px;
        }
        .pagination button {
            margin: 0 5px;
        }

        .hidden {
            display: none;
        }
        .on-loan {
    background-color: green;
    color: white;
}

    </style>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            loadBooks(<?php echo $page; ?>);
        });

        function showView(view) {
            document.getElementById('add_books').classList.remove('active');
            document.getElementById('book_table').classList.remove('active');
            document.getElementById('loan_books').classList.remove('active');
            document.getElementById(view).classList.add('active');

            if(view == 'book_table'){

            }

        }

        function returnBook(bookId) {
            const form = document.createElement('form');
            form.method = 'post';
            form.action = '';
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'return_book_id';
            input.value = bookId;
            form.appendChild(input);
            document.body.appendChild(form);
            form.submit();
        }

        function loadBooks(page) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', '?page=' + page + '&ajax=1', true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    newPage = xhr.responseText;
                    newPage = newPage.replace(/[\s\S]*<\/html>/, '');
                    document.getElementById('book_grid').innerHTML = newPage
                    updatePaginationControls(page);
                }
            };
            xhr.send();
        }

        function paginate(page) {
            loadBooks(page);
        }

        function updatePaginationControls(page) {
            const paginationControls = document.getElementById('pagination_controls');
            paginationControls.innerHTML = '';
            const previousButton = document.createElement('button');
            previousButton.textContent = 'Previous';
            previousButton.disabled = page <= 1;
            previousButton.onclick = function() { paginate(page - 1); };
            paginationControls.appendChild(previousButton);

            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.disabled = page >= <?php echo $pages; ?>;
            nextButton.onclick = function() { paginate(page + 1); };
            paginationControls.appendChild(nextButton);
        }

    </script>

</head>

<body>


<div id="register_user" class="container">
    <h2>Register User</h2>
    <form method="POST">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <br><br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br><br>
        <button type="submit">Register</button>
    </form>
</div>

<!-- Add a login form -->
<div id="login_user" class="container">
    <h2>Login User</h2>
    <form method="POST">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <br><br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br><br>
        <button type="submit">Login</button>
    </form>
</div>



<div class="grid" id="book_grid">
    <?php

    if ($result->num_rows > 0) {               

        while($row = $result->fetch_assoc()) {
            $status = $row['status'] == 1 ? "Available" : "On Loan";
            echo "<div>" . $row['id'] . "</div>";
            echo "<div>" . $row['name'] . "</div>";
            echo "<div style='background-color: " . ($status == "On Loan" ? "green" : "") . "; color: " . ($status == "On Loan" ? "white" : "") . "'>";
            echo $status;
            if ($status == "On Loan") {
                echo "<button onclick='returnBook(" . $row['id'] . ")'>Return</button>";
            }

            echo "</div>";

        }

    } else {
        echo "<div colspan='3'>No books available.</div>";
    }
    ?>

<?php if (isset($_SESSION['logged_in']) && $_SESSION['logged_in']) { ?>
    <nav>
        <a href="#" onclick="showView('add_books')">Add Book</a>
        <a href="#" onclick="showView('book_table')">Book Table</a>
        <a href="#" onclick="showView('loan_books')">Loan Book</a>
    </nav>

    <div id="add_books" class="container active">
        <h2>Add Book</h2>
        <form method="POST">
            <label for="book_name">Book Name:</label>
            <input type="text" id="book_name" name="book_name" required>
            <button type="submit">Save Book</button>
        </form>

    </div>

    <div id="book_table" class="container">
        <h2>Book List</h2>
        <div class="pagination" id="pagination_controls">       
        </div>

        <div class="grid">
            <div class="grid-header">ID</div>
            <div class="grid-header">Name Book</div>
            <div class="grid-header">Status</div>
        </div>

        <div class="grid" id="book_grid">
            <?php

            if ($result->num_rows > 0) {               

                while($row = $result->fetch_assoc()) {
                    $status = $row['status'] == 1 ? "Available" : "On Loan";
                    echo "<div>" . $row['id'] . "</div>";
                    echo "<div>" . $row['name'] . "</div>";
                    echo "<div>";
                    echo $status;
                    if ($status == "On Loan") {
                        echo "<button onclick='returnBook(" . $row['id'] . ")'>Return</button>";
                    }

                    echo "</div>";

                }

            } else {
                echo "<div colspan='3'>No books available.</div>";
            }
            ?>

        </div>
    </div>

    <div id="loan_books" class="container">
        <h2>Loan a Book</h2>
        <form method="POST">
            <label for="student_id">Student:</label>
            <select id="student_id" name="student_id" required>
                <option value="">Select Student</option>
                <?php

                $conn = new mysqli($servername, $username, $password, $dbname);
                $sql = "SELECT id, name FROM students";
                $studentsResult = $conn->query($sql);
                while($student = $studentsResult->fetch_assoc()) {
                    echo "<option value='" . $student['id'] . "'>" . $student['name'] . "</option>";
                }

                ?>

            </select>
            <br><br>
            <label for="book_id">Book:</label>
            <select id="book_id" name="book_id" required>

                <option value="">Select Book</option>

                <?php

                $sql = "SELECT id, name FROM books WHERE status = 1";
                $booksResult = $conn->query($sql);
                while($book = $booksResult->fetch_assoc()) {
                    echo "<option value='" . $book['id'] . "'>" . $book['name'] . "</option>";
                }

                ?>
            </select>

            <br><br>
            <button type="submit">Loan Book</button>
        </form>

    </div>
    <?php } else { ?>
    <p>Please login to view the book grid.</p>
<?php } ?>
</body>
</html>




<?php

if (isset($_GET['ajax']) && $_GET['ajax'] == '1') {
    $conn = new mysqli($servername, $username, $password, $dbname);
    $page = isset($_GET['page']) ? $_GET['page'] : 1;
    $offset = ($page - 1) * $limit;
    $sql = "SELECT * FROM books LIMIT $limit OFFSET $offset";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $status = $row['status'] == 1 ? "Available" : "On Loan";
            echo "<div>" . $row['id'] . "</div>";
            echo "<div>" . $row['name'] . "</div>";
            echo "<div>";
            echo $status;
            if ($status == "On Loan") {
                echo "<button onclick='returnBook(" . $row['id'] . ")'>Return</button>";
            }

            echo "</div>";
        }

    } else {
        echo "<div colspan='3'>No books available.</div>";
    }

    $conn->close();
    exit;
}
?>
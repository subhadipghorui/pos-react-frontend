# Read me

## Project POS - Point of Sale 
Add customers, mange products and their stocks and crede orders for your customers.

Full Tutorial: https://youtu.be/hvtcQE8Gshs
<br>
Blogs: https://myiotlab.in


## Project setup in local enviroment
### Dependency
Please install below dependency
1. Node 20
2. Php 8.2
3. Composer 2.2
4. Mysql Database
5. Git


### A. Frontend - React

<p>1. Clone the repository</p>
<p>2. <code>git clone https://github.com/subhadipghorui/pos-react-frontend.git</code></p>
<p>3. <code>npm install</code> and then run <code>npm start</code></p>
<p>4. Project will run at port 3000</p>
<p>5. default email <code>superadmin@example.com</code> password <code>password</code></p>

### B. Backend - Laravel

<p>1. Clone the repository </p>
<p>2. <code>git clone https://github.com/subhadipghorui/pos-laravel-backend.git</code></p>
<p>3. <code>cp .env.example .env</code></p>
<p>4. configure database</p>
<p>5. <code>composer install</code></p>
<p>6. <code>php artisan migrate</code></p>
<p>7. <code>php artisan db:seed</code></p>
<p>8. delete public/storage folder if exist and run <code>php artisan storage:link</code></p>
<p>9. run backend server by <code>php artisan serve</code></p>
<p>10. default email <code>superadmin@example.com</code> password <code>password</code></p>

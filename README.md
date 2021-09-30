## A basic app with built Rails and React, you can add, edit and delete contacts into your agenda

### Prerequisites

The setups steps expect following tools installed on the system.

- Ruby [3.0.2](https://www.ruby-lang.org/en/news/2019/12/25/ruby-2-7-0-released/)
- Rails [6.1.4.1](https://rubygems.org/gems/rails/versions/6.0.2)

#### This project is using webpacker for the React front-end

- [You can follow this instructions](https://edgeguides.rubyonrails.org/webpacker.html)

#### 1. Clone the repository

```bash
git clone https://github.com/gabrieldominguezduran/agenda-app.git
```

#### Using GitHub CLI

```bash
gh repo clone gabrieldominguezduran/agenda-app
```

#### 2. Install dependecies

Run the following commands to install all dependecies

```ruby
bundle install
```

```javascript
yarn install
```

#### 3. Set up database

This app uses mysql2 gem if you want to set up a different db you can add the new gem to the Gemfile and run:

```ruby
rails db:system:change --to=postgresql
rails db:system:change --to=sqlite3
rails db:system:change --to=oracle
rails db:system:change --to=frontbase
rails db:system:change --to=sqlserver
rails db:system:change --to=jdbc
```

Then run the migrations to set up the db:

```ruby
rails db:migrate
```

#### 3. Start the Rails server

```ruby
rails s
```

And now you can visit: http://localhost:3000

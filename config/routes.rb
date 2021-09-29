Rails.application.routes.draw do
  devise_for :users,
  path: '',
  path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: ''
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
 
  root to: "welcome#index"

  get '/create'=> 'welcome#index'

  get '/load' => 'contacts#load'
  post '/create' => 'contacts#create'
  post '/update' => 'contacts#update'
  get '/checkEmail' => 'contacts#check_email'
  delete '/delete' => 'contacts#delete'

   # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

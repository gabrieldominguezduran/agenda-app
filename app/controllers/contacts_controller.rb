class ContactsController < ApplicationController
  skip_forgery_protection 
  def load
    contacts = Contact.order(:first_name)

    render json: contacts.to_json(:include => [edits: {include: :user}])
  end

  def create
    Contact.create(contact_params)

    contacts = Contact.order(:first_name)
    render json: contacts.to_json(:include => [edits: {include: :user}])
  end

  def update
    contact = Contact.find(params[:id])

      ActiveRecord::Base.transaction do 
        contact.update!(contact_params)

        Edit.create({
          :user_id => current_user.id,
          :contact_id => contact.id
        })
      end

    contacts = Contact.order(:first_name)
    render json: contacts.to_json(:include => [edits: {include: :user}])
  end

  def delete
    Contact.destroy(params[:id])

    contacts = Contact.order(:first_name)
    render json:contacts.to_json(:include => [edits: {include: :user}])
  end

  def check_email
    render json: Contact.find_by_email(params[:email]).present?
  end


  private

  def contact_params
    params.require(:contact).permit(:first_name, :last_name, :email, :phone_number)
  end
end

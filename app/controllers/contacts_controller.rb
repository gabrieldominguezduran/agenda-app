class ContactsController < ApplicationController
  skip_forgery_protection 
  def load
    contacts = Contact.order(created_at: :desc)

    render json: contacts
  end

  def create
    Contact.create(contact_params)
    contacts = Contact.order(created_at: :desc)
    render json: contacts
  end

  def update
    contact = Contact.find(params[:id])

    contact.update_attributes(contact_params)

    render json: contact
  end

  def delete
    Contact.destory(params[:id])

    head :no_content
  end

  def check_email
    render json: Contact.find_by_email(params[:email]).present?
  end


  private

  def contact_params
    params.require(:contact).permit(:first_name, :last_name, :email, :phone_number)
  end
end

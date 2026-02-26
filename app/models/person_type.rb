class PersonType < ApplicationRecord
  has_many :document_types
  has_many :users

  validates :name, presence: true, uniqueness: true
end

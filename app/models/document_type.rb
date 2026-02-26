class DocumentType < ApplicationRecord
  belongs_to :person_type
  has_many :users

  validates :name, presence: true
end

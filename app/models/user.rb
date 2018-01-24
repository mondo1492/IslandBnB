class User < ApplicationRecord
  validates :password_digest, :session_token, presence: true
  validates :username, uniqueness: true, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :rooms,
    primary_key: :id,
    foreign_key: :host_id

  has_many :trips,
    primary_key: :id,
    foreign_key: :guest_id

  attr_reader :password

  after_initialize :ensure_token


  def self.find_by_cred(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.valid_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def gen_token
    SecureRandom.urlsafe_base64
  end

  def reset_token!
    self.session_token = gen_token
    while User.exists?(session_token: self.session_token)
      self.session_token = gen_token
    end
    self.save!
    self.session_token
  end

  private

  def ensure_token
    self.session_token ||= gen_token
  end
end

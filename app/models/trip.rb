class Trip < ApplicationRecord
  belongs_to :user,
    primary_key: :id,
    foreign_key: :guest_id

  belongs_to :room
  def room_address
    self.room.address
  end

  def room_title
    self.room.title
  end

  def host_name
    self.room.host_name
  end

  def room_url
    self.room.pic_url
  end

  def overlapping_requests
    self
      .where.not(id: self.id)
      .where(room_id: room_id)
      .where(<<-SQL, start_date: start_date, end_date: end_date)
         NOT( (start_date > :end_date) OR (end_date < :start_date) )
      SQL
  end
end

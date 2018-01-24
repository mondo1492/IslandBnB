@rooms.each do |room|
  json.set! room.id do
    json.partial! 'api/rooms/room', room: room
  end
end

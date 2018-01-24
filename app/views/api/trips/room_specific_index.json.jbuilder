@trips.each do |trip|
  json.set! trip.id do
    json.extract! trip, :start_date, :end_date
  end
end

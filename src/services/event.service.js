import eventRepository from "../repositories/event.repository.js";

class EventService {
  create(data) {
    return eventRepository.create(data);
  }

  getAll() {
    return eventRepository.findAll();
  }

  getById(id) {
    return eventRepository.findById(id);
  }

  update(id, data) {
    return eventRepository.update(id, data);
  }

  delete(id) {
    return eventRepository.delete(id);
  }

  getDetails(eventId) {
    return eventRepository.getEventDetails(eventId);
  }
}

export default new EventService();

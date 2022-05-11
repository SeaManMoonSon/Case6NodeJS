export default {
    allEvents: (events) => events.map(event => `id: ${event.id} - ${event.title}: ${event.desc}`)
}
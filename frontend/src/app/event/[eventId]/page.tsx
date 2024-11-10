export default function Event({ params }:
    { params: { eventId: string } }) {
    return <h1>Event : {params.eventId}</h1>;
}
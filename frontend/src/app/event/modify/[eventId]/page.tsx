export default function Event({ params }:
    { params: { eventId: string } }) {
    return <h1>Modify Event : {params.eventId}</h1>;
}
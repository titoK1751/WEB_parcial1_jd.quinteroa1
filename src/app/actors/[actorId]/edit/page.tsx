export default async function EditActorPage({
    params,
}: {
    params: { actorId: string };
}) {
    const { actorId } = await params;

    return (
        <main className= "container mx-auto p-8">
            <h1 className= "text-3xl font-bold">
                Edicion del actor con ID: {actorId}
            </h1>
            
        </main>
    );
}
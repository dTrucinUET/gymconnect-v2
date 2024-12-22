
interface ParamsServices {
    params: { id: string };
}
const ServicesPageID = async ({ params }: ParamsServices) => {

    const { id } = params
    return (
        <>
            {id}
        </>
    )
}
export default ServicesPageID;
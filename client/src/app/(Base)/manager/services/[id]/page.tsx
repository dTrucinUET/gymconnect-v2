import ServiceManagementById from "@/component/manager/services/servicesById";

interface ParamsServices {
    params: { id: string };
}
const ServicesPageID = async ({ params }: ParamsServices) => {

    const { id } = params
    return (
        <>
            <ServiceManagementById id={id} />
        </>
    )
}
export default ServicesPageID;
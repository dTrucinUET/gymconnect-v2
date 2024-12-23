export function generateStaticParams() {
    return [{ id: "manager/services" }];
  }

import ServiceManagementById from "@/component/manager/services/servicesById";


interface ParamsServices {
params: Promise<{ id: string }>;
}
const ServicesPageID = async ({ params }: ParamsServices) => {

    const { id } = await params
    return (
        <>
            <ServiceManagementById id={id} />
        </>
    )
}
export default ServicesPageID;
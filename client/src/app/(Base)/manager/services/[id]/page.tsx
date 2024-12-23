export function generateStaticParams() {
    return [{ id: "manager/services" }];
  }

interface ParamsServices {
params: Promise<{ id: string }>;
}
const ServicesPageID = async ({ params }: ParamsServices) => {

    const { id } = await params
    return (
        <>
            {id}
        </>
    )
}
export default ServicesPageID;
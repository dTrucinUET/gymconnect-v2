import EquipmentManagermentByID from "@/component/manager/equipment/equipmentById";
export function generateStaticParams() {
    return [{ id: "manager/equipment" }];
  }
interface ParamsEquipment {
params: Promise<{ id: string }>;
}
const EquipmentPageID = async ({ params }: ParamsEquipment) => {

    const { id } = await params
    return (
        <>
            <EquipmentManagermentByID roomId={id} />
        </>
    )
}
export default EquipmentPageID;
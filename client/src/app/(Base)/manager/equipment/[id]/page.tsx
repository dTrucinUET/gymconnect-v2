import EquipmentManagermentByID from "@/component/manager/equipment/equipmentById";

interface ParamsEquipment {
    params: { id: string };
}
const EquipmentPageID = async ({ params }: ParamsEquipment) => {

    const { id } = params
    return (
        <>
            <EquipmentManagermentByID roomId={id} />
        </>
    )
}
export default EquipmentPageID;
import PurchaseServiceContent from './PurchaseServiceContent'

interface PurchaseParams {
    params: {
        serviceId: string
    }
    searchParams: {
        quantity: number,
        price: number,
        name: string
    }
}

const PurchaseService = async({params, searchParams}:PurchaseParams)=>{
    const {serviceId} = await params
    const id = parseInt(serviceId)
    const {quantity, price, name} = await searchParams

  return (
    <>
       <PurchaseServiceContent serviceId={id} quantity={quantity} price={price} serviceName={name} />
    </>
    
  )
}

export default PurchaseService
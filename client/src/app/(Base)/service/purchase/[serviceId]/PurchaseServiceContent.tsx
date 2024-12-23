'use client'

import { UserContext } from '@/component/userContext/userContext'
import { Button, Checkbox, CheckIcon, Container, Input, InputLabel, MenuItem, Radio, Select, Text, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'


interface PurchaseInfo {
    serviceId: number
    serviceName: string
    price: number
    quantity: number
}

const PurchaseServiceContent = ({serviceId, serviceName, price, quantity}: PurchaseInfo) => {

    const [phone, setPhone] = useState('')
    const [buyQuantity, setBuyQuantity] = useState(0)
    const [name, setName] = useState('')
    const [checkPolicy, setCheckPolicy] = useState(true)

    const router = useRouter()

    const { user } = useContext(UserContext)


    const handlePurchase = async () => {
        if(phone === ''|| buyQuantity === 0 || name === '') {
            showNotification({
                title: 'Error',
                message: 'Please fill in all fields',
                color: 'red',
                position: 'bottom-right',
                autoClose: 3000,
            })
            return;
        }

        if(user?.username === ''){
            
            showNotification({
                title: 'Error',
                message: 'You must be logged in to purchase a service',
                color: 'red',
                position: 'bottom-right',
                autoClose: 3000
            })
            return;
        }

        const checkResponse = await fetch(`http://localhost:8080/service/${serviceId}`)
        const checkData = await checkResponse.json()
        if((checkData.quantity < buyQuantity) || (quantity < buyQuantity)){
            showNotification({
                title: 'Error',
                message: 'Not enough quantity',
                color: 'red',
                position: 'bottom-right',
            })
            return;
        }

        const paidMoney = Math.floor(buyQuantity*price)
        const description = `Userid: ${user.id} serviceid: ${serviceId}`
        const item = [
            {
                name: serviceName,
                price: price,
                quantity: buyQuantity
            }
        ]
        console.log(paidMoney);
        
        const response = await fetch('http://localhost:8080/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.token}`,
            },
            body: JSON.stringify({
                amount : paidMoney, 
                description: description,
                item: item  
            })
        })
        const data = await response.json()
        console.log(data);
        
        window.open(data.checkoutUrl)
        // router.push(data.checkoutUrl)
        
    }


  return (
    <>
        <Container
       style={{
        backgroundColor: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        paddingTop: '3%',
        paddingBottom: '5%'
       }}
       >
          <Container
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '10%'
          }}>
            <Text
            style={{
              fontSize: '2.6em'
            }}
            fw={800}
            >
            Thanh toán
            </Text>
          </Container>

          <Container 
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginBottom: '4%'
          }}>
            <InputLabel
            style={{
                fontSize: '1.2em'
            }}
            fw={600}>
                Hình thức thanh toán
            </InputLabel>
            <Radio icon={CheckIcon} label="Thanh toán qua tài khoản ngân hàng" name="check" value="check" defaultChecked />
          </Container>

            {/* Phone */}
          <Container
            style={{
                marginBottom: '4%'
            }}
          >
            <InputLabel>
            Số điện thoại
            </InputLabel>
            <TextInput
            onChange={(e)=>{   
                let phone = e.target.value
                setPhone(phone.trim())
            }}
            style={{
                width: '50%',
            }} 
            size='md'/>
          </Container>

            {/* Full Name */}
          <Container
            style={{
                marginBottom: '4%'
            }}
          >
            <InputLabel>
            Họ và tên
            </InputLabel>
            <TextInput
            onChange={(e)=>{
                let name = e.target.value
                setName(name.trim())
            }}
            style={{
                width: '50%',
            }} 
            size='md'/>
          </Container>

            {/* Quantity */}
          <Container
            style={{
                marginBottom: '4%'
            }}
          >
            <InputLabel>
            Số lượng thanh toán:
            </InputLabel>
            <TextInput
            onChange={(e)=>{
                const quantity = parseInt(e.target.value)
                
                setBuyQuantity(quantity)
            }}
            style={{
                width: '50%',
            }} 
            size='md'/>
          </Container>

          <Container 
          style={{
            display: 'flex',
          }}>
              <Checkbox
              style={{
                
              }}
                  defaultChecked
                  label="Tôi xác nhận và đồng ý với điều khoản của GYM CONNECT"
              />
            <Button
            onClick={handlePurchase}
            size='lg'
            style={{
               marginLeft: '35%',
            }}
            color='black'>
                Thanh toán
            </Button>

          </Container>

       </Container>
    </>
  )
}

export default PurchaseServiceContent
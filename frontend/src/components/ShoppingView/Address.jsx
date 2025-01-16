import React, { useState } from 'react'
import { Card , CardHeader , CardTitle , CardContent, CardFooter } from '../ui/card';
import CommonForm from '../Common/form';
import { addressFormControls } from '@/config';
import {useDispatch, useSelector} from 'react-redux';
import { addNewAddress, fetchAllAddresses } from '@/features/shop/addressSlice';

const initialAddressFormData = {
  address : '',
  city: '',
  phone: '',
  pincode: '',
  notes: ''
}

function Address() {
  const [formData,setFormData] = useState(initialAddressFormData);
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  // const {addressList} = useSelector(state => state.state.shopAddress);
  function handleManageAddress(event){
    event.preventDefault();
    dispatch(addNewAddress({
      ...formData,
      userId : user._id
    })).unwrap()
    .then(data => {
      console.log(data);
      if(data?.payload){
        dispatch(fetchAllAddresses(user?._id))
        setFormData(initialAddressFormData)
      }
    })
  }

  function isFormValid(){
    return Object.keys(formData).map(key => formData[key].trim() !== '').every(item => item);
  }

  // console.log(addressList)

  return (
    <Card>
      <div>
        AddressList
      </div>
      <CardHeader>
        <CardTitle>Add New Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm 
        formControls = {addressFormControls}
        formData = {formData}
        setFormData = {setFormData}
        buttonText = {'Add'}
        onSubmit = {handleManageAddress}
        isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  )
}

export default Address

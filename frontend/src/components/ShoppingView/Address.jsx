import React, { useEffect, useState } from 'react'
import { Card , CardHeader , CardTitle , CardContent, CardFooter } from '../ui/card';
import CommonForm from '../Common/form';
import { addressFormControls } from '@/config';
import {useDispatch, useSelector} from 'react-redux';
import { addNewAddress, deleteAddress, editAddress, fetchAllAddresses } from '@/features/shop/addressSlice';
import AddressCard from './AddressCard';

const initialAddressFormData = {
  address : '',
  city: '',
  phone: '',
  pincode: '',
  notes: ''
}

function Address() {
  const [formData,setFormData] = useState(initialAddressFormData);
  const [currentEditedId,setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const {addressList} = useSelector(state => state.shopAddress);

  function handleManageAddress(event){
    event.preventDefault();

    currentEditedId !== null ? dispatch(editAddress({
      userId : user._id,
      addressId : currentEditedId,
      formData
    })).unwrap()
    .then(data => {
      if(data){
        dispatch(fetchAllAddresses(user?._id)).unwrap();
        setCurrentEditedId(null);
        setFormData(initialAddressFormData)
      }
    }) : dispatch(addNewAddress({
      ...formData,
      userId : user._id
    })).unwrap()
    .then(data => {
      console.log(data);
      if(data){
        dispatch(fetchAllAddresses(user?._id)).unwrap();
        setFormData(initialAddressFormData)
      }
    })
  }

  function handleDeleteAddress(getCurrentAddress){
    console.log(getCurrentAddress);
    dispatch(deleteAddress({userId : user?._id, addressId : getCurrentAddress?._id}))
    .unwrap()
    .then(data => {
      console.log(data);
      if(data){
        dispatch(fetchAllAddresses(user?._id)).unwrap();
      }
    } )
  }

  function handleEditAddress(getCurrentAddress){
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes
    })
  }

  function isFormValid(){
    return Object.keys(formData).map(key => formData[key].trim() !== '').every(item => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?._id));
  },[dispatch])

  console.log(addressList);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols sm:grid-cols-2 md:grid-cols-3 gap-2">
        {
          addressList && addressList.length > 0 ? 
          addressList.map(sigleAddressItem => <AddressCard 
            handleDeleteAddress = {handleDeleteAddress} 
            addressInfo={sigleAddressItem}
            handleEditAddress = {handleEditAddress}
            />) : null
        }
      </div>
      <CardHeader>
        <CardTitle>{
          currentEditedId !== null ? "Edit Address" : "Add New Address"
        }</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm 
        formControls = {addressFormControls}
        formData = {formData}
        setFormData = {setFormData}
        buttonText =  { currentEditedId !== null ? "Edit" : "Add"}
        onSubmit = {handleManageAddress}
        isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  )
}

export default Address

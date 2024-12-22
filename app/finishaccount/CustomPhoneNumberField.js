import {
    MuiTelInput,
    MuiTelInputCountry,
    MuiTelInputInfo,
    MuiTelInputContinent,
    matchIsValidTel 
  } from 'mui-tel-input'
  import React from 'react'

  
  
    const PhoneNumberField = ({ phoneError, setPhoneError, setPhoneNumber, label}) => {
      const phoneRef = React.useRef();
      const [value, setValue] = React.useState('')
      const continents = ['EU']
      const excludedCountries = ['FR']


  
    const handleChange = (newValue, info) => {
      setValue(newValue)
      if (!matchIsValidTel(phoneRef.current?.value)) {
        setPhoneError('Invalid phone number');
      } else {
        setPhoneError('');
      }
      setPhoneNumber(newValue)
              
    }


  
    return (
      <MuiTelInput
        fullWidth
        variant="outlined"
        label={label ? label : "Phone Number"}
        placeholder="+254712345678"
        required
        value={value}
        onChange={handleChange}
        inputRef={phoneRef}
        error={phoneError !== ""}
        helperText={phoneError !== "" ? phoneError :  ""}
        sx={{
                 "& .MuiOutlinedInput-root": {
                   borderRadius: "16px",
                 },
                 "& .MuiOutlinedInput-notchedOutline": {
                   borderRadius: "16px",
                 },
               }}
        defaultCountry='KE'
      />
    )
  }

  export default PhoneNumberField
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Theme } from '@mui/material/styles';
import {createMedicalHistory, getMedicalHistoryByUserId} from "@/services/UserServices";
import {useEffect} from "react";
import ClinicHistoryForm from "@/components/dashboard/customer/ClinicHistoryForm";
import MedicalHistoryGrid from "@/components/dashboard/customer/MedicalHistoryGrid";


const Item = styled(Paper)(({ theme }: { theme: Theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function ClinicHistory(props) {
  const [dataToSend, setDataToSend] = React.useState({});

  const saveMedicalHistory = () => {
    createMedicalHistory(dataToSend).then((data) => {
      props.setOpen(false)
      window.location.reload();
    });
  }

  const [age, setAge ] = React.useState(0);
  const [child_number, setChildNumber] = React.useState(0);
  const [weight, setWeight] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [bloodType, setBloodType] = React.useState(false);
  const [disease, setDisease] = React.useState(false);
  const [description_disease, setDescriptionDisease] = React.useState('');
  const [medicines, setMedicines] = React.useState(false);
  const [description_medicines, setDescriptionMedicines] = React.useState('');
  const [sugery, setSugery] = React.useState(false);
  const [description_sugery, setDescriptionSugery] = React.useState('');
  const [allergies, setAllergies] = React.useState(false);
  const [description_allergies, setDescriptionAllergies] = React.useState('');
  const [showForm, setShowForm] = React.useState(false);



  const handleAgeChange = (event) => {
    setAge(event)
  }

  const handleChildNumberChange = (event) => {
    setChildNumber(event)
  }

  const handleWeightChange = (event) => {
    setWeight(event)
  }

  const handleHeightChange = (event) => {
    setHeight(event)
  }

  const handleBloodTypeChange = (event) => {
    setBloodType(event)
  }
  const handleDiseaseChange = (event) => {
    setDisease(event.target.value === 'si' ? true : false)
  }

  const handleDescriptionDiseaseChange = (event) => {
    setDescriptionDisease(event.target.value)
  }

  const handMedicinesChange = (event) => {
    setMedicines(event.target.value === 'si' ? true : false)
  }

  const handleDescriptionMedicinesChange = (event) => {
    setDescriptionMedicines(event.target.value)
  }

const handSurgeryChange = (event) => {
    setSugery(event.target.value === 'si' ? true : false)
}

const handleDescriptionSurgeryChange = (event) => {
    setDescriptionSugery(event.target.value)
}
const handAllergiesChange = (event) => {
    setAllergies(event.target.value === 'si' ? true : false)
}

const handleDescriptionAllergiesChange = (event) => {
    setDescriptionAllergies(event.target.value)
}

const composePayload = () => {
  const data = {
    age : age,
    child_number: child_number,
    weight : weight,
    height : height,
    bloodType : bloodType,
    disease: disease,
    description_disease: description_disease,
    medicines: medicines,
    description_medicines: description_medicines,
    sugery: sugery,
    description_sugery: description_sugery,
    allergies: allergies,
    description_allergies: description_allergies,
    user_id : props.userId
  }

  setDataToSend(data);
}

const populateClinicHistory = () => {
    getMedicalHistoryByUserId(props.userId).then((data) => {

      //Verificamos si el servidor nos indica que no existe un historial medico
      if (data.length === 2 && data?.includes(404)) {
        //si no existe un historial medico, mostramos el formulario para crear uno
        setShowForm(true)

        //finalizamos el proceso
        return;
      }

      //si existe un historial medico, lo cargamos en los estados para motrar la data en un GRID
      setAge(data.age)
      setChildNumber(data.child_number)
      setWeight(data.weight)
      setHeight(data.height)
      setBloodType(data.bloodType)
      setDisease(data.disease)
      setDescriptionDisease(data.description_disease)
      setMedicines(data.medicines)
      setDescriptionMedicines(data.description_medicines)
      setSugery(data.sugery)
      setDescriptionSugery(data.description_sugery)
      setAllergies(data.allergies)
      setDescriptionAllergies(data.description_allergies)

      //Ocultamos el formulario
      setShowForm(false)

      return;
    }).catch((error) => {
      console.error(error)
  });
}

const renderFormIfNoDataSet = () => {

    //Si showForm (mostrarFormulario) es verdadero, mostramos el formulario
    if (showForm) {
      return (
        <ClinicHistoryForm
          handleAgeChange={handleAgeChange}
          handleChildNumberChange={handleChildNumberChange}
          handleHeightChange={handleHeightChange}
          handleBloodTypeChange={handleBloodTypeChange}
          handleDiseaseChange={handleDiseaseChange}
          handleDescriptionDiseaseChange={handleDescriptionDiseaseChange}
          handleWeightChange={handleWeightChange}
          disease={disease}
          handMedicinesChange={handMedicinesChange}
          handleDescriptionMedicinesChange={handleDescriptionMedicinesChange}
          medicines={medicines}
          handSurgeryChange={handSurgeryChange}
          handleDescriptionSurgeryChange={handleDescriptionSurgeryChange}
          handAllergiesChange={handAllergiesChange}
          handleDescriptionAllergiesChange={handleDescriptionAllergiesChange}
          allergies={allergies}
          saveMedicalHistory={saveMedicalHistory}
          sugery={sugery}
        />
      )
    }

    //Si no, entonces aqui mostramos la data con el GRID
    return (<MedicalHistoryGrid/>)
}

useEffect(() => {
  populateClinicHistory()
  composePayload()
}, [age, child_number, weight, height, disease, description_disease, medicines, description_medicines, sugery, description_sugery, allergies, description_allergies])

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: '#fff', height: '75vh'}} component="form" noValidate autoComplete="off">
          {renderFormIfNoDataSet()}
        </Box>
      </Container>
    </React.Fragment>
  );
}

import React, { useState , useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PresentationLayout from '@layouts/PresentationLayout.tsx';
import Logo from '@components/resources/Logo.tsx';
import UserInput , {UserInputRef} from '@components/input/UserInput.tsx';
import Button from '@components/buttons/Button.tsx';
import HyperLink from '@components/input/HyperLink.tsx';
import ButtonCard from '@components/buttons/ButtonCard.tsx';
import { FaCar, FaUser } from 'react-icons/fa';
import SelectColor from '@components/input/SelectColor.tsx';
import DateInput from '@components/input/DateInput.tsx';
import { createUser } from '@/api/api';
import { CreateUser } from '@/types/user';

const UserRegister: React.FC = () => {
  const [currentForm, setCurrentForm] = useState(0);

  const nombreRef = useRef<UserInputRef>(null);
  const apellido1Ref = useRef<UserInputRef>(null);
  const apellido2Ref = useRef<UserInputRef>(null);
  const codigoRef = useRef<UserInputRef>(null);
  const [nombre, setNombre] = useState('');
  const [apellido1, setApellido1] = useState('');
  const [apellido2, setApellido2] = useState('');
  const [codigo, setCodigo] = useState('');
  const [fechaNacimiento , setFechaNacimiento] = useState('');
  const [curp , setCurp] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anio, setAnio] = useState('');
  const [placas, setPlacas] = useState('');
  
  const [_fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  const navigate = useNavigate();

  const handleFieldError = (field: string) => (hasError: boolean) => {
    setFieldErrors(prev => ({ ...prev, [field]: hasError }));
  };

  const getFormTitle = () => {
    switch (currentForm) {
      case 0: return 'Registro: Información personal';
      case 1: return 'Registro: Cuenta';
      case 2: return 'Selecciona tu rol';
      case 3: return 'Registro: Datos del vehículo';
      default: return 'Registro';
    }
  };

  const clickRegister = async () => navigate('/login');

  const FirstRegister = () => (
    <>
      <UserInput ref={nombreRef} label="Nombre" value={nombre} onChange={setNombre} />
      <UserInput ref={apellido1Ref} label="Primer apellido" value={apellido1} onChange={setApellido1} hasError={handleFieldError('apellido1')} />
      <UserInput ref={apellido2Ref} label="Segundo apellido" value={apellido2} onChange={setApellido2} hasError={handleFieldError('apellido2')} />
      <UserInput ref={codigoRef} label="Número de registro" type="number" value={codigo} onChange={setCodigo} hasError={handleFieldError('codigo')} />
    </>
  );

  const SecondRegister = () => (
    <>
      <UserInput label="Email" value={email} onChange={setEmail} validations={['email']} hasError={handleFieldError('email')} />
      <UserInput label="Fecha nacimiento" type="date" value={fechaNacimiento} onChange={setFechaNacimiento} validations={['adult']} hasError={handleFieldError('fechaNacimiento')} />
      <UserInput label="CURP" value={curp} onChange={setCurp} hasError={handleFieldError('curp')} />
      <UserInput label="Contraseña" type="password" value={contrasena} onChange={setContrasena} hasError={handleFieldError('contrasena')} />
      <UserInput label="Confirmar contraseña" type="password" value={confirmarContrasena} onChange={setConfirmarContrasena} validations={['match']} matchValue={contrasena} hasError={handleFieldError('confirmarContrasena')} />
    </>
  );

  const ThirdRegister = () => (
    <>
      <ButtonCard title={'Conductor'} content={['Solicitar y ofrecer viajes.', 'Registrar vehículos.']} icon={FaCar} color={'bg-teal-400'} />
      <ButtonCard title={'Pasajero'} content={['Acceder a viajes.', 'Registrar vehículos más tarde.']} icon={FaUser} color={'bg-indigo-300'} />
    </>
  );

  const FirstDriverRegister = () => (
    <>
      <UserInput label="Marca" value={marca} onChange={setMarca} hasError={handleFieldError('marca')} />
      <UserInput label="Modelo" value={modelo} onChange={setModelo} hasError={handleFieldError('modelo')} />
      <div className="flex flex-row items-center mb-4 mx-2 gap-6">
        <UserInput label="Año" type="number" value={anio} onChange={setAnio} hasError={handleFieldError('anio')} />
        <UserInput label="Placas" type="text" value={placas} onChange={setPlacas} hasError={handleFieldError('placas')} />
      </div>
      <SelectColor label="Color" />
      <DateInput label="Nacimiento" />
    </>
  );

  const registerForm = [
    FirstRegister,
    SecondRegister,
    ThirdRegister,
    FirstDriverRegister,
  ];

  const nextForm = async () => {
    let valid = true;

    if (currentForm === 0) {
      valid = !!nombreRef.current?.validate() &&
              !!apellido1Ref.current?.validate() &&
              !!apellido2Ref.current?.validate() &&
              !!codigoRef.current?.validate();
    }

    if (!valid) {
      alert('Por favor completa correctamente todos los campos.');
      return;
    }

    if (currentForm === 1) {
      const payload: CreateUser = {
        code: parseInt(codigo),
        firstname: nombre,
        paternal_surname: apellido1,
        maternal_surname: apellido2,
        curp: curp,
        birth_date: fechaNacimiento,
        email: email,
        password: contrasena,
      };

      try {
        await createUser(payload);
        alert('Usuario creado con éxito');
      } catch (error) {
        alert('Error al crear el usuario. Intenta nuevamente.');
        return; 
      }
    }

    setCurrentForm((prev) => prev + 1);
  };


  return (
    <PresentationLayout title={getFormTitle()} header={<Logo />}>
      <div className="flex flex-col items-center mx-2 gap-3">
        {registerForm[currentForm]()}
      </div>

      <div className="mx-3 my-6">
        <Button label={'Siguiente'} onClick={nextForm} />
      </div>

      <div className="flex flex-col items-center">
        <HyperLink label={'¿Ya tienes cuenta?'} onClick={clickRegister} />
      </div>
    </PresentationLayout>
  );
};

export default UserRegister;

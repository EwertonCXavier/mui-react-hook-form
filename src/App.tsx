import { useForm, Controller, SubmitHandler } from "react-hook-form";

import "./styles.css";
import { Box, Checkbox, Input, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface IIceCreamType {
  label: string;
  value: string;
}

interface IFormInput {
  firstName: string;
  lastName: string;
  // iceCreamType: IIceCreamType;
}

// Creates the validation
/**
 * Yup é o validador de formulário da aplicação
 */
const schema = yup
  .object({
    firstName: yup.string().required(), // 'firstName' tem que ser uma string e é obrigatória
    lastName: yup.string().required(), // 'lastName' segue a mesma ideia
  })
  .required();

export const App = () => {
  /**
   * reset: É o responsável por reiniciar o formulário
   * formState: {errors} => É a estrutura utilizada para recuperação de erros no react-hook-form
   * `resolver: yupResolver(schema)` => habilita o uso do validador `yup` na aplicação
   * defaultValues: contém o objeto com os atributos iniciais do formulário
   */
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      // iceCreamType: {} as IIceCreamType,
    },
  });

  // Função que é chamada após a submissão do formulário
  const onSubmit: SubmitHandler<IFormInput> = (data, e) => {
    console.log(data);
    // Resets after submission
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 'Controller' é a estrutura padrão do React-Hook-Form, sendo o 'name' o mesmo utilizado no "defaultValues", control, uma estrutura padrão e render, o componente em si. Cada item do formulário que precisa passar por validação tem que apresentar a estrutura abaixo */}
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            className="materialUIInput"
          />
        )}
      />
      {/* Exibe a mensagem contida na tag 'Typography', em caso de erro no componente de nome 'firstName'*/}
      {errors.firstName?.type === "required" && (
        <Typography variant="h5">First name is required</Typography>
      )}
      <label>Last Name</label>
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            className="materialUIInput"
          />
        )}
      />
      {/* <Controller
        name="iceCreamType"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={[
              { value: "chocolate", label: "Chocolate" },
              { value: "strawberry", label: "Strawberry" },
              { value: "vanilla", label: "Vanilla" },
            ]}
          />
        )}
      /> */}
      <input type="submit" />
    </form>
  );
};

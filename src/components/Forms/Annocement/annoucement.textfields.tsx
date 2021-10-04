import { Field, useFormikContext } from 'formik';
import { useCategoryContextState } from '../../../context/category/categoryContext';
import { StyledAutocomplete, StyledTextField } from './styles';
import { FieldsProps, Initial } from './types';
import MaskedInput from '../../CustomControls/masked.control';
import { useStyles } from './styles';

const TextFields = ({ touched, errors, variant = 'standard' }: FieldsProps) => {
  const { setFieldValue, values } = useFormikContext<Initial>();
  const { categories } = useCategoryContextState();
  const classes = useStyles();

  return (
    <>
      <Field
        variant={variant}
        label="Nazwa"
        name="title"
        as={StyledTextField}
        error={touched.title && Boolean(errors.title)}
        helperText={touched.title && errors.title}
      />
      <Field
        variant={variant}
        label="Lokalizacja"
        name="location"
        as={StyledTextField}
        error={touched.location && Boolean(errors.location)}
        helperText={touched.location && errors.location}
      />
      <MaskedInput
        type="tel"
        name="phonenumber"
        label="Telefon kontaktowy"
        className={classes.phoneNumberInput}
      />
      <Field
        variant={variant}
        label="Email"
        name="email"
        as={StyledTextField}
        error={touched.email && Boolean(errors.email)}
        helperText={touched.email && errors.email}
      />
      <Field
        variant={variant}
        label="Opis"
        name="description"
        multiline
        rows={4}
        as={StyledTextField}
        error={touched.description && Boolean(errors.description)}
        helperText={touched.description && errors.description}
      />
      <Field
        variant={variant}
        label="Cena za 1 dzień"
        name="costs.day"
        as={StyledTextField}
        error={touched.costs?.day && Boolean(errors.costs?.day)}
        helperText={touched.costs?.day && errors.costs?.day}
      />
      <Field
        variant={variant}
        label="Cena za 1 tydzień (7 dni)"
        name="costs.week"
        as={StyledTextField}
        error={touched.costs?.week && Boolean(errors.costs?.week)}
        helperText={touched.costs?.week && errors.costs?.week}
      />
      <Field
        variant={variant}
        label="Cena za 1 miesiąc (30 dni)"
        name="costs.month"
        as={StyledTextField}
        error={touched.costs?.month && Boolean(errors.costs?.month)}
        helperText={touched.costs?.month && errors.costs?.month}
      />
      <StyledAutocomplete
        options={categories || []}
        getOptionLabel={(option) => (option as { id: string; name: string }).name}
        onChange={(_, value) =>
          setFieldValue('categoryId', (value as { id: string; name: string }).id)
        }
        renderInput={(params) => (
          <StyledTextField
            {...params}
            name="categoryId"
            label="Wybierz kategorie"
            value={values.categoryId}
          />
        )}
      />
    </>
  );
};

export default TextFields;

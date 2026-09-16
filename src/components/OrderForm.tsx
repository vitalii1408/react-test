import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';

interface OrderFormValues {
  username: string;
  email: string;
  deliveryTime: string;
}

const initialValues: OrderFormValues = {
  username: '',
  email: '',
  deliveryTime: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: OrderFormValues) {
  const errors: Partial<Record<keyof OrderFormValues, string>> = {};

  if (!values.username.trim()) {
    errors.username = "Ім'я користувача обов'язкове";
  }

  if (!values.email.trim()) {
    errors.email = 'Email обов\'язковий';
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = 'Некоректний email';
  }

  if (!values.deliveryTime) {
    errors.deliveryTime = 'Оберіть час доставки';
  }

  return errors;
}

export default function OrderForm() {
  const fieldId = useId();

  const handleSubmit = (
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>
  ) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor={`${fieldId}-username`}>Ім'я користувача</label>
            <Field type="text" name="username" id={`${fieldId}-username`} />
            <ErrorMessage name="username" component="div" />
          </div>

          <div>
            <label htmlFor={`${fieldId}-email`}>Email</label>
            <Field type="email" name="email" id={`${fieldId}-email`} />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <label htmlFor={`${fieldId}-deliveryTime`}>
              Бажаний час доставки
            </label>
            <Field
              as="select"
              name="deliveryTime"
              id={`${fieldId}-deliveryTime`}
            >
              <option value="">-- Оберіть час доставки --</option>
              <option value="morning">Ранок (8:00–12:00)</option>
              <option value="afternoon">День (12:00–16:00)</option>
              <option value="evening">Вечір (16:00–20:00)</option>
            </Field>
            <ErrorMessage name="deliveryTime" component="div" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Оформити замовлення
          </button>
        </Form>
      )}
    </Formik>
  );
}

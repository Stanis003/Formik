
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field} />
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
};

const MyCheckBox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <>
            <label className="checkbox">
                <input type="checkbox"{...props}{...field} />
                {children}
            </label>

            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
};
const CustomForm = () => {
    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .min(2, 'Minimum 2 symbls')
                    .required('Required line'),
                email: Yup.string()
                    .email('Not valid email')
                    .required('Required line'),
                amount: Yup.number()
                    .min(5, 'Not less as 5')
                    .required('Required line'),
                currency: Yup.string().required('Select currency'),
                text: Yup.string()
                    .min(10, 'Not less 5 synmbls'),
                terms: Yup.boolean()
                    .required('Necessary consent !')
                    .oneOf([true], 'Necessary consent !')

            })}
            onSubmit={values => console.log(JSON.stringify(values, null, 2))}
        >
            <Form className="form">
                <h2>Send donation</h2>
                <MyTextInput
                    label="Your name"
                    id="name"
                    name="name"
                    type="text"
                />
                <MyTextInput
                    label="Your email"
                    id="name"
                    name="name"
                    type="text"
                />
                <label htmlFor="amount">Amount</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                />
                <ErrorMessage className="error" name="amount" component="div" />
                <label htmlFor="currency">Currency</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select">
                    <option value="">Select currency</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">EUR</option>
                </Field>
                <ErrorMessage className="error" name="currency" component="div" />
                <label htmlFor="text">Your message</label>
                <Field
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage className="error" name="text" component="div" />
                <MyCheckBox
                    name="terms">
                    Do you agree with the privacy policy?
                </MyCheckBox>
                <button type="submit">Send</button>
            </Form>
        </Formik >
    )
}

export default CustomForm;